import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Save,
  Eye,
  EyeOff,
  X,
  Check,
  Copy,
  Lock,
  User,
  FileText,
} from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useGetCredQuery,
  useUpdateCredMutation,
  useDeleteCredMutation,
} from "@/features/api/userCredApiSlice";
import toast from "react-hot-toast";

// const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="bg-dark-200 rounded-xl w-full max-w-md p-6 shadow-lg border border-dark-400">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
//             <Trash2 className="w-8 h-8 text-red-400" />
//           </div>
//           <h3 className="text-xl font-bold text-white mb-3">{message}</h3>
//           <p className="text-gray-400 text-sm mb-6">
//             This action cannot be undone.
//           </p>
//         </div>

//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={onClose}
//             className="py-2.5 px-6 rounded-lg bg-dark-400 hover:bg-dark-500 text-white font-medium transition-all"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="py-2.5 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium flex items-center transition-all shadow-lg"
//           >
//             <Trash2 className="w-4 h-4 mr-2" />
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CredentialDetailsCard = ({
//   credential,
//   onClose,
//   onEdit,
//   triggerDelete,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeEditingId, setActiveEditingId] = useState(null);
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);
//   const [showPassword, setShowPassword] = useState({});
//   const { type } = useParams();
//   const { data, isLoading, isError, refetch } = useGetCredQuery(credential);
//   const initialDisplayName = localStorage.getItem("initialDisplayName");
//   const [updateCred, { isLoading: isUpdating }] = useUpdateCredMutation();
//   const [deleteCred, { isLoading: isDeleting }] = useDeleteCredMutation();
//   const [editedData, setEditedData] = useState({
//     userId: "",
//     password: "",
//     additionalInfo: "",
//   });
//   const [copiedField, setCopiedField] = useState(null);

//   useEffect(() => {
//     if (data?.resources && activeEditingId) {
//       const resource = data.resources.find((res) => res.id === activeEditingId);
//       if (resource) {
//         setEditedData({
//           userId: resource.userId || "",
//           password: resource.password || "",
//           additionalInfo: resource.additionalInfo || "",
//         });
//       }
//     }
//   }, [data, activeEditingId]);

//   useEffect(() => {
//     if (copiedField) {
//       const timer = setTimeout(() => {
//         setCopiedField(null);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [copiedField]);

//   const togglePasswordVisibility = (id) => {
//     setShowPassword((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const copyToClipboard = (text, field) => {
//     navigator.clipboard.writeText(text);
//     setCopiedField(field);
//     toast.success(`${field} copied to clipboard`);
//   };

//   const handleSave = async (id) => {
//     try {
//       const updatedCredential = {
//         userId: editedData.userId,
//         password: editedData.password,
//         additionalInfo: editedData.additionalInfo,
//       };

//       await updateCred({
//         creds: updatedCredential,
//         credId: id,
//       }).unwrap();

//       toast.success("Credential updated successfully!");
//       refetch();
//       setIsEditing(false);
//       setActiveEditingId(null);
//       onEdit && onEdit(updatedCredential);
//     } catch (error) {
//       if (error?.data?.message === "Validation error" && error?.data?.details) {
//         const errorMessages = error.data.details
//           .map((detail) => detail.message)
//           .join(", ");
//         toast.error(`Validation Error: ${errorMessages}`);
//       } else if (error?.data?.message === "Credential already exists") {
//         toast.error("Credential already exists. Please use a different one.");
//       } else {
//         toast.error("Failed to update credential. Please try again.");
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteCred(id).unwrap();
//       toast.success("Credential deleted successfully!");
//       setConfirmDeleteId(null);
//       refetch();
//       triggerDelete && triggerDelete(id);
//     } catch (error) {
//       toast.error("Failed to delete credential.");
//     }
//   };

//   if (!credential) return null;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {isLoading ? (
//         <div className="col-span-full flex justify-center py-10">
//           <div className="flex flex-col items-center">
//             <div className="w-10 h-10 border-4 border-accent-100 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-300 mt-4 font-medium">
//               Loading credentials...
//             </p>
//           </div>
//         </div>
//       ) : isError ? (
//         <div className="col-span-full bg-dark-300 rounded-xl p-6 border border-red-500/20 shadow-lg">
//           <div className="flex items-center gap-3">
//             <div className="bg-red-500/20 rounded-full p-2">
//               <X className="w-6 h-6 text-red-400" />
//             </div>
//             <p className="text-red-400 font-medium text-lg">
//               No account resources found.
//             </p>
//           </div>
//         </div>
//       ) : (
//         data.resources.map((resource) => {
//           return (
//             <div
//               key={resource.id}
//               className="bg-dark-300 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-lg border border-dark-400/50 hover:border-accent-100/30 group"
//             >
//               {/* Header */}
//               <div className="bg-dark-400 px-5 py-4 border-b border-dark-500">
//                 <h3 className="text-white font-bold flex items-center text-lg">
//                   {resource.bankName ||
//                     resource.platformName ||
//                     initialDisplayName}
//                   {resource.accountType && (
//                     <span className="ml-2 text-xs font-medium bg-accent-100/20 text-accent-100 py-1 px-3 rounded-full">
//                       {resource.accountType}
//                     </span>
//                   )}
//                 </h3>
//               </div>

//               <div className="p-5 space-y-5">
//                 {/* User ID Section */}
//                 <div className="flex items-start gap-4 transition-all duration-300">
//                   <div className="flex-shrink-0 p-2 bg-dark-400 rounded-lg">
//                     <User className="w-5 h-5 text-accent-100" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-400">
//                       {resource?.platformName === "Email Accounts"
//                         ? "Email/Phone"
//                         : "User ID"}
//                     </p>
//                     <div className="flex items-center mt-1">
//                       <p className="text-white font-semibold break-words mr-3">
//                         {resource.userId}
//                       </p>
//                       <button
//                         onClick={() =>
//                           copyToClipboard(resource.userId, "User ID")
//                         }
//                         className="p-1 rounded-md hover:bg-dark-400 text-gray-400 hover:text-white transition-colors"
//                         title="Copy to clipboard"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Password Section */}
//                 <div className="flex items-start gap-4 transition-all duration-300">
//                   <div className="flex-shrink-0 p-2 bg-dark-400 rounded-lg">
//                     <Lock className="w-5 h-5 text-accent-100" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center">
//                       <p className="text-sm font-medium text-gray-400 mr-3">
//                         Password
//                       </p>
//                       <button
//                         onClick={() => togglePasswordVisibility(resource.id)}
//                         className={`text-xs ${
//                           showPassword[resource.id]
//                             ? "text-accent-100 bg-dark-400"
//                             : "text-gray-500"
//                         } hover:text-accent-100 flex items-center px-2 py-0.5 rounded-full`}
//                       >
//                         {showPassword[resource.id] ? (
//                           <>
//                             <EyeOff className="w-3 h-3 mr-1" />
//                             <span>Hide</span>
//                           </>
//                         ) : (
//                           <>
//                             <Eye className="w-3 h-3 mr-1" />
//                             <span>Show</span>
//                           </>
//                         )}
//                       </button>
//                     </div>
//                     <div className="flex items-center mt-1">
//                       <p className="text-white font-semibold break-words mr-3 font-mono">
//                         {showPassword[resource.id]
//                           ? resource.password
//                           : "••••••••••••"}
//                       </p>
//                       <button
//                         onClick={() =>
//                           copyToClipboard(resource.password, "Password")
//                         }
//                         className="p-1 rounded-md hover:bg-dark-400 text-gray-400 hover:text-white transition-colors"
//                         title="Copy to clipboard"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Info Section */}
//                 {(resource.additionalInfo || "").trim() && (
//                   <div className="flex items-start gap-4 transition-all duration-300">
//                     <div className="flex-shrink-0 p-2 bg-dark-400 rounded-lg">
//                       <FileText className="w-5 h-5 text-accent-100" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-gray-400">
//                         Additional Info
//                       </p>
//                       <p className="text-white break-words mt-1">
//                         {resource.additionalInfo}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Footer with actions */}
//               <div className="bg-dark-400/30 px-5 py-4 flex justify-between items-center">
//                 <div className="text-xs text-gray-500">
//                   Updated {new Date(resource.lastUpdated).toLocaleDateString()}
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => {
//                       setActiveEditingId(resource.id);
//                       setEditedData({
//                         userId: resource.userId,
//                         password: resource.password,
//                         additionalInfo: resource.additionalInfo || "",
//                       });
//                       setIsEditing(true);
//                     }}
//                     className="p-2 rounded-full bg-dark-200 hover:bg-accent-100/20 flex items-center gap-2 transition-all"
//                   >
//                     <Edit className="w-4 h-4 text-accent-100" />
//                     <span className="text-sm font-medium text-gray-300 sm:block hidden">
//                       Edit
//                     </span>
//                   </button>
//                   <button
//                     onClick={() => setConfirmDeleteId(resource.id)}
//                     className="p-2 rounded-full bg-dark-200 hover:bg-red-500/30 flex items-center gap-2 transition-all"
//                   >
//                     <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
//                     <span className="text-sm font-medium text-gray-300 sm:block hidden">
//                       Delete
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       )}

