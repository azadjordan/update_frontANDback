import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WorkoutEdit from "./components/WorkoutEdit";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<WorkoutEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
