import React from "react";
import { useUserStore } from "../store/userStore";

export default function ParentalConsent() {
  const setConsent = useUserStore((s) => s.setConsent);
  const consent = useUserStore((s) => s.consent);
  return (
    <div>
      <h4>Parental Consent</h4>
      <p style={{fontSize:13}}>Confirm you are the parent/guardian to enable progress saving and competitions.</p>
      <label style={{display:'flex',gap:8,alignItems:'center'}}>
        <input type="checkbox" checked={consent} onChange={(e)=> setConsent(e.target.checked)} />
        <span>I confirm I am the parent/guardian</span>
      </label>
    </div>
  );
}