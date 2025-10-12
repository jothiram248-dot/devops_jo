// import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Shield,
//   Bell,
//   Users,
//   Activity,
//   TrendingUp,
//   Clock,
//   Settings,
//   CreditCard,
//   History,
//   FileText,
//   HelpCircle,
//   X,
//   CheckCircle,
//   ArrowLeft,
//   Plus,
//   Trash2,
//   Key,
//   CalendarDays,
// } from "lucide-react";
// import useAuthStore from "../store/authStore";
// import Footer from "../components/Footer";
// import DashboardCredentials from "../components/dashboard/DashboardCredentials";
// import DashboardNotifications from "../components/dashboard/DashboardNotifications";
// import DashboardNominee from "../components/dashboard/DashboardNominee";
// import { useSelector } from "react-redux";
// import {
//   useAddEmergencyContactMutation,
//   useAdhaarKycMutation,
// } from "@/features/api/userNomineeApiSlice";
// import {
//   useGetMatricsDataQuery,
//   useMeQuery,
// } from "@/features/api/userApiSlice";

// const features = [
//   {
//     id: "credentials",
//     title: "Manage Credentials",
//     icon: Shield,
//     status: "Active",
//     nextBilling: "2024-03-15",
//     // price: "₹0.00/month",
//     description:
//       "Securely Store and Manage all your Digital Credentials in One Place",
//     color: "from-blue-600 to-indigo-600",
//     bgImage:
//       "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
//     component: DashboardCredentials,
//   },
//   {
//     id: "notifications",
//     title: "Smart Notifications",
//     icon: Bell,
//     status: "Trial",
//     nextBilling: "2024-03-10",
//     // price: "₹0.00/month",
//     description: "Stay informed with intelligent alerts and updates",
//     color: "from-purple-600 to-pink-600",
//     bgImage:
//       "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
//     component: DashboardNotifications,
//   },
//   {
//     id: "nominee",
//     title: "Choose Nominee",
//     icon: Users,
//     status: "Inactive",
//     // price: "₹0.00/month",
//     description: "Select and manage trusted nominees",
//     color: "from-green-600 to-teal-600",
//     bgImage:
//       "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
//     // component: DashboardNominee,
//     component: ({ isAadhaarVerified, setAadhaarVerified }) => (
//       <DashboardNominee
//         isAadhaarVerified={isAadhaarVerified}
//         setAadhaarVerified={setAadhaarVerified}
//       />
//     ),
//   },
// ];

// const SettingsModal = ({ isOpen, onClose }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//       >
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           className="bg-dark-200 rounded-xl w-full max-w-md p-6"
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-2xl font-bold text-white">Settings</h3>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-dark-300 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-gray-400" />
//             </button>
//           </div>

//           <div className="space-y-4">
//             <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
//               <CreditCard className="w-5 h-5 text-accent-100" />
//               <span className="text-white">Purchase History</span>
//             </button>

//             <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
//               <History className="w-5 h-5 text-accent-100" />
//               <span className="text-white">Subscription Management</span>
//             </button>

//             <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
//               <FileText className="w-5 h-5 text-accent-100" />
//               <span className="text-white">Account Settings</span>
//             </button>

