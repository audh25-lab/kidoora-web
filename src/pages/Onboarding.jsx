import React from "react";
import AgeSelector from "../components/AgeSelector";
import ParentalConsent from "../components/ParentalConsent";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const nav = useNavigate();

  return (
    <div className="center">
      <div style={{width:'100%',maxWidth:980}}>
        <h2>Welcome to KidooraMV</h2>
        <div style={{display:'flex',gap:20}}>
          <div style={{flex:1}}><AgeSelector onComplete={()=> nav('/learning')} /></div>
          <div style={{flex:1}}><ParentalConsent /></div>
        </div>
      </div>
    </div>
  );
}