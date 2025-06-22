from transformers import AutoTokenizer, TFAutoModelForSequenceClassification
import tensorflow as tf
import numpy as np

class SentimentAnalyzer:
    def __init__(self):
        self.model_name = "yiyanghkust/finbert-tone"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = TFAutoModelForSequenceClassification.from_pretrained(self.model_name)
        self._init_lexicon()

    def _init_lexicon(self):
        self.lexicon = {
            "beat estimates": 1.3, "surged": 1.2, "raised guidance": 1.4,
            "profit warning": 0.6, "slump": 0.7, "cut forecast": 0.5
        }

    def _apply_lexicon(self, text: str, probs: dict) -> dict:
        text_lower = text.lower()
        for term, boost in self.lexicon.items():
            if term in text_lower:
                if "beat" in term or "raised" in term:
                    probs["positive"] *= boost
                    probs["negative"] /= boost
                else:
                    probs["negative"] *= boost
                    probs["positive"] /= boost
        return {k: v/sum(probs.values()) for k, v in probs.items()}

    def analyze(self, text: str) -> dict:
        try:
            if not text.strip():
                raise ValueError("Empty input text")
                
            inputs = self.tokenizer(
                text,
                return_tensors="tf",
                truncation=True,
                padding='max_length',
                max_length=256
            )
            
            outputs = self.model(inputs)
            probs = tf.nn.softmax(outputs.logits, axis=-1).numpy()[0]
            labels = ["positive", "neutral", "negative"]
            prob_dict = dict(zip(labels, map(float, probs)))
            prob_dict = self._apply_lexicon(text, prob_dict)
            
            return {
                "sentiment": max(prob_dict, key=prob_dict.get),
                "confidence": max(prob_dict.values()),
                "probabilities": prob_dict,
                "score": prob_dict["positive"] - prob_dict["negative"]  # -1 to +1
            }
            
        except Exception as e:
            return {
                "error": str(e),
                "sentiment": "error",
                "confidence": 0.0
            }

# Singleton
analyzer = SentimentAnalyzer()
