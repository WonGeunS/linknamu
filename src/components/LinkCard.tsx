import type { LinkItem } from "@/data/profile";

type LinkCardProps = LinkItem & {
  count: number;
  onClick: () => void;
};

export default function LinkCard({ title, url, count, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border border-white/70 bg-white/45 px-16 py-4 text-center text-[15px] font-medium shadow-[0_4px_20px_-6px_rgba(160,90,50,0.18)] backdrop-blur-md transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_8px_24px_-6px_rgba(160,90,50,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {title}
      <span
        aria-label={`클릭 ${count}회`}
        className="absolute top-1/2 right-5 -translate-y-1/2 text-xs font-normal text-foreground/45 tabular-nums"
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
