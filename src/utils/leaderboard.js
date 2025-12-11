export function getLeaderboard() {
  return JSON.parse(localStorage.getItem("kidoora_leaderboard") || "[]");
}

export function addLeaderboardScore(name, score) {
  const list = getLeaderboard();
  list.push({ name, score, date: Date.now() });
  list.sort((a,b)=> b.score - a.score);
  localStorage.setItem("kidoora_leaderboard", JSON.stringify(list));
}
