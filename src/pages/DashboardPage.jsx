import React, { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import useAuthStore from "../store/authStore";
import Footer from "../components/Footer";
import DashboardCredentials from "../components/dashboard/DashboardCredentials";
import DashboardNotifications from "../components/dashboard/DashboardNotifications";
import DashboardNominee from "../components/dashboard/DashboardNominee";
import { useSelector } from "react-redux";
import {
  useAddEmergencyContactMutation,
  useAdhaarKycMutation,
} from "@/features/api/userNomineeApiSlice";
import {
  useGetMatricsDataQuery,
  useMeQuery,
} from "@/features/api/userApiSlice";

const features = [
  {
    id: "credentials",
    title: "Manage Credentials",
    icon: Shield,
    status: "Active",
    nextBilling: "2024-03-15",
    // price: "₹0.00/month",
    description:
      "Securely Store and Manage all your Digital Credentials in One Place",
    color: "from-blue-600 to-indigo-600",
    bgImage:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
    component: DashboardCredentials,
  },
  {
    id: "notifications",
    title: "Smart Notifications",
    icon: Bell,
    status: "Trial",
    nextBilling: "2024-03-10",
    // price: "₹0.00/month",
    description: "Stay informed with intelligent alerts and updates",
    color: "from-purple-600 to-pink-600",
    bgImage:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
    component: DashboardNotifications,
  },
  {
    id: "nominee",
    title: "Choose Nominee",
    icon: Users,
    status: "Inactive",
    // price: "₹0.00/month",
    description: "Select and manage trusted nominees",
    color: "from-green-600 to-teal-600",
    bgImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    // component: DashboardNominee,
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

// 🔥 Glow Effect for Icons
const glowEffect = `
  .glow-effect {
    box-shadow: 0 0 10px rgba(122, 162, 247, 0.7), 0 0 20px rgba(122, 162, 247, 0.4);
  }
`;

const FeatureCard = ({
  feature,
  isActive,
  isAadhaarVerified,
  setShowAadhaarModal,
  onClick,
}) => (
  <motion.div
    onClick={() => {
      if (feature.id === "nominee") {
        if (!isAadhaarVerified) {
          setShowAadhaarModal(true); // Show Aadhaar modal if not verified
        } else {
          onClick(); // Directly activate the nominee feature
        }
      } else {
        onClick(); // Activate other features
      }
    }}
    className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group ${
      isActive ? "ring-2 ring-accent-100" : ""
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="absolute inset-0">
      <img
        src={feature.bgImage}
        alt={feature.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`}
      />
    </div>

    <div className="relative p-6">
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

      <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
      <p className="text-sm mb-4 text-white/80">{feature.description}</p>
      <p className="text-lg font-bold text-white">{feature.price}</p>
    </div>
  </motion.div>
);

const EmergencyContactModal = ({ isOpen, onClose, onSave }) => {
  const [contacts, setContacts] = useState([
    { name: "", phone: "", email: "" },
  ]);
  const [addEmergencyContact, { isLoading }] = useAddEmergencyContactMutation();

  const handleInputChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const addNewContact = () => {
    if (contacts.length < 2) {
      setContacts([...contacts, { name: "", phone: "", email: "" }]);
    }
  };

  const removeContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleSave = async () => {
    const isValid = contacts.every(
      (contact) => contact.name && contact.phone && contact.email
    );

    if (isValid) {
      try {
        const payload = { contacts };
        await addEmergencyContact(payload).unwrap();
        onSave(contacts); // Optional callback for parent component
        onClose();
      } catch (error) {
        console.error("Failed to add emergency contacts:", error);
        alert("An error occurred while saving contacts. Please try again.");
      }
    } else {
      alert("All fields are required for each contact.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-dark-200 to-dark-300 p-8 rounded-xl shadow-lg w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-accent-100">
            Emergency Contacts
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-400 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Contact Fields with Scroll */}
        <div className="space-y-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-accent-100 scrollbar-track-dark-300 pr-2">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-dark-300 p-4 rounded-lg shadow-md glow-box"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Contact {index + 1}
                </h3>
                {contacts.length > 1 && (
                  <button
                    onClick={() => removeContact(index)}
                    className="text-red-500 hover:text-red-600"
                    aria-label="Remove Contact"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400">Name</label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="input-primary"
                    placeholder="Enter name"
                  />
                </div>
                <div>
  <label className="block text-sm text-gray-400">Phone</label>
  <input
    type="text"
    value={contact.phone}
    onChange={(e) => {
      // Restrict non-numeric input and limit to 10 digits
      const numericValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
      handleInputChange(index, "phone", numericValue);
    }}
    className="input-primary"
    placeholder="Enter phone number"
    maxLength="10" // Prevents input beyond 10 digits
  />
</div>


                <div>
                  <label className="block text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                    className="input-primary"
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between items-center mt-6">
          {/* Add Contact Button */}
          {contacts.length < 2 && (
            <button
              onClick={addNewContact}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
              aria-label="Add Another Contact"
            >
              Add Another Contact
            </button>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={
              isLoading ||
              !contacts.every(
                (contact) => contact.name && contact.phone && contact.email
              )
            }
            className={`px-6 py-2 rounded-lg shadow-md transition ${
              contacts.every(
                (contact) => contact.name && contact.phone && contact.email
              )
                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg hover:opacity-90"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            } ${isLoading && "cursor-wait"}`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  // const { user } = useAuthStore();
  const [activeFeature, setActiveFeature] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  // const [isAadhaarVerified, setIsAadhaarVerified] = useState(true); // Initial Aadhaar verification state
  const [showAadhaarModal, setShowAadhaarModal] = useState(false); // Aadhaar modal state
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [showConsentForm, setShowConsentForm] = useState(false); // Consent form state
  const { user } = useSelector((state) => state.auth); // Access user from Redux store
  // const isAadhaarVerified = user?.aadhaarVerified || false;
  const [consentProcessing, setConsentProcessing] = useState(false);
  const [showEmergencyContactModal, setShowEmergencyContactModal] =
    useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  // Use the me API query
  const { data: meData, isError, refetch } = useMeQuery();
  const [adhaarKyc, { isLoading: kycLoading }] = useAdhaarKycMutation();
  const { data: metricsData, isLoading } = useGetMatricsDataQuery();
  const [rotatingIndex, setRotatingIndex] = useState(0);
  // const [userLastLogin, setUserLastLogin] = useState("");
  // Derive isAadhaarVerified from the API response
  const isAadhaarVerified = meData?.me?.aadhaarVerified || false;
  const contactCount = meData?.me?.contacts || 0;
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    if (id) {
      const featureExists = features.some((feature) => feature.id === id);
      if (featureExists) setActiveFeature(id);
    }
  }, [id]);

  const [showDate, setShowDate] = useState(true);

  // ✅ Rotate 1st Card (Stored Credentials) every 4 sec
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRotatingIndex((prev) => (prev + 1) % rotatingStats.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  // ✅ Format Last Login & Rotate between Date/Time every 4 sec
  const lastLogin = useMemo(() => {
    if (!metricsData?.lastLogin) return { date: "No Login", time: "" };
    const parsedDate = new Date(metricsData.lastLogin);
    if (isNaN(parsedDate.getTime())) return { date: "Invalid Date", time: "" };

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

  // useEffect(() => {
  //   if (!lastLogin.date || !lastLogin.time) return;
  //   const interval = setInterval(() => {
  //     setShowDate((prev) => !prev);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [lastLogin]);

  const counts = metricsData?.counts || {
    creds: 0,
    notifications: 0,
    nomineeEntries: 0,
  };

  const ActiveFeatureComponent = activeFeature
    ? features.find((f) => f.id === activeFeature)?.component
    : null;

  const handleBackToDashboard = () => {
    setActiveFeature(null); // Reset the active feature
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

  const handleNomineeFeatureClick = () => {
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

  const AadhaarModal = () => {
    const [localAadhaarNumber, setLocalAadhaarNumber] = useState(aadhaarNumber);
    const [isOtpStage, setIsOtpStage] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const inputRefs = Array(6)
      .fill(0)
      .map(() => React.createRef());

    const [adhaarKyc, { isLoading: kycLoading }] = useAdhaarKycMutation();

    const handleAadhaarChange = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length <= 12) {
        setLocalAadhaarNumber(value);
        setErrorMessage("");
      }
    };

    const handleOtpChange = (value, index) => {
      const newOtp = [...otp];
      newOtp[index] = value;

      if (value && /^[0-9]$/.test(value) && index < 5) {
        inputRefs[index + 1].current.focus();
      }
      setOtp(newOtp);
    };

    const handleOtpKeyDown = (e, index) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    };

    const handleSubmit = async () => {
      // setIsLoading(true);
      setShowAadhaarModal(false);
      setAadhaarNumber(localAadhaarNumber);
      setShowConsentForm(true);
      const otpValue = otp.join("");
      // try {
      //   const response = await adhaarKyc({
      //     aadhaar: localAadhaarNumber,

      //   }).unwrap();

      //   if (response?.message === "aadhaar number updated successfully.") {
      //     setShowAadhaarModal(false);
      //     setShowConsentForm(true);
      //   } else {
      //     setErrorMessage(response?.message || "Aadhaar verification failed.");
      //   }
      // } catch (error) {
      //   setErrorMessage(error?.data?.message || "Aadhaar verification failed.");
      // } finally {
      //   setIsLoading(false);
      // }
    };

    const clearOtp = () => {
      setOtp(Array(6).fill(""));
      inputRefs[0].current.focus();
    };

    return (
      <AnimatePresence>
        {showAadhaarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-br from-dark-200 to-dark-300 p-8 rounded-xl shadow-xl w-full max-w-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-accent-100" />
                  <h2 className="text-2xl font-bold text-accent-100">
                    Aadhaar Verification
                  </h2>
                </div>
                <button
                  onClick={() => setShowAadhaarModal(false)}
                  className="p-2 hover:bg-dark-400 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Aadhaar Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={localAadhaarNumber}
                      onChange={handleAadhaarChange}
                      placeholder="Enter 12-digit Aadhaar Number"
                      className="w-full px-4 py-3 rounded-lg bg-dark-300 text-white focus:outline-none focus:ring-2 focus:ring-accent-100 pr-28"
                      maxLength="12"
                      disabled={isOtpStage}
                    />
                    {!isOtpStage && localAadhaarNumber.length === 12 && (
                      <button
                        onClick={() => setIsOtpStage(true)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">Verify</span>
                      </button>
                    )}
                  </div>
                  {localAadhaarNumber.length > 0 &&
                    localAadhaarNumber.length !== 12 && (
                      <p className="text-sm text-red-500 mt-1">
                        Aadhaar number must be exactly 12 digits.
                      </p>
                    )}
                </div>

                {isOtpStage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <label className="block text-sm text-gray-400">
                        Enter OTP
                      </label>
                      <button
                        onClick={clearOtp}
                        className="text-sm text-accent-100 hover:text-accent-200 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex gap-2 justify-center">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={inputRefs[index]}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(e.target.value, index)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          className="w-12 h-12 text-center text-white bg-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-100 text-lg"
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold shadow-md hover:opacity-90 transition-all duration-300"
                      disabled={kycLoading}
                    >
                      {kycLoading ? "Processing..." : "Submit OTP"}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const ConsentForm = React.memo(() => (
    <AnimatePresence initial={false}>
      {showConsentForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-dark-200 to-dark-300 p-8 rounded-xl shadow-lg w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-accent-100">
                Consent Form
              </h2>
              <button
                onClick={() => setShowConsentForm(false)}
                className="p-2 hover:bg-dark-400 rounded-full transition"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-gray-400 mb-6">
              By proceeding, you consent to sharing your Aadhaar details for
              verification purposes. Your data will be handled securely and in
              compliance with privacy standards.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConsentForm(false)}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
              >
                Decline
              </button>
              <button
                onClick={async () => {
                  setConsentProcessing(true);
                  await handleConsentAccept(aadhaarNumber);
                  setConsentProcessing(false);
                }}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
                disabled={consentProcessing}
              >
                {consentProcessing ? "Processing..." : "Accept"}
              </button>
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
            <ActiveServicesStat
              features={metricsData?.features || []}
              isLoading={isLoading}
            />
            <LastLoginStat lastLogin={lastLogin} isLoading={isLoading} />
            <StatCard
              icon={CheckCircle}
              title="Active Plan"
              value="Full Premium"
              bgColor="bg-gradient-to-r from-indigo-500 to-purple-600"
              isLoading={isLoading}
            />
          </div>

          {!activeFeature ? (
            /* Main Features Grid */
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  isActive={activeFeature === feature.id}
                  isAadhaarVerified={isAadhaarVerified}
                  setShowAadhaarModal={() => {
                    if (!isAadhaarVerified) {
                      setShowAadhaarModal(true);
                    }
                  }}
                  onClick={() => {
                    if (feature.id === "nominee") {
                      handleNomineeFeatureClick();
                    } else {
                      setActiveFeature(feature.id);
                    }
                  }}
                />
              ))}
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
              {ActiveFeatureComponent && <ActiveFeatureComponent />}
            </div>
          )}
        </motion.div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      {/* <AadhaarModal /> */}
      <ConsentForm />

      {/* Aadhaar Modal */}
      <AadhaarModal
        isOpen={showAadhaarModal}
        onClose={() => setShowAadhaarModal(false)}
      />

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
