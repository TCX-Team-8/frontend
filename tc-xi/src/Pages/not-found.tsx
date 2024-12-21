import React from 'react'
import { TfiFaceSad } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import '../../tailwind.config';

export default function NotFound() {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-[10px] text-gray-100'>
        <TfiFaceSad className='w-20 h-20 font-bold '/>
        <h1 className='text-6xl font-semibold'>404</h1>
        <p className='text-xl font-semibold'> Page not found</p>
        <Link to="/" className="relative inline-block w-[12rem] h-[2rem] m-5 bg-[#1F2937] text-gray-300 border-none rounded-[0.625em] text-lg font-medium cursor-pointer overflow-hidden z-[1] group">
        Go home page
        <span className="absolute inset-0 -z-[1] bg-white skew-x-[-45deg] transform scale-0 transition-transform duration-500 group-hover:scale-100"></span>
        </Link>
    </div>
  )

}
