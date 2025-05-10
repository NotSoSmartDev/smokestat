// ui.js - UI module for managing the interface
import { formatTimestamp, formatElapsedTime } from './timer.js';

// UI Elements
let smokeButton = null;
let recordsList = null;
let todayCountElement = null;

// Initialize the UI
export const initUI = () => {
  smokeButton = document.getElementById('smoke-button');
  recordsList = document.getElementById('smoke-records');
  todayCountElement = document.getElementById('today-count');
  
  if (!smokeButton || !recordsList || !todayCountElement) {
    console.error('Required UI elements not found');
    return false;
  }
  
  return true;
};

// Update the today's count display
export const updateTodayCount = (count) => {
  if (!todayCountElement) return;
  todayCountElement.textContent = count;
};

// Add animation to the smoking button when clicked
export const animateSmokeButton = () => {
  if (!smokeButton) return;
  
  // Add active class
  smokeButton.classList.add('active');
  
  // Remove active class after animation completes
  setTimeout(() => {
    smokeButton.classList.remove('active');
  }, 200);
};

// Clear the records list
export const clearRecordsList = () => {
  if (!recordsList) return;
  recordsList.innerHTML = '';
};

// Add a record to the UI list
export const addRecordToList = (record, index = 0) => {
  if (!recordsList) return;
  
  const li = document.createElement('li');
  const timeSpan = document.createElement('span');
  timeSpan.className = 'record-time';
  timeSpan.textContent = formatTimestamp(record.timestamp);
  
  const elapsedSpan = document.createElement('span');
  elapsedSpan.className = 'record-elapsed';
  
  // For first item (most recent), show "Just now"
  if (index === 0) {
    elapsedSpan.textContent = '(Just now)';
  } else {
    const previousRecord = recordsList.children[index-1]?.dataset?.timestamp;
    if (previousRecord) {
      const elapsed = parseInt(previousRecord) - record.timestamp;
      elapsedSpan.textContent = `(${formatElapsedTime(elapsed)} after previous)`;
    }
  }
  
  // Store timestamp as a data attribute for calculations
  li.dataset.timestamp = record.timestamp;
  
  li.appendChild(timeSpan);
  li.appendChild(elapsedSpan);
  
  // Insert at the beginning of the list
  if (recordsList.firstChild) {
    recordsList.insertBefore(li, recordsList.firstChild);
  } else {
    recordsList.appendChild(li);
  }
};

// Update the records list with all today's records
export const updateRecordsList = (records) => {
  clearRecordsList();
  
  // Sort records in reverse chronological order
  const sortedRecords = [...records].sort((a, b) => b.timestamp - a.timestamp);
  
  // Add each record to the list
  sortedRecords.forEach((record, index) => {
    addRecordToList(record, index);
  });
};

// Show an alert notification
export const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
};

// Create and handle installation prompt
export const setupInstallPrompt = (deferredPrompt) => {
  const installButton = document.createElement('button');
  installButton.className = 'install-button';
  installButton.innerHTML = '📥';
  installButton.title = 'Install App';
  
  installButton.addEventListener('click', async () => {
    // Hide the button
    installButton.style.display = 'none';
    
    // Show the installation prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Installation outcome: ${outcome}`);
  });
  
  document.body.appendChild(installButton);
  installButton.style.display = 'flex';
};