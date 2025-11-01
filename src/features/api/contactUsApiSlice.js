import { CONTACT_US_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const contactUsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
      query: (body) => ({
        url: `${CONTACT_US_URL}`,
        method: "POST",
        body, // { name: string, email: string, phone?: string, message: string }
      }),
    }),
  }),
});

export const { useSubmitContactFormMutation } = contactUsApiSlice;