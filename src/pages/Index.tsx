import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TradingPairSearch } from "@/components/TradingPairSearch";
import { StrategyResult } from "@/components/StrategyResult";
import { TopTraders } from "@/components/TopTraders";
import { PricingSection } from "@/components/PricingSection";
import { toast } from "sonner";

// Mock strategy generation (will be replaced with n8n workflow)
const generateMockStrategy = (pair: string) => {
  const isLong = Math.random() > 0.4;
  const basePrice = pair.includes("BTC") ? 98000 : pair.includes("ETH") ? 3200 : 150;
  const volatility = 0.05;

  return {
    signal: isLong ? "LONG" : "SHORT" as "LONG" | "SHORT",
    confidence: Math.floor(65 + Math.random() * 25),
    entryPrice: basePrice,
    targets: isLong
      ? [
          Math.round(basePrice * (1 + volatility)),
          Math.round(basePrice * (1 + volatility * 2)),
          Math.round(basePrice * (1 + volatility * 3)),
        ]
      : [
          Math.round(basePrice * (1 - volatility)),
          Math.round(basePrice * (1 - volatility * 2)),
          Math.round(basePrice * (1 - volatility * 3)),
        ],
    stopLoss: isLong
      ? Math.round(basePrice * (1 - volatility * 1.5))
      : Math.round(basePrice * (1 + volatility * 1.5)),
    timeframe: "4H",
    reasoning: isLong
      ? `Strong bullish momentum detected on ${pair}. RSI showing oversold conditions with MACD crossover confirmation. Key support levels holding well with increasing volume. Recommended scaling into position at current levels.`
      : `Bearish divergence forming on ${pair}. Price rejected from key resistance with declining volume. Consider short positions with tight stops above recent highs. Watch for potential reversal signals near support.`,
  };
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [queriesLeft, setQueriesLeft] = useState(5);
  const [currentPair, setCurrentPair] = useState("");
  const [strategy, setStrategy] = useState<ReturnType<typeof generateMockStrategy> | null>(null);

  const handleSearch = async (pair: string) => {
    if (queriesLeft <= 0) {
      toast.error("No queries left! Please upgrade to continue.");
      return;
    }

    setIsLoading(true);
    setCurrentPair(pair);
    setStrategy(null);

    // Simulate API call to n8n workflow
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newStrategy = generateMockStrategy(pair);
    setStrategy(newStrategy);
    setQueriesLeft((prev) => prev - 1);
    setIsLoading(false);

    toast.success(`Strategy generated for ${pair}!`, {
      description: `Signal: ${newStrategy.signal} with ${newStrategy.confidence}% confidence`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative container mx-auto px-4">
        <HeroSection />

        <section className="py-8">
          <TradingPairSearch
            onSearch={handleSearch}
            isLoading={isLoading}
            queriesLeft={queriesLeft}
          />
        </section>

        {(strategy || isLoading) && (
          <section className="py-8">
            {isLoading ? (
              <div className="w-full max-w-4xl mx-auto">
                <div className="glass-card p-8 animate-pulse">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-secondary rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-6 w-32 bg-secondary rounded" />
                      <div className="h-4 w-24 bg-secondary rounded" />
                    </div>
                  </div>
                  <div className="h-4 w-full bg-secondary rounded mb-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 bg-secondary rounded-xl" />
                    <div className="h-20 bg-secondary rounded-xl" />
                    <div className="h-20 bg-secondary rounded-xl" />
                  </div>
                </div>
              </div>
            ) : (
              <StrategyResult pair={currentPair} strategy={strategy} />
            )}
          </section>
        )}

        <TopTraders />
        <PricingSection />

        {/* Footer */}
        <footer className="py-12 border-t border-border/50 mt-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[hsl(199,89%,48%)] flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="font-semibold">TradeSignal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TradeSignal. Not financial advice. Trade responsibly.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                API Docs
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
