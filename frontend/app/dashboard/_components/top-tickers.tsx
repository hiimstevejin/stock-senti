import type { TopTicker } from "@/app/dashboard/_types/definition";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopTickers({ tickers }: { tickers: TopTicker[] }) {
  return (
    <section className="lg:col-span-1 min-h-[180px] md:h-auto md:max-h-full flex flex-col flex-grow">
      <h2 className="text-sm font-semibold text-neutral-300 mb-2 px-1">
        Top Tickers
      </h2>
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800">
        <Card className="bg-card border border-border text-card-foreground h-full shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-base font-semibold text-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
              Top Performing Tickers
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pt-1 pb-3 text-sm">
            <ul className="space-y-1.5">
              {tickers.map((ticker) => (
                <li
                  key={ticker.symbol}
                  className="flex justify-between items-center py-1.5 border-b border-border last:border-b-0"
                >
                  <div>
                    <span className="font-mono font-semibold text-foreground">
                      {ticker.symbol}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ${ticker.price.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "font-mono text-xs font-medium flex items-center",
                      ticker.change > 0
                        ? "text-green-600 dark:text-green-400"
                        : ticker.change < 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-muted-foreground"
                    )}
                  >
                    {ticker.change > 0 && (
                      <ArrowUp className="h-3 w-3 mr-0.5" />
                    )}
                    {ticker.change < 0 && (
                      <ArrowDown className="h-3 w-3 mr-0.5" />
                    )}
                    {ticker.change === 0 && (
                      <Minus className="h-3 w-3 mr-0.5" />
                    )}
                    {ticker.change.toFixed(1)}%
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
