import React from "react";
import { MessageCircle } from "lucide-react";

const ShimmerButton = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  href = "",
  onClick,
  icon: Icon,
  target,
  rel,
  ...props
}) => {
  // Variant configurations
  const variants = {
    default: {
      bg: "linear-gradient(to right, #3B82F6, #1E40AF)",
      shimmerColor: "#60A5FA",
      borderColor: "border-black/10",
    },
    gradient: {
      bg: "linear-gradient(to right, #FF5B19, #B12424)",
      shimmerColor: "#FF5B19",
      borderColor: "border-black/10",
    },
    success: {
      bg: "linear-gradient(to right, #10B981, #059669)",
      shimmerColor: "#34D399",
      borderColor: "border-black/10",
    },
    purple: {
      bg: "linear-gradient(to right, #8B5CF6, #7C3AED)",
      shimmerColor: "#A78BFA",
      borderColor: "border-black/10",
    },
    gold: {
      bg: "linear-gradient(to right, #F59E0B, #D97706)",
      shimmerColor: "#FCD34D",
      borderColor: "border-yellow-500/20",
    },
  };

  // Size configurations
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const currentVariant = variants[variant] || variants.default;
  const currentSize = sizes[size] || sizes.md;

  const buttonStyle = {
    "--spread": "90deg",
    "--shimmer-color": currentVariant.shimmerColor,
    "--radius": "10px",
    "--speed": "3s",
    "--cut": "0.1em",
    "--bg": currentVariant.bg,
  };

  // Check if it's an external link
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={buttonStyle}
      className={`group relative z-0 text-white flex cursor-pointer items-center justify-center font-medium gap-2 overflow-hidden whitespace-nowrap border ${currentVariant.borderColor} ${currentSize} -black [background:var(--bg)] [border-radius:var(--radius)] transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"></div>
        </div>
      </div>

      {/* Icon (if provided) */}
      {Icon && <Icon size={18} />}

      {/* Button Content */}
      {children}

      {/* Hover Effects */}
      <div className="insert-0 absolute size-full rounded px-4 py-1.5 text-sm font-medium transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"></div>
      <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"></div>

      {/* Corner Glows */}
      <div
        className="pointer-events-none absolute transition-all duration-300 ease-in-out top-0 right-0 h-4 w-20 rounded-full bg-white/60 blur-[14px] opacity-80 group-hover:opacity-100"
        style={{ transform: "translate(30%,-30%)" }}
      ></div>
      <div
        className="pointer-events-none absolute transition-all duration-300 ease-in-out bottom-0 left-0 h-4 w-20 rounded-full bg-white/60 blur-[14px] opacity-80 group-hover:opacity-100"
        style={{ transform: "translate(-30%,30%)" }}
      ></div>
    </a>
  );
};

export default ShimmerButton;
