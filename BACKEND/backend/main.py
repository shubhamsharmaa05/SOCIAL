# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware

from routers import accounts, content, queue, auth

app = FastAPI(title="Social Media Dashboard API")

# Configure CORS so the frontend can make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(accounts.router)
app.include_router(content.router)
app.include_router(queue.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Social Media Dashboard API"}
