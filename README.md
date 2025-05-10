# SmokeStats - Cigarette Tracking PWA

A Progressive Web Application (PWA) to track your daily cigarette consumption.

## Features

- Simple one-button interface to record each cigarette
- Today's cigarette count displayed prominently
- Timer showing elapsed time since your last cigarette
- Chronological record of today's smoking activity
- Works offline
- Installable on your device

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

### Installation

1. Clone this repository
2. Install dependencies:

```
cd smokestat
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open your browser at `http://localhost:5173`

### Building for Production

```
npm run build
```

This will create optimized files in the `dist` directory.

### Preview Production Build

```
npm run preview
```

This will serve the production build locally for testing.

### Deploy to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
   ```json
   "homepage": "https://yourusername.github.io/smokestat"
   ```

2. Install the GitHub Pages deployment package:
   ```
   npm install --save-dev gh-pages
   ```

3. Deploy your app:
   ```
   npm run deploy
   ```

This will build your app and publish it to the `gh-pages` branch of your repository.

## Usage

1. Press the "I SMOKED" button each time you smoke a cigarette
2. View your daily count at the top of the screen
3. Track how long it's been since your last cigarette
4. Review your smoking times for the day in the records section

## PWA Installation

You can install this app on your device:

1. On desktop: Look for the install icon in your browser's address bar
2. On mobile: Tap "Add to Home screen" in your browser menu

## Technical Details

- Built with HTML, CSS, and JavaScript
- Uses IndexedDB for offline data storage
- Built with Vite for fast development and optimized production builds
- Uses vite-plugin-pwa for Progressive Web App capabilities
- Responsive design for all device sizes

## Project Structure

```
smokestat/
├── public/           # Static assets and entry HTML
│   ├── index.html    # Main HTML file
│   ├── css/          # CSS styles
│   ├── js/           # JavaScript modules
│   └── icons/        # App icons
├── vite.config.js    # Vite configuration
├── package.json      # Project dependencies
└── dist/             # Production build (generated)
```

## GitHub Pages Deployment Guide

### First-time Setup

1. Create a GitHub repository named `smokestat`
2. Initialize Git in your project folder:
   ```
   cd smokestat
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Connect to your GitHub repository:
   ```
   git remote add origin https://github.com/yourusername/smokestat.git
   git push -u origin main
   ```

4. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

5. Configure GitHub Pages in your repository settings:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Set the source to the `gh-pages` branch
   - Your site will be published at `https://yourusername.github.io/smokestat`

### Subsequent Deployments

After making changes to your app, simply run:
```
npm run deploy
```

This will build your app and push the changes to the `gh-pages` branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.