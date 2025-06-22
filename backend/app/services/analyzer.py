from typing import List
from .news_api import AlphaVantageNews
from .sentiment import analyzer
from app.models.news import NewsArticle
from datetime import datetime


class NewsAnalyzer:
    def __init__(self, api_key: str):
        self.news_client = AlphaVantageNews(api_key)

    def analyze_todays_news(
        self, tickers: list, days_ago: int, topics: list, limit: int
    ) -> List[NewsArticle]:
        # Fetch news
        raw_news = self.news_client.fetch_news(
            tickers=tickers,
            topics=topics,
            days_ago=days_ago,
            limit=limit,
        )
        # print("Fetched raw news:", raw_news)
        # Process each article
        analyzed_articles = []
        for article in raw_news:
            # print("Processing article:", article)  
            
            # TODO implement bert here
            sentiment = {
                "sentiment": "positive",
                "confidence": 0.99,
            }  # Mock sentiment for testing
            analyzed_article = NewsArticle(
                title=article["title"],
                summary=article["summary"],
                source=article["source"],
                banner_image = article["banner_image"],
                published_at=datetime.strptime(
                    article["time_published"], "%Y%m%dT%H%M%S"
                ),
                overall_sentiment_score= article["overall_sentiment_score"],
                overall_sentiment_label=article["overall_sentiment_label"],
                ticker_sentiment=article["ticker_sentiment"],
                bert_sentiment=sentiment,
            )
            analyzed_articles.append(analyzed_article)

        return analyzed_articles
