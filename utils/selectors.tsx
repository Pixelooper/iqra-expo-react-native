import { createSelector } from "reselect";
import { RootState } from "./store/store";
import { ayat, surah } from "@/types/type";

// Base selector: Get all surahs
const selectSurahs = (state: RootState) => state.surah.data;

// Selector to get a specific surah by ID
export const selectSurahById = (id: number) =>
  createSelector([selectSurahs], (surahs) => surahs.find((surah: surah) => surah.no === id));

// Selector to get a specific ayat by aid
export const selectAyatById = (id: number, aid: number) =>
    createSelector([selectSurahById(id)], (selectedSurah) => selectedSurah?.ayat.find((ayat: ayat) => ayat.no === aid));