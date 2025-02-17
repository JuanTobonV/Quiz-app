import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Menu from "./components/Menu"
import Home from "./pages/Home"
import QuizCard from "./components/QuizCard"
import { useQuizHook } from "./hooks/quizHook"
import ResultsCard from "./components/ResultsCard"
function App() {

  const {questionLenght} = useQuizHook();

  return (
    <>
      <Router>
        <Menu/>

        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/quiz" element = {<QuizCard questionLength={questionLenght}/>}/>
          <Route path="/results" element = {<ResultsCard/>}/>
        </Routes>

      </Router>
    
    </>
  )
}

export default App
