export function getAgeGroupContent(ageGroupLabel) {
  const map = {
    "3–5": [{ id: "alphabet", level: "starter" }, { id: "numbers", level: "starter" }, { id: "shapes", level: "starter" }],
    "6–8": [{ id: "alphabet", level: "early" }, { id: "numbers", level: "primary" }, { id: "shapes", level: "primary" }],
    "9–11": [{ id: "alphabet", level: "intermediate" }, { id: "numbers", level: "arithmetic" }, { id: "shapes", level: "visual" }],
    "12–16": [{ id: "numbers", level: "algebra" }, { id: "shapes", level: "geometry" }, { id: "alphabet", level: "advanced" }]
  };
  return map[ageGroupLabel] || map["6–8"];
}