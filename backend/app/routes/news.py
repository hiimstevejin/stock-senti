from flask import Blueprint, jsonify, current_app, request
from app.services.analyzer import NewsAnalyzer
from app import db

news_bp = Blueprint("news", __name__)

print("news.py loaded")


@news_bp.route("/analyze", methods=["GET"])
def analyze_market():
    print("analyze_market endpoint called")  # Add this line
    tickers = request.args.get("tickers", "GOOG").split(",")
    analyzer = NewsAnalyzer(current_app.config["NEWS_FETCH_KEY"])
    articles = analyzer.analyze_todays_news(tickers=None, days_ago=7,topics=None,limit=5)

    # Save to database
    db.session.bulk_save_objects(articles)
    db.session.commit()

    return jsonify(
        [
            {
                "title": a.title,
                "source": a.source,
                "timepublished": a.published_at,
                "raw_sentiment": a.raw_sentiment,
                "sentiment": a.bert_sentiment["sentiment"],
                "confidence": a.bert_sentiment["confidence"],
            }
            for a in articles
        ]
    )
