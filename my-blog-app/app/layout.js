// my-blog-app/app/layout.js
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'My Awesome Blog',
  description: 'A blog built with Next.js, Express, and PostgreSQL.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans antialiased">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              My Blog
            </Link>
            <div>
              <Link href="/posts/create" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                Create New Post
              </Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}