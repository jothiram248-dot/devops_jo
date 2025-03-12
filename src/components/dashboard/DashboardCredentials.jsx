// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   CreditCard,
//   TrendingUp,
//   Tv,
//   Share2,
//   Gamepad2,
//   FolderLock,
//   ArrowLeft,
// } from "lucide-react";

// import BankingCredentialsImg from "/assets/Images/Banking_credentials.jpg";
// import InvestmentCredentialsImg from "/assets/Images/Investment_credneitals.jpg";
// import EntertainmentImg from "/assets/Images/Entertainment.jpg";
// import SocialMediaImg from "/assets/Images/SocialMedia.jpg";
// import GamingImg from "/assets/Images/gaming_credentials.jpg";
// import OthersImg from "/assets/Images/others.jpg";

// const credentialTypes = [
//   {
//     id: "banking",
//     title: "Banking Credentials",
//     icon: CreditCard,
//     color: "from-orange-400 to-orange-600",
//     image: BankingCredentialsImg,
//     description: "Manage your banking credentials",
//   },
//   {
//     id: "investment",
//     title: "Investment Credentials",
//     icon: TrendingUp,
//     color: "from-green-400 to-green-600",
//     image: InvestmentCredentialsImg,
//     description: "Track your investment accounts",
//   },
//   {
//     id: "entertainmentPlatform",
//     title: "Entertainment Platforms",
//     icon: Tv,
//     color: "from-blue-400 to-blue-600",
//     image: EntertainmentImg,
//     description: "Streaming service credentials",
//   },
//   {
//     id: "socialMedia",
//     title: "Social Media",
//     icon: Share2,
//     color: "from-purple-400 to-purple-600",
//     image: SocialMediaImg,
//     description: "Social media account credentials",
//   },
//   {
//     id: "gamingPlatform",
//     title: "Gaming Platforms",
//     icon: Gamepad2,
//     color: "from-red-400 to-red-600",
//     image: GamingImg,
//     description: "Gaming platform credentials",
//   },
//   {
//     id: "others",
//     title: "Others",
//     icon: FolderLock,
//     color: "from-gray-400 to-gray-600",
//     image: OthersImg,
//     description: "Other platform credentials",
//   },
// ];

// const preloadImages = (imageUrls) => {
//   imageUrls.forEach((url) => {
//     const img = new Image();
//     img.src = url;
//   });
// };

// const DashboardCredentials = () => {
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     const imageUrls = credentialTypes.map((type) => type.image);
//     preloadImages(imageUrls);
//   }, []);

//   return (
//     <div className="space-y-6">
//       <button
//         onClick={() => navigate("/dashboard")}
//         className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
//       >
//         <ArrowLeft className="w-5 h-5 mr-2" />
//         Back to Dashboard
//       </button>

//       <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
//         {credentialTypes.map((type) => (
//           <motion.div
//             key={type.id}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             transition={{ duration: 0.2 }}
//             onClick={() => navigate(`/credentials/${type.id}`)}
//             className="relative p-4 rounded-xl bg-dark-200 hover:bg-dark-300 transition-all duration-300 cursor-pointer"
//             style={{
//               backgroundImage: `url(${type.image})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundBlendMode: "overlay",
//             }}
//           >
//             <div
//               className={`p-3 rounded-lg bg-gradient-to-br ${type.color} w-fit mb-4`}
//             >
//               <type.icon className="w-6 h-6 text-white" />
//             </div>
//             <div className="relative z-10">
//               <h3 className="text-lg font-semibold text-white mb-2">
//                 {type.title}
//               </h3>
//               <p className="text-sm text-gray-400">{type.description}</p>
//             </div>
//             <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardCredentials;

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
} from "lucide-react";

import BankingCredentialsImg from "/assets/Images/Banking_credentials.jpg";
import InvestmentCredentialsImg from "/assets/Images/Investment_credneitals.jpg";
import EntertainmentImg from "/assets/Images/Entertainment.jpg";
import SocialMediaImg from "/assets/Images/SocialMedia.jpg";
import GamingImg from "/assets/Images/gaming_credentials.jpg";
import OthersImg from "/assets/Images/others.jpg";

const credentialTypes = [
  {
    id: "banking",
    title: "Banking Credentials",
    icon: CreditCard,
    color: "from-orange-400 to-orange-600",
    image: BankingCredentialsImg,
    description: "Manage your banking credentials",
  },
  {
    id: "investment",
    title: "Investment Credentials",
    icon: TrendingUp,
    color: "from-green-400 to-green-600",
    image: InvestmentCredentialsImg,
    description: "Track your investment accounts",
  },
  {
    id: "entertainmentPlatform",
    title: "Entertainment Platforms",
    icon: Tv,
    color: "from-blue-400 to-blue-600",
    image: EntertainmentImg,
    description: "Streaming service credentials",
  },
  {
    id: "socialMedia",
    title: "Social Media",
    icon: Share2,
    color: "from-purple-400 to-purple-600",
    image: SocialMediaImg,
    description: "Social media account credentials",
  },
  {
    id: "gamingPlatform",
    title: "Gaming Platforms",
    icon: Gamepad2,
    color: "from-red-400 to-red-600",
    image: GamingImg,
    description: "Gaming platform credentials",
  },
  {
    id: "others",
    title: "Others",
    icon: FolderLock,
    color: "from-gray-400 to-gray-600",
    image: OthersImg,
    description: "Other platform credentials",
  },
];

const DashboardCredentials = () => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button> */}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {credentialTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(`/credentials/${type.id}`)}
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
    </div>
  );
};

export default DashboardCredentials;
