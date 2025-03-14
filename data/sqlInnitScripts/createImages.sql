CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    gallery_id INT REFERENCES galleries(id) ON DELETE CASCADE,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)