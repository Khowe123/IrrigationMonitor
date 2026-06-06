-- ============================================================
-- Howe Family Farms — Irrigation Monitor
-- Run this ONCE in Supabase: Dashboard → SQL Editor → New query
-- ============================================================

CREATE TABLE IF NOT EXISTS irrigation_entries (
    id          TEXT PRIMARY KEY,           -- "{team_id}:{crop}:{date}"
    team_id     TEXT        NOT NULL,       -- your Farm ID, e.g. "howe-farms-2026"
    crop        TEXT        NOT NULL,       -- "str" or "ras"
    date        DATE        NOT NULL,
    entry_data  JSONB       NOT NULL,       -- full day entry (EC, pH, mL, notes, etc.)
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast per-farm lookups
CREATE INDEX IF NOT EXISTS idx_irr_team_crop ON irrigation_entries (team_id, crop, date DESC);

-- Row Level Security: allow the app's anon key full read/write
ALTER TABLE irrigation_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_anon_all" ON irrigation_entries;
CREATE POLICY "allow_anon_all" ON irrigation_entries
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- Done. Go to Project Settings → API to copy your URL and anon key.
-- ============================================================
