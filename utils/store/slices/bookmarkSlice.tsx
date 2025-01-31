import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurahState {
    surah: any[];
    lastRead: any[];
    ayat: { sId: string; aId: string }[];
    tafsir: { sId: string; aId: string }[];
    continue: { sId?: string; aId?: string } | null;
    history: string[];
    previousRoutes: string[];
    loading: boolean;
    error: string | null;
}
  
const initialState: SurahState = {
    surah: [],
    lastRead: [],
    ayat: [],
    tafsir: [],
    continue: null,
    history: [],
    previousRoutes: [],
    loading: false,
    error: null,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addSurah: (state, action: PayloadAction<string>) => {
        if (!state.surah.includes(action.payload)) {
          state.surah.push(action.payload);
        }
    },
    addAyat: (state, action: PayloadAction<{ sId: string; aId: string }>) => {
        const { sId, aId } = action.payload;
        const exists = state.ayat.some(
            (item) => item.sId === sId && item.aId === aId
        );

        if (!exists) {
            state.ayat.push({ sId, aId });
        }
    },
    addTafsir: (state, action: PayloadAction<{ sId: string; aId: string }>) => {
        const { sId, aId } = action.payload;
        const exists = state.tafsir.some(
            (item) => item.sId === sId && item.aId === aId
        );

        if (!exists) {
            state.tafsir.push({ sId, aId });
        }
    },
    updateLastRead: (state, action: PayloadAction<string>) => {
        // Remove the existing surahId if it already exists
      state.lastRead = state.lastRead.filter((id) => id !== action.payload);

      // Add the surahId to the front of the array
      state.lastRead.unshift(action.payload);

      // Keep only the most recent 5 items
      if (state.lastRead.length > 5) {
        state.lastRead.pop();
      }
    },
    setContinueReading: (state, action: PayloadAction<{ sId: string; aId: string }>) => {
        state.continue = action.payload;
    },
    addRoute: (state, action: PayloadAction<string>) => {
      state.history.push(action.payload);
    },
    addPreviousRoute: (state, action: PayloadAction<string>) => {
      // Prevent duplicate consecutive routes
      if (state.previousRoutes[state.previousRoutes.length - 1] !== action.payload) {
        state.previousRoutes.push(action.payload);
      }
    },
    removeLastRoute: (state) => {
      state.previousRoutes.pop();
    },
    clearHistory: (state) => {
      state.previousRoutes = [];
    }
  },
});

export const { addSurah, addAyat, addTafsir, updateLastRead, setContinueReading, addRoute, addPreviousRoute, removeLastRoute, clearHistory } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;