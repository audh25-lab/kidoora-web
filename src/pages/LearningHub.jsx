import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { getAgeGroupContent } from "../utils/ageEngine";
import { fetchModuleById } from "../api/mockApi";
import Icon from "../components/Icon";
import NavBar from "../components/NavBar";
import "../styles/learningHub.css";

export default function LearningHub(){
  const ageGroup = useUserStore((s) => s.ageGroup);
  const lang = useUserStore((s) => s.lang);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async ()=>{
      const preferred = getAgeGroupContent(ageGroup || "6–8");
      const loaded = await Promise.all(preferred.map(async (p) => {
        try {
          const m = await fetchModuleById(p.id, { ageGroup, lang });
          return m;
        } catch { return null; }
      }));
      if (!mounted) return;
      setModules(loaded.filter(Boolean));
    })();
    return ()=> { mounted = false; };
  }, [ageGroup, lang]);

  return (
    <div className="learningHubWrapper">
      <h1 className="learningHubTitle">Learning Center</h1>
      <p className="kicker">Age group: {ageGroup || "6–8"} • Language: {lang}</p>

      <div className="learningHubGrid" aria-live="polite">
        {modules.length ? modules.map(m => (
          <div key={m.id} className="learnCard" onClick={()=> window.location.href = `/module/${m.id}`}>
            <div style={{display:'flex',justifyContent:'center'}}><Icon name={m.iconKey} size={84} /></div>
            <div className="learnCardTitle">{m.title}</div>
            <div className="learnCardDesc">{m.description}</div>
            <div style={{marginTop:10,fontSize:12,opacity:.7}}>Level: {m.tailoredFor?.ageGroup || 'auto'}</div>
          </div>
        )) : <div>Loading modules…</div>}
      </div>

      <NavBar />
    </div>
  );
}