//             <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
//               <HelpCircle className="w-5 h-5 text-accent-100" />
//               <span className="text-white">Help & Support</span>
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const SkeletonCard = () => (
//   <div className="relative p-6 rounded-xl bg-dark-300 animate-pulse shadow-md h-[140px] flex items-center space-x-4 border border-dark-400 backdrop-blur-xl">
//     <div className="p-4 rounded-xl bg-gray-700 shadow-lg w-12 h-12"></div>
//     <div className="flex-1">
//       <div className="h-4 bg-gray-600 w-1/2 rounded-md mb-2"></div>
//       <div className="h-6 bg-gray-700 w-3/4 rounded-md"></div>
//     </div>
//   </div>
// );

// const SlidingStats = ({ counts, isLoading }) => {
//   const rotatingStats = [
//     { title: "Stored Credentials", key: "creds", icon: Key },
//     { title: "Notifications", key: "notifications", icon: Bell },
//     { title: "Nominee Entries", key: "nomineeEntries", icon: Users },
//   ];

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % rotatingStats.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const { title, key, icon: Icon } = rotatingStats[index];

//   return isLoading ? (
//     <SkeletonCard />
//   ) : (
//     <div className="relative w-full max-w-md h-[140px] rounded-xl bg-dark-200 shadow-md p-6 border border-dark-300 flex items-center space-x-4">
//       <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg">
//         <Icon className="w-8 h-8 text-white" />
//       </div>
//       <div className="flex-1">
//         <h4 className="text-sm font-semibold text-gray-400">{title}</h4>
//         <motion.p
//           key={counts[key] || 0}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="text-2xl font-extrabold text-white mt-1"
//         >
//           {counts[key] || 0}
//         </motion.p>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon: Icon, title, value, bgColor, isLoading }) =>
//   isLoading ? (
//     <SkeletonCard />
//   ) : (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="relative p-6 rounded-xl bg-dark-200 shadow-md hover:shadow-xl transition-all duration-300 h-[140px] flex items-center space-x-4 border border-dark-300 backdrop-blur-xl"
//     >
//       <div className={`p-4 rounded-xl ${bgColor} shadow-lg`}>
//         <Icon className="w-7 h-7 text-white" />
//       </div>
//       <div className="flex-1">
//         <h4 className="text-sm font-semibold text-gray-400">{title}</h4>
//         <p className="text-2xl font-extrabold text-white mt-1">{value}</p>
//       </div>
//     </motion.div>
//   );

// const LastLoginStat = ({ lastLogin, isLoading }) => {
//   const [showDate, setShowDate] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setShowDate((prev) => !prev);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return isLoading ? (
//     <SkeletonCard />
//   ) : (
//     <div className="relative w-full max-w-md h-[140px] rounded-xl bg-dark-200 shadow-md p-6 border border-dark-300 flex items-center space-x-4">
//       <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg">
//         {showDate ? (
//           <CalendarDays className="w-8 h-8 text-white" />
//         ) : (
//           <Clock className="w-8 h-8 text-white" />
//         )}
//       </div>
//       <div className="flex-1">
//         <h4 className="text-sm font-semibold text-gray-400">Last Login</h4>
//         <motion.p
//           key={showDate ? "date" : "time"}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="text-2xl font-extrabold text-white mt-1"
//         >
//           {showDate ? lastLogin.date : lastLogin.time}
//         </motion.p>
//       </div>
//     </div>
//   );
// };

// const ActiveServicesStat = ({ features, isLoading }) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (features.length > 1) {
//       const interval = setInterval(() => {
//         setIndex((prevIndex) => (prevIndex + 1) % features.length);
//       }, 4000); // Rotate every 4 seconds if multiple features exist
//       return () => clearInterval(interval);
//     }
//   }, [features]);

//   return isLoading ? (
//     <SkeletonCard />
//   ) : (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="relative p-6 rounded-xl bg-dark-200 shadow-md hover:shadow-xl transition-all duration-300 h-[140px] flex items-center space-x-4 border border-dark-300 backdrop-blur-xl"
//     >
//       {/* Static Icon Container */}
//       <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
//         <Activity className="w-7 h-7 text-white" />
//       </div>

//       {/* Static Text Content */}
//       <div className="flex-1">
//         <h4 className="text-sm font-semibold text-gray-400">Active Service</h4>

//         {/* Sliding Active Service Value */}
//         <div className="relative h-10 overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.p
//               key={features.length > 0 ? features[index] : "No Active Services"}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.6, ease: "easeInOut" }}
//               className="absolute inset-0 text-2xl font-extrabold text-white mt-1"
//             >
//               {features.length > 0
//                 ? features[index].charAt(0).toUpperCase() +
//                   features[index].slice(1).toLowerCase()
//                 : "NO ACTIVE SERVICES"}
//             </motion.p>
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // 🔥 Glow Effect for Icons
// const glowEffect = `
//   .glow-effect {
//     box-shadow: 0 0 10px rgba(122, 162, 247, 0.7), 0 0 20px rgba(122, 162, 247, 0.4);
//   }
// `;

// const FeatureCard = ({
//   feature,
//   isActive,
//   isAadhaarVerified,
//   setShowAadhaarModal,
//   onClick,
// }) => (
//   <motion.div
//     onClick={() => {
//       if (feature.id === "nominee") {
//         if (!isAadhaarVerified) {
//           setShowAadhaarModal(true); // Show Aadhaar modal if not verified
//         } else {
//           onClick(); // Directly activate the nominee feature
//         }
//       } else {
//         onClick(); // Activate other features
//       }
//     }}
//     className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group ${
//       isActive ? "ring-2 ring-accent-100" : ""
//     }`}
//     whileHover={{ scale: 1.02 }}
//     whileTap={{ scale: 0.98 }}
//   >
//     <div className="absolute inset-0">
//       <img
//         src={feature.bgImage}
//         alt={feature.title}
//         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//       />
//       <div
//         className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`}
//       />
//     </div>

//     <div className="relative p-6">
//       <div className="flex justify-between items-start mb-6">
//         <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
//           <feature.icon className="w-6 h-6 text-white" />
//         </div>
//         <span
//           className={`px-3 py-1 rounded-full text-sm backdrop-blur-sm ${
//             feature.status === "Active"
//               ? "bg-green-500/20 text-green-100"
//               : feature.status === "Trial"
//               ? "bg-yellow-500/20 text-yellow-100"
//               : "bg-red-500/20 text-red-100"
//           }`}
//         >
//           {feature.status}
//         </span>
//       </div>

//       <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
//       <p className="text-sm mb-4 text-white/80">{feature.description}</p>
//       <p className="text-lg font-bold text-white">{feature.price}</p>
//     </div>
//   </motion.div>
// );

// const EmergencyContactModal = ({ isOpen, onClose, onSave }) => {
//   const [contacts, setContacts] = useState([
//     { name: "", phone: "", email: "" },
//   ]);
//   const [addEmergencyContact, { isLoading }] = useAddEmergencyContactMutation();

//   const handleInputChange = (index, field, value) => {
//     const updatedContacts = [...contacts];
//     updatedContacts[index][field] = value;
//     setContacts(updatedContacts);
//   };

//   const addNewContact = () => {
//     if (contacts.length < 2) {
//       setContacts([...contacts, { name: "", phone: "", email: "" }]);
//     }
//   };

//   const removeContact = (index) => {
//     const updatedContacts = contacts.filter((_, i) => i !== index);
//     setContacts(updatedContacts);
//   };

//   const handleSave = async () => {
//     const isValid = contacts.every(
//       (contact) => contact.name && contact.phone && contact.email
//     );

//     if (isValid) {
//       try {
//         const payload = { contacts };
//         await addEmergencyContact(payload).unwrap();
//         onSave(contacts); // Optional callback for parent component
//         onClose();
//       } catch (error) {
//         console.error("Failed to add emergency contacts:", error);
//         alert("An error occurred while saving contacts. Please try again.");
//       }
//     } else {
//       alert("All fields are required for each contact.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="bg-gradient-to-br from-dark-200 to-dark-300 p-8 rounded-xl shadow-lg w-full max-w-lg">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-accent-100">
//             Emergency Contacts
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-dark-400 rounded-full transition"
//             aria-label="Close"
//           >
//             <X className="w-6 h-6 text-gray-400" />
//           </button>
//         </div>

//         {/* Contact Fields with Scroll */}
//         <div className="space-y-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-accent-100 scrollbar-track-dark-300 pr-2">
//           {contacts.map((contact, index) => (
//             <div
//               key={index}
//               className="bg-dark-300 p-4 rounded-lg shadow-md glow-box"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-white">
//                   Contact {index + 1}
//                 </h3>
//                 {contacts.length > 1 && (
//                   <button
//                     onClick={() => removeContact(index)}
//                     className="text-red-500 hover:text-red-600"
//                     aria-label="Remove Contact"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm text-gray-400">Name</label>
//                   <input
//                     type="text"
//                     value={contact.name}
//                     onChange={(e) =>
//                       handleInputChange(index, "name", e.target.value)
//                     }
//                     className="input-primary"
//                     placeholder="Enter name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-gray-400">Phone</label>
//                   <input
//                     type="text"
//                     value={contact.phone}
//                     onChange={(e) => {
//                       // Restrict non-numeric input and limit to 10 digits
//                       const numericValue = e.target.value
//                         .replace(/[^0-9]/g, "")
//                         .slice(0, 10);
//                       handleInputChange(index, "phone", numericValue);
//                     }}
//                     className="input-primary"
//                     placeholder="Enter phone number"
//                     maxLength="10" // Prevents input beyond 10 digits
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400">Email</label>
//                   <input
//                     type="email"
//                     value={contact.email}
//                     onChange={(e) =>
//                       handleInputChange(index, "email", e.target.value)
//                     }
//                     className="input-primary"
//                     placeholder="Enter email"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Buttons Section */}
//         <div className="flex justify-between items-center mt-6">
//           {/* Add Contact Button */}
//           {contacts.length < 2 && (
//             <button
//               onClick={addNewContact}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
//               aria-label="Add Another Contact"
//             >
//               Add Another Contact
//             </button>
//           )}

//           {/* Save Button */}
//           <button
//             onClick={handleSave}
//             disabled={
//               isLoading ||
//               !contacts.every(
//                 (contact) => contact.name && contact.phone && contact.email
//               )
//             }
//             className={`px-6 py-2 rounded-lg shadow-md transition ${
//               contacts.every(
//                 (contact) => contact.name && contact.phone && contact.email
//               )
//                 ? "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg hover:opacity-90"
//                 : "bg-gray-600 text-gray-400 cursor-not-allowed"
//             } ${isLoading && "cursor-wait"}`}
//           >
//             {isLoading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DashboardPage = () => {
//   // const { user } = useAuthStore();
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [showSettings, setShowSettings] = useState(false);
//   // const [isAadhaarVerified, setIsAadhaarVerified] = useState(true); // Initial Aadhaar verification state
//   const [showAadhaarModal, setShowAadhaarModal] = useState(false); // Aadhaar modal state
//   const [aadhaarNumber, setAadhaarNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpStage, setIsOtpStage] = useState(false);
//   const [showConsentForm, setShowConsentForm] = useState(false); // Consent form state
//   const { user } = useSelector((state) => state.auth); // Access user from Redux store
//   // const isAadhaarVerified = user?.aadhaarVerified || false;
//   const [consentProcessing, setConsentProcessing] = useState(false);
//   const [showEmergencyContactModal, setShowEmergencyContactModal] =
//     useState(false);
//   const [emergencyContacts, setEmergencyContacts] = useState([]);

//   // Use the me API query
//   const { data: meData, isError, refetch } = useMeQuery();
//   const [adhaarKyc, { isLoading: kycLoading }] = useAdhaarKycMutation();
//   const { data: metricsData, isLoading } = useGetMatricsDataQuery();
//   const [rotatingIndex, setRotatingIndex] = useState(0);
//   // const [userLastLogin, setUserLastLogin] = useState("");
//   // Derive isAadhaarVerified from the API response
//   const isAadhaarVerified = meData?.me?.aadhaarVerified || false;
//   const contactCount = meData?.me?.contacts || 0;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = location.state || {};

//   useEffect(() => {
//     if (id) {
//       const featureExists = features.some((feature) => feature.id === id);
//       if (featureExists) setActiveFeature(id);
//     }
//   }, [id]);

//   const [showDate, setShowDate] = useState(true);

//   // ✅ Rotate 1st Card (Stored Credentials) every 4 sec
//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     setRotatingIndex((prev) => (prev + 1) % rotatingStats.length);
//   //   }, 4000);
//   //   return () => clearInterval(interval);
//   // }, []);

//   // ✅ Format Last Login & Rotate between Date/Time every 4 sec
//   const lastLogin = useMemo(() => {
//     if (!metricsData?.lastLogin) return { date: "No Login", time: "" };
//     const parsedDate = new Date(metricsData.lastLogin);
//     if (isNaN(parsedDate.getTime())) return { date: "Invalid Date", time: "" };

//     return {
//       date: parsedDate.toLocaleDateString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       }),
//       time: parsedDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       }),
//     };
//   }, [metricsData?.lastLogin]);

//   // useEffect(() => {
//   //   if (!lastLogin.date || !lastLogin.time) return;
//   //   const interval = setInterval(() => {
//   //     setShowDate((prev) => !prev);
//   //   }, 4000);
//   //   return () => clearInterval(interval);
//   // }, [lastLogin]);

//   const counts = metricsData?.counts || {
//     creds: 0,
//     notifications: 0,
//     nomineeEntries: 0,
//   };

//   const ActiveFeatureComponent = activeFeature
//     ? features.find((f) => f.id === activeFeature)?.component
//     : null;

//   const handleBackToDashboard = () => {
//     setActiveFeature(null); // Reset the active feature
//   };

//   const handleAadhaarVerificationCheck = () => {
//     if (!isAadhaarVerified) {
//       setShowAadhaarModal(true);
//     }
//   };

//   const handleConsentAccept = async (aadhaarNumber) => {
//     try {
//       const response = await adhaarKyc({ aadhaar: aadhaarNumber }).unwrap();

//       if (response?.message === "Aadhaar number updated successfully.") {
//         setShowConsentForm(false); // Close consent form
//         setShowEmergencyContactModal(true); // Show emergency contact modal
//         await refetch(); // Update data
//       }
//     } catch (error) {
//       console.error("Aadhaar KYC failed:", error);
//     }
//   };

//   const handleNomineeFeatureClick = () => {
//     if (!isAadhaarVerified) {
//       // If Aadhaar is not verified, show the Aadhaar modal
//       setShowAadhaarModal(true);
//     } else if (contactCount === 0) {
//       // If no contacts exist, show the Emergency Contact Modal
//       setShowEmergencyContactModal(true);
//     } else {
//       // If Aadhaar is verified and contacts exist, navigate to the Nominee feature
//       setActiveFeature("nominee");
//     }
//   };

//   const handleEmergencyContactSave = async (contacts) => {
//     try {
//       setEmergencyContacts(contacts);
//       setShowEmergencyContactModal(false);

//       // Simulate saving the new contact count
//       await refetch(); // Refetch to update contact count from backend

//       // After successfully saving, navigate to the nominee feature
//       setActiveFeature("nominee");
//     } catch (error) {
//       console.error("Error saving emergency contacts:", error);
//     }
//   };

//   const AadhaarModal = () => {
//     const [localAadhaarNumber, setLocalAadhaarNumber] = useState(aadhaarNumber);
//     const [isOtpStage, setIsOtpStage] = useState(false);
//     const [otp, setOtp] = useState(Array(6).fill(""));
//     const [isLoading, setIsLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");

//     const inputRefs = Array(6)
//       .fill(0)
//       .map(() => React.createRef());

//     const [adhaarKyc, { isLoading: kycLoading }] = useAdhaarKycMutation();

//     const handleAadhaarChange = (e) => {
//       const value = e.target.value.replace(/\D/g, "");
//       if (value.length <= 12) {
//         setLocalAadhaarNumber(value);
//         setErrorMessage("");
//       }
//     };

//     const handleOtpChange = (value, index) => {
//       const newOtp = [...otp];
//       newOtp[index] = value;

//       if (value && /^[0-9]$/.test(value) && index < 5) {
//         inputRefs[index + 1].current.focus();
//       }
//       setOtp(newOtp);
//     };

//     const handleOtpKeyDown = (e, index) => {
//       if (e.key === "Backspace" && !otp[index] && index > 0) {
//         inputRefs[index - 1].current.focus();
//       }
//     };

//     const handleSubmit = async () => {
//       // setIsLoading(true);
//       setShowAadhaarModal(false);
//       setAadhaarNumber(localAadhaarNumber);
//       setShowConsentForm(true);
//       const otpValue = otp.join("");
//       // try {
//       //   const response = await adhaarKyc({
//       //     aadhaar: localAadhaarNumber,

//       //   }).unwrap();

//       //   if (response?.message === "aadhaar number updated successfully.") {
//       //     setShowAadhaarModal(false);
//       //     setShowConsentForm(true);
//       //   } else {
//       //     setErrorMessage(response?.message || "Aadhaar verification failed.");
//       //   }
//       // } catch (error) {
//       //   setErrorMessage(error?.data?.message || "Aadhaar verification failed.");
//       // } finally {
//       //   setIsLoading(false);
//       // }
//     };

//     const clearOtp = () => {
//       setOtp(Array(6).fill(""));
//       inputRefs[0].current.focus();
//     };

//     return (
//       <AnimatePresence>
//         {showAadhaarModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-gradient-to-br from-dark-200 to-dark-300 p-8 rounded-xl shadow-xl w-full max-w-lg"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-2">
//                   <Shield className="w-6 h-6 text-accent-100" />
//                   <h2 className="text-2xl font-bold text-accent-100">
//                     Aadhaar Verification
//                   </h2>
//                 </div>
//                 <button
//                   onClick={() => setShowAadhaarModal(false)}
//                   className="p-2 hover:bg-dark-400 rounded-full transition-colors"
//                   aria-label="Close modal"
//                 >
//                   <X className="w-6 h-6 text-gray-400" />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm text-gray-400 mb-2">
//                     Aadhaar Number
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={localAadhaarNumber}
//                       onChange={handleAadhaarChange}
//                       placeholder="Enter 12-digit Aadhaar Number"
//                       className="w-full px-4 py-3 rounded-lg bg-dark-300 text-white focus:outline-none focus:ring-2 focus:ring-accent-100 pr-28"
//                       maxLength="12"
//                       disabled={isOtpStage}
//                     />
//                     {!isOtpStage && localAadhaarNumber.length === 12 && (
//                       <button
//                         onClick={() => setIsOtpStage(true)}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
//                       >
//                         <span className="flex items-center gap-2">Verify</span>
//                       </button>
//                     )}
//                   </div>
//                   {localAadhaarNumber.length > 0 &&
//                     localAadhaarNumber.length !== 12 && (
//                       <p className="text-sm text-red-500 mt-1">
//                         Aadhaar number must be exactly 12 digits.
//                       </p>
//                     )}
//                 </div>

//                 {isOtpStage && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="space-y-4"
//                   >
//                     <div className="flex justify-between items-center">
//                       <label className="block text-sm text-gray-400">
//                         Enter OTP
//                       </label>
//                       <button
//                         onClick={clearOtp}
//                         className="text-sm text-accent-100 hover:text-accent-200 transition-colors"
//                       >
//                         Clear
//                       </button>
//                     </div>
//                     <div className="flex gap-2 justify-center">
//                       {otp.map((digit, index) => (
//                         <input
//                           key={index}
//                           ref={inputRefs[index]}
//                           type="text"
//                           maxLength="1"
//                           value={digit}
//                           onChange={(e) =>
//                             handleOtpChange(e.target.value, index)
//                           }
//                           onKeyDown={(e) => handleOtpKeyDown(e, index)}
//                           className="w-12 h-12 text-center text-white bg-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-100 text-lg"
//                         />
//                       ))}
//                     </div>
//                     <button
//                       onClick={handleSubmit}
//                       className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold shadow-md hover:opacity-90 transition-all duration-300"
//                       disabled={kycLoading}
//                     >
//                       {kycLoading ? "Processing..." : "Submit OTP"}
//                     </button>
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
//   };

//   const ConsentForm = React.memo(() => (
//     <AnimatePresence initial={false}>
//       {showConsentForm && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
//         >
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             className="bg-gradient-to-br from-dark-200 to-dark-300 p-8 rounded-xl shadow-lg w-full max-w-lg"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-accent-100">
//                 Consent Form
//               </h2>
//               <button
//                 onClick={() => setShowConsentForm(false)}
//                 className="p-2 hover:bg-dark-400 rounded-full transition"
//                 aria-label="Close"
//               >
//                 <X className="w-6 h-6 text-gray-400" />
//               </button>
//             </div>

//             <p className="text-gray-400 mb-6">
//               By proceeding, you consent to sharing your Aadhaar details for
//               verification purposes. Your data will be handled securely and in
//               compliance with privacy standards.
//             </p>

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowConsentForm(false)}
//                 className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
//               >
//                 Decline
//               </button>
//               <button
//                 onClick={async () => {
//                   setConsentProcessing(true);
//                   await handleConsentAccept(aadhaarNumber);
//                   setConsentProcessing(false);
//                 }}
//                 className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
//                 disabled={consentProcessing}
//               >
//                 {consentProcessing ? "Processing..." : "Accept"}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   ));

