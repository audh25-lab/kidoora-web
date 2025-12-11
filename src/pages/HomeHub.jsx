import React from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";

export default function HomeHub(){
  const modules = [
    { id: "alphabet", title: "Alphabet", iconKey: "icon_alphabet" },
    { id: "numbers", title: "Numbers", iconKey: "icon_numbers" },
    { id: "shapes", title: "Shapes", iconKey: "icon_shapes" }
  ];

  return (
    <div className="center">
      <h2>KidooraMV</h2>
      <p className="kicker">BarefeetMV — island-inspired learning</p>

      <div className="menu-grid">
        {modules.map(m => (
          <Link key={m.id} to={`/module/${m.id}`} className="tile">
            <div style={{display:'flex',alignItems:'center',flexDirection:'column',gap:8}}>
              <Icon name={m.iconKey} size={90} />
              <div style={{fontWeight:700}}>{m.title}</div>
            </div>
          </Link>
        ))}
      </div>

      <NavBar />
    </div>
  );
}