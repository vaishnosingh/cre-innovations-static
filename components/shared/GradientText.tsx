import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "brand" | "warm" | "gold" | "android" | "ios" | "design";
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  animated?: boolean;
  shimmer?: boolean;
}

const gradients = {
  brand: "from-brand-primary to-brand-secondary",
  warm: "from-brand-gold to-brand-accent",
  gold: "from-brand-gold via-brand-accent to-brand-primary",
  android: "from-brand-emerald to-brand-primary",
  ios: "from-[#007AFF] to-brand-secondary",
  design: "from-brand-accent to-brand-gold",
};

export default function GradientText({
  children,
  className,
  variant = "brand",
  as: Tag = "span",
  animated = false,
  shimmer = false,
}: GradientTextProps) {
  
  if (animated) {
    return (
      <Tag className={cn("gradient-text", className)}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent inline-block",
        gradients[variant],
        shimmer && "animate-text-shimmer bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
