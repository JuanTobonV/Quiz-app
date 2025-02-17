import React, { useState } from 'react'

import { questions } from '../data/questionsData'
import { Link } from 'react-router-dom'



type ResultCardProps = {
    userAnswers: string[],
    questionLength:number,
    counter:number
}

export default function ResultsCard({userAnswers, questionLength, counter}:ResultCardProps) {


    return (
        <main className="bg-gray-100 w-full h-screen flex justify-center pt-24 px-2">
        <form
            className="bg-white rounded-xl w-xl h-fit flex justify-start flex-col items-start p-3"
        >
            <h1 className='font-semibold text-3xl mb-5'>Summary</h1>
            <p className='text-xl'>Your Score: {counter} of {questionLength}</p>
            {
                questions.map((question, index) => (
                    <div className='border-b-1 w-full border-gray-300 py-2' key={question.id}>
                        <p className='text-lg'>{question.question}</p>
                        <p className={`text-lg`}>Your answer: <span className={`text-lg ${userAnswers[index] === question.correctAnswer ? "text-green-500" : "text-red-500"}`}>{userAnswers[index]}</span> </p>
                        <p className='text-lg'>Correct answer: {question.correctAnswer}</p>
                    </div>
                ))
            }
            <Link to="/" className='border mt-5 p-1 rounded-lg bg-black hover:bg-gray-800 text-white cursor-pointer'>Restart Quiz</Link>
        </form>
        </main>
  )
}
