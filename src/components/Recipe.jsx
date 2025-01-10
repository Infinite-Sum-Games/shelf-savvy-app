import React, { useState } from 'react';
import { Heart } from 'lucide-react';

function Recipe() {
  const posts = [
    {
      id: 1,
      user: 'John Doe',
      title: 'First Recipe',
      content: 'This is my first recipe! I hope you enjoy it.',
    },
    {
      id: 2,
      user: 'Jane Smith',
      title: 'Pizza Dough',
      content: 'I just discovered a new way to make pizza dough!',
    },
    {
      id: 3,
      user: 'Michael Johnson',
      title: 'Perfect Pancakes',
      content: 'How to make the perfect pancake: Easy recipe with minimal ingredients!',
    },
    {
      id: 4,
      user: 'skjdnfkjda',
      title: 'Leftover Ideas',
      content: 'This is my first recipe! I hope you enjoy it.',
    },
    {
      id: 5,
      user: 'jndsjv',
      title: 'Dough Master',
      content: 'I just discovered a new way to make pizza dough!',
    },
    {
      id: 6,
      user: 'sudfhwuf',
      title: 'Pancake Magic',
      content: 'How to make the perfect pancake: Easy recipe with minimal ingredients!',
    },
  ];

  const [likes, setLikes] = useState(Array(posts.length).fill(0));
  const [likedPosts, setLikedPosts] = useState(Array(posts.length).fill(false)); // Track whether post is liked

  const handleLike = (index) => {
    const newLikes = [...likes];
    const newLikedPosts = [...likedPosts];

    if (newLikedPosts[index]) {
      newLikes[index] -= 1; // Decrease like count
      newLikedPosts[index] = false; // Mark as unliked
    } else {
      newLikes[index] += 1; // Increase like count
      newLikedPosts[index] = true; // Mark as liked
    }

    setLikes(newLikes);
    setLikedPosts(newLikedPosts);
  };

  return (
    <div className="p-4 max-h-screen flex flex-col">
      <div className="max-w-full mx-auto space-y-6">
        <div className="text-center p-6 bg-gray-800 rounded-lg shadow-xl">
          <h1 className="text-2xl font-semibold text-white mb-4">
            Wondering what to do with your leftovers?
          </h1>
          <h2 className="text-xl text-gray-400 opacity-90">
            Check out our delicious recipes!
          </h2>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="bg-gray-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full mb-4"
            >
              {/* User Info */}
              <div className="flex items-center space-x-4 ">
                <div className="text-xl font-semibold">{post.user}</div>
              </div>

              {/* Title */}
              <div className="text-lg text-gray-300 font-semibold mb-2">{post.title}</div>

              {/* Description */}
              <p className="text-white text-lg">{post.content}</p>

              {/* Like Button */}
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => handleLike(index)} // Toggle like on click
                  className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  <Heart size={20} className="mr-2" />
                  {likes[index]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
