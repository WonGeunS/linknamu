import { connection } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { profile } from "@/data/profile";

const linkIds = new Set(profile.links.map((link) => link.id));

/** 모든 링크의 클릭 수를 한 번에 반환합니다. 예: { "github": 42, "blog": 3 } */
export async function GET() {
  await connection();
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: [...linkIds] } }).toArray();
    const counts = Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
    return Response.json(counts, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[clicks] 조회 실패", err);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

/** 요청 본문 { id } 에 해당하는 링크의 클릭 수를 1 늘립니다. */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const id = typeof body === "object" && body !== null && "id" in body ? body.id : null;
  if (typeof id !== "string" || !linkIds.has(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }
  try {
    const clicks = await getClicksCollection();
    await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("[clicks] 증가 실패", err);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
