import  { useEffect, useState } from 'react'

import { questionsType } from '../types/questionsTypes';
import { questions as questionData } from '../data/questionsData';

interface QuizCardProps {
  questionLenght:number
}

interface formStateProps {
  correctQuestion: boolean,
  isTimeZero: boolean,
}

export default function QuizCard({questionLenght}:QuizCardProps) {
  const [timer, setTimer] = useState<number>(60);
  const [questions, setQuestions] = useState<questionsType[]>(questionData);
  const [formStates, setFormStates] = useState<formStateProps>({
    correctQuestion: false,
    isTimeZero: false,
  });

  
  

    useEffect(() => {
      if (timer !== 0) {
        const interval = setInterval(() => {
          setTimer(prevTimer => {
            if (prevTimer === 0) {
              clearInterval(interval);
              setFormStates({
                ...formStates,
                isTimeZero:true,
              })
              return prevTimer;

            }
            return prevTimer - 1;
          });
        }, 1000);

        return () => clearInterval(interval);

        
      }
    }, [timer,formStates]);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    }

    const checkQuestion = (answer:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const selectedOption = answer.currentTarget.textContent;
    
      if(selectedOption === questions.correctAnswer){
        console.log("good my child");
        setCorrectQuestion(true);
      }
      else{
        console.log("skill issue");
        setCorrectQuestion(false)
      }
    }

    
    
  return (
    <>
        <main className='bg-gray-100 w-full h-screen flex justify-center pt-24 '>
            <form onSubmit={(e) => handleSubmit(e)} className='bg-white rounded-xl w-xl h-fit flex justify-center flex-col items-start p-3'>
                <label className='text-2xl font-bold'>Question {} of {questionLenght}</label>
                <label className='text-xl font-normal' >Time left: {timer} seconds</label>
                <input type="button" value="" />
                
                {
                  questions.map((question) => (
                    <div className=' w-full gap-2 flex flex-col items-center justify-cente mt-2'>
                      {
                        question.answers.map((answer, index) => (

                          <button
                            key={index}
                            className='bg-black p-2 text-white rounded-lg w-full cursor-pointer hover:bg-gray-900'
                            onClick={(e) => {
                              checkQuestion(e);
                            }}
                          >
                            {answer}
                          </button>

                        ))
                      }
                    </div>

                  ))
                  
                }

                <p className='text-gray-500 mt-4'>Select an answer</p>
            </form>

            
        </main>
    </>
  )
}
