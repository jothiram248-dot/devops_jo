// new with otp model

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Save,
  UserCheck,
  Award,
  User,
  Phone,
  Mail,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { dummyBankingCredentials } from "../../data/dummyCredentials";
import {
  useGetAllCredsQuery,
  useGetCredQuery,
  useUpdateCredMutation,
  useDeleteCredMutation,
  useDeleteAllCredMutation,
} from "@/features/api/userCredApiSlice";
import {
  useVerifyCodeMutation,
  useCodeMutation,
} from "@/features/api/userApiSlice";
import { useSelector } from "react-redux";
import {
  useDeleteAllNomineeMutation,
  useDeleteNomineeMutation,
  useGetAllNomineesQuery,
  useGetEmergencyNomineeQuery,
  useGetNomineeQuery,
  useUpdateNomineeMutation,
} from "@/features/api/userNomineeApiSlice";

// Simulated encryption function
const decryptData = (data) => {
  // In production, use proper decryption
  return {
    userId: "john.doe",
    password: "securePass123",
    additionalInfo: "Primary account for savings",
  };
};
// const OTP_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

const OTP_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds
const getLastVerifiedTime = (credentialName) => {
  const sessions = JSON.parse(sessionStorage.getItem("otpSessions")) || {};
  return sessions[credentialName] || null;
};

// Function to set the last verified time for a specific credential
const setLastVerifiedTime = (credentialName) => {
  const sessions = JSON.parse(sessionStorage.getItem("otpSessions")) || {};
  sessions[credentialName] = new Date().getTime();
  sessionStorage.setItem("otpSessions", JSON.stringify(sessions));
};

// const VerificationModal = ({
//   isOpen,
//   selectedCredential,
//   onClose,
//   onVerified,
// }) => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]); // OTP fields
//   const [loading, setLoading] = useState(false); // Loading state for verification
//   const [verifyCode] = useVerifyCodeMutation(); // Mutation for verifying code
//   const verificationData = useSelector((state) => state.auth.loginIdUsername); // Login data from Redux store

//   const handleVerify = async () => {
//     setLoading(true);
//     setOtp(["", "", "", "", "", ""]);
//     try {
//       const response = await verifyCode({
//         loginId: verificationData,
//         code: otp.join(""), // Join OTP array into a single string
//       }).unwrap();

//       if (response.message?.includes("successfully")) {
//         toast.success("Verification successful");
//         if (selectedCredential) {
//           setLastVerifiedTime(selectedCredential.displayName); // Save last verified time
//         }
//         onVerified(); // Notify parent of successful verification
//         onClose(); // Close the modal
//       } else {
//         throw new Error("Invalid verification code");
//       }
//     } catch (error) {
//       toast.error(error?.message || "Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null; // Return nothing if the modal is not open

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-dark-200 rounded-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-2xl font-bold text-white">Verify Access</h3>
//           <button onClick={onClose}>
//             <X className="w-6 h-6 text-gray-400" />
//           </button>
//         </div>

//         <p className="text-gray-300 mb-6">
//           Enter the verification code sent to your email for{" "}
//           {selectedCredential?.displayName}.
//         </p>

//         {/* OTP Input Fields */}
//         <div className="flex justify-between mb-6">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => {
//                 const newOtp = [...otp];
//                 newOtp[index] = e.target.value;
//                 setOtp(newOtp);

//                 if (e.target.value && index < 5) {
//                   document.getElementById(`otp-${index + 1}`)?.focus();
//                 }
//               }}
//               id={`otp-${index}`}
//               className="w-12 h-12 text-center text-2xl rounded-lg bg-dark-300 border border-dark-400 text-white"
//             />
//           ))}
//         </div>

//         {/* Verify Button */}
//         <button
//           onClick={handleVerify}
//           disabled={loading || otp.some((d) => !d)}
//           className="w-full py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold disabled:opacity-50"
//         >
//           {loading ? "Verifying..." : "Verify"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const CredentialDetailsModal = ({ credential, onClose, onEdit, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState(decryptData(credential));
//   const { data, isLoading, isError } = useGetCredQuery(credential?.id);
//   console.log(credential);
//   const handleSave = () => {
//     // In production, implement actual save logic
//     toast.success("Changes saved successfully");
//     setIsEditing(false);
//   };

//   if (!credential) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-dark-200 rounded-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-2xl font-bold text-white">{credential.title}</h3>
//           <button onClick={onClose}>
//             <X className="w-6 h-6 text-gray-400" />
//           </button>
//         </div>

//         <div className="space-y-4">
//           {isEditing ? (
//             // Edit Form
//             <>
//               <div>
//                 <label className="text-sm text-gray-400">User ID</label>
//                 <input
//                   type="text"
//                   value={editedData.userId}
//                   onChange={(e) =>
//                     setEditedData({ ...editedData, userId: e.target.value })
//                   }
//                   className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-400">Password</label>
//                 <input
//                   type="text"
//                   value={editedData.password}
//                   onChange={(e) =>
//                     setEditedData({ ...editedData, password: e.target.value })
//                   }
//                   className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-400">
//                   Additional Information
//                 </label>
//                 <textarea
//                   value={editedData.additionalInfo}
//                   onChange={(e) =>
//                     setEditedData({
//                       ...editedData,
//                       additionalInfo: e.target.value,
//                     })
//                   }
//                   rows={4}
//                   className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                 />
//               </div>
//             </>
//           ) : (
//             // View Mode
//             <>
//               <div>
//                 <label className="text-sm text-gray-400">User ID</label>
//                 <p className="text-white">{editedData.userId}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-400">Password</label>
//                 <p className="text-white">{editedData.password}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-400">
//                   Additional Information
//                 </label>
//                 <p className="text-white">{editedData.additionalInfo}</p>
//               </div>
//             </>
//           )}
//         </div>

