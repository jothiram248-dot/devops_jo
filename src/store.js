import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authReducer, { setCredentials } from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { usersApiSlice } from "./features/api/userApiSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "token",
    "user",
    "isAuthenticated",
    "controlSignature",
    "hashToken",
  ],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }).concat(apiSlice.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  const { isAuthenticated, token, controlSignature, hashToken } = state.auth;

  if (!state.auth.user && token && controlSignature && hashToken) {
    store
      .dispatch(usersApiSlice.endpoints.me.initiate())
      .unwrap()
      .then((meResult) => {
        store.dispatch(
          setCredentials({
            token,
            user: meResult.me,
            isAuthenticated: true,
            controlSignature, // Retain existing values
            hashToken, // Retain existing values
          })
        );
      })
      .catch((error) => {
        console.error("Error refreshing user details:", error);
      });
  }
});

export const persistor = persistStore(store);
