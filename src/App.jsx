import Header from "./components/Header"
import Education from "./components/Education"
import Experience from "./components/Experience"
import Project from "./components/Project"

function App() {

  return (
    <>
    <div className="resume-container">
      <h1>Hello World App</h1>
      <Header />
      <Education />
      <Experience />
      <Project />
    </div>
    </>
  )
}

export default App
