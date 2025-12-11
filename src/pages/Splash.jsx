import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";

export default function Splash(){
  const nav = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => nav("/onboarding"), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="center">
      <div className="splash-card">
        <div style={{width:220,margin:'0 auto'}}>
          <Icon name="mascot" size={220} alt="Kidoora mascot" />
        </div>
        <h1 className="splash-title">KidooraMV</h1>
        <p className="kicker">BarefeetMV — island learning adventures</p>
      </div>
    </div>
  );
}