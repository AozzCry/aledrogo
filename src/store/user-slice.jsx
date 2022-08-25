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
      state.email = action.payload.email;
      state.name = action.payload.name;
      if (action.payload.avatar) state.avatar = action.payload.avatar;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
