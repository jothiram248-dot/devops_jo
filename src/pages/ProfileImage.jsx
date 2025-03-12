// import { useState, useRef } from "react";
// import { Camera, XCircle } from "lucide-react";
// import { authImages } from "../assets/images/auth"; // Ensure correct path

// export default function ProfileUpload() {
//   const [image, setImage] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const user = { me: { firstName: "John", lastName: "Doe" } }; // Mock user data

//   // Handle Image Upload
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setIsUploading(true);
//       const newImageUrl = URL.createObjectURL(file);
//       setTimeout(() => {
//         setImage(newImageUrl);
//         setIsUploading(false);
//       }, 1000);
//     }
//   };

//   // Trigger File Input Click
//   const handleImageClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   // Remove Image
//   const handleRemoveImage = () => {
//     setImage(null);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
//       {/* Card Container */}
//       <div className="flex flex-col md:flex-row-reverse w-full max-w-4xl bg-dark-800 shadow-2xl rounded-3xl overflow-hidden transition-all">
//         {/* Right Section - Background Image */}
//         <div className="hidden md:block w-1/2 relative">
//           <img
//             src={authImages.verification}
//             alt="Profile Background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
//         </div>

//         {/* Left Section - Complete Profile */}
//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-white">
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//             Complete Your Profile
//           </h2>
//           <p className="text-gray-400 mt-2 text-center">
//             Upload a profile picture to personalize your experience.
//           </p>

//           {/* Profile Image */}
//           <div
//             className="relative w-44 h-44 mt-6 rounded-full overflow-hidden bg-dark-600 shadow-xl border-4 border-accent-200 flex items-center justify-center group transition-all duration-300 cursor-pointer"
//             onClick={handleImageClick} // Click to trigger file input
//           >
//             {image ? (
//               <img
//                 src={image}
//                 alt="Profile"
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-dark-100 font-bold text-6xl border-accent-100 bg-gradient-to-r from-accent-100 to-accent-200">
//                 {`${user?.me?.firstName?.charAt(0) || ""}${
//                   user?.me?.lastName?.charAt(0) || ""
//                 }`}
//               </div>
//             )}

//             {/* File Input */}
//             <input
//               type="file"
//               accept="image/*"
//               ref={fileInputRef} // Reference for clicking programmatically
//               className="hidden"
//               onChange={handleImageChange}
//               disabled={isUploading}
//             />

//             {/* Overlay with Camera Icon */}
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300">
//               <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition duration-300" />
//             </div>

//             {/* Uploading Overlay */}
//             {isUploading && (
//               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white font-medium">
//                 <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
//                 Uploading...
//               </div>
//             )}
//           </div>

//           {/* User Information */}
//           <div className="mt-6 text-center">
//             <h3 className="text-2xl font-semibold">
//               {user.me.firstName} {user.me.lastName}
//             </h3>
//             <p className="text-gray-500">Your Profile Name</p>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-6">
//             {image && (
//               <button
//                 className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-600 transition-all flex items-center gap-2"
//                 onClick={handleRemoveImage}
//               >
//                 <XCircle className="w-5 h-5" />
//                 Remove
//               </button>
//             )}
//             <button
//               className="bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
//               disabled={isUploading}
//             >
//               {image ? "Save Profile" : "Set Default"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { Camera, XCircle } from "lucide-react";
import { authImages } from "../assets/images/auth";
import { useNavigate } from "react-router-dom";
import {
  useGetUploadUrlQuery,
  useUploadProfilePictureMutation,
  useUpdateOrRemoveImageKeyMutation,
  useMeQuery,
} from "@/features/api/userApiSlice";

