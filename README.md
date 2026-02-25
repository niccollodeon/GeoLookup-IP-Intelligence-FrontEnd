# GeoLookup — Frontend

React + Vite web app for the GeoLookup app, hosted on **Vercel**.

---

## 📁 Structure

```
frontend-react/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              ← React entry point
    ├── App.jsx               ← Auth routing (login ↔ home)
    ├── pages/
    │   ├── LoginPage.jsx     ← Login form + API call
    │   └── Homepage.jsx      ← Home screen logic
    ├── components/
    │   ├── Header.jsx        ← Top navigation bar
    │   ├── SearchBar.jsx     ← IP input + lookup button
    │   ├── GeoCard.jsx       ← Geo info display + loading skeleton
    │   ├── GeoMap.jsx        ← Leaflet interactive map with pin
    │   └── HistoryPanel.jsx  ← Search history list + checkboxes
    ├── utils/
    │   ├── api.js            ← All fetch calls (login, geo lookup)
    │   ├── storage.js        ← localStorage helpers
    │   └── validate.js       ← IP validation + timeAgo formatter
    └── styles/
        ├── global.css        ← CSS variables, resets, shared utilities
        ├── login.css
        ├── home.css
        ├── header.css
        ├── searchbar.css
        ├── geocard.css
        ├── geomap.css
        └── history.css
```

---

## 🚀 Local Development

### Install and run

```bash
npm install
npm run dev
```

Frontend runs at **http://localhost:3000**

> Make sure the backend API is running at `http://localhost:8080` before trying to log in.

---

## 🌐 Deployment (Vercel)

1. Push this `frontend-react/` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your repo
4. Under **Settings → Environment Variables**, add:

| Key | Value |
|-----|-------|
| `VITE_API_BASE` | `https://geolookup-ip-intelligence-backend-production.up.railway.app/api` |

5. Click **Deploy** — done! 🎉

> Every push to GitHub triggers an automatic redeploy.

---

## ✅ Features

### Login Screen
- [x] Email + password form with validation
- [x] Credentials validated against backend API
- [x] JWT token stored in localStorage
- [x] Redirect to Home after successful login

### Home Screen
- [x] Displays IP & Geolocation of the logged-in user on load
- [x] Search any IP address for geo info
- [x] Input validation — shows error for invalid IPs
- [x] Clear search — reverts display to user's own IP
- [x] Search history list (persisted in localStorage)
- [x] Click a history item to re-display its geo info
- [x] Checkboxes to multi-select and delete history entries
- [x] Interactive map with animated pin (Leaflet.js + CartoDB dark tiles)

### Auth Flow
- [x] Auto-redirect to Login if not authenticated
- [x] Auto-redirect to Home if valid JWT exists
- [x] Logout clears token and returns to Login

---

## 🛠 Tech Stack

- React 18 + Vite
- Leaflet.js — interactive map
- CartoDB dark tiles — dark-themed map tiles
- Google Fonts (Syne + Space Mono)
- `ipinfo.io` — IP geolocation API
