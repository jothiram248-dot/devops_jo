// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://34.228.169.56:8003/",
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth?.token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({}),
// });

// export const {} = apiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://backend.sacredsecret.in",
  // baseUrl: "http://localhost:4010/",

  prepareHeaders: (headers, { getState, endpoint }) => {
    // If this request is for the S3 upload endpoint,
    // do not attach any extra authentication headers.
    if (endpoint === "uploadProfilePicture") {
      return headers;
    }

    // Otherwise, attach your auth headers.
    const token = getState().auth.token;
    const controlSignature = getState().auth.controlSignature; // Assuming stored in auth state
    const hashToken = getState().auth.hashToken; // Assuming stored in auth state

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (controlSignature) {
      headers.set("X-Control-Signature", controlSignature);
    }
    if (hashToken) {
      headers.set("X-Hash-Token", hashToken);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Dispatch logout action on 401 response
    api.dispatch(logout());
    console.warn("Unauthorized: Logging out due to invalid token");
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Cred", "Creds", "Order"],
  endpoints: (builder) => ({}),
});
