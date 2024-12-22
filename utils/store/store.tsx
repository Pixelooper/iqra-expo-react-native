import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import surahReducer from './slices/surahSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    surah: surahReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch