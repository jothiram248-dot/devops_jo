import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import dayjs from "dayjs";
import { useGetUpcomingNotificationsQuery } from "@/features/api/userNotificationApiSlice";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const NotificationCard = ({ notification, onClose }) => (
  <motion.div
    key={notification.id}
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 50, scale: 0.9 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
    className="fixed bottom-8 right-4 md:right-8 z-50 p-5 relative rounded-lg text-gray-800 flex items-start gap-4"
    style={{
      maxWidth: "calc(100vw - 2rem)", // Responsive width for small screens
      width: "20rem", // Default width
      backgroundColor: "#F0FDF4", // Very light green background
    }}
  >
    {/* Laser Border Animation */}
    <div className="absolute inset-0 rounded-lg border-2 border-transparent animate-laser-border"></div>

    {/* Animated Bell Icon */}
    <motion.div
      animate={{
        rotate: [0, 15, -15, 15, 0], // Bell animation (tilting left and right)
      }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="p-3 rounded-full bg-green-500 shadow-md flex items-center justify-center"
    >
      <Bell className="w-6 h-6 text-white" />
    </motion.div>

    {/* Content */}
    <div className="flex-1">
      <h4 className="font-bold text-lg mb-1">{notification.platformName}</h4>
      <div className="text-sm text-gray-600 flex items-center whitespace-nowrap">
        <span>Renewal Date:</span>
        <span className="ml-2 text-green-600 font-semibold">
        {dayjs.utc(notification.subscriptionEndDate).startOf('day').local().format("MMM DD, YYYY")}
        </span>
      </div>
    </div>

    {/* Close Button */}
    {/* <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-800 transition-colors"
    >
      <X className="w-5 h-5" />
    </button> */}
  </motion.div>
);

const NotificationSystem = () => {
  const { data, isLoading } = useGetUpcomingNotificationsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleNotification, setVisibleNotification] = useState(null);

  const notifications = data?.renewals || [];

  useEffect(() => {
    if (!isLoading && currentIndex < notifications.length) {
      setVisibleNotification(notifications[currentIndex]);

      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 5000); // Show each notification for 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    } else {
      setVisibleNotification(null); // No more notifications to show
    }
  }, [currentIndex, notifications, isLoading]);

  const handleClose = () => {
    setVisibleNotification(null);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <AnimatePresence>
      {visibleNotification && (
        <NotificationCard
          notification={visibleNotification}
          onClose={handleClose}
        />
      )}
    </AnimatePresence>
  );
};

export default NotificationSystem;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Bell, X } from "lucide-react";
// import dayjs from "dayjs";
// import { useGetUpcomingNotificationsQuery } from "@/features/api/userNotificationApiSlice";

// const NotificationCard = ({ notification, onClose }) => (
//   <motion.div
//     key={notification.id}
//     initial={{ opacity: 0, y: 50, scale: 0.9 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     exit={{ opacity: 0, y: 50, scale: 0.9 }}
//     transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
//     className="fixed bottom-8 right-4 md:right-8 z-50 p-5 relative rounded-lg text-gray-800 flex items-start gap-4"
//     style={{
//       maxWidth: "calc(100vw - 2rem)", // Responsive width for small screens
//       width: "20rem", // Default width
//       backgroundColor: "#F0FDF4", // Very light green background
//     }}
//   >
//     {/* Laser Border Animation */}
//     <div className="absolute inset-0 rounded-lg border-2 border-transparent animate-laser-border"></div>

//     {/* Animated Bell Icon */}
//     <motion.div
//       animate={{
//         rotate: [0, 15, -15, 15, 0], // Bell animation (tilting left and right)
//       }}
//       transition={{ repeat: Infinity, duration: 1.5 }}
//       className="p-3 rounded-full bg-green-500 shadow-md flex items-center justify-center"
//     >
//       <Bell className="w-6 h-6 text-white" />
//     </motion.div>

//     {/* Content */}
//     <div className="flex-1">
//       <h4 className="font-bold text-lg mb-1">{notification.platformName}</h4>
//       <div className="text-sm text-gray-600 flex items-center whitespace-nowrap">
//         <span>Renewal Date:</span>
//         <span className="ml-2 text-green-600 font-semibold">
//           {dayjs(notification.subscriptionEndDate).format("MMM DD, YYYY")}
//         </span>
//       </div>
//     </div>

//     {/* Close Button */}
//     <button
//       onClick={onClose}
//       className="text-gray-500 hover:text-gray-800 transition-colors"
//     >
//       <X className="w-5 h-5" />
//     </button>
//   </motion.div>
// );

// const NotificationSystem = () => {
//   const { data, isLoading } = useGetUpcomingNotificationsQuery();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleNotification, setVisibleNotification] = useState(null);
//   const [hasDisplayed, setHasDisplayed] = useState(
//     JSON.parse(sessionStorage.getItem("notificationsDisplayed")) || false
//   );

//   const notifications = data?.renewals || [];

//   useEffect(() => {
//     if (!hasDisplayed && !isLoading && currentIndex < notifications.length) {
//       setVisibleNotification(notifications[currentIndex]);

//       const timer = setTimeout(() => {
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       }, 5000); // Show each notification for 5 seconds

//       return () => clearTimeout(timer);
//     } else {
//       setVisibleNotification(null);
//       if (!hasDisplayed) {
//         sessionStorage.setItem("notificationsDisplayed", JSON.stringify(true));
//         setHasDisplayed(true);
//       }
//     }
//   }, [currentIndex, notifications, isLoading, hasDisplayed]);

//   const handleClose = () => {
//     setVisibleNotification(null);
//     setCurrentIndex((prevIndex) => prevIndex + 1);
//   };

//   return (
//     <AnimatePresence>
//       {visibleNotification && (
//         <NotificationCard
//           notification={visibleNotification}
//           onClose={handleClose}
//         />
//       )}
//     </AnimatePresence>
//   );
// };

// export default NotificationSystem;

// /* Add this CSS to your Tailwind config or a global CSS file */
// <style>
//   {`
// @keyframes laser-border {
//   0% {
//     border-image-source: linear-gradient(90deg, #16A34A, #A7F3D0, #16A34A);
//     border-image-slice: 1;
//     border-width: 2px;
//   }
//   50% {
//     border-image-source: linear-gradient(90deg, #A7F3D0, #16A34A, #A7F3D0);
//     border-image-slice: 1;
//     border-width: 2px;
//   }
//   100% {
//     border-image-source: linear-gradient(90deg, #16A34A, #A7F3D0, #16A34A);
//     border-image-slice: 1;
//     border-width: 2px;
//   }
// }

// .animate-laser-border {
//   border-image: linear-gradient(90deg, #16A34A, #A7F3D0, #16A34A) 1;
//   animation: laser-border 3s linear infinite;
// }
// `}
// </style>;
