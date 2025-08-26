const DB_NAME = "UserGoalsDB";
const DB_VERSION = 1;
const STORE_CHALLENGES = "challenges";
const STORE_PLAN = "actionPlans";

let db;

function openDB(callback) {
  const request = indexedDB.open(DB_NAME, DB_VERSION);

  request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains(STORE_CHALLENGES))
      db.createObjectStore(STORE_CHALLENGES, { keyPath: "id", autoIncrement: true });
    if (!db.objectStoreNames.contains(STORE_PLAN))
      db.createObjectStore(STORE_PLAN, { keyPath: "id", autoIncrement: true });
    console.log("✅ IndexedDB upgrade complete");
  };

  request.onsuccess = (e) => {
    db = e.target.result;
    console.log("✅ IndexedDB ready");
    if (callback) callback();
  };

  request.onerror = (e) => console.error("❌ DB error", e);
}

// Save challenges (array)
export function saveChallenges(challenges) {
  openDB(() => {
    const tx = db.transaction(STORE_CHALLENGES, "readwrite");
    const store = tx.objectStore(STORE_CHALLENGES);
    store.clear().onsuccess = () => {
      challenges.forEach(ch => store.add({ value: ch }));
    };
  });
}

// Load all challenges
export function loadChallenges(callback) {
  openDB(() => {
    const tx = db.transaction(STORE_CHALLENGES, "readonly");
    const store = tx.objectStore(STORE_CHALLENGES);
    const result = [];
    store.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        result.push(cursor.value.value);
        cursor.continue();
      } else {
        callback(result);
      }
    };
  });
}

// Save plan
export function savePlan(plan) {
  openDB(() => {
    const tx = db.transaction(STORE_PLAN, "readwrite");
    const store = tx.objectStore(STORE_PLAN);
    store.clear().onsuccess = () => {
      store.add({ value: plan });
    };
  });
}

// Load plan
export function loadPlan(callback) {
  openDB(() => {
    const tx = db.transaction(STORE_PLAN, "readonly");
    const store = tx.objectStore(STORE_PLAN);
    store.getAll().onsuccess = (e) => {
      const all = e.target.result;
      callback(all.length ? all[0].value : null);
    };
  });
}
