import os
os.environ.setdefault("ADMIN_KEY", "test-admin-key-12345")

from fastapi.testclient import TestClient
from main import app, parse_team, generate_single_match, FIFA_TEAMS, STADIUM_VENUES

client = TestClient(app)
ADMIN_KEY = os.environ["ADMIN_KEY"]
AUTH_HEADER = {"x-api-key": ADMIN_KEY}


# ============================================================
#   STATIC / FRONTEND TESTS
# ============================================================
def test_home_page_status_code():
    """Main dashboard page should load successfully"""
    response = client.get("/")
    assert response.status_code == 200

def test_static_mount_exists():
    """Static files directory should be mounted (404 for missing file is fine, 500 is not)"""
    response = client.get("/static/nonexistent-file-xyz.css")
    assert response.status_code in [200, 404]
    assert response.status_code != 500


# ============================================================
#   STADIUM DATA API TESTS
# ============================================================
def test_stadium_venues_api():
    response = client.get("/api/stadium/venues")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 16
    assert "crowd_pct" in data[0]
    assert "active_fans" in data[0]

def test_stadium_matches_api():
    response = client.get("/api/stadium/matches")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_stadium_live_valid_venue():
    response = client.get("/api/stadium/live/metlife")
    assert response.status_code == 200
    data = response.json()
    assert "zones" in data
    assert "sensors" in data
    assert "avg_density" in data

def test_stadium_live_invalid_venue_does_not_crash():
    """Invalid venue_id should not crash the server"""
    response = client.get("/api/stadium/live/this_venue_does_not_exist")
    assert response.status_code == 200
    data = response.json()
    assert data["zones"] == []

def test_stadium_incidents_default_venue():
    response = client.get("/api/stadium/incidents")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_stadium_incidents_specific_venue():
    response = client.get("/api/stadium/incidents/metlife")
    assert response.status_code == 200

def test_stadium_crowd_control_api():
    response = client.get("/api/stadium/crowd-control")
    assert response.status_code == 200
    assert "alert" in response.json()

def test_stadium_logs_api():
    response = client.get("/api/stadium/logs")
    assert response.status_code == 200
    assert "logs" in response.json()

def test_generate_report_api():
    response = client.post("/api/stadium/generate-report", params={"venue": "metlife"})
    assert response.status_code == 200
    assert "html" in response.json()

def test_correlation_api():
    response = client.get("/api/correlation/THRT-TEST123")
    assert response.status_code == 200
    assert "matches" in response.json()


# ============================================================
#   SECURITY / AUTH TESTS
# ============================================================
def test_chaos_mode_rejects_no_auth():
    """Chaos endpoint must reject requests without an API key"""
    response = client.post("/api/stadium/chaos")
    assert response.status_code == 401

def test_chaos_mode_rejects_wrong_key():
    response = client.post("/api/stadium/chaos", headers={"x-api-key": "wrong-key"})
    assert response.status_code == 401

def test_chaos_mode_accepts_valid_key():
    response = client.post("/api/stadium/chaos", headers=AUTH_HEADER)
    assert response.status_code == 200
    assert "chaos_mode" in response.json()
    # toggle back to leave state clean for other tests
    client.post("/api/stadium/chaos", headers=AUTH_HEADER)

def test_acknowledge_rejects_no_auth():
    response = client.post("/acknowledge", json={"id": "FAKE-ID"})
    assert response.status_code == 401

def test_acknowledge_accepts_valid_key():
    response = client.post("/acknowledge", json={"id": "FAKE-ID"}, headers=AUTH_HEADER)
    assert response.status_code == 200

def test_feedback_rejects_no_auth():
    response = client.post("/feedback", json={"id": "FAKE-ID"})
    assert response.status_code == 401

def test_feedback_accepts_valid_key():
    response = client.post("/feedback", json={"id": "FAKE-ID"}, headers=AUTH_HEADER)
    assert response.status_code == 200


# ============================================================
#   THREAT ANALYSIS (/analyze) TESTS
# ============================================================
def test_analyze_normal_traffic():
    response = client.post("/analyze", json={"text": "hello world", "source_ip": "1.2.3.4"})
    assert response.status_code == 200
    assert response.json()["urgency_level"] == "LOW"

