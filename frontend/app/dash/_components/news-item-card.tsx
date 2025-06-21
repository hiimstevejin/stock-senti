"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { NewsItemCardData } from "@/app/dash/_types/definition";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import { TickerBadge } from "@/app/dash/_components/ticker-badge";
import { cn } from "@/lib/utils";


export default function NewsItemCard({
  article,
  isSelected,
  onSelect,
}: NewsItemCardData) {
    const [imgError, setImgError] = useState(false);
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent selection if clicking on the "View Article" button
    if ((e.target as HTMLElement).closest("a[data-view-article='true']")) {
      return;
    }
    onSelect();
  };
  return (
    <Card
      className={cn(
        "bg-card border border-border text-card-foreground hover:shadow-md cursor-pointer transition-all duration-150 overflow-hidden shadow-sm",
        isSelected && "border-primary ring-1 ring-primary shadow-lg"
      )}
      onClick={handleCardClick}
    >
      <div className="flex">
        <div>
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle
              className={cn(
                "text-base font-medium leading-tight text-foreground group-hover:text-primary transition-colors",
                isSelected && "text-primary"
              )}
            >
              {article.title}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground pt-1">
              {article.time_published}
            </CardDescription>
            {article.authors && article.authors.length > 0 && (
              <CardDescription className="text-xs text-muted-foreground pt-0.5">
                By: {article.authors.join(", ")}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground pb-2 pt-0 px-4">
            <p className="line-clamp-2">{article.summary}</p>
          </CardContent>
        </div>

       {article.banner_image && !imgError ? (
        <img
          className="m-1 h-[150px] w-[250px] rounded-xl flex-shrink-0"
          src={article.banner_image}
          alt=""
          onError={() => setImgError(true)}
        />
      ) : (
        <Skeleton className="m-1 h-[150px] w-[250px] rounded-xl flex-shrink-0" />
      )}
      </div>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 pt-2 px-4">
        <div className="flex flex-wrap gap-1">
          {article.ticker_sentiment.map((tickerObj) => (
            <TickerBadge key={tickerObj.ticker} symbol={tickerObj.ticker} />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="mt-2 sm:mt-0 w-full sm:w-auto"
        >
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            data-view-article="true"
          >
            View Article <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
