from flask import Blueprint, jsonify, current_app
from app.services.analyzer import NewsAnalyzer
from app.models import db

news_bp = Blueprint('news', __name__)

@news_bp.route('/analyze', methods=['GET'])
def analyze_market():
    analyzer = NewsAnalyzer(current_app.config["NEWS_FETCH_KEY"])
    
    # Example: Analyze top 10 S&P stocks
    articles = analyzer.analyze_todays_news(
        tickers=["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]
    )
    
    # Save to database
    db.session.bulk_save_objects(articles)
    db.session.commit()
    
    return jsonify([{
        "title": a.title,
        "source": a.source,
        "sentiment": a.bert_sentiment["sentiment"],
        "confidence": a.bert_sentiment["confidence"]
    } for a in articles])