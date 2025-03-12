// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loginIdEmail: null,
//   loginIdUsername: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       const { user, token } = action.payload;
//       state.user = user;
//       state.token = token;
//       state.isAuthenticated = true;
//     },
//     setloginId: (state, action) => {
//       state.loginIdEmail = action.payload.email;
//       state.loginIdUsername = action.payload.username;
//     },

//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loginIdEmail = null;
//       state.loginIdUsername = null;
//     },
//   },
// });

// export const { setCredentials, setloginId, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  controlSignature: null,
  hashToken: null,
  isAuthenticated: false,
  loginIdEmail: null,
  loginIdUsername: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token || state.token;
      state.controlSignature =
        action.payload.controlSignature ?? state.controlSignature;
      state.hashToken = action.payload.hashToken ?? state.hashToken;
      state.isAuthenticated =
        action.payload.isAuthenticated ?? state.isAuthenticated;
      state.user = action.payload.user || state.user;
    },
    setloginId: (state, action) => {
      state.loginIdEmail = action.payload.email;
      state.loginIdUsername = action.payload.username;
    },

    logout: (state) => {
      state.token = null;
      state.controlSignature = null;
      state.hashToken = null;
      state.isAuthenticated = false;
      state.loginIdEmail = null;
      state.loginIdUsername = null;
      state.user = null;
      
    },
  },
});

export const { setCredentials, setloginId, logout } = authSlice.actions;

export default authSlice.reducer;
