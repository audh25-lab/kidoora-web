const modulesDB = {
  alphabet: {
    id: "alphabet",
    title: "Alphabet Mastery",
    iconKey: "icon_alphabet",
    description: "Animated letters, phonics, tracing and fun interactions.",
    categories: ["letters", "phonics"],
    lessons: [
      { lessonId: "alphabet_intro", title: "A–F Interactive", durationMin: 4, difficulty: "easy", iconKey: "lesson" },
      { lessonId: "alphabet_mid", title: "G–L Sounds", durationMin: 5, difficulty: "medium", iconKey: "lesson" },
      { lessonId: "alphabet_advanced", title: "M–Z Master", durationMin: 6, difficulty: "medium", iconKey: "lesson" }
    ]
  },

  numbers: {
    id: "numbers",
    title: "Numbers & Counting",
    iconKey: "icon_numbers",
    description: "Counting, addition, puzzles and story problems.",
    categories: ["counting", "math"],
    lessons: [
      { lessonId: "numbers_1_10", title: "1–10", durationMin: 4, difficulty: "easy", iconKey: "lesson" },
      { lessonId: "numbers_11_20", title: "11–20", durationMin: 5, difficulty: "medium", iconKey: "lesson" }
    ]
  },

  shapes: {
    id: "shapes",
    title: "Shapes Discovery",
    iconKey: "icon_shapes",
    description: "Recognize, match, and create shapes using playful activities.",
    categories: ["shapes", "visual"],
    lessons: [
      { lessonId: "shapes_basic", title: "Basic Shapes", durationMin: 4, difficulty: "easy", iconKey: "lesson" },
      { lessonId: "shapes_advanced", title: "Advanced Shapes", durationMin: 6, difficulty: "medium", iconKey: "lesson" }
    ]
  }
};

export default modulesDB;