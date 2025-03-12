// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { X, Mail, MessageSquare, Phone } from "lucide-react";
// import toast from "react-hot-toast";
// import { useUpdateNotificationMutation } from "@/features/api/userNotificationApiSlice";
// import { FaWhatsapp } from "react-icons/fa";

// const NotificationEditDrawer = ({ isOpen, onClose, notificationData }) => {
//   if (!isOpen) return null;

//   const initialNotificationDays = (() => {
//     const reminder =
//       notificationData?.notification?.sms?.reminder ||
//       notificationData?.notification?.email?.reminder ||
//       notificationData?.notification?.whatsapp?.reminder;

//     if (reminder === 15 || reminder === 30) return String(reminder);
//     return "custom";
//   })();

//   const initialCustomDays =
//     initialNotificationDays === "custom"
//       ? notificationData?.notification?.sms?.reminder ||
//         notificationData?.notification?.email?.reminder ||
//         notificationData?.notification?.whatsapp?.reminder
//       : "";

//   const initialSelectedMethod = Object.keys(
//     notificationData?.notification || {}
//   ).filter((method) => notificationData.notification[method]?.reminder);
//   const [updateNotification, { isLoading, isSuccess, isError, error }] =
//     useUpdateNotificationMutation();

//   const [startDate, setStartDate] = useState(
//     notificationData?.subStartDate || ""
//   );
//   const [endDate, setEndDate] = useState(notificationData?.subEndDate || "");
//   const [notificationDays, setNotificationDays] = useState(
//     initialNotificationDays
//   );
//   const [customDays, setCustomDays] = useState(initialCustomDays);
//   const [selectedMethod, setSelectedMethod] = useState(initialSelectedMethod);
//   const [additionalInfo, setAdditionalInfo] = useState(
//     notificationData?.additionalInfo || ""
//   );
//   const [notificationToggles, setNotificationToggles] = useState(() => {
//     const toggles = {};
//     initialSelectedMethod.forEach((method) => {
//       toggles[method.toLowerCase()] = {
//         isOn: notificationData?.notification[method]?.isOn !== false,
//       };
//     });
//     return toggles;
//   });

//   const [initialSummary, setInitialSummary] = useState({
//     days: initialNotificationDays,
//     methods: initialSelectedMethod,
//   });

//   const notificationOptions = [
//     { value: "15", label: "15 Days" },
//     { value: "30", label: "30 Days" },
//     { value: "custom", label: "Custom" },
//   ];

//   useEffect(() => {
//     // Set initial summary when component loads
//     setInitialSummary({
//       days: initialNotificationDays,
//       methods: initialSelectedMethod,
//     });
//   }, [notificationData]);

//   const handleToggleNotificationDays = (value) => {
//     setNotificationDays(value);

//     if (value === initialSummary.days) {
//       // Restore the initial summary if days match
//       setSelectedMethod(initialSummary.methods);
//     } else {
//       // Clear the summary for other days
//       setSelectedMethod([]);
//     }

//     if (value !== "custom") setCustomDays(""); // Reset custom days when switching to predefined options
//   };

//   const handleToggleMethod = (method) => {
//     const normalizedMethod = method.toLowerCase(); // Normalize the method to lowercase
//     setSelectedMethod(
//       (prev) =>
//         prev.includes(normalizedMethod)
//           ? prev.filter((m) => m !== normalizedMethod) // Remove the method if it exists
//           : [...prev, normalizedMethod] // Add the normalized method
//     );
//   };

//   const handleToggleSwitch = (method) => {
//     setNotificationToggles((prev) => ({
//       ...prev,
//       [method.toLowerCase()]: {
//         isOn: !prev[method.toLowerCase()]?.isOn,
//       },
//     }));
//   };
//   //   const handleToggleMethod = (method) => {
//   //     setSelectedMethod((prev) =>
//   //       prev.includes(method)
//   //         ? prev.filter((m) => m !== method)
//   //         : [...prev, method]
//   //     );
//   //   };

//   const handleSaveChanges = async () => {
//     if (notificationDays === "custom" && !customDays) {
//       toast.error("Please enter custom days for notification.");
//       return;
//     }

//     // Prepare the payload
//     const payload = {
//       subStartDate: startDate,
//       subEndDate: endDate,
//       notification: selectedMethod.reduce((acc, method) => {
//         acc[method.toLowerCase()] = {
//           reminder: parseInt(
//             notificationDays === "custom" ? customDays : notificationDays,
//             10
//           ),
//           isOn: notificationToggles[method.toLowerCase()]?.isOn,
//         };
//         return acc;
//       }, {}),
//       additionalInfo,
//     };

//     try {
//       await updateNotification({
//         data: payload,
//         notificationId: notificationData?.id,
//       }).unwrap();
//       toast.success("Notification updated successfully!");
//       onClose(); // Close the drawer after successful update
//     } catch (err) {
//       toast.error(
//         `Failed to update notification: ${err.message || "Unknown error"}`
//       );
//     }
//   };

