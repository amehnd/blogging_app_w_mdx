// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const port = process.env.BACKEND_PORT || 5000;

app.use(express.json());
app.use(cors());

// GET all posts
app.get('/api/posts', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// GET a single post by slug
app.get('/api/posts/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM posts WHERE slug = $1', [slug]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST a new post
app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    try {
        const { rows } = await db.query(
            'INSERT INTO posts (title, slug, content) VALUES ($1, $2, $3) RETURNING *',
            [title, slug, content]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT/UPDATE a post
app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    try {
        const { rows } = await db.query(
            'UPDATE posts SET title = $1, slug = $2, content = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
            [title, slug, content, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// DELETE a post
app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await db.query('DELETE FROM posts WHERE id = $1', [id]);
        if (rowCount === 0) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json({ msg: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});