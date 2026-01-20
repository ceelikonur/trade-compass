import { useState } from "react";
import { Search, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TradingPairSearchProps {
  onSearch: (pair: string) => void;
  isLoading: boolean;
  queriesLeft: number;
}

const popularPairs = [
  { symbol: "BTCUSDT", exchange: "Binance" },
  { symbol: "ETHUSDT", exchange: "Binance" },
  { symbol: "SOLUSDT", exchange: "Binance" },
  { symbol: "XRPUSDT", exchange: "Binance" },
];

export const TradingPairSearch = ({ onSearch, isLoading, queriesLeft }: TradingPairSearchProps) => {
  const [pair, setPair] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pair.trim()) {
      onSearch(pair.trim().toUpperCase());
    }
  };

  const handleQuickSelect = (symbol: string, exchange: string) => {
    const fullPair = `${symbol}-${exchange}`;
    setPair(fullPair);
    onSearch(fullPair);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card p-2 flex items-center gap-2 gradient-border">
          <div className="flex items-center gap-3 pl-4 flex-1">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter trading pair (e.g., BTCUSDT-Binance)"
              value={pair}
              onChange={(e) => setPair(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 text-lg placeholder:text-muted-foreground/60 h-12"
            />
          </div>
          <Button
            type="submit"
            variant="hero"
            size="lg"
            disabled={isLoading || !pair.trim()}
            className="shrink-0"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing...
              </div>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Get Strategy
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {popularPairs.map((p) => (
          <button
            key={p.symbol}
            onClick={() => handleQuickSelect(p.symbol, p.exchange)}
            className="px-3 py-1.5 text-sm font-mono bg-secondary/50 hover:bg-secondary rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-200 flex items-center gap-1.5"
          >
            <TrendingUp className="w-3 h-3 text-success" />
            {p.symbol}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm">
        <div className={`px-3 py-1 rounded-full font-mono ${queriesLeft > 0 ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
          {queriesLeft} free queries left
        </div>
        {queriesLeft === 0 && (
          <Button variant="link" className="text-primary" size="sm">
            Upgrade now <ArrowRight className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
};