//   return (
//     <>
//       {/* Blur Background */}
//       <div
//         className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
//         onClick={onClose}
//       ></div>

//       {/* Drawer Content */}
//       <motion.div
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "100%" }}
//         transition={{ duration: 0.4 }}
//         className="fixed top-0 right-0 z-50 w-full md:w-1/2 lg:w-1/3 h-full bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-700/90 shadow-xl p-8 overflow-y-auto"
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-extrabold text-white mb-2">
//             {notificationData?.platformName || "Notification"}
//             <span className="text-accent-100 text-sm bg-accent-800 px-2 py-1 rounded-md font-semibold ml-2">
//               Editing
//             </span>
//           </h2>
//           <p className="text-sm font-medium text-gray-400">
//             You are modifying subscription details. Don’t forget to save your
//             changes!
//           </p>
//         </div>

//         {/* Start and End Dates */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-400 mb-2">
//               Start Date
//             </label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="input-primary"
//               style={{ colorScheme: "dark" }}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-400 mb-2">
//               End Date
//             </label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="input-primary"
//               style={{ colorScheme: "dark" }}
//             />
//           </div>
//         </div>

//         {/* Notification Days */}
//         {/* Notification Days */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-400 mb-2">
//             Notification Date
//           </label>
//           <div className="flex flex-wrap gap-4">
//             {notificationOptions.map((option) => (
//               <motion.div
//                 key={option.value}
//                 whileHover={{
//                   scale: notificationDays === option.value ? 1 : 1.05,
//                 }}
//                 className={`flex-1 text-center p-4 rounded-lg shadow-md cursor-pointer ${
//                   notificationDays === option.value
//                     ? "bg-accent-100 text-dark-100"
//                     : "bg-dark-300 text-white hover:bg-dark-400"
//                 }`}
//                 onClick={() => handleToggleNotificationDays(option.value)}
//               >
//                 {option.label}
//               </motion.div>
//             ))}
//           </div>

//           {notificationDays === "custom" && (
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-400 mb-2">
//                 Enter Custom Days
//               </label>
//               <input
//                 type="number"
//                 value={customDays}
//                 onChange={(e) => setCustomDays(e.target.value)}
//                 className="input-primary"
//                 placeholder="Enter number of days"
//               />
//             </div>
//           )}
//         </div>

