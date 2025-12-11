import { create } from "zustand";

const KEY = "kidoora_user_v2";
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { ageGroup: null, lang: "en", consent: false, progress: {}, rewards: [] };
  } catch {
    return { ageGroup: null, lang: "en", consent: false, progress: {}, rewards: [] };
  }
}

export const useUserStore = create((set, get) => ({
  ...load(),

  setAgeGroup: (ageGroup) => {
    set({ ageGroup });
    persist({ ...get(), ageGroup });
  },

  setLang: (lang) => {
    set({ lang });
    persist({ ...get(), lang });
  },

  setConsent: (consent) => {
    set({ consent });
    persist({ ...get(), consent });
  },

  addReward: (reward) => {
    const rewards = [...(get().rewards || []), reward];
    set({ rewards });
    persist({ ...get(), rewards });
  },

  reset: () => {
    localStorage.removeItem(KEY);
    set({ ageGroup: null, lang: "en", consent: false, progress: {}, rewards: [] });
  }
}));

function persist(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}