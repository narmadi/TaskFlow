import { useState } from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Avatar({
  src,
  name,
  size = "md",
  className,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        "overflow-hidden rounded-full bg-[#F0EFFD]",
        "font-semibold text-[#635BEB]",
        sizes[size],
        className
      )}
      role="img"
      aria-label={name}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        initials || "?"
      )}
    </div>
  );
}