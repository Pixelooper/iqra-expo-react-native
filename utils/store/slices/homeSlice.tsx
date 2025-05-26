import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

interface homeState {
  data: object;
  version: Number,
  loading: boolean;
  error: string | null;
}

const initialState: homeState = {
  data: {},
  version: 0,
  loading: false,
  error: null,
};

export const fetchHomeData = createAsyncThunk("surah/fetchHomeData", async (_, thunkAPI) => {
  try {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;
    
    const response = await axios.get(`${API_URL}/home`, {
      headers: {
         Authorization: " Bearer " + JWT_TOKEN,
      }
    });

    return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch surah data");
    }
});

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(fetchHomeData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchHomeData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchHomeData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default homeSlice.reducer;
