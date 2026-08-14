from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def index():
    return "Backend Is Live"

@app.get("/login")
def Login():
    pass

