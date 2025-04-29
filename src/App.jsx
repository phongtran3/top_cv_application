import Header from "./components/Header"
import Education from "./components/Education"
import Experiences from "./components/Experiences"
import Projects from "./components/Projects"
import TechSkills from "./components/TechSkills"

function App() {

  return (
    <>
    <div className="resume-container">
      <Header />
      <Education />
      <Experiences />
      <Projects />
      <TechSkills />
    </div>
    </>
  )
}

export default App
