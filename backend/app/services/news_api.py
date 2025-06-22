import requests
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from app.models.news import NewsArticle


class AlphaVantageNews:
    BASE_URL = "https://www.alphavantage.co/query"

    def __init__(self, api_key: str):
        self.api_key = api_key

    def fetch_news(
        self,
        tickers: Optional[List[str]] = None,
        topics: Optional[List[str]] = None,
        days_ago: int = 1,
        limit: int = 20,
    ) -> List[Dict]:
        """Fetch news with multiple filter options"""
        time_from = (datetime.now() - timedelta(days=days_ago)).strftime("%Y%m%dT0000")

        params = {
            "function": "NEWS_SENTIMENT",
            "apikey": self.api_key,
            "time_from": time_from,
            "sort": "RELEVANCE",
            "limit": limit,
        }

        if tickers:
            params["tickers"] = ",".join(tickers)
        if topics:
            params["topics"] = ",".join(topics)

        print("fetch_news called with params:", params)  # Log the parameters

        try:
            response = requests.get(self.BASE_URL, params=params, timeout=10)
            print("AlphaVantage API response text:", response.text)  # Move this line up
            response.raise_for_status()
            data = response.json()
            return data.get("feed", [])
        except Exception as e:
            print(f"API Error: {str(e)}")
            return []
