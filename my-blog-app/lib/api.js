// my-blog-app/lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const getPosts = async () => {
    const res = await fetch(`${API_BASE_URL}/posts`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
};

export const getPostBySlug = async (slug) => {
    const res = await fetch(`${API_BASE_URL}/posts/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
};

export const createPost = async (postData) => {
    const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
    });
    if (!res.ok) throw new Error('Failed to create post');
    return res.json();
};

export const updatePost = async (id, postData) => {
    const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
    });
    if (!res.ok) throw new Error('Failed to update post');
    return res.json();
};

export const deletePost = async (id) => {
    const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete post');
    return res.json();
};