//   return (
//     <div className="pt-24 min-h-screen bg-gradient-to-b from-dark-100 via-dark-200 to-dark-300">
//       <div className="container mx-auto px-6 py-12">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Welcome Section */}
//           <div className="flex justify-between items-center mb-12">
//             <div>
//               <h1 className="text-4xl font-bold text-white mb-2">
//                 Welcome Back,{" "}
//                 <span className="text-accent-100">{user?.firstName}</span>
//               </h1>
//               <p className="text-gray-400 text-base">
//                 Manage your digital assets with ease.
//               </p>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowSettings(true)}
//               className="p-3 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-md hover:shadow-xl transition-all"
//             >
//               <Settings className="w-6 h-6 text-white" />
//             </motion.button>
//           </div>
//           <style>{glowEffect}</style>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//             <SlidingStats counts={counts} isLoading={isLoading} />
//             <ActiveServicesStat
//               features={metricsData?.features || []}
//               isLoading={isLoading}
//             />
//             <LastLoginStat lastLogin={lastLogin} isLoading={isLoading} />
//             <StatCard
//               icon={CheckCircle}
//               title="Active Plan"
//               value="Full Premium"
//               bgColor="bg-gradient-to-r from-indigo-500 to-purple-600"
//               isLoading={isLoading}
//             />
//           </div>

