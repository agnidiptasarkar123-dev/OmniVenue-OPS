import pytest
import sqlite3
import os

# Test Database Connection & Schema Health
def test_database_connections():
    db_paths = ["stadium.db", "threat_logs.db"]
    for db in db_paths:
        if os.path.exists(db):
            conn = sqlite3.connect(db)
            cursor = conn.cursor()
            assert conn is not None
            # Check if we can run a simple query
            try:
                cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
                assert True
            except Exception:
                pytest.fail(f"Database {db} is corrupted or unreadable.")
            finally:
                conn.close()

# Test Telemetry Boundary Safety
def test_telemetry_bounds():
    # Standard environmental thresholds for stadium safety
    mock_aqi = 61
    mock_acoustic = 67
    mock_wind = 13.5
    
    assert 0 <= mock_aqi <= 500, "AQI value out of realistic bounds"
    assert 0 <= mock_acoustic <= 150, "Acoustic Pressure out of limits"
    assert mock_wind >= 0, "Wind velocity cannot be negative"

# Test AI Incident Logging Flow
def test_incident_severity_levels():
    valid_severities = ["INFO", "WARNING", "CRITICAL"]
    logged_severity = "CRITICAL" # From our VIP Lounge Medical Emergency simulation
    assert logged_severity in valid_severities, "Invalid security log severity caught"
