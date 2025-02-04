import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Menu from "./components/Menu"
import Home from "./pages/Home"
import QuizCard from "./components/QuizCard"
function App() {

  return (
    <>
      <Router>
        <Menu/>

        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/quiz" element = {<QuizCard/>}/>
        </Routes>

      </Router>
    
    </>
  )
}

export default App
