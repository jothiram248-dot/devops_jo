import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Eye, Trash, Trash2, XCircle } from "lucide-react";
import {
  useDeleteAllNotificationsMutation,
  useGetAllNotificationsQuery,
} from "../../features/api/userNotificationApiSlice";

const notificationOptions = {
  socialMedia: [
    {
      id: 1,
      name: "LinkedIn Premium",
      value: "LinkedIn Premium",
      date: "2024-03-15",
    },
    {
      id: 2,
      name: "Twitter Premium",
      value: "Twitter Premium",
      date: "2024-04-01",
    },
    { id: 3, name: "Others", value: "Others" },
  ],
  businessTools: [
    {
      id: 4,
      name: "Google Workspace",
      value: "Google Workspace",
      date: "2024-03-20",
    },
    {
      id: 5,
      name: "Microsoft Outlook",
      value: "Microsoft Outlook",
      date: "2024-03-25",
    },
    { id: 6, name: "Others", value: "Others" },
  ],
  entertainmentPlatform: [
    {
      id: 7,
      name: "OTT Subscription",
      value: "OTT Subscriptions",
      date: "2024-03-18",
    },
    {
      id: 8,
      name: "Adult Subscription",
      value: "Adult Subscriptions",
      date: "2024-03-30",
    },
    { id: 9, name: "Others", value: "Others" },
  ],
  onlineGiftVoucher: [
    {
      id: 10,
      name: "Amazon Voucher",
      value: "Amazon Voucher",
      date: "2024-05-01",
    },
    {
      id: 11,
      name: "Flipkart Voucher",
      value: "Flipkart Voucher",
      date: "2024-06-10",
    },
    { id: 12, name: "Others", value: "Others" },
  ],
  otherAutoPay: [
    {
      id: 13,
      name: "Utility Bills",
      value: "Utility Bills",
      date: "2024-04-05",
    },
    {
      id: 14,
      name: "Credit Card Payment",
      value: "credit-card",
      date: "2024-04-15",
    },
    { id: 15, name: "Others", value: "Others" },
  ],
};

const NotificationListPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [customInput, setCustomInput] = useState("");
  const options = notificationOptions[type] || [];
  const {
    data: notificationListData,
    isLoading,
    isError,
  } = useGetAllNotificationsQuery(type);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletePlatformName, setDeletePlatformName] = useState("");
  const [platformToDelete, setPlatformToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteAllNotifications] = useDeleteAllNotificationsMutation();
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setCustomInput("");
  };

  const resources = notificationListData?.resources || [];

  const handleProceed = () => {
    const value = selectedOption === "Others" ? customInput : selectedOption;
    const isOthers = selectedOption === "Others";

    navigate(`/notifications/${type}/add`, {
      state: { displayName: value, isOthers },
    });
  };

  const handleDelete = (platformName) => {
    setDeleteModalOpen(true);
    setPlatformToDelete(platformName);
    setDeletePlatformName(""); // Reset the input field

    setErrorMessage(""); // Reset the error message
  };

  const confirmDelete = async () => {
    if (!deletePlatformName) {
      setErrorMessage("Platform name cannot be empty.");
      return;
    }

    if (deletePlatformName !== platformToDelete) {
      setErrorMessage("Platform name does not match. Please try again.");
      return;
    }
    // if (deletePlatformName === platformToDelete) {
    try {
      await deleteAllNotifications(platformToDelete).unwrap();
      setDeleteModalOpen(false);
      setPlatformToDelete(null);
      setErrorMessage(""); // Clear the error message
      toast.success("Notification deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete notification. Please try again.");
    }
    // } else {
    //   toast.error("Platform name does not match. Please try again.");
    // }
  };

  // Assuming resource.renewalDate is a valid ISO string
  const formattedRenewalDate = (dateString) => {
    if (!dateString) return ""; // Handle empty or invalid dates
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Ensure the date is displayed in UTC
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  
  

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-dark-100 via-dark-200 to-dark-300">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back to Dashboard */}
          <button
            onClick={() =>
              navigate("/dashboard", { state: { id: "notifications" } })
            }
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          {/* Dropdown Section */}
          <div className="bg-dark-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 capitalize">
              {(() => {
                const typeMappings = {
                  entertainmentPlatform: "Entertainment Platform Subscription",
                  socialMedia: "Social Media Subscription",
                  businessTools: "Business Tools Subscription",
                  onlineGiftVoucher: "Online Gift Voucher",
                  otherAutoPay: "Other Auto Pay",
                };
                return typeMappings[type] || "Unknown Subscription";
              })()}
            </h2>

            <select
              className="input-primary mb-4"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="" disabled>
                {{
                  socialMedia: "Select A Social Media Service",
                  businessTools: "Select A Business Tool Service",
                  entertainmentPlatform: "Select A Entertainment Service",
                  onlineGiftVoucher: "Select A Gift Voucher",
                  otherAutoPay: "Select A Bill Type",
                }[type] || "Select An Option"}
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* Custom Input */}

            {selectedOption === "Others" && (
              <input
                type="text"
                placeholder={
                  {
                    socialMedia: "Enter Your Social Media Subscription Name",
                    businessTools:
                      "Enter Your Business Tools Subscription Name",
                    entertainmentPlatform:
                      "Enter Your Entertainment Subscription Name",
                    onlineGiftVoucher: "Enter Your Voucher Name",
                    otherAutoPay: "Enter Your Bill Name",
                  }[type] || "Enter details"
                }
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="input-primary mb-4"
              />
            )}

            {/* Proceed Button */}
            {selectedOption && (selectedOption !== "Others" || customInput) && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceed}
                className="btn-primary mt-6"
              >
                Click to Proceed
              </motion.button>
            )}
          </div>

          {/* Dummy Data Section */}
          <div className="mt-12">
            <h3 className="text-lg font-bold text-accent-100 mb-4">
              {/* Upcoming Renewals */}
              {/* {type === "onlineGiftVoucher"
                ? "Expiry Date"
                : type === "otherAutoPay"
                ? "Due Date"
                : "Upcoming Renewals"} */}

              {resources.length > 0 &&
                (type === "onlineGiftVoucher"
                  ? "Expiry Date"
                  : type === "otherAutoPay"
                  ? "Due Date"
                  : "Upcoming Renewals")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="glow-box p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-white font-semibold">
                      {resource.platformName}
                    </h4>
                    {resource.renewalDate && (
                      <p className="text-sm text-gray-400">
                        Renewal Date:{" "}
                        {formattedRenewalDate(resource.renewalDate)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    {/* View Button */}
                    <button
                      onClick={() =>
                        navigate(
                          `/notifications/${type}/${resource.platformName}/view`
                        )
                      }
                      className="w-10 h-10 flex items-center justify-center border border-accent-100 text-accent-100 rounded-lg hover:bg-accent-100 hover:text-white transition-all duration-300"
                      aria-label="View Credential"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(resource.platformName)}
                      className="w-10 h-10 flex items-center justify-center border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                      aria-label="Delete Credential"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-dark-200 rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-4">Confirmation</h3>
            <p className="text-gray-300 mb-6">
              To delete the notification, type <b>{platformToDelete}</b> below:
            </p>
            <input
              type="text"
              value={deletePlatformName}
              onChange={(e) => {
                setDeletePlatformName(e.target.value);
                setErrorMessage(""); // Clear error message on input change
              }}
              className="input-primary mb-2 w-full"
              placeholder="Type platform name here"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationListPage;
