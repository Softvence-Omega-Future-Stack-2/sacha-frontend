import { createSlice } from "@reduxjs/toolkit";
import type { TUser } from "../../user.type";
import type { RootState } from "../../store";

type Tstate = {
  user: TUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: Tstate = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user: apiUser, success } = action.payload || {};

      if (!success || !apiUser) {
        console.error("Invalid payload received:", action.payload);
        return;
      }

      const { user, profile, tokens } = apiUser;

      state.user = {
        id: user.id,
        email: user.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
        role: profile.role,
      };
      state.accessToken = tokens.access;
      state.refreshToken = tokens.refresh;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth?.user;
export const selectToken = (state: RootState) => state.auth?.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth?.refreshToken;

const authReducer = authSlice.reducer;
export default authReducer;
