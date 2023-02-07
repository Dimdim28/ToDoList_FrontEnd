import { homeReducer } from "./slices/home/home";
import { useDispatch } from "react-redux";
import { authReducer } from "./slices/auth/auth";
import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./slices/profile/profile";

const store = configureStore({
  reducer: { auth: authReducer, home: homeReducer, profile: profileReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
