import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalaxyButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const GalaxyButton = React.forwardRef<HTMLButtonElement, GalaxyButtonProps>(
  ({ className, children, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "galaxy-button relative overflow-hidden rounded-full font-medium transition-all duration-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Size variants
          size === "default" && "px-6 py-3 text-sm",
          size === "sm" && "px-4 py-2 text-xs",
          size === "lg" && "px-8 py-4 text-base",
          // Variant styles
          variant === "primary" && "galaxy-button-primary",
          variant === "secondary" && "galaxy-button-secondary",
          variant === "ghost" && "galaxy-button-ghost",
          className
        )}
        {...props}
      >
        {/* Galaxy background effect */}
        <span className="galaxy-bg" />
        
        {/* Glow orbs */}
        <span className="galaxy-orb galaxy-orb-1" />
        <span className="galaxy-orb galaxy-orb-2" />
        <span className="galaxy-orb galaxy-orb-3" />
        
        {/* Border glow */}
        <span className="galaxy-border" />
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);

GalaxyButton.displayName = "GalaxyButton";

export { GalaxyButton };
