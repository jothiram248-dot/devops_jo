import { processNomineesResponse } from "@/utils/decryption";
import { NOMINEE_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const nomineeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNominee: builder.query({
      query: (nomineeId) => ({
        url: `${NOMINEE_URL}/${nomineeId}`,
      }),
      // Transform the response to decrypt sensitive data
      transformResponse: (response) => processNomineesResponse(response),
      providesTags: (result, error, nomineeId) => [
        { type: "Nominee", id: nomineeId },
        { type: "Nominee", id: "LIST" },
      ],
    }),

    getEmergencyNominee: builder.query({
      query: (resourceName) => ({
        url: `${NOMINEE_URL}/resources/${resourceName}`,
      }),
      // Transform the response to decrypt sensitive data
      transformResponse: (response) => processNomineesResponse(response),
      providesTags: [{ type: "Nominee", id: "EMERGENCY" }],
    }),

    getAllNominees: builder.query({
      query: (category) => ({
        url: `${NOMINEE_URL}/${category}/resources`,
      }),
      // Transform the response to decrypt sensitive data
      transformResponse: (response) => processNomineesResponse(response),
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

    // adhaarKyc: builder.mutation({
    //   query: (body) => ({
    //     url: `${NOMINEE_URL}/kyc/aadhaar`,
    //     method: "POST",
    //     body: body,
    //   }),
    //   invalidatesTags: [{ type: "User", id: "ME" }], // Invalidate `me` query
    // }),

    // ✅ NEW: Aadhaar 2-step KYC
    aadhaarInitiate: builder.mutation({
      // POST {{baseUrl}}/api/users/nominees/kyc/aadhaar/initiate
      query: (body) => ({
        url: `${NOMINEE_URL}/kyc/aadhaar/initiate`,
        method: "POST",
        body, // { aadhaar_number: "7177..." }
      }),
      invalidatesTags: [{ type: "User", id: "ME" }],
    }),

    aadhaarVerify: builder.mutation({
      // POST {{baseUrl}}/api/users/nominees/kyc/aadhaar/verify
      query: (body) => ({
        url: `${NOMINEE_URL}/kyc/aadhaar/verify`,
        method: "POST",
        body, // { reference_id: "63904139", otp: "257263" }
      }),
      invalidatesTags: [{ type: "User", id: "ME" }],
    }),

    addEmergencyContact: builder.mutation({
      query: (body) => ({
        url: `${NOMINEE_URL}/kyc/contacts`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "User", id: "ME" }], // Invalidate `me` query
    }),

    getKycData: builder.query({
      query: () => ({
        url: `${NOMINEE_URL}/kyc/data`,
      }),
      providesTags: [{ type: "Nominee", id: "KYC_DATA" }],
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
  // useAdhaarKycMutation,

  useAadhaarInitiateMutation,
  useAadhaarVerifyMutation,
  useGetKycDataQuery,
  useAddEmergencyContactMutation,
} = nomineeApiSlice;
