import { createSlice } from "@reduxjs/toolkit";

import { RegisterStateType } from "../models/register.models";

export const RegisterState: RegisterStateType = {
  errors: {
    detail: "",
  },
  isSendEmail: false,
  isLoading: false,
  isActivateEmail: false,
};

const createReducer = (
  state: RegisterStateType,
  action: { payload: RegisterStateType }
) => ({
  ...state,
  ...action.payload,
});

const RegisterSlice = createSlice({
  name: "register",
  initialState: RegisterState,
  reducers: {
    signupReducer: createReducer,
    activateUserReducer: createReducer,
  },
});

export const { signupReducer, activateUserReducer } = RegisterSlice.actions;

export default RegisterSlice.reducer;
