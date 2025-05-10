// db.js - Database operations module for SmokeStats
const DB_NAME = 'smokeStatsDB';
const DB_VERSION = 1;
const STORE_NAME = 'smokeRecords';

// Utility function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const d = date || new Date();
  return d.toISOString().split('T')[0];
};

// Utility function to get today's date in YYYY-MM-DD format
const getTodayDate = () => formatDate(new Date());

// Initialize the database
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
      reject('Could not open database');
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      console.log('Database opened successfully');
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create object store with auto-incrementing key
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        
        // Create indexes for faster queries
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('date', 'date', { unique: false });
        
        console.log('Object store created');
      }
    };
  });
};

// Add a new smoking record
export const addSmokeRecord = async () => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const record = {
      timestamp: Date.now(),
      date: getTodayDate(),
    };
    
    const request = store.add(record);
    
    request.onsuccess = () => {
      console.log('Record added successfully');
      resolve(record);
    };
    
    request.onerror = (event) => {
      console.error('Error adding record:', event.target.error);
      reject('Failed to add record');
    };
  });
};

// Get all records for today
export const getTodayRecords = async () => {
  const db = await initDB();
  const today = getTodayDate();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('date');
    const range = IDBKeyRange.only(today);
    
    const request = index.getAll(range);
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = (event) => {
      console.error('Error getting today\'s records:', event.target.error);
      reject('Failed to get today\'s records');
    };
  });
};

// Get the count of cigarettes smoked today
export const getTodayCount = async () => {
  try {
    const records = await getTodayRecords();
    return records.length;
  } catch (error) {
    console.error('Error getting today\'s count:', error);
    return 0;
  }
};

// Get the timestamp of the last smoking record
export const getLastSmokeTimestamp = async () => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');
    
    // Open a cursor to the last (latest timestamp) record
    const request = index.openCursor(null, 'prev');
    
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        // Return the timestamp of the first record (which is the latest)
        resolve(cursor.value.timestamp);
      } else {
        // No records found
        resolve(null);
      }
    };
    
    request.onerror = (event) => {
      console.error('Error getting last smoke timestamp:', event.target.error);
      reject('Failed to get last smoke timestamp');
    };
  });
};

// Get all records (for potential future features like statistics)
export const getAllRecords = async () => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = (event) => {
      console.error('Error getting all records:', event.target.error);
      reject('Failed to get all records');
    };
  });
};

// Clear all data (for potential reset feature)
export const clearAllData = async () => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.clear();
    
    request.onsuccess = () => {
      console.log('All records cleared successfully');
      resolve();
    };
    
    request.onerror = (event) => {
      console.error('Error clearing records:', event.target.error);
      reject('Failed to clear records');
    };
  });
};