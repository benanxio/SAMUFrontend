import { createSlice } from "@reduxjs/toolkit";
import { ReportsStateType } from "../model";


export const ReportsState: ReportsStateType = {
  
};

const createReducer = (
    state: ReportsStateType ,
    action: { payload: ReportsStateType  }
) => ({
    ...state,
    ...action.payload,
});

const ReportsSlice = createSlice({
    name: "reports",
    initialState: ReportsState ,
    reducers: {
        AtdAtcEstablecimientoReducer:createReducer
    },
});

export const {  } = ReportsSlice.actions;

export default ReportsSlice .reducer;


