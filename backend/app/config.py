import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    NEWS_FETCH_KEY = os.getenv("NEWS_FETCH_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False