import modulesDB from "../data/modulesDB";

// Simulated fetch — keeps shape compatible with future AI backend.
export async function fetchModuleById(id, { ageGroup = "6–8", lang = "en" } = {}) {
  await sleep(120);
  const module = modulesDB[id];
  if (!module) throw new Error("Module not found " + id);

  const recommendedLessons = module.lessons.map((l) => ({
    ...l,
    difficulty: adaptDifficulty(l.difficulty, ageGroup)
  }));

  return {
    ...module,
    tailoredFor: { ageGroup, lang },
    recommendedLessons
  };
}

function adaptDifficulty(difficulty, ageGroup) {
  // Example algorithm to adapt difficulty; extend later with ML
  if (ageGroup === "3–5") {
    if (difficulty === "easy") return "easy";
    return "easy";
  }
  if (ageGroup === "6–8") return difficulty;
  if (ageGroup === "9–11") {
    if (difficulty === "easy") return "medium";
    return difficulty;
  }
  if (ageGroup === "12–16") {
    if (difficulty === "medium") return "hard";
    return difficulty;
  }
  return difficulty;
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}