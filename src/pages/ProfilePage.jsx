// import { useEffect, useRef, useState } from "react";
// import {
//   useDeleteAccountMutation,
//   useGetProfileQuery,
//   useGetUploadUrlQuery,
//   useResetPasswordMutation,
//   useUpdateOrRemoveImageKeyMutation,
//   useUpdateProfileMutation,
//   useUploadProfilePictureMutation,
// } from "@/features/api/userApiSlice";
// import {
//   FiCamera,
//   FiEdit,
//   FiTrash2,
//   FiLock,
//   FiAlertTriangle,
//   FiCreditCard,
//   FiDownload,
// } from "react-icons/fi";
// import {
//   User,
//   Mail,
//   Phone,
//   Hash,
//   Edit,
//   Lock,
//   AlertTriangle,
//   CreditCard,
//   Download,
//   ChevronDown,
//   Clock,
//   LogOut,
//   CheckCircle,
// } from "lucide-react";

// const ProfileSettings = () => {
//   // Fetch profile data using RTK Query.
//   const { data: profileData, isLoading, isError, error } = useGetProfileQuery();

//   // Mutation hook for resetting the password.
//   const [resetPassword, { isLoading: isResetLoading, error: resetError }] =
//     useResetPasswordMutation();
//   const [updateProfile, { isLoading: isUpdateLoading, error: updateError }] =
//     useUpdateProfileMutation();

//   const { refetch: fetchUploadUrl } = useGetUploadUrlQuery();
//   const [uploadProfilePicture] = useUploadProfilePictureMutation();
//   const [updateOrRemoveImageKey] = useUpdateOrRemoveImageKeyMutation();
//   const [deleteAccount, { isLoading: deleteProfileLoading }] =
//     useDeleteAccountMutation();
//   const [showConfirm, setShowConfirm] = useState(false);
//   // Local state for personal details.
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [username, setUsername] = useState("");
//   const [aadhaar, setaadhaar] = useState("");
//   const [image, setImage] = useState(null);

//   // Local state for address details.
//   const [address, setAddress] = useState({
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//   });

//   // Local state for contacts.
//   const [contacts, setContacts] = useState([]);

//   // Edit mode toggles.
//   const [isEditingPersonal, setIsEditingPersonal] = useState(false);
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [isEditingContacts, setIsEditingContacts] = useState(false);
//   const [showLoginHistory, setShowLoginHistory] = useState(false);
//   const fileInputRef = useRef(null);

//   // Local state for changing the password.
//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   // Refs and state for animating the password form container.
//   const formRef = useRef(null);
//   const [formHeight, setFormHeight] = useState(0);

//   const [originalProfile, setOriginalProfile] = useState(null);
//   const [originalContacts, setOriginalContacts] = useState([]);
//   const [showSaveButton, setShowSaveButton] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   // Update local state when profile data is loaded.
//   useEffect(() => {
//     if (profileData && profileData.user) {
//       const user = profileData.user;
//       setFirstName(user.firstName);
//       setLastName(user.lastName);
//       setEmail(user.email);
//       setPhone(user.phone);
//       setUsername(user.username);
//       setaadhaar(user.aadhaar);
//       setImage(user.profileImgUrl);
//       if (user.address) setAddress(user.address);
//       if (user.contacts) setContacts(user.contacts);
//       // Store the original values for later diffing:
//       setOriginalProfile({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//         username: user.username,
//         aadhaar: user.aadhaar,
//         // Include additional fields (address, contacts, etc.) if needed.
//       });
//     }
//   }, [profileData]);

//   // In your effect where you load profile data, store the original contacts:
//   useEffect(() => {
//     if (profileData && profileData.user && profileData.user.contacts) {
//       setContacts(profileData.user.contacts);
//       setOriginalContacts(profileData.user.contacts);
//     }
//   }, [profileData]);

//   // Measure the height of the password form (to animate its container)
//   useEffect(() => {
//     if (formRef.current) {
//       setFormHeight(formRef.current.scrollHeight);
//     }
//   }, [isChangingPassword, currentPassword, newPassword]);

//   // Handle profile image change.
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//         setShowSaveButton(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveChanges = async () => {
//     if (!image) return;

//     setIsUploading(true);
//     try {
//       // Step 1: Remove current profile picture if exists
//       // await updateOrRemoveImageKey({ action: "remove" }).unwrap();

//       // Step 2: Fetch a new upload URL
//       const { imageKey, uploadUrl } = await fetchUploadUrl().unwrap();

//       // Step 3: Upload the new image
//       const formData = new FormData();
//       formData.append("file", image);
//       await uploadProfilePicture({
//         signedUrl: uploadUrl,
//         file: formData,
//       }).unwrap();

//       // Step 4: Update the image key in the database
//       await updateOrRemoveImageKey({ action: "update", imageKey }).unwrap();

//       // Step 5: Navigate to the verification success page
//       navigate("/verification-success");
//     } catch (error) {
//       console.error("Upload failed", error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // Remove the current photo.
//   const handleRemovePhoto = () => {
//     setImage(null);
//   };

//   // Trigger file input click.
//   const handleImageClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteAccount().unwrap();
//       alert("Account deleted successfully!");
//       // Optionally redirect or log out the user here
//     } catch (error) {
//       alert(error?.data?.message || "Failed to delete account.");
//     } finally {
//       setShowConfirm(false);
//     }
//   };

//   // Handler for resetting the password.
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     // Use username or email as the loginId.
//     const loginId = username || email;
//     try {
//       await resetPassword({ loginId, currentPassword, newPassword }).unwrap();
//       console.log("Password reset successful");
//       setCurrentPassword("");
//       setNewPassword("");
//       setIsChangingPassword(false);
//     } catch (err) {
//       console.error("Failed to reset password", err);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     if (!originalProfile) return;

//     const updatedFields = {};
//     if (firstName !== originalProfile.firstName)
//       updatedFields.firstName = firstName;
//     if (lastName !== originalProfile.lastName)
//       updatedFields.lastName = lastName;
//     if (email !== originalProfile.email) updatedFields.email = email;
//     if (phone !== originalProfile.phone) updatedFields.phone = phone;
//     if (username !== originalProfile.username)
//       updatedFields.username = username;
//     if (aadhaar !== originalProfile.aadhaar) updatedFields.aadhaar = aadhaar;
//     // Add similar checks for other fields (address, contacts, etc.) if needed.

//     // Optionally, if no field was updated, exit early:
//     if (Object.keys(updatedFields).length === 0) {
//       setIsEditingPersonal(false);
//       return;
//     }

//     try {
//       await updateProfile(updatedFields).unwrap();
//       setIsEditingPersonal(false);
//       // Update the originalProfile state so further edits compare against the new values.
//       setOriginalProfile((prev) => ({ ...prev, ...updatedFields }));
//     } catch (err) {
//       console.error("Profile update failed:", err);
//     }
//   };

//   // Create a handler for updating contacts:
//   const handleUpdateContacts = async () => {
//     // If contacts haven't changed, exit early.
//     if (JSON.stringify(contacts) === JSON.stringify(originalContacts)) {
//       setIsEditingContacts(false);
//       return;
//     }
//     try {
//       await updateProfile({ contacts }).unwrap();
//       setIsEditingContacts(false);
//       setOriginalContacts(contacts);
//     } catch (err) {
//       console.error("Failed to update contacts:", err);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Loading profile...
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500">
//         Error loading profile: {error?.message || "Unknown error"}
//       </div>
//     );
//   }

//   const { user } = profileData;

//   return (
//     <div className="relative min-h-screen bg-dark-100 overflow-hidden ">
//       <div className="container mx-auto max-w-screen-xl px-4 py-4 pt-20 md:pt-24">
//         <div className="glow-box rounded-xl p-4 md:p-8">
//           {/* Header */}
//           <h1 className="text-2xl md:text-3xl font-bold text-accent-100 mb-6 border-b border-dark-300 pb-3 text-center">
//             Profile Settings
//           </h1>

//           <div className="flex flex-col md:flex-row">
//             {/* Left Section: Profile Summary */}
//             <div className="md:w-1/3 md:border-r md:border-dark-300 md:pr-8">
//               <div className="flex flex-col items-center space-y-6">
//                 {/* Profile Image & Remove Button */}
//                 <div className="relative">
//                   <div
//                     className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg cursor-pointer border border-dark-300"
//                     onClick={handleImageClick}
//                   >
//                     {image ? (
//                       <img
//                         src={image}
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-dark-300 text-dark-100 text-3xl md:text-4xl font-bold">
//                         {firstName || lastName
//                           ? `${firstName[0] || ""}${lastName[0] || ""}`
//                           : "AB"}
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       ref={fileInputRef}
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </div>
//                   {image && (
//                     <button
//                       onClick={handleRemovePhoto}
//                       className="absolute top-0 right-0 bg-red-500 rounded-full p-2 shadow-md transform -translate-y-1/2 translate-x-1/2 hover:bg-red-600 transition"
//                       title="Remove Photo"
//                     >
//                       <FiTrash2 className="text-white" />
//                     </button>
//                   )}
//                 </div>

//                 {/* User Name & Username */}
//                 <div className="text-center">
//                   <p className="text-xl font-semibold text-white">
//                     {firstName} {lastName}
//                   </p>
//                   <p className="text-gray-400">@{username}</p>
//                 </div>

//                 {/* Last Login & Account Created */}
//                 <div className="text-center text-sm text-gray-300">
//                   <p>
//                     Account Created:{" "}
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>

//                 {/* Edit Profile Picture Button */}
//                 {showSaveButton && (
//                   <div className="w-full flex justify-center transition-opacity duration-500 opacity-100">
//                     <button
//                       onClick={handleSaveChanges}
//                       className={`btn-primary w-full sm:w-auto ${
//                         isUploading ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                       disabled={isUploading}
//                     >
//                       {isUploading ? "Saving..." : "Save Changes"}
//                     </button>
//                   </div>
//                 )}

//                 {/* Account Action Buttons */}
//                 <div className="w-full space-y-4">
//                   {/* Login History */}
//                   <button
//                     onClick={() => setShowLoginHistory(!showLoginHistory)}
//                     className={`w-full flex flex-col items-start px-6 transition-all duration-300 ease-in-out border border-dark-300 rounded-lg bg-dark-200 hover:bg-dark-300 ${
//                       showLoginHistory ? "py-4" : "py-3"
//                     }`}
//                   >
//                     <div className="w-full flex items-center justify-between">
//                       <div className="flex items-center">
//                         <Clock size={20} className="mr-2 text-gray-300" />
//                         <span className="text-white font-semibold">
//                           Last Login Details
//                         </span>
//                       </div>
//                       <ChevronDown
//                         className={`transform transition-transform duration-300 ${
//                           showLoginHistory ? "rotate-180" : ""
//                         }`}
//                         size={20}
//                       />
//                     </div>
//                     <div
//                       className={`w-full mt-2 text-sm text-gray-300 transition-all duration-300 ease-in-out ${
//                         showLoginHistory
//                           ? "max-h-20 opacity-100"
//                           : "max-h-0 opacity-0 overflow-hidden"
//                       }`}
//                     >
//                       <p>
//                         <strong>Last Login:</strong>{" "}
//                         {new Date(user.lastLogin).toLocaleString()}
//                       </p>
//                     </div>
//                   </button>

//                   {/* Deactivate Account */}
//                   <button className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600">
//                     <span>Deactivate Account</span>
//                     <FiAlertTriangle size={20} className="text-red-400" />
//                   </button>

//                   {/* Delete Account */}
//                   <div className="w-full flex flex-col items-center">
//                     {/* Delete Account Button */}
//                     <button
//                       className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
//                       onClick={() => setShowConfirm(true)}
//                       disabled={isLoading}
//                     >
//                       <span>Delete Account Permanently</span>
//                       <FiTrash2 size={20} />
//                     </button>

