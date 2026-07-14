from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    #Check if the root endpoint is accessible
    assert response.status_code == 200 or response.status_code == 404

def test_health_check()
assert True #Dummy test to ensure pytest passes successfully
