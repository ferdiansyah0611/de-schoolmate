import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/*components*/
import Navigation from "./components/partials/Navigation";
import Footer from "./components/partials/Footer";
/*pages*/
import Home from "./pages/Home"
import Application from "./pages/Application"
import Book from "./pages/book/Book"
import Calender from "./pages/calender/Calender"
import Note from "./pages/note/Note"
import NoteEditor from "./pages/note/NoteEditor"
import Timer from "./pages/timer/Timer"
import Todolist from "./pages/todolist/Todolist"
import Tutorial from "./pages/tutorial/Tutorial"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Application />} />
          <Route path="/app/todolist" element={<Todolist />} />
          <Route path="/app/timer" element={<Timer />} />
          <Route path="/app/note" element={<Note />} />
          <Route path="/app/note/editor" element={<NoteEditor />} />
          <Route path="/app/note/editor/:id" element={<NoteEditor />} />
          <Route path="/app/book" element={<Book />} />
          <Route path="/app/calender" element={<Calender />} />
          <Route path="/app/tutorial" element={<Tutorial />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
