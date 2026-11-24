"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? (res.json() as Promise<Counts>) : Promise.reject(res.status)))
      // 서버 값을 받기 전에 누른 클릭은 이미 화면에 반영됐으므로 더 큰 값을 유지합니다.
      .then((data) =>
        setCounts((prev) => {
          const next = { ...data };
          for (const [id, n] of Object.entries(prev)) next[id] = Math.max(next[id] ?? 0, n);
          return next;
        }),
      )
      .catch((err) => {
        if (!controller.signal.aborted) console.error("클릭 수를 불러오지 못했습니다.", err);
      });
    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    // keepalive: 페이지를 떠나는 중이어도 요청이 끝까지 전송되도록 합니다.
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch((err) => console.error("클릭 수를 저장하지 못했습니다.", err));
  }

  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard {...link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
