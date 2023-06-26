import { createSlice } from "@reduxjs/toolkit";

export const UserState: UserProfile = {
  email: "",
  nickname: "",
  first_name: "",
  last_name: "",
  date_joined: "",
  is_active_from_admin: false,
  isLoading: false,
    errors: [],
    networkError :false
};

const createReducer = (
  state: UserProfile,
  action: { payload: UserProfile }
) => ({
  ...state,
  ...action.payload,
});

const userSlice = createSlice({
  name: "user",
  initialState: UserState,
  reducers: {
    getUserReducer: createReducer,
  },
});

export const { getUserReducer } = userSlice.actions;

export default userSlice.reducer;