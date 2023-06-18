import { createSlice } from "@reduxjs/toolkit";
import { LoginStateType } from "../models/login.model";
import { getTokensFromLocalStorage } from "../services/token-service";
const { tokens } = getTokensFromLocalStorage();
export const LoginState: LoginStateType = {
  errors: {
    detail: "",
  },
  isAuthenticated: false,
  accessToken: tokens?.accessToken,
  refreshToken: tokens?.refreshToken,
  isLoading: false,
};

const createReducer = (
  state: LoginStateType,
  action: { payload: LoginStateType }
) => ({
  ...state,
  ...action.payload,
});

const LoginSlice = createSlice({
  name: "login",
  initialState: LoginState,
  reducers: {
    verifyTokenReducer: createReducer,
    signInReducer: createReducer,
    refreshTokenReducer: createReducer,
  },
});

export const { verifyTokenReducer, signInReducer } = LoginSlice.actions;

export default LoginSlice.reducer;