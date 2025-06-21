"use client";

import type { NewsFeedData } from "@/app/dash/_types/definition";
import NewsItemCard from "@/app/dash/_components/news-item-card";

export function NewsFeed({
  news,
  selectedArticleId,
  onSelectArticle,
}: NewsFeedData) {
  return (
    <section className="flex-1 md:col-span-2 lg:col-span-2 md:h-auto md:max-h-[calc(100vh-100px)] overflow-hidden flex flex-col">
      <h2 className="text-lg font-semibold text-foreground mb-2 px-1">
        Real-time News
      </h2>
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-background pr-1">
        <div className="space-y-3 overflow-y-auto h-full px-1 pt-2">
          {news.map((article) => (
            <NewsItemCard
              key={article.title}
              article={article}
              isSelected={selectedArticleId === article.title}
              onSelect={() => onSelectArticle(article.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
