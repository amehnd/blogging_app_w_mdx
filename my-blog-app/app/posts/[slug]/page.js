// my-blog-app/app/posts/[slug]/page.js
import { getPostBySlug } from '@/lib/api';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0;

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);
    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }
    return {
        title: post.title,
        description: post.content.substring(0, 150) + '...',
    };
}

export default async function PostPage({ params }) {
  const { slug } = params;
  let post;

  try {
    post = await getPostBySlug(slug);
    if (!post) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString();

  return (
    <article className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-6">Published on: {formattedDate}</p>
      <MarkdownRenderer content={post.content} />
      <div className="mt-8 flex justify-end">
        <Link href={`/posts/edit/${post.id}`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 mr-2">
          Edit Post
        </Link>
        <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
          Back to Posts
        </Link>
      </div>
    </article>
  );
}