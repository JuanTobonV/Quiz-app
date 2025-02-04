import React, { useEffect, useState } from 'react'

interface QuizCardProps {
  questionLenght:number
}

export default function QuizCard({questionLenght}:QuizCardProps) {
  const [timer, setTimer] = useState<number>(60);

    useEffect(() => {
      if (timer !== 0) {
        const interval = setInterval(() => {
          setTimer(prevTimer => {
            if (prevTimer === 0) {
              clearInterval(interval);
              return prevTimer;
            }
            return prevTimer - 1;
          });
        }, 1000);
  
        return () => clearInterval(interval);
      }
    }, [timer]);

    
  return (
    <>
        <main className='bg-gray-100 w-full h-screen flex justify-center pt-24 '>
            <div className='bg-white rounded-xl w-xl h-fit flex justify-center flex-col items-start p-3'>
                <h1 className='text-2xl font-bold'>Question {} of {questionLenght}</h1>
                <h2 className='text-xl font-semibold' >Time left: {timer} seconds</h2>
            </div>
        </main>
    </>
  )
}
