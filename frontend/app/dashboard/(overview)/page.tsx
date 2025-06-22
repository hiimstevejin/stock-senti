"use client";

import { useState, useMemo } from "react";
import { NewsFeed } from "@/app/dashboard/_components/news-feed";
import { TopTickers } from "@/app/dashboard/_components/top-tickers";
import { SentimentGauge } from "@/app/dashboard/_components/sentiment-guage";
import { placeholderData } from "../_lib/placeholder-data";

export default function Page() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    placeholderData.news.length > 0 ? placeholderData.news[0].title : null
  );

  const handleSelectArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
  };

  const selectedArticle = useMemo(() => {
    return (
      placeholderData.news.find(
        (article) => article.title === selectedArticleId
      ) || null
    );
  }, [selectedArticleId]);

  return (
    <main className="flex flex-col-reverse md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-hidden">
      {/* News Feed */}
      <NewsFeed
        news={placeholderData.news}
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
