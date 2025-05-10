// sw-register.js - Service worker registration for SmokeStats PWA
import { registerSW } from 'virtual:pwa-register';

// Function to update the service worker on new version
const updateSW = registerSW({
  // When a new service worker is available, you can choose what to do
  onNeedRefresh() {
    // Show a confirmation dialog to the user
    if (confirm('New content available. Reload?')) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
    // Optionally show a notification to the user
    const notification = document.createElement('div');
    notification.className = 'notification info';
    notification.textContent = 'App is ready for offline use';
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  },
});

// Register the service worker when the page loads
window.addEventListener('load', () => {
  // The registration is already handled by the registerSW function above
  console.log('Service worker registration initialized');
});

export { updateSW };