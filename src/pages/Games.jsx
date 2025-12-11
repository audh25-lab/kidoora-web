import React from "react";

export default function Games(){
  return (
    <div className="center">
      <h2>Games Coming Soon</h2>
      <p className="kicker">Interactive island adventures being prepared...</p>
    </div>
  );
}
import Games from "./pages/Games";
// add:
<Route path="/games" element={<Games />} />