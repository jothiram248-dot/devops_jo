import { NOMINEE_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const nomineeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNominee: builder.query({
      query: (nomineeId) => ({
        url: `${NOMINEE_URL}/${nomineeId}`,
      }),
      providesTags: (result, error, nomineeId) => [
        { type: "Nominee", id: nomineeId }, { type: "Nominee", id: "LIST" }
      ],
      

    }),

    getEmergencyNominee: builder.query({
      query: (resourceName) => ({
        url: `${NOMINEE_URL}/resources/${resourceName}`,
      }),
      providesTags: [{ type: "Nominee", id: "EMERGENCY" }],
    }),

    getAllNominees: builder.query({
      query: (category) => ({
        url: `${NOMINEE_URL}/${category}/resources`,
      }),
      providesTags: [{ type: "Nominee", id: "LIST" }],
    }),

    createNominee: builder.mutation({
      query: (creds) => ({
        url: `${NOMINEE_URL}`,
        method: "POST",
        body: creds,
      }),
      invalidatesTags: [
        { type: "Nominee", id: "LIST" }, // Refresh all nominees
        { type: "Nominee", id: "EMERGENCY" }, // Refresh emergency nominees
        { type: "Metrics" },
      ],
    }),

    updateNominee: builder.mutation({
      query: ({ body, nomineeId }) => ({
        url: `${NOMINEE_URL}/${nomineeId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, { nomineeId }) => [
        { type: "Nominee", id: nomineeId }, // Refresh the updated nominee
        { type: "Nominee", id: "LIST" }, // Refresh nominee list
        { type: "Nominee", id: "EMERGENCY" }, // Refresh emergency nominees
      ],
    }),

    deleteNominee: builder.mutation({
      query: (nomineeId) => ({
        url: `${NOMINEE_URL}/${nomineeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Nominee", id: "LIST" }, // Refresh all nominees

        { type: "Nominee", id: "EMERGENCY" }, // Refresh emergency nominees
      ],
    }),

    deleteAllNominee: builder.mutation({
      query: (resourceName) => ({
        url: `${NOMINEE_URL}/resources/${resourceName}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Nominee", id: "LIST" },
        { type: "Nominee", id: "EMERGENCY" },
      ],
    }),

    adhaarKyc: builder.mutation({
      query: (body) => ({
        url: `${NOMINEE_URL}/kyc/aadhaar`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "User", id: "ME" }], // Invalidate `me` query
    }),

    addEmergencyContact: builder.mutation({
      query: (body) => ({
        url: `${NOMINEE_URL}/kyc/contacts`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "User", id: "ME" }], // Invalidate `me` query
    }),
  }),
});

export const {
  useGetAllNomineesQuery,
  useGetNomineeQuery,
  useGetEmergencyNomineeQuery,
  useCreateNomineeMutation,
  useUpdateNomineeMutation,
  useDeleteNomineeMutation,
  useDeleteAllNomineeMutation,
  useAdhaarKycMutation,
  useAddEmergencyContactMutation,
} = nomineeApiSlice;
