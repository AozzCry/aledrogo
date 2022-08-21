import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    saveCredentials(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("password", action.payload.password);
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