def test_analyze_critical_bomb_keyword():
    response = client.post("/analyze", json={"text": "bomb threat detected", "source_ip": "9.9.9.9"})
    assert response.status_code == 200
    assert response.json()["urgency_level"] == "CRITICAL"

def test_analyze_critical_c4_keyword():
    response = client.post("/analyze", json={"text": "C4 explosive found", "source_ip": "9.9.9.9"})
    assert response.status_code == 200
    assert response.json()["urgency_level"] == "CRITICAL"

def test_analyze_missing_source_ip_uses_default():
    response = client.post("/analyze", json={"text": "test packet"})
    assert response.status_code == 200
    assert response.json()["original_text"] == "test packet"

def test_analyze_empty_text():
    response = client.post("/analyze", json={"text": ""})
    assert response.status_code == 200

def test_analyze_missing_text_field_returns_422():
    """Pydantic validation should reject requests missing the required 'text' field"""
    response = client.post("/analyze", json={"source_ip": "1.1.1.1"})
    assert response.status_code == 422

def test_latest_intercept_endpoint():
    response = client.get("/latest-intercept")
    assert response.status_code == 200

def test_traffic_feed_endpoint():
    response = client.get("/traffic-feed")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


# ============================================================
#   CHATBOT (/api/stadium/chat) TESTS
# ============================================================
def test_chat_empty_query():
    response = client.post("/api/stadium/chat", json={"query": "", "venue_id": "metlife"})
    assert response.status_code == 200
    assert "didn't catch" in response.json()["response"]

def test_chat_telemetry_intent():
    response = client.post("/api/stadium/chat", json={"query": "what is the score", "venue_id": "metlife"})
    assert response.status_code == 200
    assert "response" in response.json()
    assert isinstance(response.json()["threat_alert"], bool)

def test_chat_logistics_food_intent():
    response = client.post("/api/stadium/chat", json={"query": "where can I get food", "venue_id": "metlife"})
    assert response.status_code == 200
    assert "response" in response.json()

def test_chat_infrastructure_intent():
    response = client.post("/api/stadium/chat", json={"query": "what is the temperature", "venue_id": "metlife"})
    assert response.status_code == 200

def test_chat_emergency_triggers_chaos():
    response = client.post("/api/stadium/chat", json={"query": "fire evacuate now", "venue_id": "metlife"})
    assert response.status_code == 200
    assert response.json()["threat_alert"] is True
    # stand down afterwards to reset state
    client.post("/api/stadium/chat", json={"query": "all clear", "venue_id": "metlife"})

def test_chat_stand_down_resets_state():
    client.post("/api/stadium/chat", json={"query": "fire evacuate", "venue_id": "metlife"})
    response = client.post("/api/stadium/chat", json={"query": "false alarm", "venue_id": "metlife"})
    assert response.status_code == 200
    assert response.json()["stand_down"] is True

def test_chat_unknown_intent():
    response = client.post("/api/stadium/chat", json={"query": "asdkjaslkdj random gibberish", "venue_id": "metlife"})
    assert response.status_code == 200
    assert "response" in response.json()

def test_chat_invalid_venue_does_not_crash():
    response = client.post("/api/stadium/chat", json={"query": "what is the score", "venue_id": "fake_venue"})
    assert response.status_code == 200


# ============================================================
#   UNIT TESTS — pure helper functions
# ============================================================
def test_parse_team_with_flag():
    name, flag = parse_team("Brazil 🇧🇷")
    assert name == "Brazil"
    assert flag == "🇧🇷"

def test_parse_team_no_flag():
    name, flag = parse_team("SoloName")
    assert name == "SoloName"
    assert flag == ""

def test_generate_single_match_structure():
    match = generate_single_match("test_id_1", 1234567890, [])
    assert match["id"] == "test_id_1"
    assert match["status"] == "UPCOMING"
    assert match["home_score"] == 0
    assert match["away_score"] == 0
    assert "venue_id" in match

def test_generate_single_match_avoids_used_venues():
    used_venue_ids = [v["id"] for v in STADIUM_VENUES[:-1]]
    match = generate_single_match("test_id_2", 1234567890, used_venue_ids)
    assert match["venue_id"] == STADIUM_VENUES[-1]["id"]

def test_fifa_teams_list_not_empty():
    assert len(FIFA_TEAMS) > 30

def test_stadium_venues_count():
    assert len(STADIUM_VENUES) == 16
