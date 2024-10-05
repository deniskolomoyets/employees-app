import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../app/services/auth";
import { RootState } from "../../app/store";

interface InitialState {
  user: (User & { token: string }) | null;
  isAuthenticated: boolean;
} //interface describes what the state will be for authentication

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
}; //initial state, when the user is not logged in yet

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState, // when the user logs out, the state will be reset to the initial state
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      }) // when the login request is fulfilled, the user will be set to the payload and isAuthenticated will be set to true
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      ) //register
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      }); //current
  },
});

export const { logout } = slice.actions; //an action that can be invoked to reset the authentication state (for example, when the user logs out).
export default slice.reducer; //reducer for this slice that will be used to update the state in the Redux store

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated; //selector that will be used to get the isAuthenticated value from the state

export const selectUser = (state: RootState) => state.auth.user; //selector that will be used to get the user value from the state
