import { useEffect, useState } from 'react';

import { questionsType } from '../types/questionsTypes';
import { questions as questionData } from '../data/questionsData';

interface QuizCardProps {
  questionLength: number;
}

interface formStateProps {
  correctQuestion: boolean;
  isTimeZero: boolean;
}

export default function QuizCard({ questionLength }: QuizCardProps) {
  const [timer, setTimer] = useState<number>(60);
  const [questions, setQuestions] = useState<questionsType[]>(questionData);
  const [formStates, setFormStates] = useState<formStateProps>({
    correctQuestion: false,
    isTimeZero: false,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    if (timer !== 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setFormStates({
              ...formStates,
              isTimeZero: true,
            });
            return prevTimer;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAnswerClick = () => {
    setFormStates({
      ...formStates,
      correctQuestion: true,
    });

    if (currentQuestionIndex < 3) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <main className="bg-gray-100 w-full h-screen flex justify-center pt-24">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white rounded-xl w-xl h-fit flex justify-center flex-col items-start p-3"
      >
        <label className="text-2xl font-bold">
          Question {currentQuestionIndex + 1} of {questionLength}
        </label>
        <label className="text-xl font-normal">Time left: {timer} seconds</label>
        <input type="button" value="" />

        {currentQuestion && (
          <div
            key={currentQuestion.id}
            className="w-full gap-2 flex flex-col items-center justify-center mt-2"
          >
            <h1 className='text-xl'>{currentQuestion.question}</h1>
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                className="bg-black p-2 text-white rounded-lg w-full cursor-pointer hover:bg-gray-900"
                onClick={handleAnswerClick}
              >
                {answer}
              </button>
            ))}
          </div>
        )}

        <p className="text-gray-500 mt-4">Select an answer</p>
      </form>
    </main>
  );
}
