from datetime import datetime
from .. import db

class NewsArticle(db.Model):
    __tablename__ = "news_articles"
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500))
    source = db.Column(db.String(100))
    published_at = db.Column(db.DateTime)
    raw_sentiment = db.Column(db.JSON)  # AlphaVantage's original sentiment
    bert_sentiment = db.Column(db.JSON)  # FinBERT analysis
    
    @property
    def sentiment_summary(self):
        return {
            "alpha_vantage": self.raw_sentiment,
            "finbert": self.bert_sentiment
        }