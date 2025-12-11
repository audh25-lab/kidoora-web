import React from "react";
import { useUserStore } from "../store/userStore";

export default function Profile(){
  const ageGroup = useUserStore(s => s.ageGroup);
  const lang = useUserStore(s => s.lang);
  const rewards = useUserStore(s => s.rewards);

  return (
    <div className="center">
      <h2>Your KidooraMV Profile</h2>
      <p>Age Group: {ageGroup}</p>
      <p>Language: {lang}</p>

      <h3 style={{marginTop:24}}>Rewards</h3>
      {rewards.length === 0 && <p>No rewards yet. Start learning!</p>}
      <ul>
        {rewards.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
import Profile from "./pages/Profile";
<Route path="/profile" element={<Profile />} />