import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "primary" | "outline" | "award" | "rank";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium tracking-wide",
        variant === "default" && "bg-white/10 text-white",
        variant === "primary" && "bg-primary text-white",
        variant === "outline" && "border border-white/40 text-white",
        variant === "award" && "border border-amber-500/60 text-amber-300",
        variant === "rank" && "bg-primary/90 text-white uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
