// News Article type
export interface Topic {
  name: string;
  relevance_score: string;
}

export interface Ticker {
  symbol: string;
  sentiment_score: number;
  relevance_score: number;
  sentiment_label: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image?: string;
  source: string;
  url: string;
  overall_sentiment_score: number;
  overall_sentiment_label: string;
  topics: Topic[];
  tickers: Ticker[];
}

// Type definition for dashboard data
export interface DashboardData {
  news: NewsArticle[];
  topTickers: TopGainer[];
  bottomTickers: TopLoser[];
}

// Type definition for NewsFeed data
export interface NewsFeedData {
  news: NewsArticle[];
  selectedArticleId: number | null;
  onSelectArticle: (articleId: number) => void;
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
  ticker_sentiment: Ticker[];
}

// Type definitions to use inside TopTicker
export interface TopGainer {
  symbol: string;
  price: number;
  change: number; // Percentage change
  change_percentage: string;
  volume: number;
  changeDirection?: "up" | "down" | "neutral"; 
}

export interface TopLoser {
  symbol: string;
  price: number;
  change: number; // Percentage change
  change_percentage: string;
  volume: number;
  changeDirection?: "up" | "down" | "neutral";
}