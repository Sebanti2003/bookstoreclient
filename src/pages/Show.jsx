import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IoPlaySkipBackCircleSharp } from "react-icons/io5";
import Spinner from '../components/Spinner'
import { NavLink, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom'
const Show = () => {
  const [single, setSingle] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchbook = async (id) => {
    try {
      setLoading(true)
      const book = await axios.get(`https://bookstore-server-len3.onrender.com/books/get/${id}`);
      console.log("book fetched successfully!!!!!!");
      setSingle(book.data.body);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchbook(id);
  }, [id])
  console.log(single);
  return (
    loading?<Spinner/>:(
    <div className='h-screen flex relative justify-center items-center'>
      <div onClick={() => navigate(-1)} className='bg-blue-400 p-1 cursor-pointer border-black border-2 rounded-md absolute top-10 left-3'><IoPlaySkipBackCircleSharp/>Back</div>
      <div className='text-center w-full border-2 p-7 border-slate-600 m-3 text-2xl font-serif flex flex-col justify-center items-center gap-2 font-bold'>
        <div className='flex gap-2 text-violet-900 capitalize font-sans text-xl'><div>Name:</div>{single.title}</div>
        <div className='flex gap-2 text-purple-800 capitalize font-sans text-xl'><div>Author:</div>{single.author}</div>
        <div className='flex gap-2 text-blue-900 capitalize font-sans text-xl'><div>Publish Year:</div>{single.publishyear}</div>
        <div className='flex gap-2 text-pink-800 capitalize font-sans text-xl'><div>Description:</div>{single.description}</div>
      </div>


    </div>
  )
  )
}

export default Show
