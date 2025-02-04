import React from 'react'

export default function QuizCard() {
    
  return (
    <>
        <main className='bg-gray-100 w-full h-screen '>
            <div className='bg-white rounded-xl w-fit h-fit'>
                <h1>Question {} of {}</h1>
                <h2>Time left: {} seconds</h2>
            </div>
        </main>
    </>
  )
}
