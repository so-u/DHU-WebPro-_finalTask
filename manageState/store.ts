import { configureStore } from "@reduxjs/toolkit";
import { useSelector as rawUseSelector, TypedUseSelectorHook } from "react-redux";
import userReducer from './userSlice'
import haikuReducer from './haikuSlice'

export const store = configureStore({
  reducer: {
      user: userReducer,
      haiku: haikuReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;