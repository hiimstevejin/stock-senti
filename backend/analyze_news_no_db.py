import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
import requests
import numpy as np
from transformers import AutoTokenizer, TFAutoModelForSequenceClassification
import tensorflow as tf

# 1. Load environment variables
load_dotenv()

# 2. Initialize FinBERT model (your existing sentiment.py code)
tokenizer = AutoTokenizer.from_pretrained("yiyanghkust/finbert-tone")
model = TFAutoModelForSequenceClassification.from_pretrained("yiyanghkust/finbert-tone")

def predict_sentiment(text):
    inputs = tokenizer(text, return_tensors="tf", truncation=True, padding=True)
    outputs = model(inputs)
    probs = tf.nn.softmax(outputs.logits, axis=-1).numpy()[0]
    labels = ["positive", "neutral", "negative"]
    return {
        "sentiment": labels[np.argmax(probs)],
        "confidence": float(np.max(probs)),
        "probabilities": {label: float(prob) for label, prob in zip(labels, probs)}
    }

# 3. AlphaVantage client (your existing news_api.py without Flask)
class AlphaVantageClient:
    BASE_URL = "https://www.alphavantage.co/query"
    
    def __init__(self, api_key: str):
        if not api_key or api_key == "YOUR_API_KEY_HERE":
            raise ValueError("Missing or invalid Alpha Vantage API key")
        self.api_key = api_key

    def fetch_news(self, tickers=None, topics=None, days_ago=1, limit=5):
        params = {
            "function": "NEWS_SENTIMENT",
            "apikey": self.api_key,
            "time_from": (datetime.now() - timedelta(days=days_ago)).strftime("%Y%m%dT0000"),
            "sort": "RELEVANCE",
            "limit": limit
        }

        if tickers: params["tickers"] = ",".join(tickers)
        if topics: params["topics"] = ",".join(topics)
        
        response = requests.get(self.BASE_URL, params=params)
        # print("API URL:", response.url)  
        # # Print the full request URL
        # print("API status code:", response.status_code)
        # print("API response:", response.text)  
        # # Print the raw response
        return response.json().get("feed", [])

# 4. Main analysis function
def analyze_todays_news():
    client = AlphaVantageClient(os.getenv("NEWS_FETCH_KEY"))
    articles = client.fetch_news(limit=5)
    
    for article in articles:
        print(f"\n📰 {article['title']}")
        print(f"   Source: {article['source']}")
        
        # Standardized Sentiment
        alpha_score = float(article['overall_sentiment_score'])
        bert_result = predict_sentiment(article["summary"])
        bert_score = bert_to_standard(bert_result)
        
        print(f"   AlphaVantage: {alpha_score:.2f} ({sentiment_label(alpha_score)})")
        print(f"   BERT: {bert_score:.2f} ({bert_result['sentiment'].upper()})")
        print(f"   Confidence: {bert_result['confidence']:.0%}")
        
        # Discrepancy Alert
        if abs(alpha_score - bert_score) > 0.3:  # Significant difference
            print("   ⚠️ Large sentiment discrepancy!")

def bert_to_standard(bert_result):
    """Convert BERT probabilities to -1 to +1 scale"""
    positive = bert_result['probabilities']['positive']
    negative = bert_result['probabilities']['negative']
    return (positive - negative)  # Range: -1 to +1

def sentiment_label(score: float) -> str:
    """Convert numeric score to text label"""
    if score >= 0.35: return "Bullish"
    elif score >= 0.15: return "Somewhat Bullish"
    elif score <= -0.35: return "Bearish" 
    elif score <= -0.15: return "Somewhat Bearish"
    else: return "Neutral"

if __name__ == "__main__":
    analyze_todays_news()