import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
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
      "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:-translate-y-0.5",
    secondary:
      "border border-violet-200 hover:border-violet-300 text-violet-700 bg-white hover:bg-violet-50 hover:-translate-y-0.5",
    ghost: "text-violet-600 hover:text-violet-700",
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
