from transformers import AutoTokenizer, TFAutoModelForSequenceClassification
import tensorflow as tf
import numpy as np

# Load FinBERT tokenizer & model
model_name = "yiyanghkust/finbert-tone"
# Load model tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = TFAutoModelForSequenceClassification.from_pretrained(model_name)

def predict_sentiment(text):
    # tokenize input text
    inputs = tokenizer(text, return_tensors="tf", truncation=True, padding=True)
    # pass tokenized input through the model
    outputs = model(inputs)
    # conver to probability 0<x<1
    probs = tf.nn.softmax(outputs.logits, axis=-1).numpy()[0]
    labels = ["positive", "neutral", "negative"]
    return dict(zip(labels, probs))

print(predict_sentiment("Apple posts record earnings in Q1 2025"))
print(predict_sentiment("Tesla stock plunges after disappointing sales"))
print(predict_sentiment("Investors are cautious about the market outlook"))

