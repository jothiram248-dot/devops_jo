// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   Bell,
//   Briefcase,
//   Monitor,
//   Gift,
//   FileText,
//   ArrowLeft,
// } from "lucide-react";

// const notificationTypes = [
//   {
//     id: "socialMedia",
//     title: "Social Media Subscriptions",
//     icon: Bell,
//     color: "from-pink-400 to-pink-600",
//     count: 4,
//     description: "Track premium subscriptions for social media platforms.",
//   },
//   {
//     id: "businessTools",
//     title: "Business Tools Subscriptions",
//     icon: Briefcase,
//     color: "from-yellow-400 to-yellow-600",
//     count: 2,
//     description: "Manage renewals and updates for business tools.",
//   },
//   {
//     id: "entertainmentPlatform",
//     title: "Entertainment Platform Subscriptions",
//     icon: Monitor,
//     color: "from-purple-400 to-purple-600",
//     count: 3,
//     description: "Stay informed about entertainment platform renewals.",
//   },
//   {
//     id: "onlineGiftVoucher",
//     title: "Online Gift Voucher",
//     icon: Gift,
//     color: "from-green-400 to-green-600",
//     count: 1,
//     description: "Receive notifications for online gift voucher usage.",
//   },
//   {
//     id: "otherAutoPay",
//     title: "Others Auto Payment",
//     icon: FileText,
//     color: "from-blue-400 to-blue-600",
//     count: 5,
//     description: "Track other recurring auto-payment services.",
//   },
// ];

// const DashboardNotifications = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="space-y-6">
//       {/* <button
//         onClick={() => navigate("/dashboard", { replace: true })}
//         className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
//       >
//         <ArrowLeft className="w-5 h-5 mr-2" />
//         Back to Dashboard
//       </button> */}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {notificationTypes.map((type) => (
//           <motion.div
//             key={type.id}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => navigate(`/notifications/${type.id}`)}
//             className="p-4 rounded-xl bg-dark-200 hover:bg-dark-300 transition-all duration-300 cursor-pointer"
//           >
//             <div
//               className={`p-3 rounded-lg bg-gradient-to-br ${type.color} w-fit mb-4`}
//             >
//               <type.icon className="w-6 h-6 text-white" />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-lg font-semibold text-white">{type.title}</h3>
//               <span className="px-2 py-1 rounded-full bg-dark-300 text-sm text-white">
//                 {type.count}
//               </span>
//             </div>
//             <p className="text-sm text-gray-400">{type.description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardNotifications;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, Briefcase, Monitor, Gift, FileText } from "lucide-react";

const notificationTypes = [
  {
    id: "socialMedia",
    title: "Social Media Subscriptions",
    icon: Bell,
    image: "/assets/Images/smart_notification/social_Media_Subscription.jpg",
    color: "from-pink-400 to-pink-600",
    count: 4,
    description: "Track your social media subscriptions.",
  },
  {
    id: "businessTools",
    title: "Business Tools Subscriptions",
    icon: Briefcase,
    image: "/assets/Images/smart_notification/Business_Tool.jpg",
    color: "from-yellow-400 to-yellow-600",
    count: 2,
    description: "Manage your business tools subscriptions.",
  },
  {
    id: "entertainmentPlatform",
    title: "Entertainment Platform Subscriptions",
    icon: Monitor,
    image: "/assets/Images/smart_notification/Entertainment.jpg",
    color: "from-purple-400 to-purple-600",
    count: 3,
    description:
      "Track your streaming and entertainment platform subscriptions.",
  },
  {
    id: "onlineGiftVoucher",
    title: "Online Gift Voucher",
    icon: Gift,
    image: "/assets/Images/smart_notification/gift_voucher.jpg",
    color: "from-green-400 to-green-600",
    count: 1,
    description: "Never let your gift vouchers expire",
  },
  {
    id: "otherAutoPay",
    title: "Others Auto Payment",
    icon: FileText,
    image: "/assets/Images/smart_notification/Auto_payment.jpg",
    color: "from-blue-400 to-blue-600",
    count: 5,
    description: "Manage all your payments and billing cycle",
  },
];

const DashboardNotifications = () => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* First three cards */}
        {notificationTypes.slice(0, 3).map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(`/notifications/${type.id}`)}
            className="relative p-4 rounded-xl bg-dark-200 hover:bg-dark-300 transition-all duration-300 cursor-pointer"
          >
            {/* Lazy Loaded Background */}
            <div
              className={`absolute inset-0 bg-cover bg-center rounded-xl transition-opacity duration-500 ${
                loadedImages[type.id]
                  ? "opacity-100"
                  : "opacity-50 bg-gradient-to-br from-gray-700 to-gray-900"
              }`}
              style={
                loadedImages[type.id]
                  ? { backgroundImage: `url(${type.image})` }
                  : {}
              }
            ></div>

            {/* Dark Faded Overlay */}
            <div className="absolute inset-0 bg-black/80 rounded-xl"></div>

            {/* Hidden img element to preload images */}
            <img
              src={type.image}
              alt={type.title}
              className="hidden"
              onLoad={() => handleImageLoad(type.id)}
            />

            {/* Icon and Details */}
            <div className="relative z-10">
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${type.color} w-fit mb-4`}
              >
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {type.title}
              </h3>
              <p className="text-sm text-gray-300">{type.description}</p>
            </div>
          </motion.div>
        ))}

        {/* Last two cards - centered */}
        <div className="col-span-3 flex justify-center gap-6">
          {notificationTypes.slice(3).map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate(`/notifications/${type.id}`)}
              className="relative p-4 rounded-xl bg-dark-200 hover:bg-dark-300 transition-all duration-300 cursor-pointer w-1/3"
            >
              {/* Lazy Loaded Background */}
              <div
                className={`absolute inset-0 bg-cover bg-center rounded-xl transition-opacity duration-500 ${
                  loadedImages[type.id]
                    ? "opacity-100"
                    : "opacity-50 bg-gradient-to-br from-gray-700 to-gray-900"
                }`}
                style={
                  loadedImages[type.id]
                    ? { backgroundImage: `url(${type.image})` }
                    : {}
                }
              ></div>

              {/* Dark Faded Overlay */}
              <div className="absolute inset-0 bg-black/80 rounded-xl"></div>

              {/* Hidden img element to preload images */}
              <img
                src={type.image}
                alt={type.title}
                className="hidden"
                onLoad={() => handleImageLoad(type.id)}
              />

              {/* Icon and Details */}
              <div className="relative z-10">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${type.color} w-fit mb-4`}
                >
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-gray-300">{type.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardNotifications;