//         <div className="flex justify-between mt-6 space-x-4">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="flex-1 py-3 rounded-lg border border-accent-100 text-accent-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="flex-1 py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold flex items-center justify-center"
//               >
//                 <Save className="w-5 h-5 mr-2" />
//                 Save Changes
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="flex-1 py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={onDelete}
//                 className="flex-1 py-3 rounded-lg bg-red-500 text-white font-semibold"
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CredentialDetailsModal = ({
//   credential,
//   onClose,
//   onEdit,
//   triggerDelete,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const { data, isLoading, isError } = useGetCredQuery(credential?.id);
//   const [updateCred, { isLoading: isUpdating }] = useUpdateCredMutation();
//   const { type } = useParams();
//   const isBankingForm = type === "banking";
//   // const handleSave = () => {
//   //   toast.success("Changes saved successfully");
//   //   setIsEditing(false);
//   // };
//   const [editedData, setEditedData] = useState(() => ({
//     displayName: data?.resource?.displayName || "",
//     platformName: data?.resource?.platformName || "",
//     bankName: data?.resource?.bankName || "",
//     userId: data?.resource?.userId || "",
//     password: data?.resource?.password || "",
//     additionalInfo: data?.resource?.additionalInfo || "",
//   }));
//   useEffect(() => {
//     if (data?.cred?.data) {
//       setEditedData({
//         displayName: data.resource?.displayName || "",
//         platformName: data.resource?.platformName || "",
//         bankName: data.resource?.bankName || "",
//         userId: data.resource?.userId || "",
//         password: data.resource?.password || "",
//         additionalInfo: data.resource?.additionalInfo || "",
//       });
//     }
//   }, [data]);
//   const handleSave = async () => {
//     try {
//       const updatedCredential = {
//         category: type || "others",
//         data: {
//           displayName: editedData.displayName,
//           ...(isBankingForm
//             ? { bankName: editedData.bankName }
//             : { platformName: editedData.platformName }),
//           userId: editedData.userId,
//           password: editedData.password,
//           additionalInfo: editedData.additionalInfo,
//         },
//       };

//       await updateCred({
//         creds: updatedCredential,
//         credId: credential.id,
//       }).unwrap();
//       toast.success("Credential updated successfully!");
//       setIsEditing(false);
//       onEdit && onEdit(updatedCredential); // Optionally call onEdit callback
//     } catch (error) {
//       toast.error("Failed to update credential.");
//     }
//   };

//   if (!credential) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-dark-200 rounded-xl w-full max-w-lg p-6 shadow-lg overflow-hidden">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-2xl font-bold text-white truncate">
//             {data?.resource?.displayName || "Credential Details"}
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-200 transition duration-300"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {isLoading ? (
//           <p className="text-gray-300">Loading credential details...</p>
//         ) : isError ? (
//           <p className="text-red-400">Failed to load details.</p>
//         ) : (
//           <div className="h-96 overflow-y-auto pr-2 space-y-4">
//             <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//               <p className="text-gray-400 text-sm font-medium">
//                 {data.resource?.bankName ? "Bank Name" : "Platform Name"}
//               </p>
//               <p className="text-white">
//                 {data.resource?.bankName || data.resource?.platformName}
//               </p>
//             </div>

//             {isEditing ? (
//               <>
//                 <div>
//                   <label className="text-sm text-gray-400">User ID</label>
//                   <input
//                     type="text"
//                     value={editedData.userId}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, userId: e.target.value })
//                     }
//                     className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-400">Password</label>
//                   <input
//                     type="text"
//                     value={editedData.password}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, password: e.target.value })
//                     }
//                     className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-400">
//                     Additional Information
//                   </label>
//                   <textarea
//                     value={editedData.additionalInfo}
//                     onChange={(e) =>
//                       setEditedData({
//                         ...editedData,
//                         additionalInfo: e.target.value,
//                       })
//                     }
//                     rows={4}
//                     className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//                   <p className="text-gray-400 text-sm font-medium">User ID</p>
//                   <p className="text-white">{data.resource?.userId}</p>
//                 </div>
//                 <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//                   <p className="text-gray-400 text-sm font-medium">Password</p>
//                   <p className="text-white">{data.resource?.password}</p>
//                 </div>
//                 <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//                   <p className="text-gray-400 text-sm font-medium">
//                     Additional Information
//                   </p>
//                   <p className="text-white">
//                     {data.resource?.additionalInfo || "N/A"}
//                   </p>
//                 </div>
//               </>
//             )}

//             {/* {data.resource?.meta && (
//               <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//                 <p className="text-gray-400 text-sm font-medium">
//                   Meta Details
//                 </p>
//                 <div className="space-y-2">
//                   <p className="text-white">
//                     <span className="font-medium text-gray-400">IFSC: </span>
//                     {data.resource?.meta.ifsc || "N/A"}
//                   </p>
//                   <p className="text-white">
//                     <span className="font-medium text-gray-400">
//                       Account Type:{" "}
//                     </span>
//                     {data.resource?.meta.accountType || "N/A"}
//                   </p>
//                 </div>
//               </div>
//             )} */}
//           </div>
//         )}

//         <div className="flex justify-between mt-6 space-x-4">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="flex-1 py-3 rounded-lg border border-accent-100 text-accent-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="flex-1 py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold flex items-center justify-center"
//               >
//                 <Save className="w-5 h-5 mr-2" />
//                 {isUpdating ? "Saving..." : "Save Changes"}
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="flex-1 py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={triggerDelete}
//                 className="flex-1 py-3 rounded-lg bg-red-500 text-white font-semibold"
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

const VerificationModal = ({
  isOpen,
  selectedCredential,
  onClose,
  onVerified,
  otpMethod,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]); // 4-digit OTP fields
  const [loading, setLoading] = useState(false); // Loading state for verification
  const [verifyCode] = useVerifyCodeMutation(); // Mutation for verifying code
  const verificationData = useSelector((state) => state.auth.loginIdUsername); // Login data from Redux store

  const handleVerify = async () => {
    setLoading(true);
    setOtp(["", "", "", ""]);
    try {
      const response = await verifyCode({
        loginId: verificationData,
        code: otp.join(""), // Join OTP array into a single string
      }).unwrap();

      if (response.message?.includes("successfully")) {
        toast.success("Verification successful");
        if (selectedCredential) {
          setLastVerifiedTime(selectedCredential.displayName); // Save last verified time
        }
        onVerified(); // Notify parent of successful verification
        onClose(); // Close the modal
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      toast.error(error?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, value) => {
    if (/^[0-9]*$/.test(value)) {
      // Allow only digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`)?.focus(); // Auto-focus next field
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus(); // Auto-focus previous field
    }
  };

  if (!isOpen) return null; // Return nothing if the modal is not open
  const methodText = otpMethod === "sms" ? "phone" : "email";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-200 rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Verify Access</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          Enter the verification code sent to your {methodText} for{" "}
          {selectedCredential?.displayName}.
        </p>

        {/* 4-Digit OTP Input Fields */}
        <div className="flex justify-center space-x-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              id={`otp-${index}`}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-16 h-16 text-center text-3xl rounded-lg bg-dark-300 border border-dark-400 text-white focus:ring-2 focus:ring-accent-100 focus:outline-none transition-all"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || otp.some((d) => !d)}
          className="w-full py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

const CredentialDetailsCard = ({
  credential,
  onClose,
  onEdit,
  triggerDelete,
  // isOthers,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeEditingId, setActiveEditingId] = useState(null); // Track which card is being edited
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { type } = useParams();
  // const { data, isLoading, isError, refetch } = useGetNomineeQuery(credential);
  const encodedCredential =
    credential === "Trusted Friends/Family Members"
      ? encodeURIComponent(credential)
      : credential;
  const { data, isLoading, isError, refetch } = useGetNomineeQuery(credential);

  // // Separate resources based on the type
  // const resources =
  //   type !== "emergencyContacts" && data?.nomineeEntry
  //     ? [data.nomineeEntry] // For non-emergencyContacts
  //     : [];

  // const emergencyResource =
  //   type === "emergencyContacts" && data?.resources
  //     ? data.resources // For emergencyContacts
  //     : [];

  const [resources, setResources] = useState([]);
  const [emergencyResource, setEmergencyResource] = useState([]);

  useEffect(() => {
    if (data) {
      if (type === "emergencyContacts") {
        setEmergencyResource(data?.nomineeEntry ? [data.nomineeEntry] : []);
      } else {
        setResources(data?.nomineeEntry ? [data.nomineeEntry] : []);
      }
    }
  }, [data, type]);

  // const isOthers = JSON.parse(localStorage.getItem("isOthers"));
  const initialDisplayName = localStorage.getItem("initialDisplayName");
  const [updateCred, { isLoading: isUpdating }] = useUpdateNomineeMutation();

  const [deleteNominee, { isLoading: isDeleting }] = useDeleteNomineeMutation();

  const [editedData, setEditedData] = useState({
    displayName: "",
    platformName: "",
    bankName: "",
    accountType: "",
    subscriptionType: "",
    userId: "",
    password: "",
    additionalInfo: "",
    name: "",
    phone: "",
    email: "",
    role: "",
    nominee: {
      name: "",
      phone: "",
      email: "",
      additionalInfo: "",
    },
  });
  // console.log(isOthers);
  useEffect(() => {
    if (resources.length > 0 && activeEditingId) {
      const resource = resources.find((res) => res.id === activeEditingId);
      if (resource) {
        setEditedData({
          displayName: resource.data.platformName || "",
          platformName: resource.data.platformName || "",
          userId: resource.data.userId || "",
          password: resource.data.password || "",
          additionalInfo: resource.data.additionalInfo || "",

          nominee: {
            name: resource.data.nominee?.name || "",
            phone: resource.data.nominee?.phone || "",
            email: resource.data.nominee?.email || "",
            additionalInfo: resource.data.nominee?.additionalInfo || "",
          },
        });
      }
    }
  }, [activeEditingId]);

  const handleSave = async (id, editedData) => {
    try {
      const updatedCredential =
        type === "emergencyContacts"
          ? {
              platformName: editedData.platformName,
              name: editedData.name,
              phone: editedData.phone,
              email: editedData.email,
              role: editedData.role,
              additionalInfo: editedData.additionalInfo,
              nominee: {
                name: editedData.nominee?.name || "",
                phone: editedData.nominee?.phone || "",
                email: editedData.nominee?.email || "",
                additionalInfo: editedData.nominee?.additionalInfo || "",
              },
            }
          : {
              // category: type,
              // data: {
              platformName: editedData.platformName,
              userId: editedData.userId,
              password: editedData.password,
              additionalInfo: editedData.additionalInfo,
              nominee: {
                name: editedData.nominee?.name || "",
                phone: editedData.nominee?.phone || "",
                email: editedData.nominee?.email || "",
                additionalInfo: editedData.nominee?.additionalInfo || "",
              },
              // },
            };

      await updateCred({
        body: updatedCredential,
        nomineeId: id,
      }).unwrap();

      toast.success("Credential updated successfully!");
      refetch();
      setIsEditing(false);
      setActiveEditingId(null);
      onEdit && onEdit(updatedCredential);
    } catch (error) {
      if (error?.data?.message === "Validation error" && error?.data?.details) {
        const errorMessages = error.data.details
          .map((detail) => detail.message)
          .join(", ");
        toast.error(`Validation Error: ${errorMessages}`);
      } else if (error?.data?.message === "Credential already exists") {
        toast.error("Credential already exists. Please use a different one.");
      } else {
        toast.error("Failed to add Nominee. Please try again.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNominee(id).unwrap();
      toast.success("Credential deleted successfully!");

      setConfirmDeleteId(null);

      // Remove the deleted item from the UI immediately
      if (type === "emergencyContacts") {
        setEmergencyResource((prev) =>
          prev.filter((resource) => resource.id !== id)
        );
      } else {
        setResources((prev) => prev.filter((resource) => resource.id !== id));
      }

      refetch(); // Optional for server confirmation
    } catch (error) {
      toast.error("Failed to delete credential.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="w-12 h-12 border-4 border-accent-100 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!credential) return null;
  return (
    <div className="grid ">
      {(resources.length === 0 && type !== "emergencyContacts") ||
      (emergencyResource.length === 0 && type === "emergencyContacts") ? (
        <div className="flex flex-col items-center justify-center p-6 bg-dark-200 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-accent-100 mb-2">
            No Data Found
          </h3>
          <p className="text-gray-400 text-sm text-center">
            No credential or nominee details found for this ID. It might have
            been deleted.
          </p>
        </div>
      ) : type === "emergencyContacts" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyResource.map((resource) => (
            <div
              key={resource.id}
              className="bg-gradient-to-br from-dark-200 via-dark-300 to-dark-200 rounded-lg p-5 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 flex flex-col justify-between"
            >
              {/* Header Section */}
              <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                    Platform
                  </p>
                  <p className="text-lg font-bold text-accent-100">
                    {resource.data.platformName}
                  </p>
                </div>
                <div className="rounded-full p-3 bg-gradient-to-br from-accent-100 to-accent-200 shadow-md">
                  <Award className="text-dark-100 w-6 h-6" />
                </div>
              </div>

              {/* Details Section */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-start gap-3">
                  <User className="text-accent-100 w-5 h-5 mt-1" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                      Profession/Designation
                    </p>
                    <p className="text-sm text-white font-bold">
                      {resource.data.role}
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div className="flex items-start gap-3">
                  <User className="text-accent-100 w-5 h-5 mt-1" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                      Name
                    </p>
                    <p className="text-sm text-white font-bold">
                      {resource.data.name}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="text-accent-100 w-5 h-5 mt-1" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                      Phone
                    </p>
                    <p className="text-sm text-white font-bold">
                      {resource.data.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="text-accent-100 w-5 h-5 mt-1" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                      Email
                    </p>
                    <p className="text-sm text-white font-bold">
                      {resource.data.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                  Additional Info
                </p>
                <div className="text-sm text-white font-normal max-h-20 overflow-auto scrollbar-thin scrollbar-thumb-accent-100 scrollbar-track-dark-200">
                  {resource.data.additionalInfo || "N/A"}
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 h-[1px] bg-gray-700"></div>

              {/* Nominee Section */}
              <div className="space-y-4">
                <div className="flex items-center mb-3">
                  <UserCheck className="w-6 h-6 text-accent-100 mr-2" />
                  <p className="text-lg font-semibold text-white">
                    Nominee Details
                  </p>
                </div>
                <div className="bg-dark-300 p-4 rounded-lg shadow-md space-y-2">
                  <p className="text-sm font-medium text-gray-300">
                    <span className="font-bold text-accent-100">Name:</span>{" "}
                    {resource.data.nominee?.name || "N/A"}
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    <span className="font-bold text-accent-100">Phone:</span>{" "}
                    {resource.data.nominee?.phone || "N/A"}
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    <span className="font-bold text-accent-100">Email:</span>{" "}
                    {resource.data.nominee?.email || "N/A"}
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    <span className="font-bold text-accent-100">
                      Additional Info:
                    </span>{" "}
                    {resource.data.nominee?.additionalInfo || "N/A"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setActiveEditingId(resource.id);
                    setEditedData({
                      name: resource.data.name,
                      phone: resource.data.phone,
                      email: resource.data.email,
                      role: resource.data.role,
                      additionalInfo: resource.data.additionalInfo,
                      nominee: {
                        name: resource.data.nominee?.name || "",
                        phone: resource.data.nominee?.phone || "",
                        email: resource.data.nominee?.email || "",
                        additionalInfo:
                          resource.data.nominee?.additionalInfo || "",
                      },
                    });
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDeleteId(resource.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-gradient-to-br from-dark-200 via-dark-300 to-dark-200 rounded-xl glow-box p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Platform Section */}
              <div className="space-y-4">
                {/* Platform Name */}
                <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Platform
                    </p>
                    <p className="text-lg font-bold text-accent-100">
                      {/* {resource.data.platformName} */}
                      {type === 'investment' ? resource.data.accountType : resource.data.platformName}
                    </p>
                  </div>
                  <div className="rounded-full p-2 bg-gradient-to-br from-accent-100 to-accent-200">
                    <Award className="text-dark-100 w-6 h-6" />
                  </div>
                </div>

                {/* User ID */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <p className="text-sm font-medium text-gray-400">User ID</p>
                  <p className="text-white font-semibold">
                    {resource.data.userId}
                  </p>
                </div>

                {/* Password */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <p className="text-sm font-medium text-gray-400">Password</p>
                  <p className="text-white font-semibold">
                    {resource.data.password}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="border-b border-gray-700 pb-2">
                  <p className="text-sm font-medium text-gray-400">
                    Additional Info
                  </p>
                  <div className="text-white font-semibold max-h-32 overflow-auto scrollbar-thin scrollbar-thumb-accent-100 scrollbar-track-dark-200">
                    {resource.data.additionalInfo || "N/A"}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 h-[1px] bg-gray-700"></div>

              {/* Nominee Section */}
              <div className="space-y-4">
                <div className="flex items-center mb-3">
                  <UserCheck className="w-6 h-6 text-accent-100 mr-2" />
                  <p className="text-lg font-semibold text-white">
                    Nominee Details
                  </p>
                </div>
                <div className="bg-dark-300 p-4 rounded-lg shadow-md space-y-2">
                  <p className="text-sm font-medium text-gray-300">
                    <span className="font-bold text-accent-100">Name:</span>{" "}
                    {resource.data.nominee.name}
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    <span className="font-bold text-accent-100">Phone:</span>{" "}
                    {resource.data.nominee.phone}
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    <span className="font-bold text-accent-100">Email:</span>{" "}
                    {resource.data.nominee.email}
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    <span className="font-bold text-accent-100">
                      Additional Info:
                    </span>{" "}
                    {resource.data.nominee.additionalInfo || "N/A"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => {
                    setActiveEditingId(resource.id);
                    setEditedData({
                      userId: resource.data.userId,
                      password: resource.data.password,
                      additionalInfo: resource.data.additionalInfo,
                    });
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 rounded-lg shadow hover:opacity-90 transition-all"
                >
                  <Edit className="w-5 h-5" />
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDeleteId(resource.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:opacity-90 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => handleDelete(confirmDeleteId)}
        message="Are you sure you want to delete this credential?"
      />

      {/* Modal for Editing */}

      {type === "emergencyContacts" ? (
        <div>
          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              {/* Modal Container */}
              <div className="relative bg-gradient-to-br from-dark-200 via-dark-300 to-dark-200 rounded-xl w-full max-w-lg p-6 shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setActiveEditingId(null);
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <h3 className="text-2xl font-bold text-accent-100 mb-6">
                  Edit Credential
                </h3>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Credential Details */}
                  <div>
                    <h4 className="text-lg font-semibold text-accent-100 mb-4">
                      Credential Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editedData.name}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              name: e.target.value,
                            }))
                          }
                          className="input-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Phone
                        </label>
                        <input
                          type="text"
                          value={editedData.phone}
                          onChange={(e) => {
                            // Restrict non-numeric characters and ensure the input is no longer than 10 digits
                            const numericValue = e.target.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 10);
                            setEditedData((prevState) => ({
                              ...prevState,
                              phone: numericValue,
                            }));
                          }}
                          className="input-primary"
                          maxLength={10}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Email
                        </label>
                        <input
                          type="text"
                          value={editedData.email}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              email: e.target.value,
                            }))
                          }
                          className="input-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Profession/Designation
                        </label>
                        <input
                          type="text"
                          value={editedData.role}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              role: e.target.value,
                            }))
                          }
                          className="input-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Additional Info
                        </label>
                        <textarea
                          value={editedData.additionalInfo}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              additionalInfo: e.target.value,
                            }))
                          }
                          rows={3}
                          className="input-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Nominee Details */}
                  <div>
                    <h4 className="text-lg font-semibold text-accent-100 mb-4">
                      Nominee Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editedData.nominee?.name || ""}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              nominee: {
                                ...prevState.nominee,
                                name: e.target.value,
                              },
                            }))
                          }
                          className="input-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Phone
                        </label>
                        <input
                          type="text"
                          value={editedData.nominee?.phone || ""}
                          onChange={(e) => {
                            // Restrict non-numeric characters and limit input to 10 digits
                            const numericValue = e.target.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 10);
                            setEditedData((prevState) => ({
                              ...prevState,
                              nominee: {
                                ...prevState.nominee,
                                phone: numericValue,
                              },
                            }));
                          }}
                          className="input-primary"
                          maxLength={10}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editedData.nominee?.email || ""}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              nominee: {
                                ...prevState.nominee,
                                email: e.target.value,
                              },
                            }))
                          }
                          className="input-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Additional Info
                        </label>
                        <textarea
                          value={editedData.nominee?.additionalInfo || ""}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              nominee: {
                                ...prevState.nominee,
                                additionalInfo: e.target.value,
                              },
                            }))
                          }
                          rows={3}
                          className="input-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setActiveEditingId(null);
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(activeEditingId, editedData)}
                    className="btn-primary flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              {/* Modal Container */}
              <div className="relative bg-gradient-to-br from-dark-200 via-dark-300 to-dark-200 rounded-xl w-full max-w-lg p-6 shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setActiveEditingId(null);
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <h3 className="text-2xl font-bold text-accent-100 mb-6">
                  Edit Credential
                </h3>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Credential Details */}
                  <div>
                    <h4 className="text-lg font-semibold text-accent-100 mb-4">
                      Credential Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400">
                          User ID
                        </label>
                        <input
                          type="text"
                          value={editedData.userId}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              userId: e.target.value,
                            }))
                          }
                          className="input-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Password
                        </label>
                        <input
                          type="text"
                          value={editedData.password}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              password: e.target.value,
                            }))
                          }
                          className="input-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Additional Info
                        </label>
                        <textarea
                          value={editedData.additionalInfo}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              additionalInfo: e.target.value,
                            }))
                          }
                          rows={3}
                          className="input-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Nominee Details */}
                  <div>
                    <h4 className="text-lg font-semibold text-accent-100 mb-4">
                      Nominee Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editedData.nominee?.name || ""}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              nominee: {
                                ...prevState.nominee,
                                name: e.target.value,
                              },
                            }))
                          }
                          className="input-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Phone
                        </label>
                        <input
                          type="text"
                          value={editedData.nominee?.phone || ""}
                          onChange={(e) => {
                            // Restrict non-numeric characters and limit the input to 10 digits
                            const numericValue = e.target.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 10);
                            setEditedData((prevState) => ({
                              ...prevState,
                              nominee: {
                                ...prevState.nominee,
                                phone: numericValue,
                              },
                            }));
                          }}
                          className="input-primary"
                          maxLength={10} // Optional, as it's already restricted in the onChange handler
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editedData.nominee?.email || ""}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              nominee: {
                                ...prevState.nominee,
                                email: e.target.value,
                              },
                            }))
                          }
                          className="input-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400">
                          Additional Info
                        </label>
                        <textarea
                          value={editedData.nominee?.additionalInfo || ""}
                          onChange={(e) =>
                            setEditedData((prevState) => ({
                              ...prevState,
                              nominee: {
                                ...prevState.nominee,
                                additionalInfo: e.target.value,
                              },
                            }))
                          }
                          rows={3}
                          className="input-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setActiveEditingId(null);
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(activeEditingId, editedData)}
                    className="btn-primary flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
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
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const OtpPromptModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose} // Close the modal when clicking outside
    >
      <div
        className="bg-gradient-to-br from-dark-200 to-dark-300 rounded-2xl p-8 shadow-xl max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner content click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-dark-400 hover:bg-dark-500 transition-transform hover:scale-110"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        {/* Title and Description */}
        <h3 className="text-2xl font-bold text-accent-100 mb-4 text-center">
          Verify Your Identity
        </h3>
        <p className="text-gray-300 mb-6 text-center">
          To securely access your credentials, choose your preferred method to
          receive the OTP.
        </p>

        {/* OTP Method Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onSelect("email")}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <Mail className="w-6 h-6" />
            <span>Email</span>
          </button>
          <button
            onClick={() => onSelect("sms")}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <MessageSquare className="w-6 h-6" />
            <span>SMS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  displayName,
  isLoading,
}) => {
  const [confirmationText, setConfirmationText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmDelete = () => {
    if (!confirmationText) {
      setErrorMessage("Please type the confirmation text.");
    } else if (confirmationText !== displayName) {
      setErrorMessage("The confirmation text is incorrect.");
    } else {
      setErrorMessage("");
      onDelete(displayName); // Pass the displayName to the parent handleDelete function
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glow-box w-full max-w-md p-6 text-center">
        <h2 className="text-2xl font-bold text-accent-100 mb-4">
          Delete Confirmation
        </h2>
        <p className="text-dark-text mb-4">
          To confirm, type{" "}
          <span className="font-semibold text-accent-100">{displayName}</span>{" "}
          in the field below.
        </p>
        <input
          type="text"
          value={confirmationText}
          onChange={(e) => {
            setConfirmationText(e.target.value);
            setErrorMessage(""); // Clear error when typing
          }}
          placeholder={`Type "${displayName}"`}
          className="input-primary mb-2"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className={`btn-secondary ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className={`btn-primary ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const NomineeListPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  // const [credentials] = useState(dummyBankingCredentials);
  const [showVerification, setShowVerification] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const verificationData = useSelector((state) => state.auth.loginIdUsername);
  const { data, isLoading, isError } = useGetAllNomineesQuery(type);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteCred, { isLoading: isDeleting }] = useDeleteCredMutation();
  const [credentials, setCredentials] = useState([]);
  const [sendCode, { isLoading: isSending }] = useCodeMutation();
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [customField, setCustomField] = useState("");
  const [showCustomField, setShowCustomField] = useState(false);
  const [showOtpPrompt, setShowOtpPrompt] = useState(false);
  const [otpMethod, setOtpMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAllCred, { isLoading: deleteLoading }] =
    useDeleteAllNomineeMutation();

  // const openModal = (credential) => {
  //   setSelectedCredential(credential);
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCredential(null);
  };

  const handleDelete = async (displayName) => {
    try {
      await deleteAllCred(displayName).unwrap(); // Call the API with the platform name
      toast.success(`Successfully deleted: ${displayName}`);
      closeModal();
    } catch (error) {
      toast.error("Failed to delete the resource. Please try again.");
      console.error("Error deleting resource:", error);
    }
  };

  // Update state when API data changes
  // Dropdown options
  const dropdownOptions = {
    banking: ["State Bank of India (SBI)", "AXIS", "HDFC", "ICICI", "Others"],
    investment: ["Demat", "Mutual Funds", "Insurance", "Crypto", "Others"],
    emergencyContacts: [
      "Medical Contact",
      "Legal Advisor",
      "Trusted Friends/Family Members",
      "Insurance Contact",
      "Others",
    ],
    socialMedia: ["Facebook", "Instagram", "Twitter", "LinkedIn", "Others"],
    subscriptions: [
      "Cloud Storage",
      "OTT Streaming Services",
      "Music Streaming Services",
      "E-Books & Audiobooks",
      "Others",
    ],
    others: [
      "Email Accounts",
      "E-Commerce Accounts",
      "Educational Platform",
      "Jobs Platform",
      "Others",
    ],
  };

  const isBanking = type === "banking";

  // Handle dropdown selection and dynamic field
  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedDropdownValue(value);
    setShowCustomField(value === "Others");
  };

  useEffect(() => {
    if (data?.resources) {
      const mappedCredentials = data.resources.map((nom) => ({
        id: nom.id,
        displayName: isBanking ? nom.bankName : nom.platformName,

        nomineeName: nom?.nominee?.name,
        nomineeEmail: nom?.nominee?.email,
        nomineePhone: nom?.nominee?.phone,
        // ...(type === "emergencyContacts" && {
        //   lastUpdated: new Date(nom.lastUpdated).toLocaleDateString(),
        // }),
      }));
      setCredentials(mappedCredentials);
    }
  }, [data]);

  const handleView = async (credential) => {
    const now = new Date().getTime();
    const lastVerifiedTime = getLastVerifiedTime(credential.displayName);

    const isBankingOrInvestment = type === "banking" || type === "investment";
    setSelectedCredential(credential);

    if (isBankingOrInvestment) {
      const isOtpValid =
        lastVerifiedTime && now - Number(lastVerifiedTime) < OTP_TIMEOUT;
      if (!isOtpValid) {
        setShowOtpPrompt(true); // Show OTP method selection modal
        setShowDetails(false); // Ensure details page is hidden until verification
      } else {
        setShowDetails(true); // Directly show details if OTP is valid
      }
    } else {
      setShowDetails(true);
    }
  };

  const handleOtpMethodSelect = async (method) => {
    setOtpMethod(method);
    setShowOtpPrompt(false);
    // console.log("OTP Method:", method);
    try {
      await sendCode({
        loginId: verificationData,

        service: method,
      }).unwrap();
      toast.success(`Verification code sent via ${method}`);
      setShowVerification(true);
    } catch (error) {
      toast.error(`Failed to send verification code via ${method}`);
    }
  };

  // const handleVerified = () => {
  //   const now = new Date().getTime();
  //   sessionStorage.setItem("lastVerifiedTime", now);
  //   setShowDetails(true);
  // };

  const handleVerified = () => {
    if (selectedCredential) {
      setLastVerifiedTime(selectedCredential.displayName); // Save verified timestamp
    }
    setShowVerification(false); // Close verification modal
    setShowDetails(true); // Show details page
  };

  const filteredCredentials = credentials.filter(
    (cred) =>
      cred.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cred.userId &&
        cred.userId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatCamelCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (char) => char.toUpperCase());
  };

  // const triggerDelete = () => {
  //   setShowDetails(false); // Close the details modal
  //   setConfirmDelete(true); // Open the confirm dialog
  // };

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      {/* {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
          <div className="w-12 h-12 border-4 border-accent-100 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-4 text-lg font-semibold text-gray-200 animate-pulse">
            Loading your credentials...
          </p>
        </div>
      )} */}

      {isError && (
        <div className="text-center py-12">
          <p className="text-red-400">
            Failed to load credentials. Please try again.
          </p>
        </div>
      )}
      {isSending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center bg-dark-300 p-8 rounded-xl shadow-xl space-y-6">
            <div className="relative flex justify-center items-center">
              <div className="absolute w-16 h-16 border-4 border-accent-100 border-t-transparent rounded-full animate-spin"></div>

              <div className="w-8 h-8 bg-dark-300 rounded-full"></div>
            </div>

            <p className="text-lg font-medium text-accent-100 text-center">
              Sending OTP to your registered email...
            </p>
          </div>
        </div>
      )}

      {/* {!isLoading && !isError && ( */}
      <div className="container mx-auto px-6 ">
        {selectedCredential && showDetails ? (
          <>
            <div className="container mx-auto px-6 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                {/* Back Button */}
                <button
                  onClick={() => {
                    setSelectedCredential(null);
                    setShowDetails(false); // Reset details view
                  }}
                  className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Credentials
                </button>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-white">
                    {/* {type.charAt(0).toUpperCase() + type.slice(1)} Credentials */}
                    {formatCamelCase(selectedCredential.displayName)}{" "}
                    Credentials
                  </h1>
                  {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const displayName = formatCamelCase(
                        selectedCredential.displayName
                      );

                      navigate(`./add`, {
                        state: { displayName },
                      });
                    }}
                
                    className={`flex items-center px-4 py-2 rounded-lg 
                     
                          bg-accent-100 text-dark-100 hover:bg-accent-200 transition-colors
                          
                      `}
                  >
                    Add More
                  </motion.button> */}
                </div>

                {/* Credential Details Card */}

                <CredentialDetailsCard
                  credential={
                    type === "emergencyContactss"
                      ? selectedCredential?.displayName
                      : selectedCredential?.id
                  }
                  isOthers={selectedDropdownValue === "Others"}
                  onEdit={(updatedCredential) => {
                    // Handle edit callback if needed
                  }}
                  // triggerDelete={triggerDelete}
                />
              </motion.div>
            </div>
          </>
        ) : (
          <div className="container mx-auto px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() =>
                  navigate("/dashboard", { state: { id: "nominee" } })
                }
                className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <div className="bg-dark-200 p-6 rounded-lg shadow-md text-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 capitalize">
                  {formatCamelCase(type)} Credentials
                </h2>

                {dropdownOptions[type] ? (
                  <div className="relative mb-6">
                    <select
                      value={selectedDropdownValue}
                      onChange={handleDropdownChange}
                      className="input-primary w-full"
                    >
                      {type === "banking" && (
                        <option value="">Select Your Bank Name</option>
                      )}
                      {type === "investment" && (
                        <option value="">Select Your Investment Type</option>
                      )}
                      {type === "emergencyContacts" && (
                        <option value="">Select Your Emergency Contacts</option>
                      )}
                      {type === "socialMedia" && (
                        <option value="">
                          Select Your Social Media Platform
                        </option>
                      )}
                      {type === "subscriptions" && (
                        <option value="">
                          Select Your Subscription Platform
                        </option>
                      )}
                      {type === "others" && (
                        <option value="">Select Your Platform Name</option>
                      )}
                      {dropdownOptions[type].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {showCustomField && (
                      <input
                        type="text"
                        placeholder={
                          type === "banking"
                            ? "Enter Your Bank Name"
                            : type === "investment"
                            ? "Enter Your Investment Type"
                            : type === "emergencyContacts"
                            ? "Enter Your Emergency Contacts Name"
                            : type === "socialMedia"
                            ? "Enter Your Social Media Platform"
                            : type === "subscriptions"
                            ? "Enter Your Subscription Platform"
                            : type === "others"
                            ? "Enter Your Platform Name"
                            : "Enter your Value"
                        }
                        value={customField}
                        onChange={(e) => setCustomField(e.target.value)}
                        className="input-primary w-full mt-4"
                      />
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400">
                    No options available for this type.
                  </p>
                )}

                {((selectedDropdownValue &&
                  selectedDropdownValue !== "Others") ||
                  customField !== "") && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const displayName =
                        selectedDropdownValue === "Others"
                          ? customField
                          : selectedDropdownValue;
                      const isOthers = selectedDropdownValue === "Others";
                      localStorage.setItem(
                        "isOthers",
                        JSON.stringify(isOthers)
                      );
                      localStorage.setItem("initialDisplayName", displayName);
                      navigate(`/nominees/${type}/add`, {
                        state: { displayName, isOthers },
                      });
                    }}
                    className="btn-primary mt-6 w-full md:w-auto"
                  >
                    Click to Proceed
                  </motion.button>
                )}
              </div>

              <div className="flex flex-wrap gap-6 justify-left mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {filteredCredentials.map((credential) => (
                    <div
                      key={credential.id}
                      className="relative group w-full h-32 glow-box rounded-xl [perspective:1000px] shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {/* Card Container */}
                      <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                        {/* Front Side */}
                        <div className="absolute inset-0 flex items-center justify-between bg-dark-200 p-6 rounded-xl [backface-visibility:hidden]">
                          <div className="flex items-center gap-4">
                            {/* Icon */}
                            {/* <div className="w-10 h-10 flex items-center justify-center bg-accent-100 rounded-full text-dark-100 shadow-md">
                                 <i className="fas fa-id-badge text-lg"></i>
                               </div> */}
                            {/* Text */}
                            <div>
                              <h4 className="text-xl font-semibold text-accent-100">
                                {credential.displayName}
                              </h4>
                              {credential.nomineeName && (
                                <p className="text-md text-gray-200">
                                  Nominee Name: {credential.nomineeName}
                                </p>
                              )}
                            </div>
                          </div>
                          {/* View Button */}
                          <button
                            className="px-4 py-2 border-2 border-accent-100 text-accent-100 rounded-lg font-semibold hover:bg-accent-100 hover:text-dark-100 transition-all duration-300 flex items-center gap-2"
                            onClick={() => handleView(credential)}
                          >
                            <i className="fas fa-eye"></i> View
                          </button>
                        </div>

                        {/* Back Side */}
                        <div className="absolute inset-0 flex items-center justify-between bg-gradient-to-br from-dark-200 to-dark-300 p-6 rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            {/* <div className="w-10 h-10 flex items-center justify-center bg-accent-100 rounded-full text-dark-100 shadow-md">
                                 <i className="fas fa-envelope text-lg"></i>
                               </div> */}
                            {/* Text */}
                            <div>
                              <h4 className="text-lg font-semibold text-accent-100">
                                {credential.nomineeName}
                              </h4>
                              <p className="text-sm text-gray-200">
                                Email:{" "}
                                <span className="font-semibold text-accent-200">
                                  {credential.nomineeEmail.replace(
                                    /^(.{4,5})([^@]*)@/,
                                    (match, p1, p2) =>
                                      `${"X".repeat(p1.length)}${p2}@`
                                  )}
                                </span>
                              </p>
                              <p className="text-sm text-gray-200">
                                Phone:{" "}
                                <span className="font-semibold text-accent-200">
                                  {credential.nomineePhone.replace(
                                    /^(\d{3})(\d+)(\d{1})$/,
                                    (match, p1, p2, p3) =>
                                      `${p1}${"X".repeat(p2.length)}${p3}`
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                          {/* View Button */}
                          <button
                            className="px-4 py-2 border-2 border-accent-100 text-accent-100 rounded-lg font-semibold hover:bg-accent-100 hover:text-dark-100 transition-all duration-300 flex items-center gap-2"
                            onClick={() => handleView(credential)}
                          >
                            <i className="fas fa-eye"></i> View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* No Credentials Found */}
                  {filteredCredentials.length === 0 && (
                    <div className="text-center mx-auto py-12">
                      <p className="text-gray-400">No credentials found</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Verification Modal */}
        <VerificationModal
          isOpen={showVerification}
          onClose={() => setShowVerification(false)}
          onVerified={handleVerified}
          selectedCredential={selectedCredential}
          otpMethod={otpMethod}
        />
        <OtpPromptModal
          isOpen={showOtpPrompt}
          onClose={() => setShowOtpPrompt(false)}
          onSelect={handleOtpMethodSelect}
        />

        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          displayName={selectedCredential?.displayName}
          isLoading={deleteLoading}
        />

        {/* Credential Details Modal */}
        {/* {showDetails && (
            <CredentialDetailsModel
              credential={selectedCredential}
              onClose={() => setShowDetails(false)}
              // onDelete={handleDelete}
              triggerDelete={triggerDelete}
            />
          )} */}
      </div>
      {/* )} */}
    </div>
  );
};

export default NomineeListPage;
