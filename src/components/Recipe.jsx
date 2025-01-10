import React, { useState } from 'react';
import { Heart, PlusCircle } from 'lucide-react';

function Recipe() {
  const initialPosts = [
    {
      id: 1,
      user: 'John Doe',
      title: 'First Recipe',
      content: 'This is my first recipe! I hope you enjoy it. It contains detailed steps and tips that will make your cooking experience more enjoyable. Follow this method step by step and you’ll end up with a delicious dish.',
      likes: 0,
      liked: false, 
    },
    {
      id: 2,
      user: 'Jane Smith',
      title: 'Pizza Dough',
      content: 'I just discovered a new way to make pizza dough! It’s simple and easy. The recipe requires basic ingredients that you probably already have at home. You can make delicious pizzas at home using this dough recipe.',
      likes: 0, 
      liked: false,
    },
    {
      id: 3,
      user: 'Michael Johnson',
      title: 'Perfect Pancakes',
      content: 'How to make the perfect pancake: Easy recipe with minimal ingredients! These pancakes are fluffy and delicious, made with just a few simple ingredients that you can find in your pantry. Start cooking them on medium heat for best results.',
      likes: 0, 
      liked: false, 
    },
    {
      id: 4,
      user: 'skjdnfkjda',
      title: 'Leftover Ideas',
      content: 'This is my first recipe! I hope you enjoy it. You can turn your leftovers into a gourmet meal if you follow this simple recipe that I have tried at home.',
      likes: 0, 
      liked: false, 
    },
    {
      id: 5,
      user: 'jndsjv',
      title: 'Dough Master',
      content: 'I just discovered a new way to make pizza dough! It is different from the traditional recipe, and gives your pizza a chewy, fluffy texture that everyone will love.',
      likes: 0,
      liked: false,
    },
    {
      id: 6,
      user: 'sudfhwuf',
      title: 'Pancake Magic',
      content: 'How to make the perfect pancake: Easy recipe with minimal ingredients! Make your mornings better with these pancakes. They are soft, fluffy, and delicious.',
      likes: 0,
      liked: false, 
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [expanded, setExpanded] = useState(Array(initialPosts.length).fill(false)); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newRecipe, setNewRecipe] = useState({ user: '', title: '', content: '',likes:0 ,liked:false}); 

  const handleLike = (index) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];

    if (post.liked) {
      post.likes -= 1;
      post.liked = false;
    } else {
      post.likes += 1;
      post.liked = true;
    }

    setPosts(updatedPosts);
  };

  const handleReadMore = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const handleSubmitRecipe = (e) => {
    e.preventDefault();
    const updatedPosts = [
      ...posts,
      { ...newRecipe, id: posts.length + 1, likes: 0, liked: false }, // Add the new recipe with a new ID and initial like count
    ];
    setPosts(updatedPosts);
    setIsModalOpen(false); // Close modal after submitting
    setNewRecipe({ user: '', title: '', content: '' }); // Clear form
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
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

        {/* Button to open Add Recipe modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-6"
        >
          <PlusCircle size={20} className="mr-2" />
          Add Recipe
        </button>

        {/* Recipe Posts */}
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {posts.map((post, index) => {
            const words = post.content.split(' ');
            const firstPart = words.slice(0, 20).join(' '); // Get the first 10 words
            const secondPart = words.slice(20).join(' '); // Get the rest of the content

            return (
              <div
                key={post.id}
                className="bg-gray-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full mb-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-xl font-semibold">{post.user}</div>
                </div>

                {/* Title */}
                <div className="text-lg text-gray-300 font-semibold mb-2">{post.title}</div>

                {/* Description */}
                <p
                  className={`text-white text-lg transition-all duration-300 ${expanded[index] ? 'max-h-none' : 'max-h-20'} overflow-hidden`}
                >
                  {firstPart}
                  {/* Only show the "Read More" link if there is more content */}
                  {secondPart && !expanded[index] && (
                    <a
                      onClick={() => handleReadMore(index)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2"
                    >
                      Read More ...
                    </a>
                  )}

                  {/* Show the remaining content when expanded */}
                  {expanded[index] && ` ${secondPart}`}

                  {/* Show "Read Less" link when expanded */}
                  {expanded[index] && (
                    <a
                      onClick={() => handleReadMore(index)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2"
                    >
                      Read Less...
                    </a>
                  )}
                </p>

                {/* Like Button */}
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(index)} // Toggle like on click
                    className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <Heart size={20} className="mr-2" />
                    {post.likes} 
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full sm:w-96 max-w-lg transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Add Your Recipe</h2>
      <form onSubmit={handleSubmitRecipe}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="user">
            Your Name
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={newRecipe.user}
            onChange={handleModalInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="title">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newRecipe.title}
            onChange={handleModalInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="content">
            Recipe Content
          </label>
          <textarea
            id="content"
            name="content"
            value={newRecipe.content}
            onChange={handleModalInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            rows="6"
            required
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default Recipe;
