import { RootState } from "./../../store";
import { Profile } from "./types";

export const selectIsAuth = (state: RootState) => Boolean(state.auth.profile);
export const selectIsChecked = (state: RootState) =>
  state.auth.status === "success";
export const selectIsRegistered = (state: RootState) =>
  Boolean(state.auth.profile);
export const selectProfile = (state: RootState): Profile | null =>
  state.auth.profile;
