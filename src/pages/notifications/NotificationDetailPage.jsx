import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Mail,
  MessageSquare,
  Phone,
  Trash,
  X,
} from "lucide-react";
import {
  useDeleteNotificationMutation,
  useGetNotificationDetailsQuery,
} from "@/features/api/userNotificationApiSlice";
import NotificationEditDrawer from "./NotificationEditDrawer";
import { FaWhatsapp } from "react-icons/fa";

const ConfirmationModal = ({ isOpen, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-200 rounded-lg p-6 shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold text-white mb-4">Confirmation</h3>
        <p className="text-gray-300 mb-6">{message || "Are you sure?"}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose(); // Ensure the modal closes after confirming
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationDetailsPage = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { data, isLoading, error, refetch } =
    useGetNotificationDetailsQuery(id);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [deleteNotification, { isLoading: isDeleteLoading }] =
    useDeleteNotificationMutation();
    console.log("Notification Query State:", { data, isLoading, error });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteNotificationId, setDeleteNotificationId] = useState(null);
  const dynamicFieldLabels = {
    "Utility Bills": "Utility Provider Name",
    "Adult Subscriptions": "Service Name",
    "OTT Subscriptions": "OTT Platform Name",
  };

  // Dummy Data
  // const notificationDetails = [
  //   {
  //     id: 1,
  //     platformName: "LinkedIn Premium",
  //     startDate: "2024-03-01",
  //     endDate: "2024-03-31",
  //     notificationDays: "15",
  //     methods: ["SMS", "Mail"],
  //     additionalInfo: "Renew for professional connections",
  //   },
  //   {
  //     id: 2,
  //     platformName: "Google Workspace",
  //     startDate: "2024-04-01",
  //     endDate: "2024-04-30",
  //     notificationDays: "30",
  //     methods: ["IVR"],
  //     additionalInfo:
  //       "Monthly renewal for workspace tools Monthly renewal for workspace tools ",
  //   },
  // ];

  const notificationDetails = data?.resources || []; // Fallback to an empty array if no data is available

  const openDrawer = (notification) => {
    setSelectedNotification(notification);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedNotification(null);
  };

  const openDeleteModal = (notificationId) => {
    setDeleteNotificationId(notificationId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteNotificationId(null);
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    try {
      await deleteNotification(deleteNotificationId).unwrap();
      toast.success("Notification deleted successfully!");
      closeDeleteModal();
      // Optionally refetch data here or remove the deleted item from state
      refetch();
    } catch (err) {
      console.error("Failed to delete notification:", err);
      toast.error("Failed to delete the notification. Please try again.");
    }
  };

  const convertTo12HourFormat = (time) => {
    if (!time || !time.includes(":")) return "12:00 AM"; // Default time
    const [hours, minutes] = time.split(":").map(Number); // Split time into hours and minutes
    if (isNaN(hours) || isNaN(minutes)) return "12:00 AM"; // Fallback if parsing fails
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    const adjustedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="">
      <div className="pt-24 min-h-screen bg-gradient-to-b from-dark-100 via-dark-200 to-dark-300">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            {/* Back to List */}
            <button
              onClick={() => navigate(`/notifications/${type}`)}
              className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Notifications
            </button>

            {/* Page Heading */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 glow-title">
                {(() => {
                  const typeMappings = {
                    "social-media": "Social Media Notifications",
                    "business-tools": "Business Tool Notifications",
                    entertainmentPlatform: "Entertainment Notifications",
                    "gift-voucher": "Gift Voucher Notifications",
                    others: "Miscellaneous Notifications",
                  };
                  return typeMappings[type] || "Notification Details";
                })()}
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                {(() => {
                  const descriptionMappings = {
                    "social-media":
                      "Manage your social media subscription notifications. Keep track of upcoming renewals and modifications.",
                    "business-tools":
                      "Review and manage notifications for your business tool subscriptions. Stay updated with their status.",
                    entertainment:
                      "Edit or delete notifications for your entertainment subscriptions. Keep track of renewals effortlessly.",
                    "gift-voucher":
                      "Monitor notifications for your gift vouchers and ensure timely usage before expiration.",
                    others:
                      "Handle miscellaneous notifications, including utilities and other recurring subscriptions.",
                  };
                  return (
                    descriptionMappings[type] ||
                    "Manage and review all your subscription notifications. You can edit or delete details as per your needs."
                  );
                })()}
              </p>
            </div>

            {/* Details Section */}
            {isLoading && <p className="text-gray-300">Loading...</p>}
            {error && <p className="text-red-500">No resources found</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!isLoading &&
                !error &&
                notificationDetails.map((notification) => (
                  <div
                    key={notification.id}
                    className="glow-box p-6 md:p-8 group relative"
                  >
                    {/* Notification Status Badge */}
                    <div
                      className={`absolute top-4 right-4 px-4 py-2 flex items-center gap-2 rounded-full shadow-md text-sm font-medium transition-all duration-300 ${
                        notification.isOn
                          ? "bg-green-500/90 text-white hover:bg-green-400/90 shadow-green-500/50"
                          : "bg-red-500/90 text-white hover:bg-red-400/90 shadow-red-500/50"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full animate-pulse ${
                          notification.isOn ? "bg-green-300" : "bg-red-300"
                        }`}
                      ></div>
                      <span>{notification.isOn ? "Active" : "Inactive"}</span>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 space-y-4">
                      <h2 className="text-lg font-extrabold text-white mb-4">
                        {notification.platformName}
                      </h2>

                      <div className="space-y-2">
                        {/* Date Type */}
                        {notification.dateType && (
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-400">
                              Date Type
                            </p>
                            <p className="text-base font-semibold text-white capitalize">
                              {notification.dateType.replace("-", " ")}
                            </p>
                          </div>
                        )}

                        {/* Renewal Frequency */}
                        {notification.renewalFrequency && (
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-400">
                              Renewal Frequency
                            </p>
                            <p className="text-base font-semibold text-white">
                              {notification.renewalFrequency}
                            </p>
                          </div>
                        )}

                        {/* End Date */}
                        {notification.subEndDate && (
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-400">
                              End Date
                            </p>
                            <p className="text-base font-semibold text-white">
                              {new Date(
                                notification.subEndDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                timeZone: "UTC", 
                              })}
                            </p>
                          </div>
                        )}

                        {/* Additional Info */}
                        {notification.additionalInfo && (
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-400">
                              Additional Info
                            </p>
                            <p className="text-base font-semibold text-white">
                              {notification.additionalInfo}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between gap-4 mt-4">
                        {/* Edit Button */}
                        <button
                          onClick={() => openDrawer(notification)}
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                        >
                          <Edit className="w-5 h-5" />
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => openDeleteModal(notification.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                        >
                          <Trash className="w-5 h-5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Drawer */}
      <NotificationEditDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        notificationData={selectedNotification}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this notification?"
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default NotificationDetailsPage;
