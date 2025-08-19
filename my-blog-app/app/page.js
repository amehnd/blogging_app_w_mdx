// app/page.js

import BlogPostCard from '@/components/BlogPostCard.js';
import { getPosts } from '@/lib/api';

export const revalidate = 0;

export default async function HomePage() {
  let posts = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return <div className="text-center text-red-500">Failed to load posts. Please try again later.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Latest Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No blog posts yet. Be the first to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}