//           {!activeFeature ? (
//             /* Main Features Grid */
//             <div className="grid md:grid-cols-3 gap-8">
//               {features.map((feature) => (
//                 <FeatureCard
//                   key={feature.id}
//                   feature={feature}
//                   isActive={activeFeature === feature.id}
//                   isAadhaarVerified={isAadhaarVerified}
//                   setShowAadhaarModal={() => {
//                     if (!isAadhaarVerified) {
//                       setShowAadhaarModal(true);
//                     }
//                   }}
//                   onClick={() => {
//                     if (feature.id === "nominee") {
//                       handleNomineeFeatureClick();
//                     } else {
//                       setActiveFeature(feature.id);
//                     }
//                   }}
//                 />
//               ))}
//             </div>
//           ) : (
//             /* Active Feature Component */
//             <div className="mb-12">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleBackToDashboard}
//                 className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
//               >
//                 <ArrowLeft className="w-5 h-5 mr-2" />
//                 Back to Dashboard
//               </motion.button>
//               {ActiveFeatureComponent && <ActiveFeatureComponent />}
//             </div>
//           )}
//         </motion.div>
//       </div>

//       {/* Settings Modal */}
//       <SettingsModal
//         isOpen={showSettings}
//         onClose={() => setShowSettings(false)}
//       />
//       {/* <AadhaarModal /> */}
//       <ConsentForm />

//       {/* Aadhaar Modal */}
//       <AadhaarModal
//         isOpen={showAadhaarModal}
//         onClose={() => setShowAadhaarModal(false)}
//       />

//       {/* Emergency Contact Modal */}
//       <EmergencyContactModal
//         isOpen={showEmergencyContactModal}
//         onClose={() => setShowEmergencyContactModal(false)}
//         onSave={handleEmergencyContactSave}
//       />

//       <Footer />
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Shield,
  Bell,
  Users,
  Activity,
  TrendingUp,
  Clock,
  Settings,
  CreditCard,
  History,
  FileText,
  HelpCircle,
  X,
  CheckCircle,
  ArrowLeft,
  Plus,
  Trash2,
  Key,
  CalendarDays,
  Lock,
  Unlock,
  ArrowRight,
  ChevronRight,
  CreditCard as Payment,
  AlertTriangle,
  Send,
  RefreshCw,
  AlertCircle,
  Loader2,
  Info,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import Footer from "../components/Footer";
import DashboardCredentials from "../components/dashboard/DashboardCredentials";
import DashboardNotifications from "../components/dashboard/DashboardNotifications";
import DashboardNominee from "../components/dashboard/DashboardNominee";
import { useSelector } from "react-redux";
import {
  useAddEmergencyContactMutation,
  // useAdhaarKycMutation,
  useAadhaarInitiateMutation,
  useAadhaarVerifyMutation,
} from "@/features/api/userNomineeApiSlice";
import {
  useGetMatricsDataQuery,
  useMeQuery,
} from "@/features/api/userApiSlice";

import { toast } from "react-hot-toast";


// Updated features configuration with isFree flag and consistent descriptive lengths
const features = [
  {
    id: "credentials",
    title: "Manage Credentials",
    icon: Shield,
    isFree: true, // This feature is free
    status: "Active", // Default status for free feature
    description:
      "Securely store and manage all your digital credentials in one place.",
    color: "from-blue-600 to-indigo-600",
    bgImage:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
    component: DashboardCredentials,
  },
  {
    id: "smartNotifications",
    title: "Smart Notifications",
    icon: Bell,
    isFree: false,
    status: "Inactive", // Will be updated based on API response
    description: "Stay informed with intelligent alerts and important updates.",
    color: "from-purple-600 to-pink-600",
    bgImage:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
    component: DashboardNotifications,
  },
  {
    id: "nominee",
    title: "Choose Nominee",
    icon: Users,
    isFree: false,
    status: "Inactive", // Will be updated based on API response
    description: "Select and manage trusted nominees for your digital assets.",
    color: "from-green-600 to-teal-600",
    bgImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    component: ({ isAadhaarVerified, setAadhaarVerified }) => (
      <DashboardNominee
        isAadhaarVerified={isAadhaarVerified}
        setAadhaarVerified={setAadhaarVerified}
      />
    ),
  },
];

const SettingsModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-dark-200 rounded-xl w-full max-w-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Settings</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-300 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
              <CreditCard className="w-5 h-5 text-accent-100" />
              <span className="text-white">Purchase History</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
              <History className="w-5 h-5 text-accent-100" />
              <span className="text-white">Subscription Management</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
              <FileText className="w-5 h-5 text-accent-100" />
              <span className="text-white">Account Settings</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
              <HelpCircle className="w-5 h-5 text-accent-100" />
              <span className="text-white">Help & Support</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const SkeletonCard = () => (
  <div className="relative p-6 rounded-xl bg-dark-300 animate-pulse shadow-md h-[140px] flex items-center space-x-4 border border-dark-400 backdrop-blur-xl">
    <div className="p-4 rounded-xl bg-gray-700 shadow-lg w-12 h-12"></div>
    <div className="flex-1">
      <div className="h-4 bg-gray-600 w-1/2 rounded-md mb-2"></div>
      <div className="h-6 bg-gray-700 w-3/4 rounded-md"></div>
    </div>
  </div>
);

