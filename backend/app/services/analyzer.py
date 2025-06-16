from typing import List
from .news_api import AlphaVantageNews
from .sentiment import analyzer
from app.models.news import NewsArticle
from datetime import datetime


class NewsAnalyzer:
    def __init__(self, api_key: str):
        self.news_client = AlphaVantageNews(api_key)

    def analyze_todays_news(self, tickers: list,days_ago:int,topics:list,limit:int) -> List[NewsArticle]:
        # Fetch news
        raw_news = self.news_client.fetch_news(
            tickers=tickers,
            topics=topics,
            days_ago=days_ago,
            limit=limit,
        )
        print(
            "Fetched raw news:", raw_news
        )  # Debugging line to show fetched news articles
        # Process each article
        analyzed_articles = []
        for article in raw_news:
            print("Processing article:", article)  # Add this line
            sentiment = {
                "sentiment": "positive",
                "confidence": 0.99,
            }  # Mock sentiment for testing
            analyzed_article = NewsArticle(
                title=article["title"],
                source=article["source"],
                published_at=datetime.strptime(
                    article["time_published"], "%Y%m%dT%H%M%S"
                ),
                raw_sentiment=article["ticker_sentiment"],
                bert_sentiment=sentiment,
            )
            print("Created NewsArticle:", analyzed_article)  # Add this line
            analyzed_articles.append(analyzed_article)

        return analyzed_articles
