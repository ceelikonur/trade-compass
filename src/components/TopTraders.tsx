import { Crown, Users, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const traders = [
  {
    id: 1,
    name: "CryptoWhale",
    avatar: "🐋",
    winRate: 78,
    totalTrades: 1234,
    followers: 5600,
    pnl: "+234.5%",
    specialty: "BTC/ETH",
  },
  {
    id: 2,
    name: "AlphaHunter",
    avatar: "🎯",
    winRate: 72,
    totalTrades: 890,
    followers: 3200,
    pnl: "+189.2%",
    specialty: "Altcoins",
  },
  {
    id: 3,
    name: "SwingMaster",
    avatar: "🚀",
    winRate: 69,
    totalTrades: 567,
    followers: 2100,
    pnl: "+156.8%",
    specialty: "Swing Trades",
  },
];

export const TopTraders = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 rounded-full mb-4">
          <Crown className="w-4 h-4 text-warning" />
          <span className="text-sm font-medium text-warning">Social Trading</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Follow <span className="gradient-text">Top Traders</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Copy strategies from proven traders. You earn, they earn, we all earn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {traders.map((trader, index) => (
          <div
            key={trader.id}
            className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                  {trader.avatar}
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {trader.name}
                    {index === 0 && <Star className="w-4 h-4 text-warning fill-warning" />}
                  </h3>
                  <p className="text-sm text-muted-foreground">{trader.specialty}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-success">{trader.pnl}</p>
                <p className="text-xs text-muted-foreground">90d PnL</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-success">{trader.winRate}%</p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{trader.totalTrades}</p>
                <p className="text-xs text-muted-foreground">Trades</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{(trader.followers / 1000).toFixed(1)}k</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
            </div>

            <Button variant="glass" className="w-full group-hover:border-primary/50">
              <Users className="w-4 h-4" />
              Follow Trader
              <ChevronRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
