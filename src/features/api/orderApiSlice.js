import { ORDER_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/history`,
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),
    // from razor pay info data
    getOrderByIdWithPaymentInfo: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/payment`,
      }),
      // This is the key change - invalidate the ME tag when payment info is fetched
      // and shows a successful payment
      invalidatesTags: (result) => {
        // Check if payment exists and was successful
        if (
          result?.payment?.status === "success" ||
          result?.payment?.method === "razorpay"
        ) {
          return [{ type: "User", id: "ME" }];
        }
        return [];
      },
    }),
    checkOut: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/checkout`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderByIdWithPaymentInfoQuery,
  useCheckOutMutation,
} = orderApiSlice;
