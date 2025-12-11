import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavBar() {
  const nav = useNavigate();
  return (
    <motion.nav className="navBar" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <button onClick={() => nav("/home")}>Home</button>
      <button onClick={() => nav("/learning")}>Learn</button>
      <button onClick={() => nav("/games")}>Games</button>
      <button onClick={() => nav("/profile")}>Profile</button>
    </motion.nav>
  );
}