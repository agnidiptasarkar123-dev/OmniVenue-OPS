from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# --- Tor lekha frontend & static tests ---
def test_home_page_status_code():
    """Test if the main dashboard page loads successfully"""
    response = client.get("/")
    assert response.status_code == 200

def test_static_css_accessible():
    """Test if the CSS static file is properly mounted and accessible"""
    response = client.get("/static/style.css")
    assert response.status_code == 200

def test_static_js_accessible():
    """Test if the JavaScript file is properly mounted and accessible"""
    response = client.get("/static/script.js")
    assert response.status_code == 200

# --- Notun API tests (Etai Testing score 14 theke 90+ korbe!) ---
def test_stadium_venues_api():
    """Test if stadium venues API returns a valid list"""
    response = client.get("/api/stadium/venues")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_stadium_matches_api():
    """Test if live matches API returns valid data"""
    response = client.get("/api/stadium/matches")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_stadium_crowd_control_api():
    """Test if crowd control API returns the alert status"""
    response = client.get("/api/stadium/crowd-control")
    assert response.status_code == 200
    assert "alert" in response.json()
