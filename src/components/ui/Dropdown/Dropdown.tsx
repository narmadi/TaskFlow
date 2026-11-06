
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
  label: string;
  onSelect?: () => void;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  triggerLabel: string;
  items: DropdownItem[];
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}

export function Dropdown({
  trigger,
  triggerLabel,
  items,
  align = "end",
  sideOffset = 6,
  className,
}: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={triggerLabel}
          className={cn(
            "inline-flex items-center justify-center rounded-lg",
            "outline-none transition-colors",
            "focus-visible:ring-2 focus-visible:ring-primary/30",
            className
          )}
        >
          {trigger}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={sideOffset}
          collisionPadding={8}
          className={cn(
            "z-50 min-w-48 overflow-hidden rounded-xl",
            "border border-gray-100 bg-white p-1.5 shadow-lg",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          {items.map((item, index) => {
            if (item.separator) {
              return (
                <DropdownMenu.Separator
                  key={`separator-${index}`}
                  className="my-1 h-px bg-gray-100"
                />
              );
            }

            return (
              <DropdownMenu.Item
                key={`${item.label}-${index}`}
                disabled={item.disabled}
                onSelect={item.onSelect}
                className={cn(
                  "flex cursor-pointer select-none items-center gap-2.5",
                  "rounded-lg px-3 py-2 text-sm outline-none",
                  "transition-colors",
                  "focus:bg-gray-100",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
                  item.destructive
                    ? "text-red-600 focus:bg-red-50 focus:text-red-700"
                    : "text-gray-700"
                )}
              >
                {item.icon && (
                  <span className="flex size-4 shrink-0 items-center justify-center">
                    {item.icon}
                  </span>
                )}

                <span className="flex-1">{item.label}</span>

                {item.shortcut && (
                  <span className="ml-3 text-xs text-gray-400">
                    {item.shortcut}
                  </span>
                )}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}