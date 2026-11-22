import type { LinkItem } from "@/data/profile";

export default function LinkCard({ title, url }: LinkItem) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-center text-[15px] font-medium shadow-[0_4px_20px_-6px_rgba(160,90,50,0.18)] backdrop-blur-md transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_8px_24px_-6px_rgba(160,90,50,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {title}
    </a>
  );
}
