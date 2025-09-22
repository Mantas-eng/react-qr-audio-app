# QR Audio/Video Next.js Starter

Files:
- `pages/index.jsx` — desktop grid of records (QRs) and mobile scan button
- `pages/scanner.jsx` — camera QR scanner (mobile)
- `pages/record/[id].jsx` — player page (audio/video)
- `components/RecordCard.jsx` — card with QR
- `components/Player.jsx` — simple player component
- `data/records.js` — your records list (R2 links)

Install:
```bash
npm install
npm run dev
```

Notes:
- This is a minimal starter using `react-qr-reader` for camera scanning on mobile.
- Replace `data/records.js` with your real links (R2).
