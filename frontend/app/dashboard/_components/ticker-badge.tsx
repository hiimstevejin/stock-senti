import { Badge } from "@/components/ui/badge";

interface TickerBadgeProps {
  symbol: string;
}

export function TickerBadge({ symbol }: TickerBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="border-neutral-700 bg-neutral-800 text-neutral-300 text-xs font-mono hover:bg-neutral-700 cursor-pointer"
    >
      {symbol}
    </Badge>
  );
}
