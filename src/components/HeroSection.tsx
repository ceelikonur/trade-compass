import { Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="text-center space-y-6 pt-24 pb-12">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full animate-fade-in">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">AI-Powered Trading Strategies</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
        Get <span className="gradient-text">Winning Signals</span>
        <br />
        in Seconds
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
        Enter any trading pair, get AI-analyzed strategies with entry points, 
        targets, and stop losses. Or follow top traders and copy their success.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold">
            <TrendingUp className="w-6 h-6 text-success" />
            72%
          </div>
          <p className="text-sm text-muted-foreground">Avg Win Rate</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold">
            <Zap className="w-6 h-6 text-primary" />
            &lt;3s
          </div>
          <p className="text-sm text-muted-foreground">Analysis Time</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold">
            <Shield className="w-6 h-6 text-warning" />
            10K+
          </div>
          <p className="text-sm text-muted-foreground">Active Traders</p>
        </div>
      </div>
    </div>
  );
};
