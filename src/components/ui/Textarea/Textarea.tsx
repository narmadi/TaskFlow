
import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            [error && errorId, !error && helperText && helperId]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900",
            "placeholder:text-gray-400 outline-none transition",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
            "resize-y",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-200",
            className
          )}
          {...props}
        />

        {error && (
          <p id={errorId} className="text-xs text-red-500">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
