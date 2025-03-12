import { USER_NOTIFICATIONS } from "../../constants";
import { apiSlice } from "./apiSlice";

export const usersNotificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: (category) => ({
        url: `${USER_NOTIFICATIONS}/${category}/resources`,
      }),
      providesTags: (result, error, category) => [
        { type: "Notifications", id: category },
      ],
    }),

    getNotificationDetails: builder.query({
      query: (resourcesName) => ({
        url: `${USER_NOTIFICATIONS}/resources/${resourcesName}`,
      }),
      providesTags: (result, error, resourcesName) => [
        { type: "NotificationDetails", id: resourcesName },   { type: "Notifications", id: resourcesName },
      ],
    }),

    createNotification: builder.mutation({
      query: (data) => ({
        url: `${USER_NOTIFICATIONS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Notifications" }, { type: "Metrics" }],
    }),

    updateNotification: builder.mutation({
      query: ({ data, notificationId }) => ({
        url: `${USER_NOTIFICATIONS}/${notificationId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { notificationId }) => [
        { type: "NotificationDetails" },
      ],
    }),

    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `${USER_NOTIFICATIONS}/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, notificationId) => [
        { type: "NotificationDetails" },
      ],
    }),

    deleteAllNotifications: builder.mutation({
      query: (resourcesName) => ({
        url: `${USER_NOTIFICATIONS}/resources/${resourcesName}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, resourcesName) => [
        { type: "Notifications" },
        { type: "NotificationDetails" },
      ],
    }),
    getUpcomingNotifications: builder.query({
      query: () => ({
        url: `${USER_NOTIFICATIONS}/upcoming`,
      }),
      providesTags: (result, error, category) => [
        { type: "Notifications", id: category },
      ],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetNotificationDetailsQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
  useGetUpcomingNotificationsQuery,
} = usersNotificationApiSlice;
