
import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const descriptionId = `${checkboxId}-description`;
    const errorId = `${checkboxId}-error`;

    return (
      <div className="space-y-1">
        <div className="flex items-start gap-2.5">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              [description && descriptionId, error && errorId]
                .filter(Boolean)
                .join(" ") || undefined
            }
            className={cn(
              "mt-0.5 size-4 shrink-0 cursor-pointer rounded border-gray-300",
              "accent-primary focus:ring-2 focus:ring-primary/30",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />

          <div className="min-w-0">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  "cursor-pointer text-sm font-medium text-gray-700",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </label>
            )}

            {description && (
              <p
                id={descriptionId}
                className="mt-0.5 text-xs text-gray-500"
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {error && (
          <p id={errorId} className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
