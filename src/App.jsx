import React from "react";
import { Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import HomeHub from "./pages/HomeHub";
import LearningHub from "./pages/LearningHub";
import ModulePage from "./pages/ModulePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/home" element={<HomeHub />} />
      <Route path="/learning" element={<LearningHub />} />
      <Route path="/module/:moduleId" element={<ModulePage />} />
    </Routes>
  );
}