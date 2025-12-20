-- ===================================
-- SUPABASE FILES TABLE SETUP
-- ===================================
-- Create files table to store file metadata
CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    size BIGINT NOT NULL,
    type TEXT NOT NULL,
    unit TEXT NOT NULL,
    lesson TEXT NOT NULL,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Create index for faster queries
CREATE INDEX idx_files_unit_lesson ON files(unit, lesson);
CREATE INDEX idx_files_upload_date ON files(upload_date DESC);
-- Enable Row Level Security
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON files FOR
SELECT TO public USING (true);
-- Create policy to allow public insert
CREATE POLICY "Allow public insert" ON files FOR
INSERT TO public WITH CHECK (true);
-- Create policy to allow public delete
CREATE POLICY "Allow public delete" ON files FOR DELETE TO public USING (true);
-- Create policy to allow public update
CREATE POLICY "Allow public update" ON files FOR
UPDATE TO public USING (true);