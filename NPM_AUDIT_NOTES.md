# NPM Audit Notes

## Summary
After running `npm install` and `npm audit fix`, the following vulnerabilities remain:

- **18 moderate severity vulnerabilities** related to webpack-dev-server (used by Docusaurus core)
- These vulnerabilities affect development environments only
- No automatic fix is available as they're in Docusaurus's dependencies

## Details
The webpack-dev-server vulnerabilities (GHSA-9jgg-88mc-972h and GHSA-4v9v-hfq4-rm2v) could potentially allow source code theft if a developer visits a malicious website while running the dev server.

## Recommendations
1. These are moderate severity and only affect development
2. Keep Docusaurus updated to the latest version (currently using 3.8.1)
3. Monitor Docusaurus releases for fixes to these upstream dependencies
4. Be cautious about visiting unknown websites while running the development server

## Actions Taken
- Ran `npm audit fix` which fixed 2 low severity vulnerabilities
- All packages are up to date with their latest versions
- The remaining vulnerabilities require upstream fixes from the Docusaurus team