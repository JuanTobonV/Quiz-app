import { useEffect, useState } from 'react';

import { questionsType } from '../types/questionsTypes';
import { questions as questionData } from '../data/questionsData';
import ResultsCard from './ResultsCard';

interface QuizCardProps {
  questionLength: number;
}

export default function QuizCard({ questionLength }: QuizCardProps) {
  const [timer, setTimer] = useState<number>(60);
  const [questions, setQuestions] = useState<questionsType[]>(questionData);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAnswerClick = (answer: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    setSelectedAnswerIndex(index);
    const selectedAnswer = answer.currentTarget.textContent || '';
    setUserAnswers([...userAnswers, selectedAnswer]);
    

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswer(true);
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      setCorrectAnswer(false);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questionLength) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimer(60)
        setSelectedAnswerIndex(null); // Reset selected answer index for the next question
      }
    }, 1000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {timer === 0 || currentQuestionIndex === questionLength ? (
        <ResultsCard userAnswers={userAnswers} questionLength={questionLength} counter={counter} />
      ) : (
        <main className="bg-gray-100 w-full h-screen flex justify-center pt-24 px-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl w-xl h-96 flex justify-center flex-col items-start p-3 "
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
                <h1 className="text-xl">{currentQuestion.question}</h1>
                {currentQuestion.answers.map((answer, index) => (
                  <button
                    key={index}
                    className={`p-2 rounded-lg w-full cursor-pointer ${
                      selectedAnswerIndex === index
                        ? currentQuestion.correctAnswer === answer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-black text-white hover:bg-gray-900'
                    }`}
                    onClick={(e) => handleAnswerClick(e, index)}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            )}

            <p className="text-gray-500 mt-4">Select an answer</p>
          </form>
        </main>
      )}
    </>
  );
}
