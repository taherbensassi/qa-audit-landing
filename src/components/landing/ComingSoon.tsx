import { Button } from "@/components/ui/Button";
import { content } from "@/lib/content";

const { comingSoon } = content;

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center bg-white">
      <p className="mb-3 font-mono text-xs tracking-widest uppercase text-red-600">
        {title}
      </p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
        {comingSoon.headline}
      </h1>
      <p className="mb-8 max-w-md text-gray-500">{comingSoon.description}</p>
      <Button href={comingSoon.cta.href} variant="secondary">
        {comingSoon.cta.label}
      </Button>
    </div>
  );
}
