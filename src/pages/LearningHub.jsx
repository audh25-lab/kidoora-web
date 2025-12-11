// src/pages/LearningHub.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getAgeGroupContent } from "../utils/ageEngine";
import { fetchModuleById } from "../api/mockApi";
import { useUserStore } from "../store/userStore";
import Icon from "../components/Icon";
import NavBar from "../components/NavBar";
import "../styles/learningHub.css";

/**
 * Advanced LearningHub (VERSION A)
 * - loads age-tailored modules via mockApi.fetchModuleById
 * - shows recommended lessons & level
 * - animated cards (framer-motion)
 * - navigates to ModulePage with prefetched moduleData in state
 */

export default function LearningHub() {
  const nav = useNavigate();
  const ageGroup = useUserStore((s) => s.ageGroup);
  const lang = useUserStore((s) => s.lang);

  const [modules, setModules] = useState([]); // array of tailored module objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        // get recommended module ids for this age group
        const preferred = getAgeGroupContent(ageGroup || "6–8");

        // fetch tailored module data in parallel
        const promises = preferred.map(async (p) => {
          try {
            const m = await fetchModuleById(p.id, { ageGroup: ageGroup || "6–8", lang: lang || "en" });
            // ensure we include the "level" information from ageEngine mapping
            return { ...m, requestedLevel: p.level };
          } catch (e) {
            // fallback: return minimal shape so UI can show something
            return {
              id: p.id,
              title: p.id,
              description: "Content unavailable.",
              iconKey: "lesson",
              recommendedLessons: [],
              requestedLevel: p.level,
              tailoredFor: { ageGroup, lang }
            };
          }
        });

        const results = await Promise.all(promises);
        if (!mounted) return;
        setModules(results.filter(Boolean));
      } catch (err) {
        console.error("LearningHub load error:", err);
        if (!mounted) return;
        setError("Failed to load modules. Try again later.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [ageGroup, lang]);

  const openModule = (id, moduleData) => {
    // navigate to module route with moduleData to avoid refetching
    nav(`/module/${id}`, { state: { moduleData } });
  };

  const filtered = modules.filter((m) => {
    if (!query) return true;
    const q = query.trim().toLowerCase();
    return (
      (m.title && m.title.toLowerCase().includes(q)) ||
      (m.description && m.description.toLowerCase().includes(q)) ||
      (m.categories && m.categories.join(" ").toLowerCase().includes(q))
    );
  });

  return (
    <div className="learningHubWrapper" role="main">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 className="learningTitle">Learning Hub</h1>
          <p className="learningSubtitle" aria-live="polite">
            {ageGroup
              ? `Tailored for ages ${ageGroup} • Language: ${lang || "en"}`
              : "Choose age group on onboarding to tailor lessons."}
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            aria-label="Search modules"
            placeholder="Search modules, e.g. alphabet, numbers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.06)",
              width: 220,
              fontSize: 14
            }}
          />
        </div>
      </header>

      <section aria-live="polite" style={{ marginTop: 18 }}>
        {loading && (
          <div style={{ padding: 32, textAlign: "center", color: "#055" }}>
            Loading modules…
          </div>
        )}

        {error && (
          <div style={{ padding: 20, background: "#ffecec", color: "#8a1f1f", borderRadius: 12 }}>
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div style={{ padding: 20, textAlign: "center", color: "#666" }}>
                No modules found.
              </div>
            ) : (
              <div className="learningHubGrid" aria-live="polite">
                {filtered.map((m) => (
                  <motion.div
                    key={m.id}
                    className="learnCard"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.99 }}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => openModule(m.id, m)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openModule(m.id, m);
                    }}
                    aria-label={`Open module ${m.title}`}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {/* Icon reads runtime-generated assets via Icon component */}
                      <Icon name={m.iconKey || "lesson"} size={84} alt={m.title} />
                    </div>

                    <div style={{ marginTop: 8 }}>
                      <div className="learnCardTitle">{m.title}</div>
                      <div className="learnCardDesc" style={{ marginTop: 8 }}>
                        {m.description}
                      </div>

                      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 12, opacity: 0.8 }}>
                          Level: <strong>{m.requestedLevel || (m.tailoredFor?.ageGroup ?? "auto")}</strong>
                        </div>

                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          {Array.isArray(m.recommendedLessons) && m.recommendedLessons.length > 0 && (
                            <div style={{ fontSize: 12, opacity: 0.85 }}>
                              {m.recommendedLessons.length} lessons
                            </div>
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); openModule(m.id, m); }}
                            className="btn"
                            style={{ padding: "6px 10px", borderRadius: 10, fontSize: 13 }}
                          >
                            Open
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <NavBar />
    </div>
  );
}