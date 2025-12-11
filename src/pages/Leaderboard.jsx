import React from "react";
import { getLeaderboard } from "../utils/leaderboard";

export default function Leaderboard(){
  const data = getLeaderboard();

  return (
    <div className="center">
      <h2>KidooraMV Leaderboard</h2>
      {data.map((d, i) => (
        <div key={i} style={{marginTop:12}}>
          #{i+1} — {d.name} — {d.score} points
        </div>
      ))}
    </div>
  );
}
import Leaderboard from "./pages/Leaderboard";
<Route path="/leaderboard" element={<Leaderboard />} />