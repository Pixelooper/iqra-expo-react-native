import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './slices/homeSlice'
import bookmarkReducer from './slices/bookmarkSlice'
// import counterReducer from './slices/counterSlice'
// import surahReducer from './slices/surahSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    bookmark: bookmarkReducer,
    // counter: counterReducer,
    // surah: surahReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch