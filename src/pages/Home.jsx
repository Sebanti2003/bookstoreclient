import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { FaBookOpen } from "react-icons/fa6";
import { GiEvilBook } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
const Home = () => {
  const navigate=useNavigate()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios
      .get('https://bookstore-server-len3.onrender.com/books/get')
      .then((res) => {
        setBooks(res.data.body)
        setLoading(false)
        console.log(res.data.body);
      })
      .catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
  }, [])
  const geteachbook = (book) => {
    navigate(`/show/${book._id}`)
    // console.log("hey");
  }
  const deletebook = async (id) => {
    try {
      const book = await axios.delete(`https://bookstore-server-len3.onrender.com/books/delete/${id}`)
      console.log("book deleted successfully!!!!!!")
      console.log(book);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    loading ? <Spinner /> : (
      <div className="overflow-x-auto font-bold">
        <div className='text-center m-3 text-2xl font-serif flex justify-center items-center gap-2 font-bold'>BookStore Application<FaBookOpen /></div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>

              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book, index) => (
              <tr  key={index}>
                <td className="pl-2 max-sm:pl-0 max-sm:justify-evenly capitalize py-4 whitespace-nowrap  flex items-center gap-2 max-sm:gap-1"><GiEvilBook />{book.title}</td>
                <td className="pl-2 max-sm:pl-0 max-sm:justify-center capitalize py-4 whitespace-nowrap text-center  ">{book.author}</td>
                <td className="pl-2 max-sm:pl-0 max-sm:justify-center capitalize py-4 text-center whitespace-nowrap ">{book.publishyear}</td>
                <td className="pl-2 max-sm:pl-0 max-sm:justify-center capitalize py-4 text-center whitespace-nowrap flex gap-2 ">
                  <div onClick={()=>navigate(`/edit/${book._id}`)} className='text-green-700'><AiOutlineEdit /></div>
                  <div onClick={() => deletebook(book._id)} className='text-red-700'><MdOutlineDelete /></div>
                  <div onClick={() => geteachbook(book)} className='text-blue-700'><BsInfoCircle /></div>
                  </td>
                {/* Add actions buttons here */}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate('/create')} className="bg-blue-500 hover:bg-blue-700 m-4 text-white font-bold py-2 px-4 rounded">Add Book</button>
      </div>
    )
  );
}
export default Home