//                     {showConfirm && (
//                       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
//                         <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg transform transition-all scale-95 md:scale-100">
//                           {/* Header */}
//                           <h2 className="text-xl font-semibold text-gray-900 text-center">
//                             Confirm Deletion
//                           </h2>

//                           {/* Body */}
//                           <p className="text-gray-600 text-center mt-2">
//                             Are you sure you want to delete your account? This
//                             action is irreversible.
//                           </p>

//                           {/* Actions */}
//                           <div className="flex justify-center gap-4 mt-6">
//                             <button
//                               className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
//                               onClick={() => setShowConfirm(false)}
//                             >
//                               Cancel
//                             </button>
//                             <button
//                               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
//                               onClick={handleDelete}
//                               disabled={isLoading}
//                             >
//                               {isLoading ? "Deleting..." : "Confirm"}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Sign Out */}
//                   <button className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600">
//                     <span>Sign Out</span>
//                     <LogOut size={20} className="text-gray-300" />
//                   </button>

//                   {/* Sign Out from All Devices */}
//                   <button className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
//                     <span>Sign Out from All Devices</span>
//                     <LogOut size={20} className="text-blue-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Right Section: Detailed Information */}
//             <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
//               <div className="grid grid-cols-1 gap-6">
//                 {/* Personal Details Section */}
//                 <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg md:text-xl font-semibold text-accent-100">
//                       Personal Details
//                     </h2>
//                     {!isEditingPersonal ? (
//                       <button onClick={() => setIsEditingPersonal(true)}>
//                         <Edit className="text-gray-300" size={20} />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={handleUpdateProfile}
//                         className="btn-primary text-sm md:text-base"
//                       >
//                         {isUpdateLoading ? "Saving..." : "Save"}
//                       </button>
//                     )}
//                   </div>
//                   <div className="space-y-4">
//                     {[
//                       {
//                         label: "First Name",
//                         value: firstName,
//                         onChange: setFirstName,
//                         type: "text",
//                         icon: <User className="mr-2 inline-block" size={20} />,
//                       },
//                       {
//                         label: "Last Name",
//                         value: lastName,
//                         onChange: setLastName,
//                         type: "text",
//                         icon: <User className="mr-2 inline-block" size={20} />,
//                       },
//                       {
//                         label: "Email",
//                         value: email,
//                         onChange: setEmail,
//                         type: "email",
//                         readOnly: true,
//                         verified: true,
//                         icon: <Mail className="mr-2 inline-block" size={20} />,
//                       },
//                       {
//                         label: "Phone",
//                         value: phone,
//                         onChange: setPhone,
//                         type: "text",
//                         verified: true,
//                         icon: <Phone className="mr-2 inline-block" size={20} />,
//                       },
//                       aadhaar && {
//                         label: "Aadhaar",
//                         value: aadhaar,
//                         onChange: setaadhaar,
//                         type: "text",
//                         icon: <Hash className="mr-2 inline-block" size={20} />,
//                       },
//                     ]
//                       .filter(Boolean) // This removes any undefined values (i.e., Aadhaar if it's not available)
//                       .map((field, idx) => (
//                         <div
//                           key={idx}
//                           className="flex flex-col md:flex-row items-center"
//                         >
//                           <label className="w-full md:w-1/4 text-gray-300 flex items-center">
//                             {field.icon}
//                             {field.label}
//                           </label>
//                           <div className="relative w-full">
//                             <input
//                               type={field.type}
//                               value={field.value}
//                               readOnly={field.readOnly}
//                               onChange={(e) => field.onChange(e.target.value)}
//                               disabled={!isEditingPersonal}
//                               className="input-primary w-full"
//                             />
//                             {field.verified && (
//                               <CheckCircle
//                                 size={20}
//                                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500"
//                               />
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     {updateError && (
//                       <p className="text-red-500 text-sm">
//                         {updateError?.data?.message ||
//                           "Failed to update profile"}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Contacts Section */}
//                 <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg md:text-xl font-semibold text-accent-100">
//                       Emergency Contacts
//                     </h2>
//                     {!isEditingContacts ? (
//                       <button onClick={() => setIsEditingContacts(true)}>
//                         <Edit className="text-gray-300" size={20} />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={handleUpdateContacts}
//                         className="btn-primary text-sm md:text-base"
//                       >
//                         Save
//                       </button>
//                     )}
//                   </div>
//                   <div className="space-y-4">
//                     {contacts && contacts.length > 0 ? (
//                       contacts.map((contact, index) => (
//                         <div
//                           key={index}
//                           className="border-b border-dark-300 pb-2 last:border-none"
//                         >
//                           {/* Wrap each contact's fields in a space-y container */}
//                           <div className="space-y-2">
//                             {[
//                               {
//                                 label: "Name",
//                                 key: "name",
//                                 type: "text",
//                                 icon: (
//                                   <User
//                                     className="mr-2 inline-block"
//                                     size={20}
//                                   />
//                                 ),
//                               },
//                               {
//                                 label: "Phone",
//                                 key: "phone",
//                                 type: "text",
//                                 icon: (
//                                   <Phone
//                                     className="mr-2 inline-block"
//                                     size={20}
//                                   />
//                                 ),
//                               },
//                               {
//                                 label: "Email",
//                                 key: "email",
//                                 type: "email",
//                                 icon: (
//                                   <Mail
//                                     className="mr-2 inline-block"
//                                     size={20}
//                                   />
//                                 ),
//                               },
//                             ].map((field, idx) => (
//                               <div
//                                 key={idx}
//                                 className="flex flex-col md:flex-row items-center"
//                               >
//                                 <label className="w-full md:w-1/4 text-gray-300">
//                                   {field.icon}
//                                   {field.label}
//                                 </label>
//                                 <input
//                                   type={field.type}
//                                   value={contact[field.key]}
//                                   onChange={(e) => {
//                                     // Clone the current contact and update the specific field
//                                     const updatedContact = {
//                                       ...contact,
//                                       [field.key]: e.target.value,
//                                     };
//                                     const updatedContacts = [...contacts];
//                                     updatedContacts[index] = updatedContact;
//                                     setContacts(updatedContacts);
//                                   }}
//                                   disabled={!isEditingContacts}
//                                   className="input-primary w-full"
//                                 />
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-300">No contacts available.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Lower Sections */}
//         <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//           {/* Security Section */}
//           <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
//             <h2 className="text-lg md:text-xl font-semibold text-accent-100 mb-4">
//               Security
//             </h2>
//             {/* Change Password Button */}
//             <button
//               onClick={() => setIsChangingPassword(true)}
//               className="w-full flex items-center justify-between px-4 py-2 border border-dark-300 rounded-md hover:bg-dark-300 transition"
//             >
//               <span>Change Password</span>
//               <FiLock className="text-gray-300" />
//             </button>
//             {/* Smoothly Expanding Password Form */}
//             <div
//               className="overflow-hidden transition-all duration-300"
//               style={{ maxHeight: isChangingPassword ? formHeight : 0 }}
//             >
//               <form
//                 onSubmit={handlePasswordSubmit}
//                 ref={formRef}
//                 className="mt-4 space-y-4 pb-6"
//               >
//                 <div>
//                   <label className="block text-gray-300 mb-1">
//                     Current Password
//                   </label>
//                   <input
//                     type="password"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                     className="input-primary w-full"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-300 mb-1">
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="input-primary w-full"
//                     required
//                   />
//                 </div>
//                 {resetError && (
//                   <p className="text-red-500 text-sm">
//                     {resetError?.data?.message || "Error resetting password"}
//                   </p>
//                 )}
//                 <div className="flex space-x-2">
//                   <button type="submit" className="btn-primary">
//                     {isResetLoading ? "Saving..." : "Save"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsChangingPassword(false)}
//                     className="btn-secondary"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Payment Methods */}
//           {/* <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
//             <h2 className="text-lg md:text-xl font-semibold text-accent-100 mb-4">
//               Payment Methods
//             </h2>
//             <button className="w-full flex items-center justify-between px-4 py-2 border border-dark-300 rounded-md hover:bg-dark-300 transition">
//               <span>Add/Edit/Remove Payment Methods</span>
//               <FiCreditCard className="text-gray-300" />
//             </button>
//           </div> */}

//           {/* Subscription & Purchase History */}
//           <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
//             <h2 className="text-lg md:text-xl font-semibold text-accent-100 mb-4">
//               Subscription & Purchase History
//             </h2>
//             <div className="space-y-3">
//               <button className="w-full flex items-center justify-between px-4 py-2 border border-dark-300 rounded-md hover:bg-dark-300 transition">
//                 <span>
//                   {user.activePlan
//                     ? "View Plan Details"
//                     : "No Active Subscription"}
//                 </span>
//               </button>
//               <button className="w-full flex items-center justify-between px-4 py-2 border border-dark-300 rounded-md hover:bg-dark-300 transition">
//                 <span>Download Invoices</span>
//                 <FiDownload className="text-gray-300" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileSettings;

// import { useEffect, useRef, useState } from "react";
// import {
//   useCodeMutation,
//   useDeleteAccountMutation,
//   useGetProfileQuery,
//   useGetUploadUrlQuery,
//   useLogoutUserMutation,
//   useMeQuery,
//   useResetPasswordMutation,
//   useUpdateOrRemoveImageKeyMutation,
//   useUpdateProfileMutation,
//   useUploadProfilePictureMutation,
//   useVerifyMutation,
// } from "@/features/api/userApiSlice";
// import {
//   FiCamera,
//   FiEdit,
//   FiTrash2,
//   FiLock,
//   FiAlertTriangle,
//   FiDownload,
// } from "react-icons/fi";
// import {
//   User,
//   Mail,
//   Phone,
//   Hash,
//   Edit,
//   Lock,
//   AlertTriangle,
//   Download,
//   ChevronDown,
//   Clock,
//   LogOut,
//   CheckCircle,
//   CreditCard,
//   Users,
//   Bell,
// } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// import { logout, setCredentials } from "@/features/auth/authSlice";

// const ProfileSettings = () => {
//   // ──────────────────────────
//   // 1. GET USER & DECLARE MUTATIONS
//   // ──────────────────────────
//   const { data: profileData, isLoading, isError, error } = useGetProfileQuery();
//   // const {data : me} = useMeQuery();
//   // console.log(me?.me.profileImgUrl)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [resetPassword, { isLoading: isResetLoading, error: resetError }] =
//     useResetPasswordMutation();
//   const [updateProfile, { isLoading: isUpdateLoading, error: updateError }] =
//     useUpdateProfileMutation();
//   const [deleteAccount, { isLoading: deleteProfileLoading }] =
//     useDeleteAccountMutation();

//   const { refetch: fetchUploadUrl } = useGetUploadUrlQuery();
//   const [uploadProfilePicture] = useUploadProfilePictureMutation();
//   const [updateOrRemoveImageKey] = useUpdateOrRemoveImageKeyMutation();

//   const [sendOtp, { isLoading: isSendingOtp }] = useCodeMutation();
//   const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyMutation();

//   const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // ──────────────────────────
//   // 2. LOCAL STATE
//   // ──────────────────────────
//   // Personal details
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [username, setUsername] = useState("");
//   const [aadhaar, setaadhaar] = useState("");
//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   // Address & contacts
//   const [address, setAddress] = useState({
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//   });
//   const [contacts, setContacts] = useState([]);

//   // Edit mode toggles
//   const [isEditingPersonal, setIsEditingPersonal] = useState(false);
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [isEditingContacts, setIsEditingContacts] = useState(false);
//   const [showLoginHistory, setShowLoginHistory] = useState(false);

//   // Password change
//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   // Profile image file input
//   const fileInputRef = useRef(null);
//   const [showSaveButton, setShowSaveButton] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   // Delete account confirmation
//   const [showConfirm, setShowConfirm] = useState(false);

//   // Store original data for comparison
//   const [originalProfile, setOriginalProfile] = useState(null);
//   const [originalContacts, setOriginalContacts] = useState([]);

//   // ──────────────────────────
//   // 3. OTP & VERIFICATION STATE
//   // ──────────────────────────
//   const [showVerificationModal, setShowVerificationModal] = useState(false);
//   const [showEmailVerifiedModal, setShowEmailVerifiedModal] = useState(false);
//   const [showMobileVerifiedModal, setShowMobileVerifiedModal] = useState(false);

//   // Steps: 1 => email, 2 => phone
//   const [verificationStep, setVerificationStep] = useState(0);
//   // The actual email or phone we are verifying
//   const [verificationLoginId, setVerificationLoginId] = useState("");
//   // The 4-digit OTP code
//   const [otpCode, setOtpCode] = useState(["", "", "", ""]);

//   // If user updated both, we store them to chain the flow
//   const [newEmail, setNewEmail] = useState(null);
//   const [newPhone, setNewPhone] = useState(null);

//   // Timer for OTP
//   const [timeLeft, setTimeLeft] = useState(300);

//   // For animating the password form container
//   const formRef = useRef(null);
//   const [formHeight, setFormHeight] = useState(0);

//   const [showConfirmDetete, setShowConfirmDetete] = useState(false);

//   // ──────────────────────────
//   // 4. EFFECTS
//   // ──────────────────────────
//   // a) When profile data loads, set local state
//   useEffect(() => {
//     if (profileData && profileData.user) {
//       const user = profileData.user;
//       setFirstName(user.firstName);
//       setLastName(user.lastName);
//       setEmail(user.email);
//       setPhone(user.phone);
//       setUsername(user.username);
//       setaadhaar(user.aadhaar);
//       setImage(user.profileImgUrl);

//       if (user.address) setAddress(user.address);
//       if (user.contacts) setContacts(user.contacts);

//       // Keep a copy of the original data
//       setOriginalProfile({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//         username: user.username,
//         aadhaar: user.aadhaar,
//       });

//       if (user.contacts) {
//         setOriginalContacts(user.contacts);
//       }
//     }
//   }, [profileData]);

//   // b) Handle OTP timer
//   useEffect(() => {
//     if (!showVerificationModal) return;
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [showVerificationModal]);

//   // c) Measure the height of the password form for animation
//   useEffect(() => {
//     if (formRef.current) {
//       setFormHeight(formRef.current.scrollHeight);
//     }
//   }, [isChangingPassword, currentPassword, newPassword]);

//   const handleConfirmLogout = async () => {
//     try {
//       await logoutUser({ type: "all" }).unwrap(); // Call API to logout from all devices
//       dispatch(logout()); // Clear Redux state
//       setShowConfirmDetete(false); // Close modal

//       // Redirect to login page after logout
//       setTimeout(() => {
//         window.location.href = "/signin";
//       }, 500);
//     } catch (error) {
//       console.error("Error logging out from all devices:", error);
//     }
//   };

//   // d) Prevent user from leaving if verification is pending
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (showVerificationModal) {
//         dispatch(logout());
//         setTimeout(() => {
//           window.location.href = "/signin"; // Redirect to login and refresh state
//         }, 100);
//       }
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [showVerificationModal, dispatch]);

//   // ──────────────────────────
//   // 5. HANDLERS: IMAGE UPLOAD / DELETE
//   // ──────────────────────────
//   const handleImageClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleImageChange = (e) => {
//     // const file = e.target.files[0];
//     // if (file) {
//     //   const reader = new FileReader();
//     //   reader.onloadend = () => {
//     //     setImage(reader.result);
//     //     setShowSaveButton(true);
//     //   };
//     //   reader.readAsDataURL(file);
//     // }

//     const file = e.target.files[0];
//     if (!file) return;

//     setImage(file); // raw File object
//     setPreviewUrl(URL.createObjectURL(file));
//     setShowSaveButton(true);
//   };

//   const handleRemovePhoto = async () => {
//     setImage(null);
//     setPreviewUrl(null);
//     await updateOrRemoveImageKey({ action: "remove" }).unwrap();
//   };

//   const handleSaveChanges = async () => {
//     if (!image) return;
//     setIsUploading(true);

//     try {
//       // 1. Optionally remove existing photo
//       if (profileData.user.profileImgUrl) {
//         await updateOrRemoveImageKey({ action: "remove" }).unwrap();
//       }

//       // 2. Get a signed URL
//       const { imageKey, uploadUrl } = await fetchUploadUrl().unwrap();

//       // 3. Upload the image
//       await uploadProfilePicture({
//         signedUrl: uploadUrl,
//         file: image, // pass the raw File object
//       }).unwrap();

//       // 4. Update DB with new imageKey
//       await updateOrRemoveImageKey({ action: "update", imageKey }).unwrap();

//       toast.success("Profile picture updated!");
//       setShowSaveButton(false);
//     } catch (err) {
//       console.error("Upload failed", err);
//       toast.error("Failed to upload profile picture.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // ──────────────────────────
//   // 6. HANDLER: DELETE ACCOUNT
//   // ──────────────────────────
//   const handleDelete = async () => {
//     try {
//       await deleteAccount().unwrap();
//       toast.success("Account deleted successfully!");
//       // Optionally redirect or log out the user here

//       dispatch(logout());
//       setTimeout(() => {
//         window.location.href = "/signin"; // Redirect to login and refresh state
//       }, 100);
//     } catch (error) {
//       toast.error(error?.data?.message || "Failed to delete account.");
//     } finally {
//       setShowConfirm(false);
//     }
//   };

//   // ──────────────────────────
//   // 7. HANDLER: RESET PASSWORD
//   // ──────────────────────────
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     const loginId = username || email;
//     try {
//       await resetPassword({ loginId, currentPassword, newPassword }).unwrap();
//       toast.success("Password reset successful");
//       setCurrentPassword("");
//       setNewPassword("");
//       setIsChangingPassword(false);
//     } catch (err) {
//       console.error("Failed to reset password", err);
//       toast.error("Could not reset password, please try again.");
//     }
//   };

//   // ──────────────────────────
//   // 8. HANDLER: UPDATE PROFILE (EMAIL/PHONE => OTP)
//   // ──────────────────────────
//   const handleUpdateProfile = async () => {
//     if (!originalProfile) return;

//     const updatedFields = {};
//     if (firstName !== originalProfile.firstName)
//       updatedFields.firstName = firstName;
//     if (lastName !== originalProfile.lastName)
//       updatedFields.lastName = lastName;
//     if (email !== originalProfile.email) updatedFields.email = email;
//     if (phone !== originalProfile.phone) updatedFields.phone = phone;
//     if (username !== originalProfile.username)
//       updatedFields.username = username;
//     if (aadhaar !== originalProfile.aadhaar) updatedFields.aadhaar = aadhaar;

//     // Nothing changed => just exit.
//     if (Object.keys(updatedFields).length === 0) {
//       setIsEditingPersonal(false);
//       return;
//     }

//     try {
//       await updateProfile(updatedFields).unwrap();
//       setIsEditingPersonal(false);
//       setOriginalProfile((prev) => ({ ...prev, ...updatedFields }));

//       // If email/phone changed => start OTP verification
//       if (updatedFields.email || updatedFields.phone) {
//         // BOTH updated
//         if (updatedFields.email && updatedFields.phone) {
//           setNewEmail(updatedFields.email);
//           setNewPhone(updatedFields.phone);
//           setVerificationStep(1); // Start with email
//           setVerificationLoginId(updatedFields.email);

//           await sendOtp({
//             loginId: username, // send to new email
//             service: "email",
//           }).unwrap();

//           setShowVerificationModal(true);
//         }
//         // ONLY email
//         else if (updatedFields.email) {
//           setNewEmail(updatedFields.email);
//           setVerificationStep(1);
//           setVerificationLoginId(updatedFields.email);

//           await sendOtp({
//             loginId: username,
//             service: "email",
//           }).unwrap();

//           setShowVerificationModal(true);
//         }
//         // ONLY phone
//         else if (updatedFields.phone) {
//           setNewPhone(updatedFields.phone);
//           setVerificationStep(2);
//           setVerificationLoginId(updatedFields.phone);

//           await sendOtp({
//             loginId: username,
//             service: "sms",
//           }).unwrap();

//           setShowVerificationModal(true);
//         }
//       } else {
//         toast.success("Profile updated successfully.");
//       }
//     } catch (err) {
//       console.error("Profile update failed:", err);
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };

