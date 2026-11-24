import "server-only";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

/** 개발 중 HMR로 모듈이 다시 로드돼도 연결을 하나만 유지합니다. */
export function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인).");
  }
  globalForMongo._mongoClientPromise ??= new MongoClient(uri).connect().catch((err) => {
    // 실패한 연결을 캐시하지 않도록 비워 다음 요청에서 다시 시도합니다.
    globalForMongo._mongoClientPromise = undefined;
    throw err;
  });
  return globalForMongo._mongoClientPromise;
}

export type ClickDoc = { _id: string; count: number };

export async function getClicksCollection() {
  const client = await getMongoClient();
  return client.db("linknamu").collection<ClickDoc>("clicks");
}
