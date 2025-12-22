import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import cacheReducer from "./cacheSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cache: cacheReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

