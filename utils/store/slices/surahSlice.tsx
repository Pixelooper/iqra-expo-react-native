import { createSlice, createAsyncThunk, PayloadAction  } from "@reduxjs/toolkit";
import axios from "axios";

interface SurahState {
  data: any[];
  version: Number,
  loading: boolean;
  error: string | null;
//   surahDetails: any | null;
}

const initialState: SurahState = {
  data: [],
  version: 0,
  loading: false,
  error: null,
//   surahDetails: null,
};

export const fetchSurahData = createAsyncThunk("surah/fetchSurahData", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/book/surah");
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch surah data");
  }
});

const surahSlice = createSlice({
    name: "surah",
    initialState,
    reducers: {
        // setSurahDetails: (state, action: PayloadAction<number>) => {
        //     const surah = state.data.find((item) => item.no === action.payload); 
        //     state.surahDetails = surah || null; 
        // },
        // clearSurahDetails: (state) => {
        //     state.surahDetails = null;
        // },
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(fetchSurahData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSurahData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchSurahData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

// export const { setSurahDetails, clearSurahDetails } = surahSlice.actions;
export default surahSlice.reducer;
