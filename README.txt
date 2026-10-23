Outbound Sales Co-Pilot - PWA package
1. Upload ALL files to the root of an HTTPS site (Netlify, Vercel, Cloudflare Pages, GitHub Pages, your own host).
2. Open the site: Chrome/Edge show an Install button; iOS Safari: Share > Add to Home Screen.
3. Service workers and install require HTTPS (localhost also works for testing: python3 -m http.server).
4. To ship an update, change the cache name V in sw.js (e.g. copilot-v2).
5. Scripts, tiers and data live in each browser's localStorage and do not sync between devices.
6. robots.txt blocks search indexing; remove it if you want the page indexed.
7. v2: split into css/ and js/, sticky HUD, 3-column cockpit. Keys: Space timer, D dial, C connect, 1-6 scripts.
8. .well-known/assetlinks.json has placeholders; fill in package name + SHA-256 before using a TWA.
9. v3: Prompt Builder removed; cockpit is tab 1; pipeline + email templates added; KPI connect fix. Cache copilot-v3.