//       <ConfirmDialog
//         isOpen={!!confirmDeleteId}
//         onClose={() => setConfirmDeleteId(null)}
//         onConfirm={() => handleDelete(confirmDeleteId)}
//         message="Are you sure you want to delete this credential?"
//       />

//       {/* Modal for Editing */}
//       {isEditing && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//           <div className="bg-dark-200 rounded-xl w-full max-w-lg p-6 shadow-lg border border-dark-400">
//             <div className="flex justify-between items-center mb-6 border-b border-dark-400 pb-4">
//               <h3 className="text-xl font-bold text-white flex items-center">
//                 <Edit className="w-5 h-5 text-accent-100 mr-2" />
//                 Edit Credential
//               </h3>
//               <button
//                 onClick={() => {
//                   setIsEditing(false);
//                   setActiveEditingId(null);
//                 }}
//                 className="p-1.5 rounded-full bg-dark-400 hover:bg-dark-500 text-gray-400 hover:text-white transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="space-y-5">
//               <div>
//                 <label className="text-sm text-white font-medium block mb-2 flex items-center">
//                   <User className="w-4 h-4 text-accent-100 mr-2" />
//                   {data.resources.find((res) => res.id === activeEditingId)
//                     ?.platformName === "Email Accounts"
//                     ? "Email/Phone"
//                     : "User ID"}
//                 </label>
//                 <input
//                   type="text"
//                   value={editedData.userId}
//                   onChange={(e) =>
//                     setEditedData({
//                       ...editedData,
//                       userId: e.target.value,
//                     })
//                   }
//                   className="w-full py-2.5 px-3 bg-dark-300 border border-dark-500 focus:border-accent-100 rounded-lg text-white focus:outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-white font-medium block mb-2 flex items-center">
//                   <Lock className="w-4 h-4 text-accent-100 mr-2" />
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword["editing"] ? "text" : "password"}
//                     value={editedData.password}
//                     onChange={(e) =>
//                       setEditedData({
//                         ...editedData,
//                         password: e.target.value,
//                       })
//                     }
//                     className="w-full py-2.5 px-3 bg-dark-300 border border-dark-500 focus:border-accent-100 rounded-lg text-white pr-10 focus:outline-none"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPassword((prev) => ({
//                         ...prev,
//                         editing: !prev.editing,
//                       }))
//                     }
//                     className="absolute right-3 top-2.5 text-gray-400 hover:text-accent-100"
//                   >
//                     {showPassword["editing"] ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm text-white font-medium block mb-2 flex items-center">
//                   <FileText className="w-4 h-4 text-accent-100 mr-2" />
//                   Additional Info
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
//                   className="w-full py-2.5 px-3 bg-dark-300 border border-dark-500 focus:border-accent-100 rounded-lg text-white focus:outline-none"
//                   placeholder="Enter any additional information (optional)"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-dark-400">
//               <button
//                 onClick={() => {
//                   setIsEditing(false);
//                   setActiveEditingId(null);
//                 }}
//                 className="py-2 px-5 rounded-lg bg-dark-400 hover:bg-dark-500 text-gray-300 font-medium transition-colors"
//                 disabled={isUpdating}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleSave(activeEditingId)}
//                 className="py-2 px-5 rounded-lg bg-accent-100 hover:bg-accent-200 text-dark-500 font-medium transition-colors flex items-center"
//                 disabled={isUpdating}
//               >
//                 {isUpdating ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-dark-500 border-t-transparent rounded-full animate-spin mr-2"></div>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Check className="w-4 h-4 mr-2" />
//                     Save Changes
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CredentialDetailsCard;

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
  const { data, isLoading, isError, refetch } = useGetCredQuery(credential,  {
    refetchOnMountOrArgChange: true,
  });
  // const isOthers = JSON.parse(localStorage.getItem("isOthers"));
  const initialDisplayName = localStorage.getItem("initialDisplayName");
  const [updateCred, { isLoading: isUpdating }] = useUpdateCredMutation();
  const [deleteCred, { isLoading: isDeleting }] = useDeleteCredMutation();
  const [editedData, setEditedData] = useState({
    displayName: "",
    platformName: "",
    bankName: "",
    accountType: "",
    subscriptionType: "",
    userId: "",
    password: "",
    additionalInfo: "",
  });

  const isBankingOrInvestment = type === "banking" || type === "investment";

  useEffect(() => {
    if (data?.resources && activeEditingId) {
      const resource = data.resources.find((res) => res.id === activeEditingId);
      if (resource) {
        setEditedData({
          displayName: resource.displayName || "",
          platformName: resource.platformName || "",
          bankName: resource.bankName || "",
          subscriptionType: resource.subscriptionType || "",
          accountType: resource.accountType || "",
          userId: resource.userId || "",
          password: resource.password || "",
          additionalInfo: resource.additionalInfo || "",
        });
      }
    }
  }, [data, activeEditingId]);

  const handleSave = async (id) => {
    try {
      const updatedCredential = {
        userId: editedData.userId,
        password: editedData.password,
        additionalInfo: editedData.additionalInfo,
      };

      await updateCred({
        creds: updatedCredential,
        credId: id,
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
      await deleteCred(id).unwrap();
      toast.success("Credential deleted successfully!");
      setConfirmDeleteId(null); // Close confirmation dialog
      refetch(); // Refresh the data
    } catch (error) {
      toast.error("Failed to delete credential.");
    }
  };

  if (!credential) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {isLoading ? (
        <p className="text-gray-300">Loading credential details...</p>
      ) : isError ? (
        <p className="text-red-400">No account resources found.</p>
      ) : (
        data.resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-dark-300 rounded-xl glow-box p-6 transition hover:shadow-lg hover:bg-dark-400 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                {resource.accountType && (
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Account Type
                    </p>
                    <p className="text-white font-semibold whitespace-normal break-words">
                      {resource.accountType}
                    </p>
                  </div>
                )}
              </div>

              {!isBankingOrInvestment && (
                <>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <p className="text-sm font-medium text-gray-400">
                      {resource?.platformName === "Email Accounts"
                        ? "Email/Phone"
                        : "User ID"}
                    </p>
                    <p className="text-white font-semibold whitespace-normal break-words">
                      {resource.userId}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <p className="text-sm font-medium text-gray-400">
                      Password
                    </p>
                    <p className="text-white font-semibold whitespace-normal break-words">
                      {resource.password}
                    </p>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <p className="text-sm font-medium text-gray-400">
                  Additional Info
                </p>
                <p className="text-white font-semibold whitespace-normal break-words">
                  {resource.additionalInfo || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setActiveEditingId(resource.id);
                  setEditedData({
                    userId: resource.userId,
                    password: resource.password,
                    additionalInfo: resource.additionalInfo,
                  });
                  setIsEditing(true);
                }}
                className="p-2 rounded-full bg-dark-200 hover:bg-dark-500 flex items-center gap-2"
              >
                <Edit className="w-5 h-5 text-accent-100" />
                <span className="text-sm font-medium text-gray-300 sm:block hidden">
                  Edit
                </span>
              </button>
              <button
                onClick={() => setConfirmDeleteId(resource.id)}
                className="p-2 rounded-full bg-dark-200 hover:bg-red-500 flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-gray-300 sm:block hidden">
                  Delete
                </span>
              </button>
            </div>
          </div>
        ))
      )}

      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => handleDelete(confirmDeleteId)}
        message="Are you sure you want to delete this credential?"
      />

      {/* Modal for Editing */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-200 rounded-xl w-full max-w-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Edit Credential
            </h3>
            <div className="space-y-4">
              {!isBankingOrInvestment && (
                <>
                  <div>
                    <label className="text-sm text-gray-400">
                      {data.resources.find((res) => res.id === activeEditingId)
                        ?.platformName === "Email Accounts"
                        ? "Email/Phone"
                        : "User ID"}
                    </label>
                    <input
                      type="text"
                      value={editedData.userId}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          userId: e.target.value,
                        })
                      }
                      className="input-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Password</label>
                    <input
                      type="text"
                      value={editedData.password}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          password: e.target.value,
                        })
                      }
                      className="input-primary"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="text-sm text-gray-400">Additional Info</label>
                <textarea
                  value={editedData.additionalInfo}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      additionalInfo: e.target.value,
                    })
                  }
                  rows={4}
                  className="input-primary"
                />
              </div>
            </div>
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
                onClick={() => handleSave(activeEditingId)}
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

export default CredentialDetailsCard;
