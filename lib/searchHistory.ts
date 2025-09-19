export interface SearchHistoryItem {
	query: string;
	engine: string;
	timestamp: number;
}

const DB_NAME = "ricerca_db";
const STORE_NAME = "history";
const DB_VERSION = 1;
const MAX_HISTORY_ITEMS = 100;

function waitForTx(tx: IDBTransaction): Promise<void> {
	return new Promise((resolve, reject) => {
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error ?? new Error("transaction error"));
		tx.onabort = () => reject(tx.error ?? new Error("transaction aborted"));
	});
}

function openDb(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined") {
			reject(new Error("No window"));
			return;
		}
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				const store = db.createObjectStore(STORE_NAME, {
					keyPath: "timestamp",
				});
				store.createIndex("timestamp_idx", "timestamp", {
					unique: false,
				});
			}
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () =>
			reject(req.error ?? new Error("indexedDB open error"));
	});
}

export async function saveSearchToHistory(
	query: string,
	engine: string
): Promise<void> {
	if (typeof window === "undefined") return;
	const db = await openDb();
	const tx = db.transaction(STORE_NAME, "readwrite");
	const store = tx.objectStore(STORE_NAME);

	const newItem: SearchHistoryItem = { query, engine, timestamp: Date.now() };
	store.put(newItem);

	// Trim to MAX_HISTORY_ITEMS by deleting oldest beyond limit
	const index = store.index("timestamp_idx");
	const items: SearchHistoryItem[] = [];
	await new Promise<void>((resolve) => {
		const cursorReq = index.openCursor(undefined, "prev"); // newest first
		cursorReq.onsuccess = () => {
			const cursor = cursorReq.result;
			if (cursor && items.length < MAX_HISTORY_ITEMS) {
				items.push(cursor.value as SearchHistoryItem);
				cursor.continue();
			} else if (cursor) {
				// delete remaining older items
				const delCursorReq = index.openCursor(
					cursor.key as IDBValidKey,
					"prev"
				);
				delCursorReq.onsuccess = () => {
					const c = delCursorReq.result;
					if (c) {
						c.delete();
						c.continue();
					} else {
						resolve();
					}
				};
			} else {
				resolve();
			}
		};
		cursorReq.onerror = () => resolve();
	});

	await waitForTx(tx).catch(() => {});
	db.close();
}

export async function getSearchHistory(): Promise<SearchHistoryItem[]> {
	if (typeof window === "undefined") return [];
	const db = await openDb();
	const tx = db.transaction(STORE_NAME, "readonly");
	const store = tx.objectStore(STORE_NAME);
	const index = store.index("timestamp_idx");

	const items: SearchHistoryItem[] = [];
	await new Promise<void>((resolve) => {
		const req = index.openCursor(undefined, "prev"); // newest first
		req.onsuccess = () => {
			const cursor = req.result;
			if (cursor) {
				items.push(cursor.value as SearchHistoryItem);
				cursor.continue();
			} else {
				resolve();
			}
		};
		req.onerror = () => resolve();
	});

	db.close();
	return items;
}

export async function clearSearchHistory(): Promise<void> {
	if (typeof window === "undefined") return;
	const db = await openDb();
	const tx = db.transaction(STORE_NAME, "readwrite");
	tx.objectStore(STORE_NAME).clear();
	await waitForTx(tx).catch(() => {});
	db.close();
}
