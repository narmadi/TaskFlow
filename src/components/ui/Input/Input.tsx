import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={cn(
            "h-10 w-full rounded-lg border px-3 text-sm",
            "border-gray-200 bg-white text-gray-900",
            "placeholder:text-gray-400",
            "focus:border-[#635BEB] focus:outline-none",
            "focus:ring-2 focus:ring-[#635BEB]/10",
            "disabled:cursor-not-allowed disabled:bg-gray-100",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-red-500"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-xs text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";