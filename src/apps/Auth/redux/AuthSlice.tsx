import { createSlice } from "@reduxjs/toolkit";
import { AuthStateType } from "../models";


export const AuthState: AuthStateType = {
    errors: {
        detail: ""
    },
    isLoading: false,
    isUpdatedPassword: false,
    isUserIsActivatedWithAdmin: false,
};

const createReducer = (
    state: AuthStateType,
    action: { payload: AuthStateType }
) => ({
    ...state,
    ...action.payload,
});

const AuthSlice = createSlice({
    name: "auth",
    initialState: AuthState,
    reducers: {
        resetPasswordReducer: createReducer,

    },
});

export const { resetPasswordReducer } = AuthSlice.actions;

export default AuthSlice.reducer;

