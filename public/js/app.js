// app.js - Main application module for SmokeStats PWA
import * as db from './db.js';
import * as ui from './ui.js';
import * as timer from './timer.js';

// Global state
let deferredPrompt = null;

// Initialize the application
const initApp = async () => {
  console.log('Initializing SmokeStats app');
  
  // Initialize the UI
  if (!ui.initUI()) {
    console.error('Failed to initialize UI');
    return;
  }
  
  // Initialize the database
  try {
    await db.initDB();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    ui.showNotification('Failed to initialize the app, please try again.', 'error');
    return;
  }
  
  // Initialize the timer
  timer.initTimer('last-smoke-timer');
  
  // Load today's records
  await loadTodayData();
  
  // Set up event listeners
  setupEventListeners();
  
  console.log('App initialization complete');
};

// Load today's data
const loadTodayData = async () => {
  try {
    // Get today's records
    const records = await db.getTodayRecords();
    
    // Update the counter
    ui.updateTodayCount(records.length);
    
    // Update the records list
    ui.updateRecordsList(records);
    
    // Update the timer if there are records
    if (records.length > 0) {
      // Sort records to get the latest one
      const latestRecord = [...records].sort((a, b) => b.timestamp - a.timestamp)[0];
      timer.updateTimer(latestRecord.timestamp);
    }
  } catch (error) {
    console.error('Error loading today\'s data:', error);
    ui.showNotification('Failed to load today\'s data.', 'error');
  }
};

// Set up event listeners
const setupEventListeners = () => {
  // Smoke button click
  const smokeButton = document.getElementById('smoke-button');
  smokeButton.addEventListener('click', async () => {
    try {
      // Animate the button
      ui.animateSmokeButton();
      
      // Add a new record
      const record = await db.addSmokeRecord();
      
      // Update the timer
      timer.updateTimer(record.timestamp);
      
      // Update the counter
      const count = await db.getTodayCount();
      ui.updateTodayCount(count);
      
      // Add the record to the list
      ui.addRecordToList(record, 0);
      
    } catch (error) {
      console.error('Error recording smoke:', error);
      ui.showNotification('Failed to record your smoking.', 'error');
    }
  });
  
  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default browser install prompt
    e.preventDefault();
    
    // Save the event to trigger it later
    deferredPrompt = e;
    
    // Show the install button
    ui.setupInstallPrompt(deferredPrompt);
  });
};

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);