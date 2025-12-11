import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Icon from "../components/Icon";
import "../styles/homeHub.css";

export default function HomeHub() {
  const modules = [
    {
      id: "alphabet",
      title: "Alphabet",
      desc: "Letters, sounds, tracing & games",
      iconKey: "icon_alphabet",
    },
    {
      id: "numbers",
      title: "Numbers",
      desc: "Counting, math skills, games",
      iconKey: "icon_numbers",
    },
    {
      id: "shapes",
      title: "Shapes",
      desc: "Geometry, puzzles, pattern logic",
      iconKey: "icon_shapes",
    },
  ];

  return (
    <div className="homeHubWrapper">

      {/* Top Bar */}
      <div className="homeTopBar">
        <div className="brandTitle">KidooraMV</div>

        <div className="topActions">
          <Link to="/settings" className="settingsBtn">⚙️</Link>
          <Link to="/profile" className="avatarBubble">
            <img src="/assets/avatar-default.png" alt="avatar" />
          </Link>
        </div>
      </div>

      <p className="brandSubtitle">BarefeetMV — Island Inspired Learning</p>

      {/* Mascot */}
      <div className="mascotBubble">
        <img
          src="/assets/mascot-kidoora.png"
          alt="mascot"
          className="mascotImg"
        />
        <p className="mascotSpeech">
          What do you want to learn today? 🌟
        </p>
      </div>

      {/* Module Grid */}
      <div className="moduleGrid">
        {modules.map((m, i) => (
          <Link
            key={m.id}
            to={`/module/${m.id}`}
            className="moduleCard"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="moduleIconWrap">
              <Icon name={m.iconKey} size={75} />
            </div>

            <div className="moduleInfo">
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <NavBar />
    </div>
  );
}