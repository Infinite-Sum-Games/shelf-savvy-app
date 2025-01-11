import React, { useEffect, useState } from 'react';
import { Heart, PlusCircle, Trash2 } from 'lucide-react';
import { RECIPE_URL_ALL, RECIPE_URL_ADD, RECIPE_URL_DELETE } from '../constants'; // Add RECIPE_URL_DELETE in your constants

function Recipe() {
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    user: '',
    title: '',
    content: '',
    ingredients: [],
  });

  // Fetch recipes from the backend
  const fetchRecipes = async () => {
    try {
      const email = localStorage.getItem('email'); // Get email from local storage
      const token = localStorage.getItem('authToken'); // Get token from local storage
      if (!email) throw new Error('Email not found in local storage');
      if (!token) throw new Error('Authorization token not found in local storage');

      const response = await fetch(RECIPE_URL_ALL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add Bearer token to headers
        },
        body: JSON.stringify({ email }), // Send email in request body
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      const formattedData = data.recipe.map((recipe) => ({
        id: recipe.id,
        user: recipe.userId, // Assuming userId refers to the user name
        title: recipe.title,
        content: recipe.content,
        ingredients: recipe.ingredients,
        likes: 0,
        liked: false,
      }));
      setPosts(formattedData);
      setExpanded(Array(formattedData.length).fill(false));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Add recipe to the backend
  const addRecipe = async (newRecipe) => {
    try {
      const email = localStorage.getItem('email'); // Get email from local storage
      const token = localStorage.getItem('authToken'); // Get token from local storage
      if (!email) throw new Error('Email not found in local storage');
      if (!token) throw new Error('Authorization token not found in local storage');

      const response = await fetch(RECIPE_URL_ADD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add Bearer token to headers
        },
        body: JSON.stringify({
          email,
          title: newRecipe.title,
          ingredients: newRecipe.ingredients,
          content: newRecipe.content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const data = await response.json();
      console.log('Recipe added successfully:', data);

      // Update posts state with the new recipe
      setPosts((prevPosts) => [
        ...prevPosts,
        {
          id: data.recipe.id, // Assuming the response contains the new recipe's id
          user: email,
          title: newRecipe.title,
          content: newRecipe.content,
          ingredients: newRecipe.ingredients,
          likes: 0,
          liked: false,
        },
      ]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  // Delete recipe from the backend
 // Delete recipe from the backend
const handleDelete = async (postId) => {
    try {
      const email = localStorage.getItem('email'); // Get email from local storage
      const token = localStorage.getItem('authToken'); // Get token from local storage
      if (!email) throw new Error('Email not found in local storage');
      if (!token) throw new Error('Authorization token not found in local storage');
    //   console.log(postId)
  
      const response = await fetch(RECIPE_URL_DELETE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, recipeId: postId }), // Send email and postId in request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }
  
      // Filter out the deleted post from the state
      setPosts(posts.filter(post => post.id !== postId));
      console.log('Recipe deleted successfully');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };
  

  useEffect(() => {
    fetchRecipes();
  }, []);

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
    addRecipe(newRecipe);
    setIsModalOpen(false);
    setNewRecipe({
      user: '',
      title: '',
      content: '',
      ingredients: '',
    });
  };

  return (
    <div className="p-4 max-h-screen flex flex-col overflow-x-hidden">
      <div className="max-w-full mx-auto space-y-6">
        <div className="text-center p-6 bg-gray-900 rounded-lg shadow-xl">
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

        {/* Add Recipe Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Add New Recipe</h2>
              <form onSubmit={handleSubmitRecipe}>
                <input
                  type="text"
                  placeholder="User"
                  value={newRecipe.user}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, user: e.target.value })
                  }
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={newRecipe.title}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, title: e.target.value })
                  }
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <textarea
                  placeholder="Content"
                  value={newRecipe.content}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, content: e.target.value })
                  }
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                ></textarea>
                <input
                  type="text"
                  placeholder="Ingredients (comma-separated)"
                  value={newRecipe.ingredients.join(', ')}
                  onChange={(e) =>
                    setNewRecipe({
                      ...newRecipe,
                      ingredients: e.target.value.split(',').map(ingredient => ingredient.trim()),
                    })
                  }
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Recipe Posts */}
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {posts.map((post, index) => {
            const words = post.content.split(' ');
            const firstPart = words.slice(0, 20).join(' ');
            const secondPart = words.slice(20).join(' ');

            return (
              <div
                key={post.id}
                className="bg-gray-800 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full mb-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-xl font-semibold">{post.user}</div>
                </div>

                {/* Title */}
                <div className="text-lg text-gray-300 font-semibold mb-2">{post.title}</div>

                {/* Description */}
                <p className="text-white text-lg mb-4">
                  {firstPart}
                  {secondPart && !expanded[index] && (
                    <a
                      onClick={() => handleReadMore(index)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2"
                    >
                      Read More ...
                    </a>
                  )}
                  {expanded[index] && ` ${secondPart}`}
                  {expanded[index] && (
                    <a
                      onClick={() => handleReadMore(index)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2"
                    >
                      Read Less...
                    </a>
                  )}
                </p>

                {/* Ingredients */}
                <div>
                  <span className="font-bold text-gray-300">Ingredients:</span>{' '}
                  {post.ingredients.join(', ')}
                </div>

                {/* Like and Delete Buttons */}
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(index)}
                    className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <Heart size={20} className="mr-2" />
                    {post.likes}
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <Trash2 size={20} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
