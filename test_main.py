from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

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
