# Irrigation Monitor — Howe Family Farms
## Cloud Sync Setup (5 minutes, one-time)

### Step 1 — Create a free Supabase project

1. Go to **supabase.com** and sign up with your email (free)
2. Click **New Project** → choose any name (e.g. "hff-irrigation")
3. Set a database password (save it somewhere — you won't need it again)
4. Wait ~1 minute for the project to spin up

---

### Step 2 — Create the database table

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Paste the entire contents of **setup.sql** (included in this zip)
4. Click **Run** — you should see "Success. No rows returned"

---

### Step 3 — Get your credentials

1. Click **Project Settings** (gear icon, bottom left) → **API**
2. Copy:
   - **Project URL** — looks like `https://xxxxxxxxxxxx.supabase.co`
   - **Anon / public key** — a long JWT string starting with `eyJ...`

---

### Step 4 — Configure the app on each device

On **every phone** that will use the app (Kevin's and Binod's):

1. Open the app and tap **Settings**
2. Scroll to **Cloud Sync — Supabase**
3. Enter:
   - **Supabase Project URL** — paste from Step 3
   - **Anon / Public Key** — paste from Step 3
   - **Farm ID** — type a short shared name, e.g. `howe-farms-2026`
     *(must be identical on all devices — this is what links them together)*
4. Tap **Save sync config**
5. Tap **Test connection** — should say "Connected ✓"

---

### How sync works day-to-day

- **Binod** enters readings on Android → taps **Save** → data saves locally AND pushes to Supabase instantly
- **Kevin** opens the app → it automatically pulls Binod's latest entries when the app loads
- The **☁ synced** indicator (top right of header) turns green when sync is up to date
- If there's no internet, data saves locally and syncs when connection returns
- Tap **Settings → Pull latest now** to force a manual sync at any time

---

### What syncs and what doesn't

| Syncs ✓ | Stays local ✗ |
|---------|--------------|
| All EC, pH, mL readings | Soilsense/Priva screenshots |
| Drain % (corrected) | Image files attached in the app |
| Notes and tech notes | |
| Zone stage assignments | |
| History for all dates | |

Screenshots attached on Binod's phone show as "📸 Saved on another device" on Kevin's phone — they don't transfer. Kevin can attach his own charts from his phone.

---

## GitHub Pages deployment

Drag **index.html**, **manifest.json**, **sw.js**, and **icon.svg** into your GitHub repository, overwriting the existing files. GitHub Pages rebuilds automatically within ~1 minute.

**Install on iPhone:** Safari → open your GitHub Pages URL → Share → Add to Home Screen

**Install on Android:** Chrome → open URL → three-dot menu → Add to Home Screen

---

## Security note

The Supabase anon key is safe to include in the app. It's designed to be public — Supabase anon keys only allow what Row Level Security policies permit. The `setup.sql` configures the table to allow read/write with the anon key. Your Farm ID (e.g. `howe-farms-2026`) acts as a namespace so your data is separate from anyone else using the same Supabase project.

For a private farm app with two trusted users, this is appropriate. If you ever need to revoke access, you can change the Farm ID on both devices and the old entries become inaccessible.
