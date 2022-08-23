import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    name: "",
    avatar: "",
  },
  reducers: {
    saveCredentials(state, action) {
      state.email = action.payload;
      state.name = action.payload;
      state.avatar = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