//   // ──────────────────────────
//   // 9. HANDLER: UPDATE CONTACTS
//   // ──────────────────────────
//   const handleUpdateContacts = async () => {
//     if (JSON.stringify(contacts) === JSON.stringify(originalContacts)) {
//       setIsEditingContacts(false);
//       return;
//     }
//     try {
//       await updateProfile({ contacts }).unwrap();
//       setIsEditingContacts(false);
//       setOriginalContacts(contacts);
//       toast.success("Contacts updated successfully.");
//     } catch (err) {
//       console.error("Failed to update contacts:", err);
//       toast.error("Error updating contacts.");
//     }
//   };

//   // ──────────────────────────
//   // 10. OTP SUBMIT
//   // ──────────────────────────
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     const code = otpCode.join("");
//     if (code.length !== 4) {
//       toast.error("Please enter a complete 4-digit code.");
//       return;
//     }

//     // "email" for step=1, "phone" (or "sms") for step=2
//     const service = verificationStep === 1 ? "email" : "phone";

//     try {
//       // If verifying the "new" email or phone, use verificationLoginId
//       // If your backend only accepts `username` though, you can keep it as is.
//       const response = await verifyOtp({
//         loginId: username, // or `username` if that's how your backend is set
//         code,
//         service,
//       }).unwrap();

//       // STEP 1: EMAIL VERIFICATION
//       if (verificationStep === 1) {
//         /**
//          *  Possible responses for step=1:
//          *  A) { message: { emailVerifyStatus: true, phoneVerifyStatus?: boolean } }
//          *     => Means email is verified, phone might still need verifying.
//          *  B) {
//          *       "message": "OTP verified successfully and User activated successfully",
//          *       "type": "Bearer",
//          *       "token": "...", "control-signature": "...", "hash-token": "..."
//          *     }
//          *     => Means the user is fully verified (phone is already verified).
//          */

//         // CASE A: Check the object shape
//         if (response?.message?.emailVerifyStatus === true) {
//           // The standard "email verified" only flow
//           setShowVerificationModal(false); // close OTP modal

//           setTimeout(() => {
//             // Show Email verified modal
//             setShowEmailVerifiedModal(true);

//             setTimeout(async () => {
//               setShowEmailVerifiedModal(false);

//               // If the user also updated phone => go step=2
//               if (newPhone) {
//                 setVerificationStep(2);
//                 setVerificationLoginId(newPhone);
//                 setOtpCode(["", "", "", ""]);
//                 await sendOtp({ loginId: username, service: "sms" }).unwrap();
//                 setShowVerificationModal(true);
//               } else {
//                 // Only email was updated
//                 toast.success("Email verified successfully!");
//                 // Optionally force user to re-login
//                 dispatch(logout());

//                 setTimeout(() => {
//                   window.location.href = "/signin"; // Redirect to login and refresh state
//                 }, 100);
//               }
//             }, 2000);
//           }, 300);
//         }
//         // CASE B: The response is a string => "OTP verified successfully and User activated successfully"
//         else if (typeof response?.message === "string") {
//           // This implies phone is already verified as well
//           // => final success
//           if (response?.token) {
//             // Store new token if present
//             dispatch(
//               setCredentials({
//                 token: response.token,
//                 controlSignature: response["control-signature"],
//                 hashToken: response["hash-token"],
//               })
//             );
//           }

//           // Close OTP modal
//           setShowVerificationModal(false);

