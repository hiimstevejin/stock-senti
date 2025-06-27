"use client";

import { useState, useMemo } from "react";
import { NewsFeed } from "@/app/dashboard/_components/news-feed";
import { TopTickers } from "@/app/dashboard/_components/top-tickers";
import { SentimentGauge } from "@/app/dashboard/_components/sentiment-guage";
import { NewsArticle } from "../_types/definition";
import { placeholderData } from "../_lib/placeholder-data";

export default function DashboardClient({ news }: { news: NewsArticle[] }) {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    news.length > 0 ? news[0].id : null
  );

  const handleSelectArticle = (articleId: number) => {
    setSelectedArticleId(articleId);
  };

  const selectedArticle = useMemo(() => {
    return news.find((article) => article.id === selectedArticleId) || null;
  }, [selectedArticleId]);

  return (
    <main className="flex flex-col-reverse md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-hidden">
      {/* News Feed */}
      <NewsFeed
        news={news}
        selectedArticleId={selectedArticleId}
        onSelectArticle={handleSelectArticle}
      />

      <aside className="flex-shrink-0 md:col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 md:h-full md:max-h-[calc(100vh-100px)] overflow-hidden">
        {/* Top Ticker feed */}
        <TopTickers tickers={placeholderData.topTickers} />
        {/* Sentiment Guage feed */}
        <SentimentGauge article={selectedArticle} />
      </aside>
    </main>
  );
}
