import React, { useState } from "react";
import { useUserStore } from "../store/userStore";

export default function AgeSelector({ onComplete }) {
  const setAgeGroup = useUserStore((s) => s.setAgeGroup);
  const [age, setAge] = useState(6);

  const done = () => {
    // map into label groups, simple logic:
    let label = "6–8";
    if (age <= 5) label = "3–5";
    else if (age <= 8) label = "6–8";
    else if (age <= 11) label = "9–11";
    else if (age <= 16) label = "12–16";
    else label = "17+";

    setAgeGroup(label);
    if (onComplete) onComplete({ age, label });
  };

  return (
    <div>
      <label className="kicker">Enter child age</label>
      <input className="input" type="number" min="3" max="99" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={done}>Continue</button>
      </div>
    </div>
  );
}