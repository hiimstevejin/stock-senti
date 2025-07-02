import { useState, useMemo } from "react";
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import type { TopMovers } from "@/app/dashboard/_types/definition";

export function TopMoversBlock({ topMovers }: { topMovers: TopMovers }) {
  const [activeView, setActiveView] = useState<"gainers" | "losers">("gainers");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this number based on your UI needs

  const currentData =
    activeView === "gainers" ? topMovers.top_gainers : topMovers.top_losers;
  const isGainers = activeView === "gainers";

  // Reset to first page when switching views
  const handleViewChange = (view: "gainers" | "losers") => {
    setActiveView(view);
    setCurrentPage(1);
  };

  // Pagination logic
  const { paginatedData, totalPages, hasNextPage, hasPrevPage } =
    useMemo(() => {
      if (!currentData || currentData.length === 0) {
        return {
          paginatedData: [],
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        };
      }

      const total = Math.ceil(currentData.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginated = currentData.slice(startIndex, endIndex);

      return {
        paginatedData: paginated,
        totalPages: total,
        hasNextPage: currentPage < total,
        hasPrevPage: currentPage > 1,
      };
    }, [currentData, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="lg:col-span-1 min-h-[180px] md:h-auto md:max-h-full flex flex-col flex-grow gap-4">
      <Card className="bg-card border border-border text-card-foreground h-full shadow-sm">
        <CardHeader className="pb-2 pt-3 px-4">
          {/* Toggle Buttons */}
          <div className="flex rounded-lg bg-muted p-1 mb-2">
            <button
              onClick={() => handleViewChange("gainers")}
              className={`flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                activeView === "gainers"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ArrowUp className="h-3 w-3 mr-1.5 text-green-500" />
              Top Gainers
            </button>
            <button
              onClick={() => handleViewChange("losers")}
              className={`flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                activeView === "losers"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ArrowDown className="h-3 w-3 mr-1.5 text-red-500" />
              Top Losers
            </button>
          </div>

          {/* Dynamic Title with Pagination Info */}
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-foreground flex items-center">
              {isGainers ? (
                <ArrowUp className="h-4 w-4 mr-2 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-2 text-red-500" />
              )}
              {isGainers ? `Top Gainers` : `Top Losers`}
            </CardTitle>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevPage}
                  disabled={!hasPrevPage}
                  className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
                <span className="text-xs text-muted-foreground px-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={!hasNextPage}
                  className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-4 pt-1 pb-3 text-sm">
          {paginatedData && paginatedData.length > 0 ? (
            <ul className="space-y-1.5">
              {paginatedData.map((item, i) => (
                <li
                  key={`${activeView}-${currentPage}-${i}`}
                  className="flex justify-between items-center py-1.5 border-b border-border last:border-b-0"
                >
                  <div>
                    <span className="font-mono font-semibold text-foreground">
                      <a
                        href={`https://finance.yahoo.com/quote/${item.ticker_symbol}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.ticker_symbol}
                      </a>
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ${item.price ? item.price.toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <div
                    className={`font-mono text-xs font-medium flex items-center ${
                      isGainers
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {isGainers ? (
                      <ArrowUp className="h-3 w-3 mr-0.5" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-0.5" />
                    )}
                    {item.change_percentage || "0%"}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No data available
            </div>
          )}

          {/* Show total count at bottom if there are multiple pages */}
          {totalPages > 1 && (
            <div className="text-center text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, currentData?.length || 0)}{" "}
              of {currentData?.length || 0} items
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
