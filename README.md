# Irrigation Monitor – Howe Family Farms
## How to install on iPhone and Android

This is a Progressive Web App (PWA). It runs in any mobile browser and can be installed to your home screen like a native app. It works offline after the first load.

---

## Step 1: Host the files (one-time setup, ~5 minutes)

The app needs to live at an HTTPS web address. **GitHub Pages is free and takes 5 minutes.**

1. Go to [github.com](https://github.com) and create a free account if you don't have one
2. Click **New repository** → name it `irrigation-monitor` → set to **Public** → click **Create repository**
3. Click **uploading an existing file** and drag in all four files:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon.svg`
4. Click **Commit changes**
5. Go to **Settings → Pages → Source** → select `main` branch → click **Save**
6. After ~60 seconds your app is live at: `https://YOUR-USERNAME.github.io/irrigation-monitor`

---

## Step 2: Install on iPhone (Safari)

1. Open Safari and go to your GitHub Pages URL
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add** — the app icon appears on your home screen
5. Open it — it runs full-screen like a native app

---

## Step 3: Install on Android (Chrome)

1. Open Chrome and go to your GitHub Pages URL
2. Tap the three-dot menu (⋮) → **Add to Home screen** (or Chrome may show an install banner automatically)
3. Tap **Install** or **Add**
4. The app icon appears on your home screen

---

## Step 4: Set up the AI Advisor

The AI briefing feature requires an Anthropic API key.

1. Go to [console.anthropic.com](https://console.anthropic.com) → sign up for free
2. Click **API Keys** → **Create Key** → copy it
3. Open the app → go to **Settings** tab → paste the key → tap **Save key**
4. Done. At daily farm use the cost is under $1/month.

---

## Updating the app

If you receive a new `index.html` file with improvements, just upload it to the same GitHub repository (drag and drop over the existing file). The app updates automatically within a few minutes.

---

## Data & privacy

All farm data is stored locally on the device using browser localStorage. Nothing is sent anywhere except the Anthropic API when you tap "Generate briefing" — and only the day's readings are sent, no farm identifiers.