//           setTimeout(() => {
//             // Show email success modal (or final success modal)
//             setShowEmailVerifiedModal(true);

//             setTimeout(() => {
//               setShowEmailVerifiedModal(false);

//               // Now everything is verified => log out for security
//               dispatch(logout());
//               setTimeout(() => {
//                 window.location.href = "/signin"; // Redirect to login and refresh state
//               }, 100);
//             }, 2000);
//           }, 300);
//         } else {
//           toast.error("Email verification failed. Please try again.");
//         }
//       }

//       // STEP 2: PHONE VERIFICATION
//       else if (verificationStep === 2) {
//         // Typically: { message: "OTP verified successfully and User activated successfully", token: "...", ... }
//         if (typeof response?.message === "string") {
//           if (response?.token) {
//             dispatch(
//               setCredentials({
//                 token: response.token,
//                 controlSignature: response["control-signature"],
//                 hashToken: response["hash-token"],
//               })
//             );
//           }

//           // Close OTP modal
//           setShowVerificationModal(false);

//           setTimeout(() => {
//             // Show phone verified success
//             setShowMobileVerifiedModal(true);

//             // After 2s => hide success & logout
//             setTimeout(() => {
//               setShowMobileVerifiedModal(false);

//               dispatch(logout());
//               setTimeout(() => {
//                 window.location.href = "/signin"; // Redirect to login and refresh state
//               }, 100);
//             }, 2000);
//           }, 300);
//         } else {
//           toast.error("Phone verification failed. Please try again.");
//         }
//       }
//     } catch (err) {
//       console.error("OTP verification error:", err);
//       toast.error(
//         err?.data?.message || "OTP verification failed. Please try again."
//       );
//     }
//   };

//   // ──────────────────────────
//   // 11. RESEND OTP
//   // ──────────────────────────
//   const handleResendOtp = async () => {
//     try {
//       const service = verificationStep === 1 ? "email" : "sms";
//       await sendOtp({ loginId: username, service }).unwrap();
//       toast.success("Verification code resent successfully!");
//       setOtpCode(["", "", "", ""]);
//       setTimeLeft(300);
//     } catch (error) {
//       console.error("Resend OTP error:", error);
//       toast.error(
//         error?.data?.message || "Error resending OTP. Please try again."
//       );
//     }
//   };

//   // ──────────────────────────
//   // 12. HELPER FORMAT FUNCTION
//   // ──────────────────────────
//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   };

//   // ──────────────────────────
//   // RENDER LOADING / ERROR
//   // ──────────────────────────
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Loading profile...
//       </div>
//     );
//   }
//   if (isError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500">
//         Error loading profile: {error?.message || "Unknown error"}
//       </div>
//     );
//   }

//   // ──────────────────────────
//   // DESTRUCTURE USER
//   // ──────────────────────────
//   const { user } = profileData;

//   // ──────────────────────────
//   // 13. JSX RENDER
//   // ──────────────────────────
//   return (
//     <div className="relative min-h-screen bg-dark-100 overflow-hidden">
//       <div className="container mx-auto max-w-screen-xl px-4 py-4 pt-20 md:pt-24">
//         <div className="glow-box rounded-xl p-4 md:p-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-accent-100 mb-6 border-b border-dark-300 pb-3 text-center">
//             Profile Settings
//           </h1>

//           <div className="flex flex-col md:flex-row">
//             {/* LEFT COLUMN: PROFILE SUMMARY */}
//             <div className="md:w-1/3 md:border-r md:border-dark-300 md:pr-8">
//               <div className="flex flex-col items-center space-y-6">
//                 {/* PROFILE IMAGE */}
//                 <div className="relative">
//                   <div
//                     className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg cursor-pointer border border-dark-300"
//                     onClick={handleImageClick}
//                   >
//                     {previewUrl || user.profileImgUrl ? (
//                       <img
//                         src={previewUrl || user.profileImgUrl}
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                         crossOrigin="anonymous"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-dark-300 text-dark-100 text-3xl md:text-4xl font-bold">
//                         {firstName || lastName
//                           ? `${firstName[0] || ""}${lastName[0] || ""}`
//                           : "AB"}
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       ref={fileInputRef}
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </div>
//                   {image && (
//                     <button
//                       onClick={handleRemovePhoto}
//                       className="absolute top-0 right-0 bg-red-500 rounded-full p-2 shadow-md transform -translate-y-1/2 translate-x-1/2 hover:bg-red-600 transition"
//                       title="Remove Photo"
//                     >
//                       <FiTrash2 className="text-white" />
//                     </button>
//                   )}
//                 </div>

//                 {/* NAME & USERNAME */}
//                 <div className="text-center">
//                   <p className="text-xl font-semibold text-white">
//                     {firstName} {lastName}
//                   </p>
//                   <p className="text-gray-400">@{username}</p>
//                 </div>

//                 {/* ACCOUNT DATES */}
//                 <div className="text-center text-sm text-gray-300">
//                   <p>
//                     Account Created:{" "}
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </p>
//                   <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
//                 </div>

//                 {/* SAVE NEW PHOTO */}
//                 {showSaveButton && (
//                   <div className="w-full flex justify-center transition-opacity duration-500 opacity-100">
//                     <button
//                       onClick={handleSaveChanges}
//                       className={`btn-primary w-full sm:w-auto ${
//                         isUploading ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                       disabled={isUploading}
//                     >
//                       {isUploading ? "Saving..." : "Save Changes"}
//                     </button>
//                   </div>
//                 )}

//                 {/* ACCOUNT ACTION BUTTONS */}
//                 <div className="w-full space-y-4">
//                   {/* TOGGLE LOGIN HISTORY */}
//                   <button
//                     onClick={() => setShowLoginHistory(!showLoginHistory)}
//                     className={`w-full flex flex-col items-start px-6 transition-all duration-300 ease-in-out border border-dark-300 rounded-lg bg-dark-200 hover:bg-dark-300 ${
//                       showLoginHistory ? "py-4" : "py-3"
//                     }`}
//                   >
//                     <div className="w-full flex items-center justify-between">
//                       <div className="flex items-center">
//                         <Clock size={20} className="mr-2 text-gray-300" />
//                         <span className="text-white font-semibold">
//                           Last Login Details
//                         </span>
//                       </div>
//                       <ChevronDown
//                         className={`transform transition-transform duration-300 ${
//                           showLoginHistory ? "rotate-180" : ""
//                         }`}
//                         size={20}
//                       />
//                     </div>
//                     <div
//                       className={`w-full mt-2 text-sm text-gray-300 transition-all duration-300 ease-in-out ${
//                         showLoginHistory
//                           ? "max-h-20 opacity-100"
//                           : "max-h-0 opacity-0 overflow-hidden"
//                       }`}
//                     >
//                       <p>
//                         <strong>Last Login:</strong>{" "}
//                         {new Date(user.lastLogin).toLocaleString()}
//                       </p>
//                     </div>
//                   </button>

//                   {/* DEACTIVATE ACCOUNT */}
//                   <button className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600">
//                     <span>Deactivate Account</span>
//                     <AlertTriangle size={20} className="text-red-400" />
//                   </button>

//                   {/* DELETE ACCOUNT */}
//                   <div className="w-full flex flex-col items-center">
//                     <button
//                       className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
//                       onClick={() => setShowConfirm(true)}
//                     >
//                       <span>Delete Account Permanently</span>
//                       <FiTrash2 size={20} />
//                     </button>

//                     {showConfirm && (
//                       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
//                         <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg transform transition-all scale-95 md:scale-100">
//                           <h2 className="text-xl font-semibold text-gray-900 text-center">
//                             Confirm Deletion
//                           </h2>
//                           <p className="text-gray-600 text-center mt-2">
//                             Are you sure you want to delete your account? This
//                             action is irreversible.
//                           </p>
//                           <div className="flex justify-center gap-4 mt-6">
//                             <button
//                               className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
//                               onClick={() => setShowConfirm(false)}
//                             >
//                               Cancel
//                             </button>
//                             <button
//                               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
//                               onClick={handleDelete}
//                               disabled={deleteProfileLoading}
//                             >
//                               {deleteProfileLoading ? "Deleting..." : "Confirm"}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* SIGN OUT */}
//                   <button
//                     onClick={() => {
//                       dispatch(logout());
//                       setTimeout(() => {
//                         window.location.href = "signin"; // Redirect to login and refresh state
//                       }, 100);
//                     }}
//                     className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600"
//                   >
//                     <span>Sign Out</span>
//                     <LogOut size={20} className="text-gray-300" />
//                   </button>

//                   {/* SIGN OUT FROM ALL DEVICES */}
//                   <button
//                     className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     onClick={() => setShowConfirmDetete(true)}
//                   >
//                     <span>Sign Out from All Devices</span>
//                     <LogOut size={20} className="text-blue-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT COLUMN: DETAILED INFO */}
//             <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
//               <div className="grid grid-cols-1 gap-6">
//                 {/* PERSONAL DETAILS */}
//                 <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg md:text-xl font-semibold text-accent-100">
//                       Personal Details
//                     </h2>
//                     {!isEditingPersonal ? (
//                       <button onClick={() => setIsEditingPersonal(true)}>
//                         <Edit className="text-gray-300" size={20} />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={handleUpdateProfile}
//                         className="btn-primary text-sm md:text-base"
//                       >
//                         {isUpdateLoading ? "Saving..." : "Save"}
//                       </button>
//                     )}
//                   </div>

