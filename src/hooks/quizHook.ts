import { questions } from "../data/questionsData";

export function useQuizHook() {
    
    
    const questionLength = questions.length; 

    return {
        questionLength
    }
}