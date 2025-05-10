const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Log with colors
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Execute command and return stdout
function exec(command) {
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    log(`Error executing command: ${command}`, colors.red);
    log(error.message, colors.red);
    process.exit(1);
  }
}

// Main deploy function
function deploy() {
  log('Starting deployment to GitHub Pages...', colors.bright + colors.cyan);
  
  // Step 1: Build the project
  log('\n📦 Building the project...', colors.yellow);
  exec('npm run build');
  
  // Step 2: Make sure the dist directory exists
  if (!fs.existsSync('dist')) {
    log('Dist directory not found! Build may have failed.', colors.red);
    process.exit(1);
  }
  
  // Step 3: Deploy to GitHub Pages
  log('\n🚀 Deploying to GitHub Pages...', colors.yellow);
  exec('npx gh-pages -d dist');
  
  // Step 4: Success message
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const homepage = packageJson.homepage || '(homepage not set in package.json)';
  
  log('\n✅ Deployment complete!', colors.bright + colors.green);
  log(`Your app should be available at: ${homepage}`, colors.cyan);
  log('Note: It may take a few minutes for the changes to propagate.', colors.yellow);
}

// Run the deploy function
deploy();