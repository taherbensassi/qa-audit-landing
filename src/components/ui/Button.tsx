import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "primaryDark" | "secondaryDark";
  size?: "default" | "lg";
  children: React.ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = "primary",
  size = "default",
  children,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-300 group";
  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants = {
    primary:
      "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5",
    secondary:
      "border border-red-200 hover:border-red-300 text-red-700 bg-white hover:bg-red-50 hover:-translate-y-0.5",
    ghost: "text-red-600 hover:text-red-700",
    primaryDark:
      "bg-white text-zinc-900 hover:bg-zinc-100 shadow-lg shadow-white/10 hover:-translate-y-0.5 font-semibold",
    secondaryDark:
      "border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white bg-transparent hover:-translate-y-0.5",
  };

  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
