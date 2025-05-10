#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if the build was successful
if [ $? -ne 0 ]; then
    echo "Build failed, aborting deployment."
    exit 1
fi

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npx gh-pages -d dist

# Check if deployment was successful
if [ $? -ne 0 ]; then
    echo "Deployment failed. Please check your settings and try again."
    exit 1
fi

echo "Deployment complete! Your app should be available at the URL specified in your package.json's homepage field."
echo "It may take a few minutes for the changes to propagate."