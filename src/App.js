import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CretaeTeacher from "./pages/Teacher/CretaeTeacher";
import CreateStudent from "./pages/Student/CreateStudent";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/teacher/create" element={<CretaeTeacher />}></Route>
          <Route path="/student/create" element={<CreateStudent />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
