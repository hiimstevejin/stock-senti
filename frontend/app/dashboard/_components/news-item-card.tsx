"use client";

import { Button } from "@/components/ui/button";
import type { NewsItemCardData } from "@/app/dashboard/_types/definition";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { TickerBadge } from "@/app/dashboard/_components/ticker-badge";
import { cn } from "@/lib/utils";

const IMAGE_DIMENSIONS = {
  height: "h-32 sm:h-36 md:h-40",
  width: "w-32 sm:w-48 md:w-60",
} as const;

export default function NewsItemCard({
  article,
  isSelected,
  onSelect,
}: NewsItemCardData) {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a[data-view-article='true']")) return;
    onSelect();
  };

  return (
    <Card
      className={cn(
        "bg-card border border-border text-card-foreground cursor-pointer transition-all duration-200 overflow-hidden shadow-sm hover:border-border/80 hover:shadow-md",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        isSelected && "border-primary ring-2 ring-primary shadow-lg"
      )}
      onClick={handleCardClick}
    >
      {/* Main layout: stacked on mobile, horizontal on larger screens */}
      <div className="flex flex-col sm:flex-row">
        {/* Article content area */}
        <div className="flex-1 min-w-0">
          <CardHeader className="pb-3 pt-4 px-4 space-y-2">
            <CardTitle
              className={cn(
                "text-lg font-semibold leading-tight text-foreground transition-colors line-clamp-2",
                "group-hover:text-primary",
                isSelected && "text-primary"
              )}
            >
              {article.title}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground pt-1">
              {new Date(article.time_published).toLocaleString()}
            </CardDescription>

            {/* Source and author information */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
              <CardDescription className="whitespace-nowrap font-medium">
                Source: {article.source}
              </CardDescription>
              {article.authors && article.authors.length > 0 && (
                <CardDescription className="whitespace-nowrap">
                  By: {article.authors.slice(0, 2).join(", ")}
                  {article.authors.length > 2 &&
                    ` +${article.authors.length - 2} more`}
                </CardDescription>
              )}
            </div>
          </CardHeader>

          {/* Article summary */}
          <CardContent className="text-sm text-muted-foreground pb-2 pt-0 px-4">
            <p className="line-clamp-3 leading-relaxed">
              {article.summary}
              <span className="text-muted-foreground/60 ml-1">…</span>
            </p>
          </CardContent>
        </div>

        {/* Image preview or fallback if not available */}
        <div
          className={cn(
            "hidden sm:block flex-shrink-0 m-3 rounded-lg overflow-hidden",
            IMAGE_DIMENSIONS.height,
            IMAGE_DIMENSIONS.width
          )}
        >
          {article.banner_image ? (
            <img
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:brightness-110"
              src={article.banner_image}
              alt={`${article.title} - News banner`}
            />
          ) : (
            <div className="w-full h-full bg-muted/50 flex items-center justify-center text-sm text-muted-foreground border border-border/50 rounded-lg">
              <div className="text-center px-2">
                <div className="text-muted-foreground/40 mb-1">📰</div>
                <div className="text-xs">No Image</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with tickers and link button */}
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 pt-2 px-4 border-t border-border/50">
        <div className="flex flex-wrap gap-1.5">
          {article.tickers.map((tickerObj) => (
            <TickerBadge key={tickerObj.symbol} symbol={tickerObj.symbol} />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          asChild
          className={cn(
            "mt-2 sm:mt-0 w-full sm:w-auto transition-all duration-200",
            "hover:bg-primary hover:text-primary-foreground hover:border-primary",
            "focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
        >
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            data-view-article="true"
            className="inline-flex items-center justify-center"
          >
            View Article
            <ExternalLink className="h-3.5 w-3.5 ml-2 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
