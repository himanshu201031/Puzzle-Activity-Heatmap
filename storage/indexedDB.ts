import { openDB, IDBPDatabase } from 'idb';

export interface DailyActivity {
  date: string;
  solved: boolean;
  score: number;
  timeTaken: number;
  difficulty: number;
  synced: boolean;
}

const DATABASE_NAME = 'puzzleDB';
const STORE_NAME = 'activity';

export async function initDB(): Promise<IDBPDatabase> {
  return openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'date' });
      }
    },
  });
}

export async function saveActivity(activity: DailyActivity) {
  const db = await initDB();
  await db.put(STORE_NAME, activity);
}

export async function getActivity(date: string): Promise<DailyActivity | undefined> {
  const db = await initDB();
  return db.get(STORE_NAME, date);
}

export async function getAllActivity(): Promise<DailyActivity[]> {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}
