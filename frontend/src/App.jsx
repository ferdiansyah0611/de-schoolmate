import "./styles/App.css";
import {
  Typography,
  Card,
} from "@material-tailwind/react";
import Navigation from "./components/partials/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Book from "./pages/book/Book"
import Calender from "./pages/calender/Calender"
import Note from "./pages/note/Note"
import Timer from "./pages/timer/Timer"
import Todolist from "./pages/todolist/Todolist"
import Tutorial from "./pages/tutorial/Tutorial"

function App() {
  return (
    <>
      <Navigation/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/todolist" element={<Todolist />} />
          <Route path="/app/timer" element={<Timer />} />
          <Route path="/app/note" element={<Note />} />
          <Route path="/app/book" element={<Book />} />
          <Route path="/app/calender" element={<Calender />} />
          <Route path="/app/tutorial" element={<Tutorial />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