const SlidingStats = ({ counts, isLoading }) => {
  const rotatingStats = [
    { title: "Stored Credentials", key: "creds", icon: Key },
    { title: "Notifications", key: "notifications", icon: Bell },
    { title: "Nominee Entries", key: "nomineeEntries", icon: Users },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingStats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { title, key, icon: Icon } = rotatingStats[index];

  return isLoading ? (
    <SkeletonCard />
  ) : (
    <div className="relative w-full max-w-md h-[140px] rounded-xl bg-dark-200 shadow-md p-6 border border-dark-300 flex items-center space-x-4">
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-400">{title}</h4>
        <motion.p
          key={counts[key] || 0}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-2xl font-extrabold text-white mt-1"
        >
          {counts[key] || 0}
        </motion.p>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, bgColor, isLoading }) =>
  isLoading ? (
    <SkeletonCard />
  ) : (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative p-6 rounded-xl bg-dark-200 shadow-md hover:shadow-xl transition-all duration-300 h-[140px] flex items-center space-x-4 border border-dark-300 backdrop-blur-xl"
    >
      <div className={`p-4 rounded-xl ${bgColor} shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-400">{title}</h4>
        <p className="text-2xl font-extrabold text-white mt-1">{value}</p>
      </div>
    </motion.div>
  );

const LastLoginStat = ({ lastLogin, isLoading }) => {
  const [showDate, setShowDate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDate((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return isLoading ? (
    <SkeletonCard />
  ) : (
    <div className="relative w-full max-w-md h-[140px] rounded-xl bg-dark-200 shadow-md p-6 border border-dark-300 flex items-center space-x-4">
      <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg">
        {showDate ? (
          <CalendarDays className="w-8 h-8 text-white" />
        ) : (
          <Clock className="w-8 h-8 text-white" />
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-400">Last Login</h4>
        <motion.p
          key={showDate ? "date" : "time"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-2xl font-extrabold text-white mt-1"
        >
          {showDate ? lastLogin.date : lastLogin.time}
        </motion.p>
      </div>
    </div>
  );
};

const ActiveServicesStat = ({ features, isLoading }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (features.length > 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % features.length);
      }, 4000); // Rotate every 4 seconds if multiple features exist
      return () => clearInterval(interval);
    }
  }, [features]);

  return isLoading ? (
    <SkeletonCard />
  ) : (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative p-6 rounded-xl bg-dark-200 shadow-md hover:shadow-xl transition-all duration-300 h-[140px] flex items-center space-x-4 border border-dark-300 backdrop-blur-xl"
    >
      {/* Static Icon Container */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
        <Activity className="w-7 h-7 text-white" />
      </div>

      {/* Static Text Content */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-400">Active Service</h4>

        {/* Sliding Active Service Value */}
        <div className="relative h-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={features.length > 0 ? features[index] : "No Active Services"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 text-2xl font-extrabold text-white mt-1"
            >
              {features.length > 0
                ? features[index].charAt(0).toUpperCase() +
                  features[index].slice(1).toLowerCase()
                : "NO ACTIVE SERVICES"}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced CSS effects for cards - with professional styling
const glowEffect = `
  .glow-effect {
    box-shadow: 0 0 10px rgba(122, 162, 247, 0.7), 0 0 20px rgba(122, 162, 247, 0.4);
  }
  
  .feature-card {
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    height: 220px; /* Fixed height for all cards */
    overflow: hidden;
    position: relative;
    border-radius: 0.75rem;
  }
  
  .feature-card:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
  
  .card-content {
    transition: all 0.3s ease-in-out;
    height: 100%;
    width: 100%;
  }
  
  /* Ensure all feature cards have consistent heights */
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .feature-grid > div {
    height: 100%;
  }
  
  /* Access overlay styling */
  .lock-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    border-radius: 0.75rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(5px);
  }
  
  /* Feature name */
  .locked-feature-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
    text-align: center;
    max-width: 80%;
  }
  
  /* Lock icon styling */
  .lock-icon {
    margin-bottom: 1.5rem;
    background: rgba(30, 30, 40, 0.6);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Attractive, professional upgrade button */
  .upgrade-button {
    background: linear-gradient(to right, #2C3E50, #4C566A);
    color: white;
    font-weight: 500;
    font-size: 0.875rem;
    padding: 0.7rem 1.75rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .upgrade-button:hover {
    background: linear-gradient(to right, #34495E, #596C7E);
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
  }
  
  .upgrade-button:active {
    transform: translateY(0);
  }
`;

// Feature access overlay
const AccessOverlay = ({ feature, onClick }) => (
  <div className="lock-overlay">
    <h3 className="locked-feature-name">{feature.title}</h3>
    <div className="lock-icon">
      <Lock className="w-5 h-5 text-white" />
    </div>
    <button className="upgrade-button" onClick={onClick}>
      Upgrade Now
    </button>
  </div>
);

const FeatureCard = ({
  feature,
  isActive,
  isAadhaarVerified,
  setShowAadhaarModal,
  onClick,
  isLocked,
  navigate,
}) => {
  // Handle redirect to specific pricing sections with proper scrolling
  const handlePricingRedirect = (e) => {
    // Stop propagation to prevent card click handler from firing
    e.stopPropagation();

    if (feature.id === "smartNotifications") {
      // Navigate to the page first
      navigate("/smart-notifications");

      // Then scroll to the specific element after a short delay
      setTimeout(() => {
        const element = document.getElementById("sm");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500); // Small delay to ensure the page has loaded
    } else if (feature.id === "nominee") {
      navigate("/choose-nominee");

      setTimeout(() => {
        const element = document.getElementById("cyn");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  };

  // Handle card click - but only for unlocked cards
  const handleCardClick = () => {
    // Don't do anything if the card is locked
    if (isLocked) {
      return;
    }

    // Handle normal card click for unlocked cards
    if (feature.id === "nominee") {
      if (!isAadhaarVerified) {
        setShowAadhaarModal(true);
      } else {
        onClick();
      }
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      className={`feature-card group ${
        isActive ? "ring-2 ring-accent-100" : ""
      }`}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.3,
      }}
      onClick={handleCardClick}
    >
      {/* Card Background and Content */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <img
          src={feature.bgImage}
          alt={feature.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90 transition-opacity duration-300`}
        />
      </div>

      <div className="relative p-6 h-full z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm backdrop-blur-sm ${
              feature.status === "Active"
                ? "bg-green-500/20 text-green-100"
                : feature.status === "Trial"
                ? "bg-yellow-500/20 text-yellow-100"
                : "bg-red-500/20 text-red-100"
            }`}
          >
            {feature.status}
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-white">
          {feature.title}
        </h3>
        <p className="text-sm mb-4 text-white/80">{feature.description}</p>
      </div>

      {/* Access Overlay for locked features */}
      {isLocked && (
        <AccessOverlay feature={feature} onClick={handlePricingRedirect} />
      )}
    </motion.div>
  );
};

// ✅ Drop-in JSX replacement — polished, professional look

const EmergencyContactModal = ({ isOpen, onClose, onSave }) => {
  const [contacts, setContacts] = React.useState([{ name: "", phone: "", email: "" }]);
  const [errors, setErrors] = React.useState([{ name: "", phone: "", email: "" }]);
  const [addEmergencyContact, { isLoading }] = useAddEmergencyContactMutation();

  const firstInputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 60);
    } else {
      setContacts([{ name: "", phone: "", email: "" }]);
      setErrors([{ name: "", phone: "", email: "" }]);
    }
  }, [isOpen]);

  // Esc to close
  React.useEffect(() => {
    if (!isOpen) return;
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  const setField = (i, field, value) => {
    const next = [...contacts];
    if (field === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    next[i][field] = value;
    setContacts(next);

    const eNext = [...errors];
    if (eNext[i]) eNext[i][field] = "";
    setErrors(eNext);
  };

  const addRow = () => {
    if (contacts.length >= 2) return;
    setContacts([...contacts, { name: "", phone: "", email: "" }]);
    setErrors([...errors, { name: "", phone: "", email: "" }]);
  };

  const removeRow = (i) => {
    const next = contacts.filter((_, idx) => idx !== i);
    const eNext = errors.filter((_, idx) => idx !== i);
    setContacts(next.length ? next : [{ name: "", phone: "", email: "" }]);
    setErrors(eNext.length ? eNext : [{ name: "", phone: "", email: "" }]);
  };

  const validate = () => {
    const e = contacts.map((c) => {
      const row = {};
      if (!c.name.trim()) row.name = "Name is required.";
      if (!/^\d{10}$/.test(c.phone)) row.phone = "Enter a 10-digit mobile number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) row.email = "Enter a valid email.";
      return row;
    });
    setErrors(e);
    return e.every((r) => !r.name && !r.phone && !r.email);
  };

  const handleSave = async () => {
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    try {
      await addEmergencyContact({ contacts }).unwrap();
      toast.success("Emergency contacts saved.");
      onSave(contacts);
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save contacts.");
    }
  };

  // Enter to save
  const onFormKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault();
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ecm-title"
        onKeyDown={onFormKeyDown}
      >
        {/* Outer gradient border */}
        <motion.div
          initial={{ y: 18, scale: 0.98, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 8, scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="w-full max-w-3xl p-[1px] rounded-2xl bg-gradient-to-br from-accent-100/30 via-accent-100/10 to-transparent shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
        >
          <div className="rounded-2xl bg-gradient-to-br from-dark-200/95 to-dark-300/95 border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent-100/15">
                  <Users className="w-5 h-5 text-accent-100" />
                </div>
                <div>
                  <h2 id="ecm-title" className="text-xl font-semibold text-white tracking-tight">
                    Emergency Contacts
                  </h2>
                  <p className="text-sm text-gray-400">
  Add up to two emergency contacts. We’ll contact them only if your nominee can’t be reached.
</p>

                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
  {contacts.length < 2 && (
    <button
      onClick={addRow}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-dark-400/60 hover:bg-dark-400 text-gray-200 border border-white/10 transition whitespace-nowrap leading-none"
    >
      <Plus className="w-4 h-4 shrink-0" />
      {/* keep label single-line; hide on xs to avoid wrap */}
      <span className="hidden sm:inline">Add Contact</span>
    </button>
  )}
  <button
    onClick={onClose}
    className="p-2 rounded-lg hover:bg-white/5 transition"
    aria-label="Close"
  >
    <X className="w-5 h-5 text-gray-400" />
  </button>
</div>

            </div>

            {/* Body */}
            <div className="px-6 py-6 max-h-[66vh] overflow-y-auto space-y-6">
              {/* Two-card layout */}
              <div className={`grid gap-6 ${contacts.length === 2 ? "md:grid-cols-2" : "grid-cols-1"}`}>
                {contacts.map((c, i) => {
                  const initials = (c.name || "C")
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((p) => p[0]?.toUpperCase())
                    .join("");

                  return (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5">
                      {/* Card header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 text-white grid place-items-center text-sm font-semibold">
                            {initials || "C"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Contact {i + 1}</p>
                            <span
                              className={`text-[11px] px-2 py-0.5 rounded-full ${
                                i === 0 ? "bg-green-500/15 text-green-300" : "bg-blue-500/15 text-blue-300"
                              }`}
                            >
                              {i === 0 ? "Primary" : "Secondary"}
                            </span>
                          </div>
                        </div>

                        {contacts.length > 1 && (
                          <button
                            onClick={() => removeRow(i)}
                            className="text-red-400/90 hover:text-red-300 inline-flex items-center gap-1 text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Fields */}
                      <div className="p-4 space-y-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5">Full name</label>
                          <input
                            ref={i === 0 ? firstInputRef : undefined}
                            type="text"
                            value={c.name}
                            onChange={(e) => setField(i, "name", e.target.value)}
                            placeholder="e.g., Sarah Johnson"
                            className={`w-full rounded-lg bg-dark-300/80 border border-white/10 px-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-100/40 ${
                              errors[i]?.name ? "ring-1 ring-red-400/60" : ""
                            }`}
                          />
                          {errors[i]?.name ? (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {errors[i].name}
                            </p>
                          ) : null}
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5">Phone (10-digit)</label>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-300 bg-dark-400/70 border border-white/10 rounded-md px-2 py-1">
                              +91
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={c.phone}
                              onChange={(e) => setField(i, "phone", e.target.value)}
                              placeholder="9876543210"
                              maxLength={10}
                              className={`w-full rounded-lg bg-dark-300/80 border border-white/10 pl-14 pr-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-100/40 ${
                                errors[i]?.phone ? "ring-1 ring-red-400/60" : ""
                              }`}
                            />
                          </div>
                          {errors[i]?.phone ? (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {errors[i].phone}
                            </p>
                          ) : null}
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5">Email</label>
                          <input
                            type="email"
                            value={c.email}
                            onChange={(e) => setField(i, "email", e.target.value)}
                            placeholder="name@example.com"
                            className={`w-full rounded-lg bg-dark-300/80 border border-white/10 px-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-100/40 ${
                              errors[i]?.email ? "ring-1 ring-red-400/60" : ""
                            }`}
                          />
                          {errors[i]?.email ? (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {errors[i].email}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Security note */}
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
  <Shield className="w-3.5 h-3.5 text-gray-500" />
  We’ll only reach out to these contacts if your nominee is unavailable or unresponsive.
</div>

            </div>

            {/* Sticky footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-dark-300/60 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className={`px-5 py-2.5 rounded-lg text-white font-medium inline-flex items-center gap-2 transition
                  ${isLoading ? "bg-gradient-to-r from-green-500/70 to-teal-500/70 cursor-wait" : "bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-95"}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Save contacts
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};




const AadhaarModal = ({ showAadhaarModal, setShowAadhaarModal, onVerificationSuccess }) => {
  const [localAadhaarNumber, setLocalAadhaarNumber] = React.useState("");
  const [isOtpStage, setIsOtpStage] = React.useState(false);
  const [otp, setOtp] = React.useState(Array(6).fill(""));
  const [referenceId, setReferenceId] = React.useState("");

  const [aadhaarInitiate, { isLoading: initLoading }] = useAadhaarInitiateMutation();
  const [aadhaarVerify, { isLoading: verifyLoading }] = useAadhaarVerifyMutation();

  // resend cooldown
  const COOLDOWN_SECS = 30;
  const [secsLeft, setSecsLeft] = React.useState(COOLDOWN_SECS);
  const timerRef = React.useRef(null);

  // OTP refs
  const inputRefs = React.useRef([]);
  if (inputRefs.current.length !== 6) {
    inputRefs.current = Array(6)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || React.createRef());
  }

  // Focus first OTP box when entering OTP stage
  React.useEffect(() => {
    if (isOtpStage && inputRefs.current[0]?.current) {
      inputRefs.current[0].current.focus();
    }
  }, [isOtpStage]);

  // Reset when closing
  React.useEffect(() => {
    if (!showAadhaarModal) {
      setLocalAadhaarNumber("");
      setIsOtpStage(false);
      setOtp(Array(6).fill(""));
      setReferenceId("");
      clearInterval(timerRef.current);
      setSecsLeft(COOLDOWN_SECS);
    }
  }, [showAadhaarModal]);

  // Start/Reset cooldown when OTP stage begins
  const startCooldown = () => {
    clearInterval(timerRef.current);
    setSecsLeft(COOLDOWN_SECS);
    timerRef.current = setInterval(() => {
      setSecsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 12) setLocalAadhaarNumber(value);
  };

  const formatAadhaarDisplay = (value) => {
    if (!value) return "";
    const groups = [];
    for (let i = 0; i < value.length; i += 4) groups.push(value.slice(i, i + 4));
    return groups.join(" ");
  };

  const handleOtpChange = (value, index) => {
    const v = value.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[index] = v;
    setOtp(next);
    // next focus
    if (v && index < 5 && inputRefs.current[index + 1]?.current) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]?.current) {
      inputRefs.current[index - 1].current.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.current?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = Array(6)
      .fill("")
      .map((_, i) => pasted[i] || "");
    setOtp(next);
    const last = Math.min(pasted.length - 1, 5);
    if (last >= 0 && inputRefs.current[last]?.current) inputRefs.current[last].current.focus();
    e.preventDefault();
  };

  const clearOtp = () => {
    setOtp(Array(6).fill(""));
    if (inputRefs.current[0]?.current) inputRefs.current[0].current.focus();
  };

  const startInitiate = async () => {
    if (localAadhaarNumber.length !== 12) {
      toast.error("Aadhaar number must be exactly 12 digits.");
      return;
    }
    try {
      const res = await aadhaarInitiate({ aadhaar_number: localAadhaarNumber }).unwrap();
      setReferenceId(res?.reference_id || "");
      setIsOtpStage(true);
      startCooldown();
      toast.success(res?.message || "OTP sent to your registered mobile.");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to initiate Aadhaar verification.");
    }
  };

  const submitVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Enter the 6-digit OTP.");
      return;
    }
    if (!referenceId) {
      toast.error("Missing reference id. Please re-initiate.");
      return;
    }
    try {
      const res = await aadhaarVerify({ reference_id: referenceId, otp: otpValue }).unwrap();
      toast.success(res?.message || "Aadhaar eKYC Successful");
      setShowAadhaarModal(false);
      onVerificationSuccess();
    } catch (err) {
      toast.error(err?.data?.message || "Aadhaar verification failed.");
    }
  };

  const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <AnimatePresence>
      {showAadhaarModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="aadhaar-title"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-br from-accent-100/30 via-accent-100/10 to-transparent"
          >
            <div className="rounded-2xl bg-gradient-to-br from-dark-200 to-dark-300 border border-dark-100/20 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-dark-100/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-accent-100/10 p-2 rounded-lg shrink-0">
                    <Shield className="w-5 h-5 text-accent-100" />
                  </div>
                  <div className="min-w-0">
                    <h2 id="aadhaar-title" className="text-xl font-semibold text-white tracking-tight">
                      Aadhaar Verification
                    </h2>
                    <p className="text-xs text-gray-400 truncate">
                      Secure, one-time verification to enable nominee features.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAadhaarModal(false)}
                  className="p-2 rounded-lg hover:bg-white/5 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Stepper */}
              <div className="px-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full grid place-items-center text-xs font-semibold ${!isOtpStage ? "bg-accent-100 text-white" : "bg-accent-100/20 text-accent-100 border border-accent-100/40"}`}>1</div>
                  <div className={`h-[2px] flex-1 ${isOtpStage ? "bg-accent-100/70" : "bg-dark-400"}`} />
                  <div className={`w-6 h-6 rounded-full grid place-items-center text-xs font-semibold ${isOtpStage ? "bg-accent-100 text-white" : "bg-accent-100/20 text-accent-100 border border-accent-100/40"}`}>2</div>
                </div>
                <p className="text-xs text-gray-400 mt-2 mb-4">
                  {isOtpStage ? "Step 2 of 2: Enter OTP" : "Step 1 of 2: Enter Aadhaar Number"}
                </p>
              </div>

              {/* Body */}
              <div className="px-6 pb-6 space-y-6">
                {/* Step 1: Aadhaar Number */}
                <div className={`${isOtpStage ? "opacity-60 pointer-events-none" : ""}`}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Aadhaar Number</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formatAadhaarDisplay(localAadhaarNumber)}
                      onChange={handleAadhaarChange}
                      placeholder="XXXX XXXX XXXX"
                      className="w-full pl-10 pr-28 py-3.5 rounded-xl bg-dark-300/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-100/50 border border-dark-100/20 text-center tracking-widest"
                      maxLength="14"
                      disabled={isOtpStage || initLoading}
                    />
                    {!isOtpStage && localAadhaarNumber.length === 12 && (
                      <button
                        onClick={startInitiate}
                        disabled={initLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-white text-sm font-medium flex items-center gap-1 hover:opacity-90 transition whitespace-nowrap leading-none"
                      >
                        {initLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                          </>
                        ) : (
                          <>
                            Send OTP <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  {localAadhaarNumber.length > 0 && localAadhaarNumber.length !== 12 && (
                    <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Aadhaar number must be exactly 12 digits.
                    </p>
                  )}
                </div>

                {/* Step 2: OTP */}
                {isOtpStage && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-300">Enter OTP</label>
                      <div className="flex items-center gap-3 text-xs">
                        <button
                          onClick={() => setIsOtpStage(false)}
                          className="text-gray-300/80 hover:text-white transition"
                        >
                          Change number
                        </button>
                        <span className="text-gray-500">•</span>
                        <button
                          onClick={secsLeft === 0 ? startInitiate : undefined}
                          disabled={secsLeft !== 0 || initLoading}
                          className={`inline-flex items-center gap-1 ${secsLeft === 0 ? "text-accent-100 hover:text-accent-200" : "text-gray-500 cursor-not-allowed"}`}
                        >
                          <RefreshCw className="w-3 h-3" />
                          {secsLeft === 0 ? "Resend OTP" : `Resend in ${mmss(secsLeft)}`}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      OTP has been sent to the mobile number linked with your Aadhaar.
                    </p>

                    <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={inputRefs.current[index]}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          className="w-12 h-14 text-center text-xl font-semibold tracking-widest text-white bg-dark-300/80 border border-dark-100/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-100/50"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={clearOtp}
                        className="text-xs text-accent-100 flex items-center gap-1 hover:text-accent-200"
                      >
                        <Send className="w-3 h-3 rotate-180" />
                        Clear
                      </button>

                      <button
                        onClick={submitVerify}
                        className={`px-5 py-3 rounded-xl text-white font-medium shadow-md inline-flex items-center gap-2 transition
                          ${otp.join("").length === 6 && !verifyLoading ? "bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-95" : "bg-gradient-to-r from-green-500/70 to-teal-500/70 cursor-not-allowed opacity-80"}`}
                        disabled={verifyLoading || otp.join("").length !== 6}
                      >
                        {verifyLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Verifying…
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Verify & Continue
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Security Footer */}
                <div className="pt-2 mt-2 border-t border-dark-100/20">
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    Your information is encrypted and never stored in plain text.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const DashboardPage = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAadhaarModal, setShowAadhaarModal] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [showConsentForm, setShowConsentForm] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [consentProcessing, setConsentProcessing] = useState(false);
  const [showEmergencyContactModal, setShowEmergencyContactModal] =
    useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  // Use the me API query
  const {
    data: meData,
    isError,
    refetch,
  } = useMeQuery(undefined, {
    // Force refetch on mount
    refetchOnMountOrArgChange: true,
  });

 // ---- Smart Notifications trial-aware flags ----
const userFeatures = meData?.me?.features || {};
const smartTrial = userFeatures?.trials?.smartNotifications;
const smartIsPaid = userFeatures?.smartNotifications === true;

const smartIsTrialActive =
  !!smartTrial?.hasAccess &&
  smartTrial?.status === "trial-active" &&
  !!smartTrial?.trial?.enabled;

const smartIsTrialExpired = smartTrial?.status === "trial-expired";

const smartStatus = smartIsPaid
  ? "Active"
  : smartIsTrialActive
    ? `Trial${smartTrial?.trial?.remainingHuman ? ` (${smartTrial.trial.remainingHuman} left)` : ""}`
    : smartIsTrialExpired
      ? "Trial Expired"
      : (smartTrial?.trial?.eligible ? "Trial Eligible" : "Inactive");

      // --- Nominee trial flags (same pattern as Smart) ---
const nomineeTrial = meData?.me?.features?.trials?.nominee;
const nomineeIsPaid = meData?.me?.features?.nominee === true;
const nomineeIsTrialActive =
  !!nomineeTrial?.hasAccess &&
  nomineeTrial?.status === "trial-active" &&
  !!nomineeTrial?.trial?.enabled;

// For the status label shown on the card
const nomineeStatus = nomineeIsPaid
  ? "Active"
  : nomineeIsTrialActive
  ? `Trial${nomineeTrial?.trial?.remainingHuman ? ` (${nomineeTrial.trial.remainingHuman} left)` : ""}`
  : (nomineeTrial?.trial?.eligible ? "Trial Eligible" : "Inactive");


// Active service keys for the stat card (treat trial as active)
const activeKeys = useMemo(() => {
  const base = Object.keys(userFeatures).filter((k) => userFeatures[k] === true);

  if ((smartIsPaid || smartIsTrialActive) && !base.includes("smartNotifications")) {
    base.push("smartNotifications");
  }

  if ((nomineeIsPaid || nomineeIsTrialActive) && !base.includes("nominee")) {
    base.push("nominee");
  }

  return base;
}, [userFeatures, smartIsPaid, smartIsTrialActive, nomineeIsPaid, nomineeIsTrialActive]);



  // const [adhaarKyc, { isLoading: kycLoading }] = useAdhaarKycMutation();
  const { data: metricsData, isLoading } = useGetMatricsDataQuery();
  const [rotatingIndex, setRotatingIndex] = useState(0);

  // Derive isAadhaarVerified from the API response
  const isAadhaarVerified = meData?.me?.aadhaarVerified || false;
  const contactCount = meData?.me?.contacts || 0;
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  // Get user active features from API response
  // const userFeatures = meData?.me?.features || {};

  // Smart Notifications trial-aware status
// const smartTrial = userFeatures?.trials?.smartNotifications;
// const smartIsPaid = userFeatures?.smartNotifications === true;
// const smartIsTrialActive =
//   smartTrial?.hasAccess && smartTrial?.status === "trial-active";

// const smartStatus = smartIsPaid
//   ? "Active"
//   : smartIsTrialActive
//     ? `Trial${smartTrial?.trial?.remainingHuman ? ` (${smartTrial.trial.remainingHuman} left)` : ""}`
//     : (smartTrial?.trial?.eligible ? "Trial Eligible" : "Inactive");


  // Update features status based on API response

  const updatedFeatures = features.map((feature) => {
    if (feature.isFree) {
      return { ...feature, status: "Active" };
    }
  
    if (feature.id === "smartNotifications") {
      return { ...feature, status: smartStatus };
    }
  
    if (feature.id === "nominee") {
      return { ...feature, status: nomineeStatus };
    }
  
    const isActive = userFeatures[feature.id] === true;
    return { ...feature, status: isActive ? "Active" : "Inactive" };
  });
  
  

  

  useEffect(() => {
    if (id) {
      const featureExists = features.some((feature) => feature.id === id);
      if (featureExists) setActiveFeature(id);
    }
  }, [id]);

  const handleVerificationSuccess = async () => {
    await refetch();
    if ((meData?.me?.contacts || 0) === 0) {
      setShowEmergencyContactModal(true);
    } else {
      setActiveFeature("nominee");
    }
  };

  const [showDate, setShowDate] = useState(true);

  const lastLogin = useMemo(() => {
    if (!metricsData?.lastLogin) {
      const createdAt = meData?.me?.createdAt;
    
      if (createdAt) {
        const d = new Date(createdAt);
        const dateStr = d.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        // Show “Joined <date>” for first-time users
        return { date: `Joined ${dateStr}`, time: "" };
      }
    
      // Fallback if createdAt isn’t available for some reason
      return { date: "Welcome 👋", time: "" };
    }
    
    const parsedDate = new Date(metricsData.lastLogin);
    if (isNaN(parsedDate.getTime())) return { date: "Invalid Date", time: "" };

    const smartTrial = meData?.me?.features?.trials?.smartNotifications;
const smartIsPaid = meData?.me?.features?.smartNotifications === true;
const smartIsTrialActive =
  !!smartTrial?.hasAccess &&
  smartTrial?.status === "trial-active" &&
  !!smartTrial?.trial?.enabled;

// const activeKeys = useMemo(() => {
//   const base = Object.keys(userFeatures).filter((k) => userFeatures[k] === true);
//   if ((smartIsPaid || smartIsTrialActive) && !base.includes("smartNotifications")) {
//     base.push("smartNotifications");
//   }
//   return base;
// }, [userFeatures, smartIsPaid, smartIsTrialActive]);


    return {
      date: parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      time: parsedDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  }, [metricsData?.lastLogin]);

  const counts = metricsData?.counts || {
    creds: 0,
    notifications: 0,
    nomineeEntries: 0,
  };

  const ActiveFeatureComponent = activeFeature
    ? updatedFeatures.find((f) => f.id === activeFeature)?.component
    : null;

  const handleBackToDashboard = () => {
    setActiveFeature(null); // Reset the active feature
  };

  // Check if a feature is active/unlocked based on API response
  const isFeatureActive = (featureId) => {
    if (featureId === "credentials") return true;
  
    if (featureId === "smartNotifications") {
      return smartIsPaid || smartIsTrialActive;
    }
  
    if (featureId === "nominee") {
      return nomineeIsPaid || nomineeIsTrialActive;
    }
  
    return userFeatures[featureId] === true;
  };
  
  



  const handleFeatureClick = (feature) => {
    // If feature is free or active, open it
    if (feature.isFree || isFeatureActive(feature.id)) {
      if (feature.id === "nominee") {
        handleNomineeFeatureClick();
      } else {
        setActiveFeature(feature.id);
      }
    }
    // For locked features, redirection is handled directly in the FeatureCard component
  };

  const handleNomineeFeatureClick = () => {
    // First check if the feature is unlocked
    if (!isFeatureActive("nominee")) {
      return; // Don't proceed if feature is locked - handled by card component
    }

    // If feature is unlocked, then check for Aadhaar verification
    if (!isAadhaarVerified) {
      // If Aadhaar is not verified, show the Aadhaar modal
      setShowAadhaarModal(true);
    } else if (contactCount === 0) {
      // If no contacts exist, show the Emergency Contact Modal
      setShowEmergencyContactModal(true);
    } else {
      // If Aadhaar is verified and contacts exist, navigate to the Nominee feature
      setActiveFeature("nominee");
    }
  };

  const handleAadhaarVerificationCheck = () => {
    if (!isAadhaarVerified) {
      setShowAadhaarModal(true);
    }
  };

  const handleConsentAccept = async (aadhaarNumber) => {
    try {
      const response = await adhaarKyc({ aadhaar: aadhaarNumber }).unwrap();

      if (response?.message === "Aadhaar number updated successfully.") {
        setShowConsentForm(false); // Close consent form
        setShowEmergencyContactModal(true); // Show emergency contact modal
        await refetch(); // Update data
      }
    } catch (error) {
      console.error("Aadhaar KYC failed:", error);
    }
  };

  const handleEmergencyContactSave = async (contacts) => {
    try {
      setEmergencyContacts(contacts);
      setShowEmergencyContactModal(false);

      // Simulate saving the new contact count
      await refetch(); // Refetch to update contact count from backend

      // After successfully saving, navigate to the nominee feature
      setActiveFeature("nominee");
    } catch (error) {
      console.error("Error saving emergency contacts:", error);
    }
  };


  const ConsentForm = React.memo(() => (
    <AnimatePresence initial={false}>
      {showConsentForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gradient-to-br from-dark-200 to-dark-300 p-5 rounded-2xl shadow-2xl w-full max-w-sm border border-dark-100/20 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-accent-100/10 p-1.5 rounded-lg">
                  <FileText className="w-4 h-4 text-accent-100" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  Aadhaar Consent
                </h2>
              </div>
              <button
                onClick={() => setShowConsentForm(false)}
                className="p-1.5 hover:bg-dark-400 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-100/50"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Consent Information Card - More Compact */}
            <div className="bg-dark-400/40 rounded-xl p-3 mb-4 border border-dark-100/10">
              <div className="flex items-start gap-2 mb-3">
                <div className="bg-blue-500/10 p-1.5 rounded-lg mt-0.5">
                  <Info className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-400 mb-0.5">
                    Information Sharing
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    We'll verify your identity through Aadhaar authentication to
                    comply with KYC regulations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="bg-green-500/10 p-1.5 rounded-lg mt-0.5">
                  <Lock className="w-3.5 h-3.5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-green-400 mb-0.5">
                    Data Security
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Your information is encrypted and we don't store biometric
                    data or share with third parties.
                  </p>
                </div>
              </div>
            </div>

            {/* Aadhaar Number Display */}
            <div className="bg-dark-400/30 rounded-xl p-3 mb-4 text-center">
              <p className="text-xs text-gray-400 mb-0.5">Verifying Aadhaar</p>
              <p className="text-base font-medium text-white">
                {aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3")}
              </p>
            </div>

            {/* Legal Text - Shortened */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                By accepting, you consent to sharing your Aadhaar details for
                verification as per the IT Act, 2000 and Aadhaar Act, 2016. Your
                data will be handled securely.
              </p>
            </div>

            {/* Action Buttons - Side by Side for Space Saving */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowConsentForm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-300 text-sm font-medium hover:bg-dark-400/50 transition-all duration-300 flex items-center justify-center gap-1 focus:outline-none focus:ring-1 focus:ring-gray-500/30"
              >
                <X className="w-3.5 h-3.5" />
                Decline
              </button>

              <button
                onClick={async () => {
                  setConsentProcessing(true);
                  await handleConsentAccept(aadhaarNumber);
                  setConsentProcessing(false);
                }}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-medium shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-1 focus:outline-none focus:ring-1 focus:ring-green-500/50"
                disabled={consentProcessing}
              >
                {consentProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    Accept
                  </>
                )}
              </button>
            </div>

            {/* Footer Note - Simplified */}
            <div className="mt-3 pt-2 border-t border-dark-100/10 flex items-center justify-center">
              <p className="text-xs text-gray-500 flex items-center">
                <Shield className="w-3 h-3 text-gray-500 mr-1" />
                Secured by 256-bit encryption
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  ));

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-dark-100 via-dark-200 to-dark-300">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome Back,{" "}
                <span className="text-accent-100">{user?.firstName}</span>
              </h1>
              <p className="text-gray-400 text-base">
                Manage your digital assets with ease.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(true)}
              className="p-3 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-md hover:shadow-xl transition-all"
            >
              <Settings className="w-6 h-6 text-white" />
            </motion.button>
          </div>
          <style>{glowEffect}</style>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <SlidingStats counts={counts} isLoading={isLoading} />
            <ActiveServicesStat features={activeKeys} isLoading={isLoading} />


            <LastLoginStat lastLogin={lastLogin} isLoading={isLoading} />
            <StatCard
              icon={CheckCircle}
              title="Active Plan"
              value={Object.keys(userFeatures).length > 0 ? "Premium" : "Basic"}
              bgColor="bg-gradient-to-r from-indigo-500 to-purple-600"
              isLoading={isLoading}
            />
          </div>

          {!activeFeature ? (
            /* Main Features Grid */
            <div className="grid md:grid-cols-3 gap-8">
            {updatedFeatures.map((feature) => {
              const isSmart = feature.id === "smartNotifications";
              const showTrialExpired = isSmart && smartIsTrialExpired && !smartIsPaid;
          
              return (
                <div key={feature.id} className="relative">
                  {/* visible above the lock overlay */}
                  {showTrialExpired && (
                    <span className="pointer-events-none absolute right-3 top-3 z-[60] rounded-full border border-amber-500/35 bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-amber-300 shadow-[0_0_20px_rgba(255,184,77,0.25)]">
                      Trial expired
                    </span>
                  )}
          
                  <FeatureCard
                    feature={feature}
                    isActive={activeFeature === feature.id}
                    isAadhaarVerified={isAadhaarVerified}
                    setShowAadhaarModal={setShowAadhaarModal}
                    isLocked={!feature.isFree && !isFeatureActive(feature.id)}
                    onClick={() => handleFeatureClick(feature)}
                    navigate={navigate}
                  />
                </div>
              );
            })}
          </div>
          
          ) : (
            /* Active Feature Component */
            <div className="mb-12">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBackToDashboard}
                className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </motion.button>
              {ActiveFeatureComponent &&
                (ActiveFeatureComponent.name === "DashboardNominee" ? (
                  <ActiveFeatureComponent
                    isAadhaarVerified={isAadhaarVerified}
                    setAadhaarVerified={() => refetch()}
                  />
                ) : (
                  <ActiveFeatureComponent />
                ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Aadhaar Modal */}
      <AadhaarModal
        showAadhaarModal={showAadhaarModal}
        setShowAadhaarModal={setShowAadhaarModal}
        onVerificationSuccess={handleVerificationSuccess}
      />

      {/* Consent Form */}
      <ConsentForm />

      {/* Emergency Contact Modal */}
      <EmergencyContactModal
        isOpen={showEmergencyContactModal}
        onClose={() => setShowEmergencyContactModal(false)}
        onSave={handleEmergencyContactSave}
      />

      <Footer />
    </div>
  );
};

export default DashboardPage;
