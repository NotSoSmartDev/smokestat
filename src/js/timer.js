// timer.js - Timer module for tracking time since last cigarette
let timerInterval = null;
let timerElement = null;
let lastTimestamp = null;

// Format milliseconds to a readable time string
export const formatElapsedTime = (ms) => {
  if (!ms) return '--';
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

// Initialize the timer
export const initTimer = (elementId) => {
  timerElement = document.getElementById(elementId);
  if (!timerElement) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }
  
  updateTimerDisplay();
};

// Update the timer with a new timestamp
export const updateTimer = (timestamp) => {
  lastTimestamp = timestamp;
  
  // Clear any existing interval
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  // Update immediately
  updateTimerDisplay();
  
  // Set up interval to update every second
  timerInterval = setInterval(updateTimerDisplay, 1000);
};

// Update the timer display
const updateTimerDisplay = () => {
  if (!timerElement) return;
  
  if (!lastTimestamp) {
    timerElement.textContent = 'No records yet';
    return;
  }
  
  const now = Date.now();
  const elapsed = now - lastTimestamp;
  timerElement.textContent = formatElapsedTime(elapsed);
};

// Format a timestamp to a readable time string (for records list)
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  
  // For today's records, we only need the time
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
};