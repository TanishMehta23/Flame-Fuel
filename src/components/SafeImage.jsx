import React, { useState } from "react";
import { Flame } from "lucide-react";

/**
 * Robust image component with fallback placeholder in case of network or loading failure.
 * Guarantees zero broken image icons across the website.
 */
export default function SafeImage({
  src,
  alt = "Flame & Fuel Food Photography",
  className = "",
  loading = "lazy",
  width,
  height,
  style = {},
  fallbackText = "FLAME & FUEL",
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#151512] border border-[rgba(244,240,233,0.1)] text-[#a5a198] text-center p-4 ${className}`}
        style={{ ...style, aspectRatio: width && height ? `${width}/${height}` : undefined }}
      >
        <Flame size={24} className="text-[#f45b25] mb-2 animate-pulse" />
        <span className="font-['Space_Grotesk'] font-bold text-[12px] tracking-wider text-[#ded9cf] uppercase">
          {fallbackText}
        </span>
        <span className="text-[9px] font-mono tracking-widest text-[#736f66] uppercase mt-1">
          IMAGE COMING HOT OFF GRILL
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      onError={() => setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-90"}`}
      style={style}
      {...props}
    />
  );
}

