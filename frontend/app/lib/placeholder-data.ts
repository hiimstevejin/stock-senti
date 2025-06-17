import type { DashboardData } from "./definitions"

export const placeholderData: DashboardData = {
  news: [
    {
      id: "1",
      headline: "Tech Giant Announces Record Profits, Stock Soars",
      source: "Financial Times",
      timestamp: "2024-06-17 10:30 AM",
      snippet:
        "Shares of TechCorp (TCORP) surged over 15% in pre-market trading after the company reported quarterly earnings that far exceeded analyst expectations...",
      relatedTickers: ["TCORP", "MSFT", "AAPL"],
      sentiment: "positive",
      sentimentScore: 0.85,
    },
    {
      id: "2",
      headline: "Global Supply Chain Concerns Impact Manufacturing Sector",
      source: "Reuters",
      timestamp: "2024-06-17 09:15 AM",
      snippet:
        "Several manufacturing companies, including AutoMake (AMKE) and BuildIt (BLD), have expressed concerns over ongoing global supply chain disruptions...",
      relatedTickers: ["AMKE", "BLD", "GE"],
      sentiment: "negative",
      sentimentScore: -0.6,
    },
    {
      id: "3",
      headline: "Central Bank Holds Interest Rates Steady Amidst Economic Uncertainty",
      source: "Bloomberg",
      timestamp: "2024-06-17 08:00 AM",
      snippet:
        "The Federal Reserve concluded its two-day policy meeting, announcing that benchmark interest rates will remain unchanged as it assesses incoming economic data...",
      relatedTickers: ["SPY", "QQQ"],
      sentiment: "neutral",
      sentimentScore: 0.1,
    },
    {
      id: "4",
      headline: "InnovatePharma (IPHA) Receives FDA Approval for New Drug",
      source: "BioTech News",
      timestamp: "2024-06-17 11:00 AM",
      snippet:
        "InnovatePharma shares jumped 25% after the U.S. Food and Drug Administration approved its groundbreaking new treatment for a rare disease...",
      relatedTickers: ["IPHA", "PFE", "MRNA"],
      sentiment: "positive",
      sentimentScore: 0.92,
    },
  ],
  topTickers: [
    { symbol: "TCORP", price: 175.3, change: 15.2, changeDirection: "up" },
    { symbol: "IPHA", price: 92.5, change: 25.1, changeDirection: "up" },
    { symbol: "SOLN", price: 210.75, change: 8.5, changeDirection: "up" },
    { symbol: "GRWTH", price: 55.2, change: 7.1, changeDirection: "up" },
    { symbol: "ENRGY", price: 120.4, change: 6.8, changeDirection: "up" },
  ],
}