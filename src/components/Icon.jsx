import React from "react";

// usage: <Icon name="icon_alphabet" size={80} />
export default function Icon({ name, size = 80, alt = "" }) {
  const assets = typeof window !== "undefined" ? window.__KIDOORA_ASSETS__ || {} : {};
  const src = assets[name] || assets["lesson"] || "";
  if (!src) return <div style={{width:size,height:size,background:"#eee",borderRadius:12}} />;
  return <img src={src} alt={alt} width={size} height={size} style={{borderRadius:12}} />;
}