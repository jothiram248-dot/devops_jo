import { resetPassword } from "@/api/auth";
import { USERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";
import { setCredentials } from "../auth/authSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: creds,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // Wait for login API to complete
          const { data: loginData } = await queryFulfilled;

          // Set token and related details
          dispatch(
            setCredentials({
              token: loginData.token,
              controlSignature: loginData.controlSignature,
              hashToken: loginData.hashToken,
            })
          );

          // Explicitly trigger the 'me' query after login
          // const meResult = await dispatch(
          //   usersApiSlice.endpoints.me.initiate(undefined, {
          //     forceRefetch: true,
          //   })
          // ).unwrap();

          // Update user details in state
          dispatch(
            setCredentials({
              token: loginData.token,
              controlSignature: loginData.controlSignature,
              hashToken: loginData.hashToken,
              user: meResult.me,
              isAuthenticated: true,
            })
          );
        } catch (error) {
          console.error("Error during login or fetching user details:", error);
        }
      },
      invalidatesTags: [{ type: "Metrics" }],
    }),

    register: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: creds,
      }),
    }),
    verify: builder.mutation({
      query: ({ code, loginId, service }) => ({
        url: `${USERS_URL}/verify?service=${service}`,
        method: "POST",
        body: { code, loginId },
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     await queryFulfilled;
      //     setTimeout(() => {
      //       dispatch(
      //         usersApiSlice.util.invalidateTags([{ type: "User", id: "ME" }])
      //       );
      //     }, 700);
      //   } catch (error) {
      //     console.error("Error validating 'me' after verification:", error);
      //   }
      // },
    }),
    code: builder.mutation({
      query: ({ loginId, service }) => ({
        url: `${USERS_URL}/verify/send?service=${service}`,
        method: "POST",
        body: { loginId },
      }),
    }),
    forgotPass: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: creds,
      }),
    }),
    forgotResetPass: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/forgot-reset-password`,
        method: "POST",
        body: creds,
      }),
    }),
    verifyCode: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/verify/code`,
        method: "POST",
        body: creds,
      }),
    }),
    me: builder.query({
      query: () => ({
        url: `${USERS_URL}/me`,
      }),
      providesTags: [{ type: "User", id: "ME" }],
    }),

    getMatricsData: builder.query({
      query: () => ({
        url: `${USERS_URL}/metrics`,
      }),
      providesTags: ["Metrics"], // Tag to allow invalidation & automatic refetch
    }),

    getUploadUrl: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile/picture/upload`,
      }),
    }),
    uploadProfilePicture: builder.mutation({
      query: ({ signedUrl, file }) => ({
        url: signedUrl,
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      }),
      invalidatesTags: [{ type: "User", id: "ME" }],
    }),

    updateOrRemoveImageKey: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/profile/picture`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "ME" }, { type: "Profile", id: "PROFILE" }],
    }),

    getProfile: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/profile`,
      }),
      providesTags: [{ type: "Profile", id: "PROFILE" }],
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body,
      }),
      // invalidatesTags: [{ type: "User", id: "ME" }, { type: "Profile", id: "PROFILE" }],
      invalidatesTags: (result, error, arg) => {
        // Suppose you only want to skip re-fetch if phone or email was updated.
        // If `arg` contains `phone` or `email`, do NOT invalidate any tags.
        // console.log("arg", arg);
        if (arg?.email || arg?.phone) {
          return [];
        }
        // Otherwise (if it's something else like firstName, lastName, etc.),
        // return the default array of tags to invalidate.
        return [{ type: 'User', id: 'ME' }, { type: 'Profile', id: 'PROFILE' }];
      },

    }),

    resetPassword: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/reset-password`,
        method: "POST",
        body: creds,
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "DELETE",
      }),
    }),
    logoutUser: builder.mutation({
      query: ({ type }) => ({
        url: `${USERS_URL}/logout?type=${type}`,
        method: "POST", // Use POST instead of GET for security reasons
      }),
    }),

    activateSmartNotificationsTrial: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/activate/trial`,
              method: "POST",
            }),
            // refresh user, metrics after activation so UI updates everywhere
            invalidatesTags: [{ type: "User", id: "ME" }, "Metrics"],
          }),
    
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useCodeMutation,
  useForgotPassMutation,
  useForgotResetPassMutation,
  useVerifyCodeMutation,
  useMeQuery,
  useGetMatricsDataQuery,
  useGetUploadUrlQuery,
  useUploadProfilePictureMutation,
  useUpdateOrRemoveImageKeyMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
  useLogoutUserMutation,
  useActivateSmartNotificationsTrialMutation,
} = usersApiSlice;
usersApiSlice;
