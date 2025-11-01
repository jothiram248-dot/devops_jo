// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Users, Shield, Key, ArrowLeft } from "lucide-react";

// const nomineeTypes = [
//   {
//     id: "primary",
//     title: "Primary Nominee",
//     icon: Users,
//     color: "from-purple-400 to-purple-600",
//     status: "Active",
//     description: "Manage your primary nominee",
//   },
//   {
//     id: "secondary",
//     title: "Secondary Nominee",
//     icon: Shield,
//     color: "from-blue-400 to-blue-600",
//     status: "Not Set",
//     description: "Set up a backup nominee",
//   },
//   {
//     id: "access",
//     title: "Access Rules",
//     icon: Key,
//     color: "from-green-400 to-green-600",
//     status: "Configured",
//     description: "Configure access permissions",
//   },
// ];

// const DashboardNominee = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="space-y-6">
//       {/* <button
//         onClick={() => navigate("/dashboard")}
//         className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
//       >
//         <ArrowLeft className="w-5 h-5 mr-2" />
//         Back to Dashboard
//       </button> */}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {nomineeTypes.map((type) => (
//           <motion.div
//             key={type.id}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => navigate(`/nominees/${type.id}`)}
//             className="p-4 rounded-xl bg-dark-200 hover:bg-dark-300 transition-all duration-300 cursor-pointer"
//           >
//             <div
//               className={`p-3 rounded-lg bg-gradient-to-br ${type.color} w-fit mb-4`}
//             >
//               <type.icon className="w-6 h-6 text-white" />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-lg font-semibold text-white">{type.title}</h3>
//               <span
//                 className={`px-2 py-1 rounded-full text-sm ${
//                   type.status === "Active"
//                     ? "bg-green-500/20 text-green-400"
//                     : type.status === "Not Set"
//                     ? "bg-red-500/20 text-red-400"
//                     : "bg-blue-500/20 text-blue-400"
//                 }`}
//               >
//                 {type.status}
//               </span>
//             </div>
//             <p className="text-sm text-gray-400">{type.description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardNominee;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  TrendingUp,
  Tv,
  Share2,
  Gamepad2,
  FolderLock,
  ArrowLeft,
  Phone,
  Package,
} from "lucide-react";

const BankingCredentialsImg = `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/Banking_credentials.jpg`;
const InvestmentCredentialsImg = `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/Investment_credneitals.jpg`;
const EntertainmentImg = `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/Entertainment.jpg`;
const SocialMediaImg = `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/SocialMedia.jpg`;
const GamingImg = `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/gaming_credentials.jpg`;
const OthersImg = `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/others.jpg`;


const credentialTypes = [
  {
    id: "banking",
    title: "Banking Details",
    icon: CreditCard,
    color: "from-orange-400 to-orange-600",
    image: BankingCredentialsImg,
    description: "Manage your banking details",
  },
  {
    id: "investment",
    title: "Investment Details",
    icon: TrendingUp,
    color: "from-green-400 to-green-600",
    image: InvestmentCredentialsImg,
    description: "Track your investment accounts",
  },
  {
    id: "socialMedia",
    title: "Social Media Details",
    icon: Share2,
    color: "from-purple-400 to-purple-600",
    image: SocialMediaImg,
    description: "Social media account details",
  },
  {
    id: "emergencyContacts",
    title: " Emergency Contacts & Instructions",
    icon: Phone,
    color: "from-blue-400 to-blue-600",
    image: EntertainmentImg,
    description: "Emergency contacts and instructions",
  },
  {
    id: "subscriptions",
    title: "Subscription Sevice Details",
    icon: Package,
    color: "from-purple-400 to-purple-600",
    image: SocialMediaImg,
    description: "Subscription services details",
  },
  // {
  //   id: "gamingPlatform",
  //   title: "Gaming Platforms",
  //   icon: Gamepad2,
  //   color: "from-red-400 to-red-600",
  //   image: GamingImg,
  //   description: "Gaming platform credentials",
  // },
  {
    id: "others",
    title: "Other Details",
    icon: FolderLock,
    color: "from-gray-400 to-gray-600",
    image: OthersImg,
    description: "Other platform details",
  },
];

const DashboardNominee = ({
  isAadhaarVerified,
  contactCount = 0,
  openAadhaarModal,
  openEmergencyContactModal,
}) => {
  const navigate = useNavigate();

  const handleCredentialClick = (type) => {
    // gate 1: Aadhaar
    // if (!isAadhaarVerified) {
    //   openAadhaarModal?.();       // show Aadhaar modal from DashboardPage
    //   console.log("Opening Aadhaar Modal", isAadhaarVerified);
    //   return;
    // }
    // // gate 2: Emergency contacts
    // if (!contactCount || contactCount <= 0) {
    //   openEmergencyContactModal?.(); // show Emergency Contact modal from DashboardPage
    //   console.log("Opening Emergency Contact Modal");
    //   return;
    // }
    console.log("Navigating to:", `/nominees/${type.id}`);
    // all good → navigate
    navigate(`/nominees/${type.id}`);
  };

  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  // const handleCredentialClick = (id) => {
  //   if (!isAadhaarVerified) {
  //     setModalStep("aadhaar"); // Open Aadhaar modal if not verified
  //   } else {
  //     navigate(`/nominees/${id}`); // Proceed to nominee-specific route
  //   }
  // };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First three cards */}
        {credentialTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleCredentialClick(type)}
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
              <p className="text-sm text-gray-400">{type.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Last two cards - centered */}
      {/* <div className="col-span-3 flex justify-center gap-6 mt-6">
        {credentialTypes.slice(3).map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(`/nominees/${type.id}`)}
            className="relative p-4 rounded-xl bg-dark-200 hover:bg-dark-300 transition-all duration-300 cursor-pointer w-full md:w-1/3"
          >
          
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

       
            <div className="absolute inset-0 bg-black/80 rounded-xl"></div>

     
            <img
              src={type.image}
              alt={type.title}
              className="hidden"
              onLoad={() => handleImageLoad(type.id)}
            />

        
            <div className="relative z-10">
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${type.color} w-fit mb-4`}
              >
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {type.title}
              </h3>
              <p className="text-sm text-gray-400">{type.description}</p>
            </div>
          </motion.div>
        ))}
      </div> */}
    </div>
  );
};

export default DashboardNominee;
