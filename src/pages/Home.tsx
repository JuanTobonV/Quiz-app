import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
        <main className='w-full flex gap-4 justify-center flex-col items-center px-2 bg-gray-100  h-screen'>
            <h1 className='text-4xl font-bold text-center'>Welcome to the Quiz App!</h1>
            <p className='text-center text-2xl'>
                Test your knowledge with our exciting quiz. Answer questions on various topics and see how well you score!
            </p>
            
            <Link className='bg-black text-white hover:bg-gray-900 p-2 rounded-lg' to="/quiz"> Start Quiz </Link>
        </main>
    </>
  ) 
}
