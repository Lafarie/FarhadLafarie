import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/App.css";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Projects from "./pages/projects";
import CV from "./pages/cv";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router basename="/FarhadLafarie">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/portfolio" element={<CV />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
