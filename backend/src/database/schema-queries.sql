CREATE TABLE todos (
    -- Auto-incrementing unique ID for each to-do item
    id SERIAL PRIMARY KEY,
    -- Short title for the to-do item     
    title VARCHAR(255) NOT NULL,
    -- Detailed description or notes for the to-do item
    text TEXT
);