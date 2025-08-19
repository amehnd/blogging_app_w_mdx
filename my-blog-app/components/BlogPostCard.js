// my-blog-app/components/BlogPostCard.js
import Link from 'next/link';

const BlogPostCard = ({ post }) => {
    const formattedDate = new Date(post.created_at).toLocaleDateString();
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
                <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                </Link>
            </h2>
            <p className="text-gray-600 text-sm mb-4">Published on: {formattedDate}</p>
            <div className="text-gray-700 line-clamp-3">
                {post.content.substring(0, 150)}...
            </div>
            <Link href={`/posts/${post.slug}`} className="mt-4 inline-block text-blue-500 hover:underline">
                Read More
            </Link>
        </div>
    );
};

export default BlogPostCard;