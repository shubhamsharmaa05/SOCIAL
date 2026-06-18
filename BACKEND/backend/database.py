import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.environ.get("DATABASE_URL", "mongodb://localhost:27017")

# If the user put a sql URL in MONGODB_URI accidentally, we'll try to use a fallback or let it fail, but we assume it's a mongo URL now.
client = AsyncIOMotorClient(MONGODB_URI)
db = client["social_db"]

async def get_db():
    yield db