export default function ProfileUpload() {
  const [image, setImage] = useState(null); // Store the raw File here
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { data: user } = useMeQuery();
  const { refetch: fetchUploadUrl } = useGetUploadUrlQuery();
  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const [updateOrRemoveImageKey] = useUpdateOrRemoveImageKeyMutation();

  // ─────────────────────────────────────────────────────────
  // 1. Handle the "Save" button - upload the raw file
  // ─────────────────────────────────────────────────────────
  const handleSaveChanges = async () => {
    // If user didn’t choose an image, just navigate away
    if (!image) {
      navigate("/");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Get the presigned PUT URL from your backend
      const { imageKey, uploadUrl } = await fetchUploadUrl().unwrap();

      // 2. Upload the raw file (no FormData)
      await uploadProfilePicture({
        signedUrl: uploadUrl,
        file: image, // direct file object
      }).unwrap();

      // 3. Tell the backend which imageKey we used
      await updateOrRemoveImageKey({ action: "update", imageKey }).unwrap();

      // 4. Navigate or show success
      navigate("/");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  // ─────────────────────────────────────────────────────────
  // 2. Remove the selected image
  // ─────────────────────────────────────────────────────────
  const handleRemoveImage = () => {
    setImage(null);
  };

  // ─────────────────────────────────────────────────────────
  // 3. Capture the raw File in state
  // ─────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // store the raw File
    }
  };

  // ─────────────────────────────────────────────────────────
  // 4. Open file dialog
  // ─────────────────────────────────────────────────────────
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // ─────────────────────────────────────────────────────────
  // 5. Render
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <div className="flex flex-col md:flex-row-reverse w-full max-w-4xl bg-dark-800 shadow-2xl rounded-3xl overflow-hidden transition-all">
        
        {/* Right / Image side */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src={authImages.verification}
            alt="Profile Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
        </div>
        
        {/* Left / Form side */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-white">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Complete Profile{" "}
            <span className="text-sm text-gray-500 font-normal">
              (Optional)
            </span>
          </h2>
          <p className="text-gray-400 mt-2 text-center">
            Upload a profile picture to personalize your experience.
          </p>

          {/* Profile Image Display */}
          <div
            className="relative w-44 h-44 mt-6 rounded-full overflow-hidden bg-dark-600 shadow-xl border-4 border-accent-200 flex items-center justify-center group transition-all duration-300 cursor-pointer"
            onClick={handleImageClick}
          >
            {image ? (
              // If user selected a file, show a preview using `createObjectURL`
              <img
                src={URL.createObjectURL(image)}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              // Else show 2-letter fallback
              <div className="w-full h-full flex items-center justify-center text-dark-100 font-bold text-6xl bg-gradient-to-r from-accent-100 to-accent-200">
                {`${user?.me?.firstName?.charAt(0) || ""}${
                  user?.me?.lastName?.charAt(0) || ""
                }`}
              </div>
            )}
            
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              disabled={isUploading}
            />
            
            {/* Camera overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300">
              <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>

            {/* Loading overlay if uploading */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white font-medium">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                Uploading...
              </div>
            )}
          </div>

          {/* Username or name under the image */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold">
              {user?.me?.firstName} {user?.me?.lastName}
            </h3>
            <p className="text-gray-500">Your Profile Name</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            {image && (
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-600 transition-all flex items-center gap-2"
                onClick={handleRemoveImage}
                disabled={isUploading}
              >
                <XCircle className="w-5 h-5" />
                Remove
              </button>
            )}
            <button
              className="bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              disabled={isUploading}
              onClick={handleSaveChanges}
            >
              {image ? "Save Profile" : "Set Default"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// import { useRef, useState } from "react";
// import {
//   FiCamera,
//   FiEdit,
//   FiTrash2,
//   FiCheckCircle,
//   FiLock,
//   FiAlertTriangle,
//   FiCreditCard,
//   FiDownload,
// } from "react-icons/fi";

// // Provided user info
// const initialUser = {
//   id: "usr-5b9adc43-6f6c-4c4c-a217-bafb9134f828",
//   displayId: "BC1252CA",
//   firstName: "Sam",
//   lastName: "Sheikh",
//   email: "sameer@cnetric.com",
//   username: "sam",
//   phone: "9079174118",
//   isVerified: true,
//   activePlan: null,
//   lastLogin: "2025-02-06T09:38:35.323Z",
//   aadhar: null,
//   contacts: [],
//   createdAt: "2025-02-04T07:22:36.369Z",
//   updatedAt: "2025-02-06T09:38:35.327Z",
//   profileImgUrl:
//     "https://imgs.search.brave.com/rClQxS_UowbS2GHXX3WMSp_NDUpv01aR44Yf_mxtIyE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdG9y/eWJsb2stY2RuLnBo/b3Rvcm9vbS5jb20v/Zi8xOTE1NzYvMTE3/Nng4ODIvOWJkYzVk/ODQwMC9yb3VuZF9w/cm9maWxlX3BpY3R1/cmVfaGVyb19iZWZv/cmUud2VicA",
// };

// const ProfileSettings = () => {
//   // Pre-populate state with user data
//   const [image, setImage] = useState(initialUser.profileImgUrl || null);
//   const [fullName, setFullName] = useState(
//     `${initialUser.firstName} ${initialUser.lastName}`
//   );
//   const [username, setUsername] = useState(initialUser.username);
//   const [email, setEmail] = useState(initialUser.email);
//   const [phone, setPhone] = useState(initialUser.phone);
//   const fileInputRef = useRef(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setImage(null);
//   };

//   const handleImageClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto my-8 p-8 bg-dark-200 text-white rounded-2xl shadow-2xl border border-gray-700">
//       {/* Profile Information Section */}
//       <h2 className="text-4xl font-extrabold mb-6 border-b border-gray-700 pb-4">
//         Profile Information
//       </h2>

//       {/* Refined Profile Image Section */}
//       <div className="flex flex-col items-center">
//         <div className="relative group">
//           <div
//             className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl border border-gray-700 transition-transform transform group-hover:scale-105"
//             onClick={handleImageClick}
//           >
//             {image ? (
//               <img
//                 src={image}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300 text-3xl font-bold">
//                 {fullName
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("") || "AB"}
//               </div>
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               ref={fileInputRef}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               onChange={handleImageChange}
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300">
//               <FiCamera className="text-white opacity-0 group-hover:opacity-100 transition duration-300 w-8 h-8" />
//             </div>
//           </div>
//           {image && (
//             <button
//               onClick={handleRemovePhoto}
//               className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition"
//               title="Remove Photo"
//             >
//               <FiTrash2 className="w-4 h-4" />
//             </button>
//           )}
//         </div>
//         <span className="mt-4 text-sm text-gray-400">
//           Click image to update
//         </span>
//       </div>

//       {/* Editable Profile Details */}
//       <div className="mt-8 space-y-6">
//         {[
//           {
//             label: "Full Name",
//             value: fullName,
//             editable: true,
//             onChange: (e) => setFullName(e.target.value),
//           },
//           {
//             label: "Username",
//             value: username,
//             editable: false,
//           },
//           {
//             label: "Email",
//             value: email,
//             editable: true,
//             verified: initialUser.isVerified,
//             onChange: (e) => setEmail(e.target.value),
//           },
//           {
//             label: "Phone Number",
//             value: phone,
//             editable: true,
//             verified: initialUser.isVerified,
//             onChange: (e) => setPhone(e.target.value),
//           },
//         ].map(({ label, value, editable, verified, onChange }) => (
//           <div
//             key={label}
//             className="flex flex-col md:flex-row items-start md:items-center justify-between"
//           >
//             <span className="text-gray-400 font-medium w-full md:w-1/4">
//               {label}
//             </span>
//             <div className="flex items-center w-full md:w-3/4 mt-2 md:mt-0">
//               <input
//                 type="text"
//                 value={value}
//                 onChange={editable ? onChange : undefined}
//                 readOnly={!editable}
//                 className={`flex-grow ${
//                   editable ? "bg-gray-900" : "bg-gray-800"
//                 } border border-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
//                   !editable && "cursor-default"
//                 }`}
//               />
//               {verified && (
//                 <FiCheckCircle className="ml-3 text-green-400 w-6 h-6" />
//               )}
//               {editable && (
//                 <button className="ml-3 text-blue-400 hover:text-blue-300 transition">
//                   <FiEdit className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Security Section */}
//       <h2 className="text-3xl font-semibold mt-12 border-b border-gray-700 pb-3">
//         Security
//       </h2>
//       <button className="w-full flex items-center justify-between p-4 mt-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
//         <span>Change Password</span>
//         <FiLock className="text-gray-400" />
//       </button>

//       {/* Account Settings Section */}
//       <h2 className="text-3xl font-semibold mt-12 border-b border-gray-700 pb-3">
//         Account
//       </h2>
//       {[
//         {
//           label: "Login History",
//           icon: null,
//         },
//         {
//           label: "Deactivate Account",
//           icon: <FiAlertTriangle />,
//           className: "border-yellow-600 hover:bg-yellow-600 text-yellow-400",
//         },
//         {
//           label: "Delete Account Permanently",
//           icon: <FiTrash2 />,
//           className: "border-red-600 hover:bg-red-600 text-red-400",
//         },
//       ].map(({ label, icon, className }) => (
//         <button
//           key={label}
//           className={`w-full flex items-center justify-between p-4 mt-4 border rounded-lg bg-gray-900 hover:bg-gray-800 transition ${
//             className || "border-gray-700"
//           }`}
//         >
//           <span>{label}</span>
//           {icon}
//         </button>
//       ))}

//       {/* Payment Methods Section */}
//       <h2 className="text-3xl font-semibold mt-12 border-b border-gray-700 pb-3">
//         Manage Payment Methods
//       </h2>
//       <button className="w-full flex items-center justify-between p-4 mt-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
//         <span>Add/Edit/Remove Payment Methods</span>
//         <FiCreditCard className="text-gray-400" />
//       </button>

//       {/* Subscription Plan Section */}
//       <h2 className="text-3xl font-semibold mt-12 border-b border-gray-700 pb-3">
//         Current Subscription
//       </h2>
//       <button className="w-full flex items-center justify-between p-4 mt-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
//         <span>
//           {initialUser.activePlan
//             ? "View Plan Details"
//             : "No Active Subscription"}
//         </span>
//       </button>

//       {/* Purchase History Section */}
//       <h2 className="text-3xl font-semibold mt-12 border-b border-gray-700 pb-3">
//         Purchase History
//       </h2>
//       <button className="w-full flex items-center justify-between p-4 mt-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
//         <span>Download Invoices</span>
//         <FiDownload className="text-gray-400" />
//       </button>
//     </div>
//   );
// };

// export default ProfileSettings;
