import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { fetchModuleById } from "../api/mockApi";
import Icon from "../components/Icon";
import "../styles/modulePage.css";

export default function ModulePage(){
  const { moduleId } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const ageGroup = useUserStore((s)=> s.ageGroup);
  const lang = useUserStore((s)=> s.lang);

  const [data, setData] = useState(loc.state?.moduleData || null);
  const [loading, setLoading] = useState(!data);

  useEffect(()=>{
    let mounted = true;
    (async ()=>{
      if (!data) {
        try {
          setLoading(true);
          const mod = await fetchModuleById(moduleId, { ageGroup, lang });
          if(!mounted) return;
          setData(mod);
        } catch(e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    })();
    return ()=> { mounted = false; };
  }, [moduleId]);

  if (loading) return <div className="moduleLoading">Loading…</div>;
  if (!data) return <div className="moduleNotFound">Module not found</div>;

  return (
    <div className="modulePageWrapper">
      <button className="backBtn" onClick={() => nav(-1)}>← Back</button>

      <div style={{textAlign:'center'}}>
        <div style={{display:'inline-block',borderRadius:120,padding:12,background:'linear-gradient(90deg,#fff,#e8fbff)'}}>
          <Icon name={data.iconKey} size={120} />
        </div>

        <h1 className="moduleTitle">{data.title}</h1>
        <p className="moduleDescription">{data.description}</p>
        <small className="moduleMeta">Tailored for: {data.tailoredFor?.ageGroup || ageGroup} • Language: {data.tailoredFor?.lang || lang}</small>
      </div>

      <div style={{marginTop:24}}>
        <h2 className="sectionTitle">Recommended Lessons</h2>
        <div className="lessonGrid">
          {data.recommendedLessons.map(l => (
            <div className="lessonCard" key={l.lessonId}>
              <div className="lessonInfo">
                <h3>{l.title}</h3>
                <div style={{display:'flex',gap:8,alignItems:'center',marginTop:6}}>
                  <span className="difficultyTag">{l.difficulty}</span>
                  <span className="durationTag">{l.durationMin} min</span>
                </div>
              </div>

              <button className="startLessonBtn" onClick={() => alert(`Start lesson ${l.title} (demo)`)}>Start</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}