// News Article type
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

// Type definition for dashboard data
export interface DashboardData {
  news: NewsArticle[];
  topTickers: Ticker[];
}

// Type definition for NewsFeed data
export interface NewsFeedData {
  news: NewsArticle[];
  selectedArticleId: string | null;
  onSelectArticle: (articleId: string) => void;
}

// Type definition for NewsItemCard data
export interface NewsItemCardData {
  article: NewsArticle;
  isSelected: boolean;
  onSelect: () => void;
}

// Type definition for sentiment guage
export interface SentimentGauge {
  title: string;
  overall_sentiment_score: number;
  overall_sentiment_label: string;
  ticker_sentiment: TickerSentiment[];
}

// Type definitions to use inside TopTicker
export interface Ticker {
  symbol: string;
  price: number;
  change: number; // Percentage change
  changeDirection?: "up" | "down" | "neutral"; // For visual cue if needed
}
