import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentView from "./pages/StudentView";
import StudentEdit from "./pages/StudentEdit";
import "./App.css";
import StudentForm from "./pages/StudentForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add/student" element={<StudentForm />} />
          <Route path="/view/:id" element={<StudentView />} />
          <Route path="/edit/:id" element={<StudentEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
