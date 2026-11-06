import type { ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#635BEB] text-white hover:bg-[#5149D6] focus-visible:ring-[#635BEB]",

  secondary:
    "bg-[#F0EFFD] text-[#635BEB] hover:bg-[#E5E3FC]",

  outline:
    "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",

  ghost:
    "text-gray-600 hover:bg-gray-100",

  destructive:
    "bg-red-500 text-white hover:bg-red-600",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg",
        "font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      )}

      {children}
    </button>
  );
}