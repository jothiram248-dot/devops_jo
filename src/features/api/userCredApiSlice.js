// import { processCredentialsResponse } from "@/utils/decryption";
// import { USER_CREDS } from "../../constants";
// import { apiSlice } from "./apiSlice";

// export const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getCred: builder.query({
//       query: (credId) => ({
//         url: `${USER_CREDS}/resources/${credId}`,
//       }),
//       // Transform the response to decrypt sensitive data
//       transformResponse: (response) => processCredentialsResponse(response),
//       providesTags: (result, error, credId) => [{ type: "Creds", id: credId }],
//     }),

//     getAllCreds: builder.query({
//       query: (category) => ({
//         url: `${USER_CREDS}/${category}/resources`,
//       }),
//       // Transform the response to decrypt sensitive data
//       transformResponse: (response) => processCredentialsResponse(response),
//       providesTags: [{ type: "Creds", id: "LIST" }],
//     }),

//     createCred: builder.mutation({
//       query: (creds) => ({
//         url: `${USER_CREDS}`,
//         method: "POST",
//         body: creds,
//       }),
//       invalidatesTags: [{ type: "Creds", id: "LIST" }, { type: "Metrics" }],
//     }),

//     updateCred: builder.mutation({
//       query: ({ creds, credId }) => ({
//         url: `${USER_CREDS}/${credId}`,
//         method: "PUT",
//         body: creds,
//       }),

//       invalidatesTags: (result, error, { credId }) => [
//         { type: "Cred", id: credId },
//       ],
//     }),
//     deleteCred: builder.mutation({
//       query: (credId) => ({
//         url: `${USER_CREDS}/${credId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: [{ type: "Creds", id: "LIST" }],
//     }),

//     deleteAllCred: builder.mutation({
//       query: (resourceName) => ({
//         url: `${USER_CREDS}/resources/${resourceName}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: [{ type: "Creds", id: "LIST" }],
//     }),
//   }),
// });

// export const {
//   useGetAllCredsQuery,
//   useGetCredQuery,
//   useCreateCredMutation,
//   useUpdateCredMutation,
//   useDeleteCredMutation,
//   useDeleteAllCredMutation,
// } = usersApiSlice;



import { processCredentialsResponse } from "@/utils/decryption";
import { USER_CREDS } from "../../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCred: builder.query({
      query: (credId) => ({
        url: `${USER_CREDS}/resources/${credId}`,
      }),
      transformResponse: (response) => processCredentialsResponse(response),
      providesTags: (result, error, credId) => [
        { type: "Creds", id: credId },
        { type: "Creds", id: "LIST" }, // Also tag with LIST
      ],
    }),

    getAllCreds: builder.query({
      query: (category) => ({
        url: `${USER_CREDS}/${category}/resources`,
      }),
      transformResponse: (response) => processCredentialsResponse(response),
      providesTags: (result, error, category) => {
        // Provide tags for each individual credential + list tag
        const tags = [
          { type: "Creds", id: "LIST" },
          { type: "Creds", id: `LIST-${category}` },
        ];
        
        // Add individual credential tags from the result
        if (result?.resources) {
          result.resources.forEach((resource) => {
            tags.push({ type: "Creds", id: resource.id });
          });
        }
        
        return tags;
      },
    }),

    createCred: builder.mutation({
      query: (creds) => ({
        url: `${USER_CREDS}`,
        method: "POST",
        body: creds,
      }),
      async onQueryStarted(creds, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Invalidate all relevant tags
          dispatch(
            apiSlice.util.invalidateTags([
              { type: "Creds", id: "LIST" },
              { type: "Creds", id: `LIST-${creds.category}` },
              { type: "Metrics" },
              // If the response includes the new credential ID, invalidate it too
              ...(data?.id ? [{ type: "Creds", id: data.id }] : []),
            ])
          );
        } catch (error) {}
      },
      invalidatesTags: (result, error, creds) => [
        { type: "Creds", id: "LIST" },
        { type: "Creds", id: `LIST-${creds.category}` },
        { type: "Metrics" },
      ],
    }),

    updateCred: builder.mutation({
      query: ({ creds, credId }) => ({
        url: `${USER_CREDS}/${credId}`,
        method: "PUT",
        body: creds,
      }),
      async onQueryStarted({ creds, credId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.invalidateTags([
              { type: "Creds", id: credId },
              { type: "Creds", id: "LIST" },
              { type: "Creds", id: `LIST-${creds.category}` },
            ])
          );
        } catch (error) {}
      },
      invalidatesTags: (result, error, { credId, creds }) => [
        { type: "Creds", id: credId },
        { type: "Creds", id: "LIST" },
        { type: "Creds", id: `LIST-${creds.category}` },
      ],
    }),

    deleteCred: builder.mutation({
      query: (credId) => ({
        url: `${USER_CREDS}/${credId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, credId) => [
        { type: "Creds", id: "LIST" },
        { type: "Creds", id: credId },
      ],
    }),

    deleteAllCred: builder.mutation({
      query: (resourceName) => ({
        url: `${USER_CREDS}/resources/${resourceName}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Creds", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCredsQuery,
  useGetCredQuery,
  useCreateCredMutation,
  useUpdateCredMutation,
  useDeleteCredMutation,
  useDeleteAllCredMutation,
} = usersApiSlice;