
import { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder = "Select an option",
      error,
      helperText,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              [error && errorId, !error && helperText && helperId]
                .filter(Boolean)
                .join(" ") || undefined
            }
            className={cn(
              "w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none transition",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                : "border-gray-200",
              className
            )}
            {...props}
          >
            <option value="">{placeholder}</option>

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

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

Select.displayName = "Select";
