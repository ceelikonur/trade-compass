import { TrendingUp, TrendingDown, Clock, Target, Shield, Zap, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StrategyResultProps {
  pair: string;
  strategy: {
    signal: "LONG" | "SHORT" | "HOLD";
    confidence: number;
    entryPrice: number;
    targets: number[];
    stopLoss: number;
    timeframe: string;
    reasoning: string;
  } | null;
}

export const StrategyResult = ({ pair, strategy }: StrategyResultProps) => {
  if (!strategy) return null;

  const isLong = strategy.signal === "LONG";
  const isShort = strategy.signal === "SHORT";
  const signalColor = isLong ? "text-success" : isShort ? "text-destructive" : "text-warning";
  const signalBg = isLong ? "bg-success/10" : isShort ? "bg-destructive/10" : "bg-warning/10";
  const glowClass = isLong ? "glow-success" : isShort ? "glow-destructive" : "";

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className={`glass-card p-6 md:p-8 space-y-6 ${glowClass}`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${signalBg}`}>
              {isLong ? (
                <TrendingUp className={`w-8 h-8 ${signalColor}`} />
              ) : isShort ? (
                <TrendingDown className={`w-8 h-8 ${signalColor}`} />
              ) : (
                <BarChart3 className="w-8 h-8 text-warning" />
              )}
            </div>
            <div>
              <h3 className="font-mono text-xl font-semibold">{pair}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-2xl font-bold ${signalColor}`}>
                  {strategy.signal}
                </span>
                <span className="text-sm text-muted-foreground">
                  {strategy.confidence}% confidence
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Timeframe: {strategy.timeframe}</span>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Signal Strength</span>
            <span className={signalColor}>{strategy.confidence}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isLong ? "bg-success" : isShort ? "bg-destructive" : "bg-warning"
              }`}
              style={{ width: `${strategy.confidence}%` }}
            />
          </div>
        </div>

        {/* Trade Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary/50 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              Entry Price
            </div>
            <p className="font-mono text-xl font-semibold">
              ${strategy.entryPrice.toLocaleString()}
            </p>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-success" />
              Take Profit Targets
            </div>
            <div className="flex flex-wrap gap-2">
              {strategy.targets.map((target, i) => (
                <span key={i} className="font-mono text-sm bg-success/20 text-success px-2 py-1 rounded">
                  TP{i + 1}: ${target.toLocaleString()}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-destructive" />
              Stop Loss
            </div>
            <p className="font-mono text-xl font-semibold text-destructive">
              ${strategy.stopLoss.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Reasoning */}
        <div className="bg-secondary/30 rounded-xl p-4 space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Analysis</h4>
          <p className="text-sm leading-relaxed">{strategy.reasoning}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="hero" className="flex-1">
            <ArrowUpRight className="w-4 h-4" />
            Execute Trade
          </Button>
          <Button variant="glass" className="flex-1">
            <ArrowDownRight className="w-4 h-4" />
            Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  );
};
