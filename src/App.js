import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import { useState } from "react";
import projects from "./projects.json";
import ApiTeste from "./pages/ApiTeste";
import AlunoDetailPage from "./pages/AlunoDetailPage";
import { Toaster } from "react-hot-toast";

function App() {
  const [allProjects, setAllProjects] = useState(projects);

  return (
    <div className="App">
      <Navbar />

      <Toaster />

      <Routes>
        <Route path="/" element={<HomePage allProjects={allProjects} setAllProjects={setAllProjects}
 />} />

        <Route path="/about" element={<AboutPage />} />



        <Route path="/api-teste" element={<ApiTeste />} />

        <Route path="/alunos/:alunoID" element={<AlunoDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
