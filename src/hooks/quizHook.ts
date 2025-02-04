import { questions } from "../data/questionsData";

export function useQuizHook() {
    
    const questionLenght = questions.length; 

    return {
        questionLenght
    }
}