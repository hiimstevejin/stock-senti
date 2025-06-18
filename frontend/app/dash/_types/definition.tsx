export interface Topic {
  topic: string;
  relevance_score: string;
}

export interface TickerSentiment {
  ticker: string;
  relevance_score: string;
  ticker_sentiment_score: string;
  ticker_sentiment_label: string;
}

export interface NewsArticle {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image?: string | null;
  source: string;
  category_within_source: string;
  source_domain: string;
  topics: Topic[];
  overall_sentiment_score: number;
  overall_sentiment_label: string;
  ticker_sentiment: TickerSentiment[];
}

export interface DashboardData {
  news: NewsArticle[]
}

export interface Ticker {
  symbol: string
  price: number
  change: number // Percentage change
  changeDirection?: "up" | "down" | "neutral" // For visual cue if needed
}