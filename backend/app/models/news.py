from datetime import datetime
from .. import db

class NewsArticle(db.Model):
    __tablename__ = "news_articles"
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500))
    summary = db.Column(db.String)
    source = db.Column(db.String(100))
    banner_image = db.Column(db.String)
    published_at = db.Column(db.DateTime)
    overall_sentiment_score = db.Column(db.Integer)
    overall_sentiment_label = db.Column(db.String)
    ticker_sentiment = db.Column(db.JSON)
    bert_sentiment = db.Column(db.JSON)  # FinBERT analysis
    
    @property
    def sentiment_summary(self):
        return {
            "alpha_vantage": self.raw_sentiment,
            "finbert": self.bert_sentiment
        }