# GitHub Pages Deployment Checklist for SmokeStats PWA

## Before Deployment

- [ ] Update the `homepage` field in `package.json` with your GitHub username:
  ```
  "homepage": "https://yourusername.github.io/smokestat"
  ```

- [ ] Ensure all asset paths use relative references (starting with `./`) rather than absolute paths (starting with `/`)

- [ ] Check that the Vite config has the correct base path:
  ```js
  base: process.env.NODE_ENV === 'production' ? '/smokestat/' : '/',
  ```

- [ ] Verify all dependencies are installed:
  ```
  npm install
  ```

## Deployment Process

- [ ] Push your code to GitHub:
  ```
  git add .
  git commit -m "Ready for GitHub Pages deployment"
  git push origin main
  ```

- [ ] Deploy using one of these methods:

  **Option 1: Direct CLI Deployment**
  ```
  npm run deploy:pages
  ```

  **Option 2: GitHub Actions**
  - Ensure GitHub Actions is enabled in your repository
  - Push changes to trigger the workflow
  - Check Actions tab for deployment status

## Post-Deployment Checks

- [ ] Visit your GitHub Pages URL: `https://yourusername.github.io/smokestat/`

- [ ] Verify the app loads without any console errors (F12 to check console)

- [ ] Test PWA features:
  - [ ] Try installing the app to your home screen
  - [ ] Test offline functionality
  - [ ] Check that all assets load correctly

- [ ] Test the app on multiple devices:
  - [ ] Mobile phone
  - [ ] Tablet
  - [ ] Desktop

## Troubleshooting Common Issues

- **Blank Page / 404 Error**:
  - Check the browser console for errors
  - Verify the base path in vite.config.js matches your repository name
  - Ensure GitHub Pages is set to deploy from the gh-pages branch

- **Assets Not Loading**:
  - Check all paths in HTML, CSS, and JavaScript files
  - Make sure paths start with ./ rather than /

- **Service Worker Issues**:
  - Make sure manifest.json has correct start_url and scope
  - Check for console errors related to service worker registration

- **PWA Not Installing**:
  - Verify that all manifest.json requirements are met
  - Ensure HTTPS is being used (GitHub Pages provides this)
  - Check console for any installability errors

## References

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite PWA Plugin Docs](https://vite-pwa-org.netlify.app/)
- [Web App Manifest MDN Docs](https://developer.mozilla.org/en-US/docs/Web/Manifest)