//         {/* Notification Methods */}
//         {/* <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-300 mb-4">
//             Notification Methods
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {["SMS", "Email", "Whatsapp"].map((method) => {
//               const isSelected = selectedMethod.includes(method);
//               const bgColor =
//                 method.toLowerCase() === "sms"
//                   ? "bg-blue-500"
//                   : method.toLowerCase() === "email"
//                   ? "bg-green-500"
//                   : "bg-teal-500";

//               return (
//                 <button
//                   key={method}
//                   className={`flex-1 p-2 rounded-md border shadow-md transition-all flex items-center gap-2 ${
//                     isSelected
//                       ? `${bgColor} text-white border-${bgColor}`
//                       : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
//                   }`}
//                   onClick={() => handleToggleMethod(method)}
//                 >
//                   <div
//                     className={`w-6 h-6 rounded-full flex items-center justify-center ${bgColor} text-white`}
//                   >
//                     {method === "SMS" ? (
//                       <MessageSquare className="w-4 h-4" />
//                     ) : method === "Email" ? (
//                       <Mail className="w-4 h-4" />
//                     ) : (
//                       <FaWhatsapp className="w-4 h-4" />
//                     )}
//                   </div>
//                   {method.toUpperCase()}
//                 </button>
//               );
//             })}
//           </div>
//         </div> */}

//         {/* Toggle Instruction */}
//         <div className="mb-6 text-center text-sm text-gray-400">
//           Click the toggle to turn notifications on or off.
//         </div>

//         {/* Notification Summary */}
//         {/* <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-300 mb-4">
//             Notification Summary
//           </h3>
//           <div className="flex flex-col gap-4">
//             {selectedMethod.map((method) => (
//               <div
//                 key={method}
//                 className="flex items-center justify-between p-4 bg-gradient-to-r from-dark-300 via-dark-200 to-dark-300 rounded-lg shadow-md border border-gray-700 hover:border-accent-100 transition-all duration-300"
//               >
//                 <div className="flex items-center gap-4">
//                   <div
//                     className={`p-3 rounded-full shadow-lg ${
//                       method.toLowerCase() === "sms"
//                         ? "bg-blue-500"
//                         : method.toLowerCase() === "email"
//                         ? "bg-green-500"
//                         : "bg-purple-500"
//                     } text-white flex items-center justify-center`}
//                   >
//                     {method === "sms" ? (
//                       <MessageSquare className="w-5 h-5" />
//                     ) : method === "email" ? (
//                       <Mail className="w-5 h-5" />
//                     ) : (
//                       <Phone className="w-5 h-5" />
//                     )}
//                   </div>
//                   <div>
//                     <p className="text-base font-bold text-white capitalize">
//                       {method.toUpperCase()}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Reminder:{" "}
//                       <span className="text-accent-100">
//                         {notificationDays === "custom"
//                           ? customDays
//                           : notificationDays}{" "}
//                         Days
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleToggleSwitch(method)}
//                   className={`w-14 h-8 flex items-center ${
//                     notificationToggles[method.toLowerCase()]?.isOn
//                       ? "bg-green-500"
//                       : "bg-gray-500"
//                   } rounded-full p-1 transition-colors duration-300`}
//                 >
//                   <div
//                     className={`w-6 h-6 bg-white rounded-full transform transition-transform ${
//                       notificationToggles[method.toLowerCase()]?.isOn
//                         ? "translate-x-6"
//                         : ""
//                     }`}
//                   ></div>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div> */}

//         {/* Additional Information */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-400 mb-2">
//             Additional Information
//           </label>
//           <textarea
//             value={additionalInfo}
//             onChange={(e) => setAdditionalInfo(e.target.value)}
//             className="input-primary resize-none"
//             rows={3}
//           />
//         </div>

//         {/* Save Button */}
//         <button
//           onClick={handleSaveChanges}
//           className={`btn-primary w-full mt-6 ${
//             isLoading ? "opacity-50 pointer-events-none" : ""
//           }`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Saving..." : "Save Changes"}
//         </button>
//       </motion.div>
//     </>
//   );
// };

// export default NotificationEditDrawer;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useUpdateNotificationMutation } from "@/features/api/userNotificationApiSlice";

const NotificationEditDrawer = ({ isOpen, onClose, notificationData }) => {
  if (!isOpen) return null;

  const [updateNotification, { isLoading }] = useUpdateNotificationMutation();

  const [endDate, setEndDate] = useState(notificationData?.subEndDate || "");
  const [selectedRenewalType, setSelectedRenewalType] = useState(
    notificationData?.dateType || ""
  );
  const [renewalFrequency, setRenewalFrequency] = useState(
    notificationData?.renewalFrequency || ""
  );
  const [additionalInfo, setAdditionalInfo] = useState(
    notificationData?.additionalInfo || ""
  );
  const [isNotificationOn, setIsNotificationOn] = useState(
    notificationData?.isOn ?? true
  );

  const renewalTypeOptions = [
    { value: "upcoming-renewals", label: "Upcoming Renewals" },
    { value: "bill-date", label: "Bill Date" },
    { value: "expiry-date", label: "Expiry Date" },
  ];

  const renewalFrequencyOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "halfYearly", label: "Half-Yearly" },
    { value: "yearly", label: "Yearly" },
  ];

  const handleRenewalTypeChange = (event) => {
    const value = event.target.value;
    setSelectedRenewalType(value);
    if (value !== "upcoming-renewals") {
      setRenewalFrequency(""); // Reset renewal frequency if not "Upcoming Renewals"
    }
  };

  const handleSaveChanges = async () => {
    if (!endDate || !selectedRenewalType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        subEndDate: endDate,
        dateType: selectedRenewalType,
        ...(selectedRenewalType === "Upcoming Renewals" && {
          renewalFrequency: renewalFrequency || null,
        }),
        additionalInfo,
        isOn: isNotificationOn,
      };

      await updateNotification({
        data: payload,
        notificationId: notificationData?.id,
      }).unwrap();

      toast.success("Notification updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update notification. Please try again.");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
        onClick={onClose}
      ></div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 right-0 z-50 w-full md:w-1/2 lg:w-1/3 h-full bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-700/90 shadow-xl p-8 overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Edit Notification
          </h2>
          <p className="text-sm font-medium text-gray-400">
            Modify notification details and save changes.
          </p>
        </div>

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
              Select Renewal Type
            </option>
            {renewalTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

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
          />
        </div>

        {selectedRenewalType === "upcoming-renewals" && (
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

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            Notification
          </h3>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-dark-300 via-dark-200 to-dark-300 rounded-lg shadow-md border border-gray-700 hover:border-accent-100 transition-all duration-300">
            <span className="text-white text-base font-bold">
              Notification {isNotificationOn ? "On" : "Off"}
            </span>
            <button
              onClick={() => setIsNotificationOn((prev) => !prev)}
              className={`w-14 h-8 flex items-center ${
                isNotificationOn ? "bg-green-500" : "bg-gray-500"
              } rounded-full p-1 transition-colors duration-300`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transform transition-transform ${
                  isNotificationOn ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>
        </div>

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

        <button
          onClick={handleSaveChanges}
          className={`btn-primary w-full mt-6 ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </motion.div>
    </>
  );
};

export default NotificationEditDrawer;
