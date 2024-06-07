import { Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const posts = [
  {
    id: 1,
    title: '10 Must-Read Books for Summer',
    href: '#',
    description:
      'Dive into these captivating reads perfect for your summer vacation. From thrillers to romances, we have something for everyone.',
    date: 'June 1, 2024',
    datetime: '2024-06-01',
    category: { title: 'Recommendations', href: '#' },
    author: {
      name: 'Jane Doe',
      role: 'Literary Critic',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1529245019870-59e1b6be0f33?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'The Benefits of Reading Daily',
    href: '#',
    description:
      'Discover how making time for reading each day can improve your mental health, increase your knowledge, and enhance your creativity.',
    date: 'May 20, 2024',
    datetime: '2024-05-20',
    category: { title: 'Health', href: '#' },
    author: {
      name: 'John Smith',
      role: 'Health Blogger',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'How to Start a Book Club',
    href: '#',
    description:
      'Looking to share your love of reading with others? Learn how to start and manage a successful book club in your community.',
    date: 'May 10, 2024',
    datetime: '2024-05-10',
    category: { title: 'Community', href: '#' },
    author: {
      name: 'Emily Johnson',
      role: 'Community Organizer',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80',
    },
  },
  {
    id: 4,
    title: 'Top 5 Mystery Novels of 2024',
    href: '#',
    description:
      'Unravel the best mystery novels of the year that will keep you on the edge of your seat with suspense and excitement.',
    date: 'April 15, 2024',
    datetime: '2024-04-15',
    category: { title: 'Genres', href: '#' },
    author: {
      name: 'Alex Brown',
      role: 'Book Reviewer',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80',
    },
  },
];

const Blog = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className='text-center mt-28'>
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the Blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore our latest posts on books, reading habits, and literary communities.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