//                   <div className="space-y-4">
//                     {[
//                       {
//                         label: "First Name",
//                         value: firstName,
//                         onChange: setFirstName,
//                         type: "text",
//                         icon: <User className="mr-2 inline-block" size={20} />,
//                       },
//                       {
//                         label: "Last Name",
//                         value: lastName,
//                         onChange: setLastName,
//                         type: "text",
//                         icon: <User className="mr-2 inline-block" size={20} />,
//                       },
//                       {
//                         label: "Email",
//                         value: email,
//                         onChange: setEmail,
//                         type: "email",
//                         verified: true,
//                         icon: <Mail className="mr-2 inline-block" size={20} />,
//                       },
//                       {
//                         label: "Phone",
//                         value: phone,
//                         onChange: setPhone,
//                         type: "text",
//                         verified: true,
//                         icon: <Phone className="mr-2 inline-block" size={20} />,
//                       },
//                       aadhaar && {
//                         label: "Aadhaar",
//                         value: aadhaar,
//                         onChange: setaadhaar,
//                         type: "text",
//                         icon: <Hash className="mr-2 inline-block" size={20} />,
//                       },
//                     ]
//                       .filter(Boolean)
//                       .map((field, idx) => (
//                         <div
//                           key={idx}
//                           className="flex flex-col md:flex-row items-center"
//                         >
//                           <label className="w-full md:w-1/4 text-gray-300 flex items-center">
//                             {field.icon}
//                             {field.label}
//                           </label>
//                           <div className="relative w-full">
//                             <input
//                               type={field.type}
//                               value={field.value}
//                               onChange={(e) => field.onChange(e.target.value)}
//                               disabled={!isEditingPersonal}
//                               className="input-primary w-full"
//                             />
//                             {field.verified && (
//                               <CheckCircle
//                                 size={20}
//                                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500"
//                               />
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     {updateError && (
//                       <p className="text-red-500 text-sm">
//                         {updateError?.data?.message ||
//                           "Failed to update profile."}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* CONTACTS SECTION */}
//                 <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg md:text-xl font-semibold text-accent-100">
//                       Emergency Contacts
//                     </h2>
//                     {!isEditingContacts ? (
//                       <button onClick={() => setIsEditingContacts(true)}>
//                         <Edit className="text-gray-300" size={20} />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={handleUpdateContacts}
//                         className="btn-primary text-sm md:text-base"
//                       >
//                         Save
//                       </button>
//                     )}
//                   </div>
//                   <div className="space-y-4">
//                     {contacts && contacts.length > 0 ? (
//                       contacts.map((contact, index) => (
//                         <div
//                           key={index}
//                           className="border-b border-dark-300 pb-2 last:border-none"
//                         >
//                           <div className="space-y-2">
//                             {[
//                               {
//                                 label: "Name",
//                                 key: "name",
//                                 type: "text",
//                                 icon: <User className="mr-2 inline-block" />,
//                               },
//                               {
//                                 label: "Phone",
//                                 key: "phone",
//                                 type: "text",
//                                 icon: <Phone className="mr-2 inline-block" />,
//                               },
//                               {
//                                 label: "Email",
//                                 key: "email",
//                                 type: "email",
//                                 icon: <Mail className="mr-2 inline-block" />,
//                               },
//                             ].map((field, idx2) => (
//                               <div
//                                 key={idx2}
//                                 className="flex flex-col md:flex-row items-center"
//                               >
//                                 <label className="w-full md:w-1/4 text-gray-300">
//                                   {field.icon}
//                                   {field.label}
//                                 </label>
//                                 <input
//                                   type={field.type}
//                                   value={contact[field.key] || ""}
//                                   onChange={(e) => {
//                                     const updatedContact = {
//                                       ...contact,
//                                       [field.key]: e.target.value,
//                                     };
//                                     const updatedContacts = [...contacts];
//                                     updatedContacts[index] = updatedContact;
//                                     setContacts(updatedContacts);
//                                   }}
//                                   disabled={!isEditingContacts}
//                                   className="input-primary w-full"
//                                 />
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-300">No contacts available.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* LOWER SECTIONS */}
//         <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//           {/* SECURITY SECTION */}
//           <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
//             <h2 className="text-lg md:text-xl font-semibold text-accent-100 mb-4">
//               Security
//             </h2>
//             <button
//               onClick={() => setIsChangingPassword(true)}
//               className="w-full flex items-center justify-between px-4 py-2 border border-dark-300 rounded-md hover:bg-dark-300 transition"
//             >
//               <span>Change Password</span>
//               <Lock className="text-gray-300" />
//             </button>

//             {/* PASSWORD FORM */}
//             <div
//               className="overflow-hidden transition-all duration-300"
//               style={{ maxHeight: isChangingPassword ? formHeight : 0 }}
//             >
//               <form
//                 onSubmit={handlePasswordSubmit}
//                 ref={formRef}
//                 className="mt-4 space-y-4 pb-6"
//               >
//                 <div>
//                   <label className="block text-gray-300 mb-1">
//                     Current Password
//                   </label>
//                   <input
//                     type="password"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                     className="input-primary w-full"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-300 mb-1">
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="input-primary w-full"
//                     required
//                   />
//                 </div>
//                 {resetError && (
//                   <p className="text-red-500 text-sm">
//                     {resetError?.data?.message || "Error resetting password"}
//                   </p>
//                 )}
//                 <div className="flex space-x-2">
//                   <button type="submit" className="btn-primary">
//                     {isResetLoading ? "Saving..." : "Save"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsChangingPassword(false)}
//                     className="btn-secondary"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* SUBSCRIPTIONS / PURCHASE HISTORY */}
//           <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
//             <h2 className="text-lg md:text-xl font-semibold text-accent-100 mb-4">
//               Subscription & Purchase History
//             </h2>

//             {/* Smart Notifications Subscription */}
//             {user.features?.smartNotifications && (
//               <div className="mb-4 border border-dark-300 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-white font-semibold flex items-center">
//                     <Bell size={18} className="mr-2 text-purple-400" />
//                     Smart Notifications
//                   </h3>
//                   <span
//                     className={`px-2 py-1 text-xs rounded-full ${
//                       user.features.smartNotifications.active
//                         ? "bg-green-900/30 text-green-400 border border-green-500/30"
//                         : "bg-gray-800 text-gray-400 border border-gray-700"
//                     }`}
//                   >
//                     {user.features.smartNotifications.active
//                       ? "Active"
//                       : "Inactive"}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
//                   <div className="text-gray-400">
//                     Plan:{" "}
//                     <span className="text-white capitalize">
//                       {user.features.smartNotifications.billingCycle}
//                     </span>
//                   </div>
//                   <div className="text-gray-400">
//                     Status:{" "}
//                     <span
//                       className={
//                         user.features.smartNotifications.active
//                           ? "text-green-400"
//                           : "text-red-400"
//                       }
//                     >
//                       {user.features.smartNotifications.active
//                         ? "Active"
//                         : "Inactive"}
//                     </span>
//                   </div>
//                   <div className="text-gray-400">
//                     Start Date:{" "}
//                     <span className="text-white">
//                       {formatDate(user.features.smartNotifications.startDate)}
//                     </span>
//                   </div>
//                   <div className="text-gray-400">
//                     End Date:{" "}
//                     <span className="text-white">
//                       {formatDate(user.features.smartNotifications.endDate)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Nominee Subscription */}
//             {user.features?.nominee && (
//               <div className="mb-4 border border-dark-300 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-white font-semibold flex items-center">
//                     <Users size={18} className="mr-2 text-blue-400" />
//                     Nominee Access
//                   </h3>
//                   <span
//                     className={`px-2 py-1 text-xs rounded-full ${
//                       user.features.nominee.active
//                         ? "bg-green-900/30 text-green-400 border border-green-500/30"
//                         : "bg-gray-800 text-gray-400 border border-gray-700"
//                     }`}
//                   >
//                     {user.features.nominee.active ? "Active" : "Inactive"}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
//                   <div className="text-gray-400">
//                     Plan:{" "}
//                     <span className="text-white capitalize">
//                       {user.features.nominee.billingCycle}
//                     </span>
//                   </div>
//                   <div className="text-gray-400">
//                     Status:{" "}
//                     <span
//                       className={
//                         user.features.nominee.active
//                           ? "text-green-400"
//                           : "text-red-400"
//                       }
//                     >
//                       {user.features.nominee.active ? "Active" : "Inactive"}
//                     </span>
//                   </div>
//                   <div className="text-gray-400">
//                     Start Date:{" "}
//                     <span className="text-white">
//                       {formatDate(user.features.nominee.startDate)}
//                     </span>
//                   </div>
//                   <div className="text-gray-400">
//                     End Date:{" "}
//                     <span className="text-white">
//                       {formatDate(user.features.nominee.endDate)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* No active subscriptions message */}
//             {!user.features?.smartNotifications && !user.features?.nominee && (
//               <div className="text-gray-400 text-center py-4">
//                 No active subscriptions found.
//               </div>
//             )}

//             {/* Subscription actions */}
//             <div className="space-y-3 mt-4">
//               <button
//                 onClick={() => navigate("/subscriptions")}
//                 className="w-full flex items-center justify-between px-4 py-2 border border-dark-300 rounded-md hover:bg-dark-300 transition"
//               >
//                 <span>Manage Subscriptions</span>
//                 <CreditCard className="text-gray-300" size={18} />
//               </button>

//               <button className="w-full flex items-center justify-between px-4 py-2 border border-dark-300 rounded-md hover:bg-dark-300 transition">
//                 <span>Download Invoices</span>
//                 <Download className="text-gray-300" size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ──────────────────────────
//           OTP VERIFICATION MODAL
//       ────────────────────────── */}
//       {showVerificationModal && (
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
//         >
//           <div className="w-full md:w-1/2 p-8 md:p-16 bg-dark-100 rounded-lg shadow-xl">
//             <div className="max-w-md mx-auto">
//               <h2 className="text-3xl font-bold mb-6 text-center">
//                 {verificationStep === 1
//                   ? "Verify Your Email"
//                   : "Verify Your Mobile"}
//               </h2>
//               <p className="text-gray-300 mb-4 text-center">
//                 {verificationStep === 1
//                   ? "Please enter the 4-digit code sent to your new email address."
//                   : "Please enter the 4-digit code sent to your new mobile number."}
//               </p>

//               {/* Display timer */}
//               <div className="text-center text-gray-400 mb-4">
//                 Time left:{" "}
//                 <span className="font-semibold">{formatTime(timeLeft)}</span>
//               </div>

//               <form onSubmit={handleOtpSubmit} className="space-y-6">
//                 <div className="flex justify-center space-x-4">
//                   {otpCode.map((digit, index) => (
//                     <input
//                       key={index}
//                       id={`otp-${index}`} // 1) Unique ID for each input
//                       type="text"
//                       maxLength={1}
//                       value={digit}
//                       inputMode="numeric"
//                       className="w-16 h-16 text-center text-3xl rounded-lg
//                  bg-dark-200 border border-dark-300 text-white
//                  focus:outline-none focus:ring-2 focus:ring-accent-100
//                  transition-all duration-300"
//                       onChange={(e) => {
//                         // Allow only a single digit 0-9
//                         if (/^\d?$/.test(e.target.value)) {
//                           const newArr = [...otpCode];
//                           newArr[index] = e.target.value;
//                           setOtpCode(newArr);

//                           // 2) Auto-focus the next box if this isn't the last
//                           if (e.target.value && index < otpCode.length - 1) {
//                             document
//                               .getElementById(`otp-${index + 1}`)
//                               ?.focus();
//                           }
//                         }
//                       }}
//                       onKeyDown={(e) => {
//                         // 3) If Backspace on empty input, move focus to the previous
//                         if (
//                           e.key === "Backspace" &&
//                           !otpCode[index] &&
//                           index > 0
//                         ) {
//                           document.getElementById(`otp-${index - 1}`)?.focus();
//                         }
//                       }}
//                     />
//                   ))}
//                 </div>

//                 <div className="flex flex-col space-y-4">
//                   <button
//                     type="submit"
//                     disabled={otpCode.some((v) => !v) || isVerifyingOtp}
//                     className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//                   >
//                     {isVerifyingOtp ? "Verifying..." : "Verify"}
//                   </button>

//                   <button
//                     type="button"
//                     onClick={handleResendOtp}
//                     disabled={isSendingOtp || timeLeft > 0}
//                     className="w-full py-3 px-4 rounded-lg border border-accent-100 text-accent-100 hover:bg-dark-200 transition disabled:opacity-50"
//                   >
//                     {isSendingOtp ? "Resending..." : "Resend OTP"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* PREMIUM MODAL: EMAIL VERIFIED */}
//       {showEmailVerifiedModal && (
//         <motion.div
//           // Fade & scale in
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-75"
//         >
//           <div className="bg-dark-200 p-8 rounded-xl shadow-lg flex flex-col items-center space-y-6">
//             {/* Animated check icon container */}
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1.2 }}
//               transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
//               className="bg-green-500 rounded-full p-4 flex items-center justify-center"
//             >
//               {/* Any check icon you like (e.g., a SVG, or React Icon like FiCheck) */}
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </motion.div>

//             <h2 className="text-2xl font-bold text-white text-center">
//               Email Verified!
//             </h2>
//             <p className="text-gray-300 text-center">
//               Your email has been verified successfully.
//             </p>
//           </div>
//         </motion.div>
//       )}

//       {/* PREMIUM MODAL: PHONE VERIFIED */}
//       {showMobileVerifiedModal && (
//         <motion.div
//           // Fade & slight scale in
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-75"
//         >
//           <div className="bg-dark-200 p-8 rounded-xl shadow-lg flex flex-col items-center space-y-6">
//             {/* Animated check icon container */}
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1.2 }}
//               transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
//               className="bg-green-500 rounded-full p-4 flex items-center justify-center"
//             >
//               {/* You can use FiCheck, or any check icon from React Icons */}
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </motion.div>

//             <h2 className="text-2xl font-bold text-white text-center">
//               Verification Complete
//             </h2>
//             <p className="text-gray-300 text-center">
//               Your phone has been successfully verified!
//             </p>
//             <p className="text-sm text-gray-400 text-center">
//               Redirecting you to login...
//             </p>
//           </div>
//         </motion.div>
//       )}

