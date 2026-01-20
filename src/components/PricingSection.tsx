import { Check, Zap, Crown, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    description: "Try before you buy",
    price: "$0",
    period: "/forever",
    icon: Zap,
    features: [
      "5 strategy queries",
      "Basic market analysis",
      "Community access",
      "Email support",
    ],
    cta: "Get Started",
    variant: "glass" as const,
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious traders",
    price: "$29",
    period: "/month",
    icon: Crown,
    features: [
      "Unlimited queries",
      "Advanced AI strategies",
      "Copy trading access",
      "Priority support",
      "Custom alerts",
      "API access",
    ],
    cta: "Start Pro Trial",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For trading firms",
    price: "$199",
    period: "/month",
    icon: Building,
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
      "SLA guarantee",
      "Team management",
    ],
    cta: "Contact Sales",
    variant: "glass" as const,
    popular: false,
  },
];

export const PricingSection = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Simple, <span className="gradient-text">Transparent</span> Pricing
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start free, upgrade when you're ready. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.name}
              className={`glass-card p-6 relative transition-all duration-300 hover:scale-[1.02] ${
                plan.popular ? "border-primary/50 glow-primary" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-[hsl(199,89%,48%)] rounded-full text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${plan.popular ? "bg-primary/20" : "bg-secondary"}`}>
                  <Icon className={`w-5 h-5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.variant} className="w-full">
                {plan.cta}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
