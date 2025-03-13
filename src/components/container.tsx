import * as React from "react";
import { cn } from "@/lib/utils";

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-4 md:px-20 lg:px-40",
      className
    )}
    {...props}
  />
))
Container.displayName = "Container";

export { Container }
