import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, X, Mail, MessageSquare, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateNotificationMutation } from "@/features/api/userNotificationApiSlice";
import { FaWhatsapp } from "react-icons/fa";

// --- Helpers for nicer errors & date inputs ---
const toInputDate = (d = new Date()) => {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const formatApiError = (err) => {
  const title = err?.data?.message || "Please fix the following:";
  const details = Array.isArray(err?.data?.details) ? err.data.details : [];

  if (details.length) {
    const items = details.map((d) => {
      const label = d?.context?.label || (d?.path || []).join(".") || "Field";
      // Clean up the backend message to be more human friendly
      let msg = (d?.message || "Invalid value.")
        .replace(/"([^"]+)"/g, "$1")
        .replace(
          /must be today.*?later\.?/i,
          "must be today (until 11:59 PM) or a future date."
        );
      return `${label}: ${msg}`;
    });
    return { title, items };
  }

  return { title, items: [err?.data?.message || "Something went wrong. Please try again."] };
};

const NotificationFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { displayName, isOthers } = location.state || {};
  const { type } = useParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notificationDays, setNotificationDays] = useState("4");
  const [customDays, setCustomDays] = useState("");
  const [selectedMethod, setSelectedMethod] = useState([]);
  const [dynamicFieldValue, setDynamicFieldValue] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [overlayPosition, setOverlayPosition] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState(false);
  const [selectedRenewalType, setSelectedRenewalType] = useState("");
  const [renewalFrequency, setRenewalFrequency] = useState("");
  const [showRenewalFrequency, setShowRenewalFrequency] = useState(false);

  const [selectedTimes, setSelectedTimes] = useState({
    SMS: "12:00",
    Mail: "12:00",
    IVR: "12:00",
  });
  const toggleRefs = useRef({});
  const overlayRef = useRef();
  const formRef = useRef();
  const [createNotification, { isLoading }] = useCreateNotificationMutation();

  const notificationOptions = [
    { value: "15", label: "15 Days" },
    { value: "30", label: "30 Days" },
    { value: "custom", label: "Custom Days" },
  ].filter((option) => type === "businessTools" || option.value !== "15");

  const dynamicFieldLabels = {
    "Utility Bills": "Bill Name",
    "Adult Subscriptions": "Adult Platform Name",
    "OTT Subscriptions": "OTT Platform Name",
  };

  const methodDetails = {
    SMS: "SMS will be sent to your registered mobile number.",
    Mail: "An email will be sent to your registered email address.",
    WhatsApp: "You will receive a WhatsApp message on your registered number.", // Updated
  };

  const renewalTypeOptions = [
    { value: "upcoming-renewals", label: "Upcoming Renewals" },
    { value: "expiry-date", label: "Expiry Date" },
    { value: "bill-date", label: "Bill Date" },
  ];

  const renewalFrequencyOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "halfYearly", label: "Half-Yearly" },
    { value: "yearly", label: "Yearly" },
  ];

  const isDynamicFieldRequired = dynamicFieldLabels[displayName];

  const handleToggle = (value, refKey) => {
    if (disabledOptions && value !== notificationDays) {
      toast("Delete the notification setting below to change the duration.", {
        className: "bg-yellow-100 text-yellow-800 p-3 rounded-lg shadow-md",
        duration: 4000,
        icon: "⚠️",
      });
      return;
    }
    setNotificationDays(value);
    setShowOverlay(true);

    if (toggleRefs.current[refKey]) {
      const rect = toggleRefs.current[refKey].getBoundingClientRect();
      const topOffset = rect.top + window.scrollY - rect.height / 2;
      let leftOffset = rect.left + window.scrollX + rect.width + 10;

      if (leftOffset + 300 > window.innerWidth) {
        leftOffset = rect.left + window.scrollX - 300;
      }

      setOverlayPosition({
        top: Math.max(10, topOffset),
        left: Math.max(10, leftOffset),
      });
    }
  };

  const handleRemoveTag = (method) => {
    setSelectedMethod(selectedMethod.filter((m) => m !== method));
    if (selectedMethod.length === 1) {
      setShowTags(false);
      setDisabledOptions(false);
    }
  };

  const handleApply = () => {
    const newTime = selectedTimes.default || "00:00";
    setSelectedTimes((prev) => ({
      ...prev,
      ...Object.fromEntries(
        selectedMethod.map((method) => [method, newTime]) // Update time for all selected methods
      ),
    }));
    setShowTags(true);
    setShowOverlay(false);
    setDisabledOptions(true);
  };

  const validateForm = () => {
    const errors = [];
  
    if (!endDate) errors.push("Please select a date.");
  
    // Make sure the chosen date is today or later (end of day).
    if (endDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const end = new Date(endDate);
      // Treat date-only as "end of selected day" to match backend expectation
      end.setHours(23, 59, 59, 999);
  
      if (end < today) {
        errors.push('"Subscription End Date" must be today (until 11:59 PM) or a future date.');
      }
    }
  
    if (isDynamicFieldRequired && !dynamicFieldValue) {
      errors.push(`${dynamicFieldLabels[displayName]} is required.`);
    }
  
    return errors;
  };
  
  useEffect(() => {
    // Show the "Renewal Frequency" field only if "Upcoming Renewals" is selected
    setShowRenewalFrequency(selectedRenewalType === "upcoming-renewals");
  }, [selectedRenewalType]);

  const handleRenewalTypeChange = (event) => {
    setSelectedRenewalType(event.target.value);
    setEndDate(""); // Clear the end date if renewal type changes
  };
  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      toast.dismiss(); // Clear any previous toasts
      toast(
        (t) => (
          <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg border border-accent-200">
            <h4 className="text-lg font-bold text-red-500 mb-2">
              Please Address the Following:
            </h4>
            <ul className="list-disc pl-6 text-sm text-gray-300 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        ),
        {
          position: "top-right",
          duration: 6000,
          // icon: "⚠️",
        }
      );
      return;
    }

    try {
      const notificationPayload = selectedMethod.reduce((acc, method) => {
        const methodKey =
          method.toLowerCase() === "mail" ? "email" : method.toLowerCase();
        acc[methodKey] = {
          reminder: parseInt(
            notificationDays === "custom" ? customDays : notificationDays,
            10
          ),
          reminderTime: selectedTimes.default || "00:00",
        };
        return acc;
      }, {});

      // const payload = {
      //   category: type,
      //   data: {
      //     platformName: displayName,
      //     ...(isDynamicFieldRequired && {
      //       otherPlatformName: dynamicFieldValue,
      //     }),
      //     subStartDate: startDate,
      //     subEndDate: endDate,
      //     notification: notificationPayload,
      //     additionalInfo,
      //   },
      // };

      const payload = {
        category: type,
        data: {
          platformName: !isOthers ? displayName : "Others",
          ...(isOthers && {
            otherPlatformName: displayName,
          }),
          ...(isDynamicFieldRequired && {
            otherPlatformName: dynamicFieldValue,
          }),
          subEndDate: endDate,
          dateType: selectedRenewalType || "bill-date",
          ...(selectedRenewalType === "upcoming-renewals" && {
            renewalFrequency: renewalFrequency || null,
          }),
          additionalInfo,
        },
      };

      await createNotification(payload).unwrap();
      toast.success("Notification created successfully!", {
        position: "top-right",
        duration: 5000,
        icon: "✅",
      });
      navigate(`/notifications/${type}`);
    } catch (error) {
      const { title, items } = formatApiError(error);
    
      toast.dismiss();
      toast.custom((t) => (
        <div className="pointer-events-auto max-w-[420px] w-full">
          <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl border border-accent-200">
            <h4 className="text-lg font-bold text-red-500 mb-2">{title}</h4>
            <ul className="list-disc pl-6 text-sm text-gray-300 space-y-1">
              {items.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        </div>
      ), { position: "top-right", duration: 8000 });
      
    }
    
  };
  console.log(displayName, isOthers);
  const calculateReminder = () => {
    let reminderDate;

    // Subtract from the endDate based on notificationDays
    if (notificationDays === "custom") {
      reminderDate = new Date(endDate);
      reminderDate.setDate(reminderDate.getDate() - (customDays || 0));
    } else {
      reminderDate = new Date(endDate);
      reminderDate.setDate(reminderDate.getDate() - notificationDays);
    }

    // Format the reminder date to show it in a readable format
    const formattedReminder = reminderDate.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return `${formattedReminder} (${calculateTimeForReminder()})`; // Add formatted time if needed
  };

  const calculateTimeForReminder = () => {
    // Calculate time for notification
    return selectedTimes.default
      ? convertTo12HourFormat(selectedTimes.default)
      : "12:00 AM";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target) &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        setShowOverlay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const convertTo12HourFormat = (time) => {
    if (!time || !time.includes(":")) return "12:00 AM"; // Default time
    const [hours, minutes] = time.split(":").map(Number); // Split time into hours and minutes
    if (isNaN(hours) || isNaN(minutes)) return "12:00 AM"; // Fallback if parsing fails
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    const adjustedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const renderReminderMessage = () => {
    if (!endDate) return null;

    const effectiveNotificationDays = notificationDays || "4"; // Default to 4 days
    const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const frequencyMessage =
      showRenewalFrequency && renewalFrequency ? ` (${renewalFrequency})` : "";

    return (
      <div className="p-5 ">
        <p className="text-sm text-gray-300 mb-4">
          A reminder will be sent{" "}
          {/* <span className="text-accent-100 font-semibold">
            {`${effectiveNotificationDays} days`}
          </span>{" "}
          before your{" "}
          <span className="text-accent-100 font-semibold">
            {selectedRenewalType.toLowerCase()}
          </span>{" "}
          on{" "} */}
          {/* <span className="text-accent-100 font-semibold">
            {formattedEndDate}
          </span> */}
          {/* {frequencyMessage} */}
          via:
        </p>
        <div className="flex gap-4">
          {/* SMS */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-full text-white shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-gray-300 text-sm">SMS</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-full text-white shadow-md">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-gray-300 text-sm">Email</span>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500 rounded-full text-white shadow-md">
              <FaWhatsapp className="w-5 h-5" />
            </div>
            <span className="text-gray-300 text-sm">WhatsApp</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-24 min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto p-6 md:p-8 lg:p-10 rounded-lg shadow-lg"
          ref={formRef}
        >
          <button
            onClick={() => navigate(`/notifications/${type}`)}
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="bg-dark-300 p-8 rounded-xl shadow-lg glow-box">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Notification Settings
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={displayName}
                readOnly={!isOthers}
                className="input-primary"
              />
            </div>

            {isDynamicFieldRequired && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  {/* {!type === "otherAutoPay" && dynamicFieldLabels[displayName]} */}
                </label>
                <input
                  type="text"
                  value={dynamicFieldValue}
                  onChange={(e) => setDynamicFieldValue(e.target.value)}
                  placeholder={`Enter Your ${dynamicFieldLabels[displayName]}`}
                  className="input-primary"
                />
              </div>
            )}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-primary"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-primary"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div> */}

            {/* Renewal Type Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Renewal Type
              </label>
              <select
                value={selectedRenewalType}
                onChange={handleRenewalTypeChange}
                className="input-primary"
              >
                <option value="" disabled>
                  Select Your Renewal Type
                </option>
                {renewalTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Date Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {selectedRenewalType === "upcoming-renewals" &&
                  "Upcoming Renewal Date"}
                {selectedRenewalType === "bill-date" && "Bill Date"}
                {selectedRenewalType === "expiry-date" && "Expiry Date"}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-primary"
                style={{ colorScheme: "dark" }}
                min={toInputDate()}
              />
            </div>

            {/* Renewal Frequency Field */}
            {showRenewalFrequency && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Renewal Frequency
                </label>
                <select
                  value={renewalFrequency}
                  onChange={(e) => setRenewalFrequency(e.target.value)}
                  className="input-primary"
                >
                  <option value="" disabled>
                    Select Frequency
                  </option>
                  {renewalFrequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4">{renderReminderMessage()}</div>

            {/* <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {type === "socialMedia" ? "Renewal Date" : " Notification Date"}
              </label>
              <div className="flex flex-wrap gap-4">
                {notificationOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    ref={(el) => (toggleRefs.current[option.value] = el)}
                    whileHover={{ scale: 1.05 }}
                    className={`flex-1 text-center p-4 rounded-lg shadow-md cursor-pointer ${
                      notificationDays === option.value
                        ? "bg-accent-100 text-dark-100"
                        : "bg-dark-300 text-white hover:bg-dark-400"
                    }`}
                    onClick={() => handleToggle(option.value, option.value)}
                  >
                    {option.label}
                  </motion.div>
                ))}
              </div>
            </div> */}

            {/* {showTags && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Notification Summary
                </h3>
                <div className="flex flex-col gap-4">
                  {selectedMethod.map((method) => (
                    <div
                      key={method}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-dark-200 via-dark-300 to-dark-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                 
                      <div className="flex items-center gap-4">
               
                        <div
                          className={`p-3 rounded-full shadow-lg ${
                            method === "SMS"
                              ? "bg-blue-500"
                              : method === "Mail"
                              ? "bg-green-500"
                              : method === "WhatsApp"
                              ? "bg-teal-500"
                              : "bg-gray-500" // Default color if method is undefined
                          } text-white flex items-center justify-center`}
                        >
                          {method === "SMS" ? (
                            <MessageSquare className="w-5 h-5" />
                          ) : method === "Mail" ? (
                            <Mail className="w-5 h-5" />
                          ) : (
                            <FaWhatsapp className="w-6 h-6" />
                          )}
                        </div>

                  
                        <div>
                          <p className="text-base font-bold text-white capitalize">
                            {method}
                          </p>
                          <p className="text-sm text-gray-400">
                            Reminder:{" "}
                            <span className="text-accent-100">
                              {calculateReminder()}
                            </span>{" "}
                            | Time:{" "}
                            <span className="text-accent-100">
                              {selectedTimes[method]}
                            </span>
                          </p>
                        </div>
                      </div>

                
                      <button
                        onClick={() => handleRemoveTag(method)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Additional Information
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="input-primary resize-none"
                rows={3}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Notification"}
            </motion.button>
          </div>
        </motion.div>
      </div>
      {/* 
      {showOverlay && (
        <>
       
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            onClick={() => setShowOverlay(false)}
          ></div>

       
          <motion.div
            id="overlay"
            ref={overlayRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed z-50 inset-0 flex items-center justify-center"
          >
            <div className="relative bg-gradient-to-br from-dark-100 to-dark-200 p-8 rounded-xl shadow-xl w-full max-w-md border border-dark-300">
           
              <button
                onClick={() => setShowOverlay(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

          
              <div className="text-center mb-6">
                <h3 className="text-3xl font-extrabold text-accent-100 mb-2">
                  Notification Settings
                </h3>
                <p className="text-sm text-gray-400">
                  Configure your preferences for timely alerts.
                </p>
              </div>

      
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">
                  Remind Before
                </h4>
                {notificationDays === "custom" ? (
                  <input
                    type="number"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    className="input-primary w-full text-center"
                    placeholder="Enter Days"
                  />
                ) : (
                  <p className="text-lg font-semibold text-white">
                    {`${notificationDays} Days`}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  A reminder will be sent to you{" "}
                  {notificationDays === "custom"
                    ? `${customDays || "..."}` // If it's a custom number of days, display that
                    : notificationDays}{" "}
                  before your{" "}
                  {
                    type === "onlineGiftVoucher"
                      ? "expiry date" // If the type is "onlineGiftVoucher", display "expiry date"
                      : type === "otherAutoPay"
                      ? "due date" // If the type is "otherAutoPay", display "due date"
                      : "renewal date" // For any other type, default to "renewal date"
                  }
                  .
                </p>
              </div>

       
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">
                  Notification Time
                </h4>
                <div className="flex items-center gap-4">
                  <input
                    type="time"
                    value={selectedTimes.default || "00:00"} // Default to 12:00 AM
                    onChange={(e) => {
                      const newTime = e.target.value; // Get the updated time
                      setSelectedTimes((prev) => ({
                        ...prev,
                        default: newTime, // Update the default time
                        ...Object.fromEntries(
                          selectedMethod.map((method) => [method, newTime]) // Sync with selected methods
                        ),
                      }));
                    }}
                    className="w-36 px-3 py-2 text-center rounded-md bg-dark-200 text-white border border-dark-300 focus:ring-2 focus:ring-accent-100 appearance-none"
                    style={{
                      height: "2.5rem", // Ensure sufficient height
                      fontSize: "1rem", // Adjust font size for better readability
                      lineHeight: "1.5rem", // Improve line-height for text alignment
                      colorScheme: "dark", // Use dark color scheme
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Notifications will be sent at{" "}
                  {selectedTimes.default
                    ? convertTo12HourFormat(selectedTimes.default)
                    : "12:00 AM"}
                  .
                </p>
              </div>

        
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">
                  Notification Methods
                </h4>
                <div className="flex gap-3 justify-center">
                  {["SMS", "Mail", "WhatsApp"].map((method) => {
                    const isSelected = selectedMethod.includes(method);
                    const methodColor =
                      method === "SMS"
                        ? "bg-blue-500"
                        : method === "Mail"
                        ? "bg-green-500"
                        : "bg-teal-500";

                    return (
                      <button
                        key={method}
                        onClick={() => {
                          setSelectedMethod((prev) =>
                            prev.includes(method)
                              ? prev.filter((m) => m !== method)
                              : [...prev, method]
                          );
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all ${
                          isSelected
                            ? `${methodColor} text-white`
                            : "bg-dark-200 text-gray-300 hover:bg-dark-300"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full ${methodColor}`}
                        >
                          {method === "SMS" && (
                            <MessageSquare className="w-4 h-4" />
                          )}
                          {method === "Mail" && <Mail className="w-4 h-4" />}
                          {method === "WhatsApp" && (
                            <FaWhatsapp className="w-5 h-5" />
                          )}
                        </div>
                        <span>{method}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  {selectedMethod.length === 1
                    ? methodDetails[selectedMethod[0]]
                    : selectedMethod.length > 1
                    ? `Notifications will be sent via ${selectedMethod.join(
                        ", "
                      )}.`
                    : "Select at least one notification method"}
                </p>
              </div>

        
              <button
                onClick={() => {
                  handleApply(selectedTimes.default || "00:00"); // Pass reminderTime
                }}
                className="btn-primary w-full mt-4"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )} */}
    </div>
  );
};

export default NotificationFormPage;
