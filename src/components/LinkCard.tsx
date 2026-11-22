import type { LinkItem } from "@/data/profile";

export default function LinkCard({ title, url }: LinkItem) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-xl border-2 border-foreground/80 px-5 py-4 text-center font-medium transition hover:bg-foreground hover:text-background active:scale-[0.98]"
    >
      {title}
    </a>
  );
}
