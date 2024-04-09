import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useSearchParams, useParams } from 'react-router-dom'
const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishyear, setpublishyear] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true)
    // Your logic to post the book data goes here
    try {
      const editing = await axios.patch(`https://bookstore-server-len3.onrender.com/books/update/${id}`, { title, author, publishyear, description });
      // Reset form fields
      setTitle('');
      setAuthor('');
      setpublishyear('');
      setDescription('');
      navigate('/');
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  };

  return (
      <div className='flex justify-center items-center min-h-screen w-screen p-3'>
        <div className="max-w-xl w-full mx-auto border-2 my-10  border-black bg-gray-200 bg-opacity-50 p-6 rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="block text-gray-700">Author</label>
              <input
                type="text"
                id="author"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="publishyear" className="block text-gray-700">Publish Year</label>
              <input
                type="number"
                id="publishyear"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={publishyear}
                onChange={(e) => setpublishyear(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea
                id="description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading?"Loading...":'Edit the Book'}
            </button>
            <button onClick={() => navigate('/')} className="bg-blue-500 hover:bg-blue-700 m-4 text-white font-bold py-2 px-4 rounded">Go to home</button>
          </form>
        </div>
      </div>
)
}

export default Edit