//       {showConfirmDetete && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
//         >
//           <div className="bg-dark-200 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//             {/* Warning Icon */}
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1.2 }}
//               transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
//               className="bg-red-500 rounded-full p-4 inline-flex items-center justify-center"
//             >
//               <AlertTriangle size={24} className="text-white" />
//             </motion.div>

//             {/* Modal Title & Description */}
//             <h2 className="text-2xl font-bold text-white mt-4">
//               Log Out from All Devices?
//             </h2>
//             <p className="text-gray-300 mt-2">
//               This will log you out from **all devices**, including mobile and
//               desktop. You will need to log in again on each device.
//             </p>

//             {/* Action Buttons */}
//             <div className="flex justify-center gap-4 mt-6">
//               <button
//                 className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
//                 onClick={() => setShowConfirm(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md ${
//                   isLogoutLoading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 onClick={handleConfirmLogout}
//                 disabled={isLogoutLoading}
//               >
//                 {isLogoutLoading ? "Logging Out..." : "Confirm Logout"}
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ProfileSettings;

import { useEffect, useRef, useState } from "react";
import {
  useCodeMutation,
  useDeleteAccountMutation,
  useGetProfileQuery,
  useGetUploadUrlQuery,
  useLogoutUserMutation,
  useMeQuery,
  useResetPasswordMutation,
  useUpdateOrRemoveImageKeyMutation,
  useUpdateProfileMutation,
  useUploadProfilePictureMutation,
  useVerifyMutation,
} from "@/features/api/userApiSlice";
import {
  FiCamera,
  FiEdit,
  FiTrash2,
  FiLock,
  FiAlertTriangle,
  FiDownload,
} from "react-icons/fi";
import {
  User,
  Mail,
  Phone,
  Hash,
  Edit,
  Lock,
  AlertTriangle,
  Download,
  ChevronDown,
  Clock,
  LogOut,
  CheckCircle,
  Shield,
  Bell,
  Users,
  CreditCard,
  History,
  X,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { logout, setCredentials } from "@/features/auth/authSlice";

const ProfileSettings = () => {
  // ──────────────────────────
  // 1. GET USER & DECLARE MUTATIONS
  // ──────────────────────────
  const { data: profileData, isLoading, isError, error } = useGetProfileQuery();
  // const {data : me} = useMeQuery();
  // console.log(me?.me.profileImgUrl)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resetPassword, { isLoading: isResetLoading, error: resetError }] =
    useResetPasswordMutation();
  const [updateProfile, { isLoading: isUpdateLoading, error: updateError }] =
    useUpdateProfileMutation();
  const [deleteAccount, { isLoading: deleteProfileLoading }] =
    useDeleteAccountMutation();

  const { refetch: fetchUploadUrl } = useGetUploadUrlQuery();
  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const [updateOrRemoveImageKey] = useUpdateOrRemoveImageKeyMutation();

  const [sendOtp, { isLoading: isSendingOtp }] = useCodeMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyMutation();

  const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();

  // ──────────────────────────
  // 2. LOCAL STATE
  // ──────────────────────────
  // Personal details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [aadhaar, setaadhaar] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Address & contacts
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [contacts, setContacts] = useState([]);

  // Edit mode toggles
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const [showLoginHistory, setShowLoginHistory] = useState(false);

  // Password change
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Profile image file input
  const fileInputRef = useRef(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Delete account confirmation
  const [showConfirm, setShowConfirm] = useState(false);

  // Store original data for comparison
  const [originalProfile, setOriginalProfile] = useState(null);
  const [originalContacts, setOriginalContacts] = useState([]);

  // ──────────────────────────
  // 3. OTP & VERIFICATION STATE
  // ──────────────────────────
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showEmailVerifiedModal, setShowEmailVerifiedModal] = useState(false);
  const [showMobileVerifiedModal, setShowMobileVerifiedModal] = useState(false);

  // Steps: 1 => email, 2 => phone
  const [verificationStep, setVerificationStep] = useState(0);
  // The actual email or phone we are verifying
  const [verificationLoginId, setVerificationLoginId] = useState("");
  // The 4-digit OTP code
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);

  // If user updated both, we store them to chain the flow
  const [newEmail, setNewEmail] = useState(null);
  const [newPhone, setNewPhone] = useState(null);

  // Timer for OTP
  const [timeLeft, setTimeLeft] = useState(300);

  // For animating the password form container
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(0);

  const [showConfirmDetete, setShowConfirmDetete] = useState(false);

  // ──────────────────────────
  // 4. EFFECTS
  // ──────────────────────────
  // a) When profile data loads, set local state
  useEffect(() => {
    if (profileData && profileData.user) {
      const user = profileData.user;
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setUsername(user.username);
      setaadhaar(user.aadhaar);
      setImage(user.profileImgUrl);

      if (user.address) setAddress(user.address);
      if (user.contacts) setContacts(user.contacts);

      // Keep a copy of the original data
      setOriginalProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        aadhaar: user.aadhaar,
      });

      if (user.contacts) {
        setOriginalContacts(user.contacts);
      }
    }
  }, [profileData]);

  // b) Handle OTP timer
  useEffect(() => {
    if (!showVerificationModal) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showVerificationModal]);

  // c) Measure the height of the password form for animation
  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.scrollHeight);
    }
  }, [isChangingPassword, currentPassword, newPassword]);

  const handleConfirmLogout = async () => {
    try {
      await logoutUser({ type: "all" }).unwrap(); // Call API to logout from all devices
      dispatch(logout()); // Clear Redux state
      setShowConfirmDetete(false); // Close modal

      // Redirect to login page after logout
      setTimeout(() => {
        window.location.href = "/signin";
      }, 500);
    } catch (error) {
      console.error("Error logging out from all devices:", error);
    }
  };

  // d) Prevent user from leaving if verification is pending
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (showVerificationModal) {
        dispatch(logout());
        setTimeout(() => {
          window.location.href = "/signin"; // Redirect to login and refresh state
        }, 100);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [showVerificationModal, dispatch]);

  // ──────────────────────────
  // 5. HANDLERS: IMAGE UPLOAD / DELETE
  // ──────────────────────────
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file); // raw File object
    setPreviewUrl(URL.createObjectURL(file));
    setShowSaveButton(true);
  };

  const handleRemovePhoto = async () => {
    setImage(null);
    setPreviewUrl(null);
    await updateOrRemoveImageKey({ action: "remove" }).unwrap();
  };

  const handleSaveChanges = async () => {
    if (!image) return;
    setIsUploading(true);

    try {
      // 1. Optionally remove existing photo
      if (profileData.user.profileImgUrl) {
        await updateOrRemoveImageKey({ action: "remove" }).unwrap();
      }

      // 2. Get a signed URL
      const { imageKey, uploadUrl } = await fetchUploadUrl().unwrap();

      // 3. Upload the image
      await uploadProfilePicture({
        signedUrl: uploadUrl,
        file: image, // pass the raw File object
      }).unwrap();

      // 4. Update DB with new imageKey
      await updateOrRemoveImageKey({ action: "update", imageKey }).unwrap();

      toast.success("Profile picture updated!");
      setShowSaveButton(false);
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Failed to upload profile picture.");
    } finally {
      setIsUploading(false);
    }
  };

  // ──────────────────────────
  // 6. HANDLER: DELETE ACCOUNT
  // ──────────────────────────
  const handleDelete = async () => {
    try {
      await deleteAccount().unwrap();
      toast.success("Account deleted successfully!");
      // Optionally redirect or log out the user here

      dispatch(logout());
      setTimeout(() => {
        window.location.href = "/signin"; // Redirect to login and refresh state
      }, 100);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete account.");
    } finally {
      setShowConfirm(false);
    }
  };

  // ──────────────────────────
  // 7. HANDLER: RESET PASSWORD
  // ──────────────────────────
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const loginId = username || email;
    try {
      await resetPassword({ loginId, currentPassword, newPassword }).unwrap();
      toast.success("Password reset successful");
      setCurrentPassword("");
      setNewPassword("");
      setIsChangingPassword(false);
    } catch (err) {
      console.error("Failed to reset password", err);
      toast.error("Could not reset password, please try again.");
    }
  };

  // ──────────────────────────
  // 8. HANDLER: UPDATE PROFILE (EMAIL/PHONE => OTP)
  // ──────────────────────────
  const handleUpdateProfile = async () => {
    if (!originalProfile) return;

    const updatedFields = {};
    if (firstName !== originalProfile.firstName)
      updatedFields.firstName = firstName;
    if (lastName !== originalProfile.lastName)
      updatedFields.lastName = lastName;
    if (email !== originalProfile.email) updatedFields.email = email;
    if (phone !== originalProfile.phone) updatedFields.phone = phone;
    if (username !== originalProfile.username)
      updatedFields.username = username;
    if (aadhaar !== originalProfile.aadhaar) updatedFields.aadhaar = aadhaar;

    // Nothing changed => just exit.
    if (Object.keys(updatedFields).length === 0) {
      setIsEditingPersonal(false);
      return;
    }

    try {
      await updateProfile(updatedFields).unwrap();
      setIsEditingPersonal(false);
      setOriginalProfile((prev) => ({ ...prev, ...updatedFields }));

      // If email/phone changed => start OTP verification
      if (updatedFields.email || updatedFields.phone) {
        // BOTH updated
        if (updatedFields.email && updatedFields.phone) {
          setNewEmail(updatedFields.email);
          setNewPhone(updatedFields.phone);
          setVerificationStep(1); // Start with email
          setVerificationLoginId(updatedFields.email);

          await sendOtp({
            loginId: username, // send to new email
            service: "email",
          }).unwrap();

          setShowVerificationModal(true);
        }
        // ONLY email
        else if (updatedFields.email) {
          setNewEmail(updatedFields.email);
          setVerificationStep(1);
          setVerificationLoginId(updatedFields.email);

          await sendOtp({
            loginId: username,
            service: "email",
          }).unwrap();

          setShowVerificationModal(true);
        }
        // ONLY phone
        else if (updatedFields.phone) {
          setNewPhone(updatedFields.phone);
          setVerificationStep(2);
          setVerificationLoginId(updatedFields.phone);

          await sendOtp({
            loginId: username,
            service: "sms",
          }).unwrap();

          setShowVerificationModal(true);
        }
      } else {
        toast.success("Profile updated successfully.");
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // ──────────────────────────
  // 9. HANDLER: UPDATE CONTACTS
  // ──────────────────────────
  const handleUpdateContacts = async () => {
    if (JSON.stringify(contacts) === JSON.stringify(originalContacts)) {
      setIsEditingContacts(false);
      return;
    }
    try {
      await updateProfile({ contacts }).unwrap();
      setIsEditingContacts(false);
      setOriginalContacts(contacts);
      toast.success("Contacts updated successfully.");
    } catch (err) {
      console.error("Failed to update contacts:", err);
      toast.error("Error updating contacts.");
    }
  };

  // ──────────────────────────
  // 10. OTP SUBMIT
  // ──────────────────────────
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otpCode.join("");
    if (code.length !== 4) {
      toast.error("Please enter a complete 4-digit code.");
      return;
    }

    // "email" for step=1, "phone" (or "sms") for step=2
    const service = verificationStep === 1 ? "email" : "phone";

    try {
      // If verifying the "new" email or phone, use verificationLoginId
      // If your backend only accepts `username` though, you can keep it as is.
      const response = await verifyOtp({
        loginId: username, // or `username` if that's how your backend is set
        code,
        service,
      }).unwrap();

      // STEP 1: EMAIL VERIFICATION
      if (verificationStep === 1) {
        /**
         *  Possible responses for step=1:
         *  A) { message: { emailVerifyStatus: true, phoneVerifyStatus?: boolean } }
         *     => Means email is verified, phone might still need verifying.
         *  B) {
         *       "message": "OTP verified successfully and User activated successfully",
         *       "type": "Bearer",
         *       "token": "...", "control-signature": "...", "hash-token": "..."
         *     }
         *     => Means the user is fully verified (phone is already verified).
         */

        // CASE A: Check the object shape
        if (response?.message?.emailVerifyStatus === true) {
          // The standard "email verified" only flow
          setShowVerificationModal(false); // close OTP modal

          setTimeout(() => {
            // Show Email verified modal
            setShowEmailVerifiedModal(true);

            setTimeout(async () => {
              setShowEmailVerifiedModal(false);

              // If the user also updated phone => go step=2
              if (newPhone) {
                setVerificationStep(2);
                setVerificationLoginId(newPhone);
                setOtpCode(["", "", "", ""]);
                await sendOtp({ loginId: username, service: "sms" }).unwrap();
                setShowVerificationModal(true);
              } else {
                // Only email was updated
                toast.success("Email verified successfully!");
                // Optionally force user to re-login
                dispatch(logout());

                setTimeout(() => {
                  window.location.href = "/signin"; // Redirect to login and refresh state
                }, 100);
              }
            }, 2000);
          }, 300);
        }
        // CASE B: The response is a string => "OTP verified successfully and User activated successfully"
        else if (typeof response?.message === "string") {
          // This implies phone is already verified as well
          // => final success
          if (response?.token) {
            // Store new token if present
            dispatch(
              setCredentials({
                token: response.token,
                controlSignature: response["control-signature"],
                hashToken: response["hash-token"],
              })
            );
          }

          // Close OTP modal
          setShowVerificationModal(false);

          setTimeout(() => {
            // Show email success modal (or final success modal)
            setShowEmailVerifiedModal(true);

            setTimeout(() => {
              setShowEmailVerifiedModal(false);

              // Now everything is verified => log out for security
              dispatch(logout());
              setTimeout(() => {
                window.location.href = "/signin"; // Redirect to login and refresh state
              }, 100);
            }, 2000);
          }, 300);
        } else {
          toast.error("Email verification failed. Please try again.");
        }
      }

      // STEP 2: PHONE VERIFICATION
      else if (verificationStep === 2) {
        // Typically: { message: "OTP verified successfully and User activated successfully", token: "...", ... }
        if (typeof response?.message === "string") {
          if (response?.token) {
            dispatch(
              setCredentials({
                token: response.token,
                controlSignature: response["control-signature"],
                hashToken: response["hash-token"],
              })
            );
          }

          // Close OTP modal
          setShowVerificationModal(false);

          setTimeout(() => {
            // Show phone verified success
            setShowMobileVerifiedModal(true);

            // After 2s => hide success & logout
            setTimeout(() => {
              setShowMobileVerifiedModal(false);

              dispatch(logout());
              setTimeout(() => {
                window.location.href = "/signin"; // Redirect to login and refresh state
              }, 100);
            }, 2000);
          }, 300);
        } else {
          toast.error("Phone verification failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      toast.error(
        err?.data?.message || "OTP verification failed. Please try again."
      );
    }
  };

  // ──────────────────────────
  // 11. RESEND OTP
  // ──────────────────────────
  const handleResendOtp = async () => {
    try {
      const service = verificationStep === 1 ? "email" : "sms";
      await sendOtp({ loginId: username, service }).unwrap();
      toast.success("Verification code resent successfully!");
      setOtpCode(["", "", "", ""]);
      setTimeLeft(300);
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(
        error?.data?.message || "Error resending OTP. Please try again."
      );
    }
  };

  // ──────────────────────────
  // 12. HELPER FORMAT FUNCTION
  // ──────────────────────────
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Helper function to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ──────────────────────────
  // RENDER LOADING / ERROR
  // ──────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading profile: {error?.message || "Unknown error"}
      </div>
    );
  }

  // ──────────────────────────
  // DESTRUCTURE USER
  // ──────────────────────────
  const { user } = profileData;

  // ──────────────────────────
  // 13. JSX RENDER
  // ──────────────────────────
  return (
    <div className="relative min-h-screen bg-dark-100 overflow-hidden">
      <div className="container mx-auto max-w-screen-xl px-4 py-4 pt-20 md:pt-24">
        <div className="glow-box rounded-xl p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-accent-100 mb-6 border-b border-dark-300 pb-3 text-center">
            Profile Settings
          </h1>

          <div className="flex flex-col md:flex-row">
            {/* LEFT COLUMN: PROFILE SUMMARY */}
            <div className="md:w-1/3 md:border-r md:border-dark-300 md:pr-8">
              <div className="flex flex-col items-center space-y-6">
                {/* PROFILE IMAGE */}
                <div className="relative">
                  <div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg cursor-pointer border border-dark-300"
                    onClick={handleImageClick}
                  >
                    {previewUrl || user.profileImgUrl ? (
                      <img
                        src={previewUrl || user.profileImgUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-dark-300 text-dark-100 text-3xl md:text-4xl font-bold">
                        {firstName || lastName
                          ? `${firstName[0] || ""}${lastName[0] || ""}`
                          : "AB"}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  {image && (
                    <button
                      onClick={handleRemovePhoto}
                      className="absolute top-0 right-0 bg-red-500 rounded-full p-2 shadow-md transform -translate-y-1/2 translate-x-1/2 hover:bg-red-600 transition"
                      title="Remove Photo"
                    >
                      <FiTrash2 className="text-white" />
                    </button>
                  )}
                </div>

                {/* NAME & USERNAME */}
                <div className="text-center">
                  <p className="text-xl font-semibold text-white">
                    {firstName} {lastName}
                  </p>
                  <p className="text-gray-400">@{username}</p>
                </div>

                {/* SAVE NEW PHOTO */}
                {showSaveButton && (
                  <div className="w-full flex justify-center transition-opacity duration-500 opacity-100">
                    <button
                      onClick={handleSaveChanges}
                      className={`btn-primary w-full sm:w-auto ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isUploading}
                    >
                      {isUploading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}

                {/* ACCOUNT ACTION BUTTONS */}
                <div className="w-full space-y-4">
                  {/* TOGGLE LOGIN HISTORY */}
                  <button
                    onClick={() => setShowLoginHistory(!showLoginHistory)}
                    className={`w-full flex flex-col items-start px-6 transition-all duration-300 ease-in-out border border-dark-300 rounded-lg bg-dark-200 hover:bg-dark-300 ${
                      showLoginHistory ? "py-4" : "py-3"
                    }`}
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock size={20} className="mr-2 text-gray-300" />
                        <span className="text-white font-semibold">
                          Last Login Details
                        </span>
                      </div>
                      <ChevronDown
                        className={`transform transition-transform duration-300 ${
                          showLoginHistory ? "rotate-180" : ""
                        }`}
                        size={20}
                      />
                    </div>
                    <div
                      className={`w-full mt-2 text-sm text-gray-300 transition-all duration-300 ease-in-out ${
                        showLoginHistory
                          ? "max-h-20 opacity-100"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <p>
                        <strong>Last Login:</strong>{" "}
                        {new Date(user.lastLogin).toLocaleString()}
                      </p>
                    </div>
                  </button>

                  {/* DEACTIVATE ACCOUNT */}
                  <button className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600">
                    <span>Deactivate Account</span>
                    <AlertTriangle size={20} className="text-red-400" />
                  </button>

                  {/* DELETE ACCOUNT */}
                  <div className="w-full flex flex-col items-center">
                    <button
                      className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
                      onClick={() => setShowConfirm(true)}
                    >
                      <span>Delete Account Permanently</span>
                      <FiTrash2 size={20} />
                    </button>

                    {showConfirm && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                        <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg transform transition-all scale-95 md:scale-100">
                          <h2 className="text-xl font-semibold text-gray-900 text-center">
                            Confirm Deletion
                          </h2>
                          <p className="text-gray-600 text-center mt-2">
                            Are you sure you want to delete your account? This
                            action is irreversible.
                          </p>
                          <div className="flex justify-center gap-4 mt-6">
                            <button
                              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                              onClick={() => setShowConfirm(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
                              onClick={handleDelete}
                              disabled={deleteProfileLoading}
                            >
                              {deleteProfileLoading ? "Deleting..." : "Confirm"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SIGN OUT */}
                  <button
                    onClick={() => {
                      dispatch(logout());
                      setTimeout(() => {
                        window.location.href = "signin"; // Redirect to login and refresh state
                      }, 100);
                    }}
                    className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600"
                  >
                    <span>Sign Out</span>
                    <LogOut size={20} className="text-gray-300" />
                  </button>

                  {/* SIGN OUT FROM ALL DEVICES */}
                  <button
                    className="w-full flex items-center justify-between px-6 py-3 bg-dark-200 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setShowConfirmDetete(true)}
                  >
                    <span>Sign Out from All Devices</span>
                    <LogOut size={20} className="text-blue-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DETAILED INFO */}
            <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
              <div className="grid grid-cols-1 gap-6">
                {/* PERSONAL DETAILS */}
                <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-accent-100">
                      Personal Details
                    </h2>
                    {!isEditingPersonal ? (
                      <button onClick={() => setIsEditingPersonal(true)}>
                        <Edit className="text-gray-300" size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={handleUpdateProfile}
                        className="btn-primary text-sm md:text-base"
                      >
                        {isUpdateLoading ? "Saving..." : "Save"}
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: "First Name",
                        value: firstName,
                        onChange: setFirstName,
                        type: "text",
                        icon: <User className="mr-2 inline-block" size={20} />,
                      },
                      {
                        label: "Last Name",
                        value: lastName,
                        onChange: setLastName,
                        type: "text",
                        icon: <User className="mr-2 inline-block" size={20} />,
                      },
                      {
                        label: "Email",
                        value: email,
                        onChange: setEmail,
                        type: "email",
                        verified: true,
                        icon: <Mail className="mr-2 inline-block" size={20} />,
                      },
                      {
                        label: "Phone",
                        value: phone,
                        onChange: setPhone,
                        type: "text",
                        verified: true,
                        icon: <Phone className="mr-2 inline-block" size={20} />,
                      },
                      aadhaar && {
                        label: "Aadhaar",
                        value: aadhaar,
                        onChange: setaadhaar,
                        type: "text",
                        icon: <Hash className="mr-2 inline-block" size={20} />,
                      },
                    ]
                      .filter(Boolean)
                      .map((field, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col md:flex-row items-center"
                        >
                          <label className="w-full md:w-1/4 text-gray-300 flex items-center">
                            {field.icon}
                            {field.label}
                          </label>
                          <div className="relative w-full">
                            <input
                              type={field.type}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={!isEditingPersonal}
                              className="input-primary w-full"
                            />
                            {field.verified && (
                              <CheckCircle
                                size={20}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    {updateError && (
                      <p className="text-red-500 text-sm">
                        {updateError?.data?.message ||
                          "Failed to update profile."}
                      </p>
                    )}
                  </div>
                </div>

                {/* CONTACTS SECTION */}
                <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-accent-100">
                      Emergency Contacts
                    </h2>
                    {!isEditingContacts ? (
                      <button onClick={() => setIsEditingContacts(true)}>
                        <Edit className="text-gray-300" size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={handleUpdateContacts}
                        className="btn-primary text-sm md:text-base"
                      >
                        Save
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {contacts && contacts.length > 0 ? (
                      contacts.map((contact, index) => (
                        <div
                          key={index}
                          className="border-b border-dark-300 pb-2 last:border-none"
                        >
                          <div className="space-y-2">
                            {[
                              {
                                label: "Name",
                                key: "name",
                                type: "text",
                                icon: <User className="mr-2 inline-block" />,
                              },
                              {
                                label: "Phone",
                                key: "phone",
                                type: "text",
                                icon: <Phone className="mr-2 inline-block" />,
                              },
                              {
                                label: "Email",
                                key: "email",
                                type: "email",
                                icon: <Mail className="mr-2 inline-block" />,
                              },
                            ].map((field, idx2) => (
                              <div
                                key={idx2}
                                className="flex flex-col md:flex-row items-center"
                              >
                                <label className="w-full md:w-1/4 text-gray-300">
                                  {field.icon}
                                  {field.label}
                                </label>
                                <input
                                  type={field.type}
                                  value={contact[field.key] || ""}
                                  onChange={(e) => {
                                    const updatedContact = {
                                      ...contact,
                                      [field.key]: e.target.value,
                                    };
                                    const updatedContacts = [...contacts];
                                    updatedContacts[index] = updatedContact;
                                    setContacts(updatedContacts);
                                  }}
                                  disabled={!isEditingContacts}
                                  className="input-primary w-full"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-300">No contacts available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOWER SECTIONS */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* SECURITY SECTION */}
          <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200 h-full flex flex-col">
            <h2 className="text-lg md:text-xl font-semibold text-accent-100 mb-4 flex items-center">
              <Lock className="mr-2 text-accent-100" size={20} />
              Security
            </h2>

            {/* Security Cards Section */}
            <div className="space-y-4 flex-grow">
              {/* Password Card */}
              <div className="border border-dark-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium flex items-center">
                    <Lock className="mr-2 text-gray-400" size={16} />
                    Password
                  </h3>
                  <button
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                    className="p-1.5 rounded-full hover:bg-dark-300 text-gray-400 hover:text-white transition-colors"
                  >
                    {isChangingPassword ? <X size={16} /> : <Edit size={16} />}
                  </button>
                </div>

                <div className="text-sm text-gray-400">
                  Secure your account with a strong password.
                </div>

                {/* PASSWORD FORM */}
                <div
                  className="overflow-hidden transition-all duration-300 mt-3"
                  style={{ maxHeight: isChangingPassword ? formHeight : 0 }}
                >
                  <form
                    onSubmit={handlePasswordSubmit}
                    ref={formRef}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-gray-300 mb-1 text-sm">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="input-primary w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1 text-sm">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-primary w-full"
                        required
                      />
                    </div>
                    {resetError && (
                      <p className="text-red-500 text-sm">
                        {resetError?.data?.message ||
                          "Error resetting password"}
                      </p>
                    )}
                    <div className="flex space-x-2">
                      <button type="submit" className="btn-primary text-sm">
                        {isResetLoading ? "Saving..." : "Update Password"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsChangingPassword(false)}
                        className="btn-secondary text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="mt-3 w-full py-2 rounded-lg border border-accent-100/60 text-accent-100 text-sm hover:bg-accent-100/10 transition-colors"
                  >
                    Change Password
                  </button>
                )}
              </div>

              {/* Two-Factor Authentication Card */}
              {/* <div className="border border-dark-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium flex items-center">
                    <Shield className="mr-2 text-gray-400" size={16} />
                    Two-Factor Authentication
                  </h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                    Coming Soon
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Add an extra layer of security to your account.
                </div>
              </div> */}

              {/* Device Management Card */}
              <div className="border border-dark-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium flex items-center">
                    <Smartphone className="mr-2 text-gray-400" size={16} />
                    Device Management
                  </h3>
                </div>
                <div className="text-sm text-gray-400 mb-3">
                  Manage devices that are logged into your account.
                </div>
                <button
                  onClick={() => setShowConfirmDetete(true)}
                  className="w-full py-2 rounded-lg border border-blue-600/60 text-blue-500 text-sm hover:bg-blue-600/10 transition-colors"
                >
                  Sign Out from All Devices
                </button>
              </div>
            </div>
          </div>

          {/* SUBSCRIPTION SECTION */}
          {/* SUBSCRIPTION SECTION */}
          <div className="p-4 md:p-6 rounded-lg shadow-md bg-dark-200 h-full flex flex-col">
            <h2 className="text-lg md:text-xl font-semibold text-accent-100 mb-4 flex items-center">
              <CreditCard className="mr-2 text-accent-100" size={20} />
              My Subscriptions
            </h2>

            {/* Different content based on subscription status */}
            {user.features?.smartNotifications?.active ||
            user.features?.nominee?.active ? (
              /* When subscriptions exist */
              <div className="space-y-4 flex-grow">
                {/* Smart Notifications Subscription */}
                {user.features?.smartNotifications?.active && (
                  <div className="border border-dark-300 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium flex items-center">
                        <Bell size={16} className="mr-2 text-purple-400" />
                        Smart Notifications
                      </h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-400 border border-green-500/30">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                      <div className="text-gray-400">
                        Plan:{" "}
                        <span className="text-white capitalize">
                          {user.features.smartNotifications.billingCycle}
                        </span>
                      </div>
                      <div className="text-gray-400">
                        Status: <span className="text-green-400">Active</span>
                      </div>
                      <div className="text-gray-400">
                        Start:{" "}
                        <span className="text-white">
                          {formatDate(
                            user.features.smartNotifications.startDate
                          )}
                        </span>
                      </div>
                      <div className="text-gray-400">
                        End:{" "}
                        <span className="text-white">
                          {formatDate(user.features.smartNotifications.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nominee Subscription */}
                {user.features?.nominee?.active && (
                  <div className="border border-dark-300 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium flex items-center">
                        <Users size={16} className="mr-2 text-blue-400" />
                        Nominee Access
                      </h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-400 border border-green-500/30">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                      <div className="text-gray-400">
                        Plan:{" "}
                        <span className="text-white capitalize">
                          {user.features.nominee.billingCycle}
                        </span>
                      </div>
                      <div className="text-gray-400">
                        Status: <span className="text-green-400">Active</span>
                      </div>
                      <div className="text-gray-400">
                        Start:{" "}
                        <span className="text-white">
                          {formatDate(user.features.nominee.startDate)}
                        </span>
                      </div>
                      <div className="text-gray-400">
                        End:{" "}
                        <span className="text-white">
                          {formatDate(user.features.nominee.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* IMPROVED: When no subscriptions exist */
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="bg-dark-300/50 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="text-gray-400 w-10 h-10" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">
                    No Active Subscriptions
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Upgrade your account with premium subscriptions to unlock
                    advanced features.
                  </p>

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="mx-auto w-full max-w-xs py-3 px-5 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-900 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <span>Explore Premium Features</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Subscription actions */}
            <div className="space-y-3 mt-4">
              {/* Show subscription management button if appropriate */}
              {(user.features?.smartNotifications?.active ||
                user.features?.nominee?.active) && (
                <button
                  onClick={() => navigate("/upgrade")}
                  className="w-full flex items-center justify-between px-4 py-2 border border-dark-300 rounded-md hover:bg-dark-300 transition"
                >
                  <span>Manage Subscriptions</span>
                  <CreditCard className="text-gray-300" size={18} />
                </button>
              )}

              {/* Always show order history button - MOVED UP when no active subscriptions */}
              <button
                onClick={() => navigate("/account/orders")}
                className="w-full flex items-center justify-between px-4 py-2 border border-dark-300 rounded-md hover:bg-dark-300 transition"
              >
                <span>View Order History</span>
                <History className="text-gray-300" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────
          OTP VERIFICATION MODAL
      ────────────────────────── */}
      {showVerificationModal && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
        >
          <div className="w-full md:w-1/2 p-8 md:p-16 bg-dark-100 rounded-lg shadow-xl">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {verificationStep === 1
                  ? "Verify Your Email"
                  : "Verify Your Mobile"}
              </h2>
              <p className="text-gray-300 mb-4 text-center">
                {verificationStep === 1
                  ? "Please enter the 4-digit code sent to your new email address."
                  : "Please enter the 4-digit code sent to your new mobile number."}
              </p>

              {/* Display timer */}
              <div className="text-center text-gray-400 mb-4">
                Time left:{" "}
                <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-center space-x-4">
                  {otpCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`} // 1) Unique ID for each input
                      type="text"
                      maxLength={1}
                      value={digit}
                      inputMode="numeric"
                      className="w-16 h-16 text-center text-3xl rounded-lg 
                                bg-dark-200 border border-dark-300 text-white 
                                focus:outline-none focus:ring-2 focus:ring-accent-100 
                                transition-all duration-300"
                      onChange={(e) => {
                        // Allow only a single digit 0-9
                        if (/^\d?$/.test(e.target.value)) {
                          const newArr = [...otpCode];
                          newArr[index] = e.target.value;
                          setOtpCode(newArr);

                          // 2) Auto-focus the next box if this isn't the last
                          if (e.target.value && index < otpCode.length - 1) {
                            document
                              .getElementById(`otp-${index + 1}`)
                              ?.focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        // 3) If Backspace on empty input, move focus to the previous
                        if (
                          e.key === "Backspace" &&
                          !otpCode[index] &&
                          index > 0
                        ) {
                          document.getElementById(`otp-${index - 1}`)?.focus();
                        }
                      }}
                    />
                  ))}
                </div>

                <div className="flex flex-col space-y-4">
                  <button
                    type="submit"
                    disabled={otpCode.some((v) => !v) || isVerifyingOtp}
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isVerifyingOtp ? "Verifying..." : "Verify"}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isSendingOtp || timeLeft > 0}
                    className="w-full py-3 px-4 rounded-lg border border-accent-100 text-accent-100 hover:bg-dark-200 transition disabled:opacity-50"
                  >
                    {isSendingOtp ? "Resending..." : "Resend OTP"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}

      {/* PREMIUM MODAL: EMAIL VERIFIED */}
      {showEmailVerifiedModal && (
        <motion.div
          // Fade & scale in
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-75"
        >
          <div className="bg-dark-200 p-8 rounded-xl shadow-lg flex flex-col items-center space-y-6">
            {/* Animated check icon container */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className="bg-green-500 rounded-full p-4 flex items-center justify-center"
            >
              {/* Any check icon you like (e.g., a SVG, or React Icon like FiCheck) */}
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <h2 className="text-2xl font-bold text-white text-center">
              Email Verified!
            </h2>
            <p className="text-gray-300 text-center">
              Your email has been verified successfully.
            </p>
          </div>
        </motion.div>
      )}

      {/* PREMIUM MODAL: PHONE VERIFIED */}
      {showMobileVerifiedModal && (
        <motion.div
          // Fade & slight scale in
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-75"
        >
          <div className="bg-dark-200 p-8 rounded-xl shadow-lg flex flex-col items-center space-y-6">
            {/* Animated check icon container */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className="bg-green-500 rounded-full p-4 flex items-center justify-center"
            >
              {/* You can use FiCheck, or any check icon from React Icons */}
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <h2 className="text-2xl font-bold text-white text-center">
              Verification Complete
            </h2>
            <p className="text-gray-300 text-center">
              Your phone has been successfully verified!
            </p>
            <p className="text-sm text-gray-400 text-center">
              Redirecting you to login...
            </p>
          </div>
        </motion.div>
      )}

      {showConfirmDetete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
        >
          <div className="bg-dark-200 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
            {/* Warning Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className="bg-red-500 rounded-full p-4 inline-flex items-center justify-center"
            >
              <AlertTriangle size={24} className="text-white" />
            </motion.div>

            {/* Modal Title & Description */}
            <h2 className="text-2xl font-bold text-white mt-4">
              Log Out from All Devices?
            </h2>
            <p className="text-gray-300 mt-2">
              This will log you out from **all devices**, including mobile and
              desktop. You will need to log in again on each device.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                onClick={() => setShowConfirmDetete(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md ${
                  isLogoutLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleConfirmLogout}
                disabled={isLogoutLoading}
              >
                {isLogoutLoading ? "Logging Out..." : "Confirm Logout"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileSettings;
