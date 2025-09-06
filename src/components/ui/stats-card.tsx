import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statsCardVariants = cva(
  "relative overflow-hidden rounded-xl border border-card-border bg-gradient-card p-6 shadow-card transition-all hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-gradient-card",
        primary: "bg-gradient-primary text-primary-foreground",
        secondary: "bg-gradient-secondary",
        accent: "bg-gradient-accent", 
        stats: "bg-gradient-stats",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface StatsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsCardVariants> {
  title?: string
  value?: string | number
  description?: string
  icon?: React.ReactNode
  actionLabel?: string
  actionHref?: string
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, variant, size, title, value, description, icon, actionLabel, actionHref, children, ...props }, ref) => {
    return (
      <div
        className={cn(statsCardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                  {icon}
                </div>
              )}
              <div>
                {title && (
                  <h3 className="text-sm font-medium text-current/80 mb-1">
                    {title}
                  </h3>
                )}
                {value && (
                  <div className="text-2xl font-bold text-current">
                    {value}
                  </div>
                )}
              </div>
            </div>
            {actionLabel && actionHref && (
              <a 
                href={actionHref}
                className="text-sm text-current/70 hover:text-current transition-colors"
              >
                {actionLabel}
              </a>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-current/70 mb-4">
              {description}
            </p>
          )}

          {/* Custom content */}
          {children}
        </div>
      </div>
    )
  }
)
StatsCard.displayName = "StatsCard"

export { StatsCard, statsCardVariants }