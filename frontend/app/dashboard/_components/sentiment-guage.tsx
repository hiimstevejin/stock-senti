import type { NewsArticle } from "@/app/dashboard/_types/definition";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Smile, Meh, Frown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentimentGaugeProps {
  article: NewsArticle | null;
}

export function SentimentGauge({ article }: SentimentGaugeProps) {
  const getSentimentDetails = () => {
    if (!article) {
      return {
        label: "N/A",
        Icon: Meh,
        colorClass: "text-muted-foreground",
        gaugeIndicatorColor: "bg-muted-foreground",
        gaugePosition: "50%",
      };
    }
    let gaugePositionPercent = 50;
    // Adjust score range for gauge: -1 to 1 maps to 0% to 100%
    gaugePositionPercent = (article.overall_sentiment_score + 1) * 50;
    gaugePositionPercent = Math.max(0, Math.min(100, gaugePositionPercent));

    switch (article.overall_sentiment_label) {
      case "Bullish":
        return {
          label: "Positive",
          Icon: Smile,
          colorClass: "text-green-600 dark:text-green-400",
          gaugeIndicatorColor: "bg-green-500 dark:bg-green-400",
          gaugePosition: `${gaugePositionPercent}%`,
        };
      case "Somewhat-Bullish":
        return {
          label: "Somewhat Positive",
          Icon: Smile,
          colorClass: "text-green-600 dark:text-green-400",
          gaugeIndicatorColor: "bg-green-500 dark:bg-green-400",
          gaugePosition: `${gaugePositionPercent}%`,
        };
      case "Bearish":
        return {
          label: "Negative",
          Icon: Frown,
          colorClass: "text-red-600 dark:text-red-400",
          gaugeIndicatorColor: "bg-red-500 dark:text-red-400",
          gaugePosition: `${gaugePositionPercent}%`,
        };
      case "Somewhat-Bearish":
        return {
          label: "Somewhat Negative",
          Icon: Frown,
          colorClass: "text-red-600 dark:text-red-400",
          gaugeIndicatorColor: "bg-red-500 dark:text-red-400",
          gaugePosition: `${gaugePositionPercent}%`,
        };
      default: // Neutral
        return {
          label: "Neutral",
          Icon: Meh,
          colorClass: "text-yellow-600 dark:text-yellow-400",
          gaugeIndicatorColor: "bg-yellow-500 dark:bg-yellow-400",
          gaugePosition: `${gaugePositionPercent}%`,
        };
    }
  };

  const { label, Icon, colorClass, gaugeIndicatorColor, gaugePosition } =
    getSentimentDetails();

  return (
    <section className="lg:col-span-1 h-40 md:h-auto md:max-h-full flex flex-col">
      <h2 className="text-sm font-semibold text-neutral-300 mb-2 px-1">
        Sentiment Analysis
      </h2>
      <div className="flex-grow">
        <Card className="bg-card border border-border text-card-foreground h-full shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-base font-semibold text-foreground flex items-center">
              <Icon className={cn("h-4 w-4 mr-2 shrink-0", colorClass)} />
              News Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pt-2 pb-3">
            {article ? (
              <>
                <p
                  className={cn(
                    "text-lg font-semibold text-center mb-2.5",
                    colorClass
                  )}
                >
                  {label}
                </p>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden relative">
                  {/* Subtle background segments for negative/neutral/positive zones */}
                  <div className="absolute h-full w-1/3 left-0 bg-red-500/10 dark:bg-red-800/30 rounded-l-full"></div>
                  <div className="absolute h-full w-1/3 left-1/3 bg-yellow-500/10 dark:bg-yellow-800/30"></div>
                  <div className="absolute h-full w-1/3 right-0 bg-green-500/10 dark:bg-green-800/30 rounded-r-full"></div>
                  <div
                    className={cn(
                      "h-full w-1.5 rounded-full absolute top-0 transform -translate-x-1/2 transition-all duration-300 ease-out",
                      gaugeIndicatorColor
                    )}
                    style={{ left: gaugePosition }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1.5 px-0.5">
                  <span>Negative</span>
                  <span>Neutral</span>
                  <span>Positive</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2.5 line-clamp-2">
                  <span className="font-semibold text-foreground">
                    Selected:
                  </span>{" "}
                  {article.title}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                Select a news article to see its sentiment.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
