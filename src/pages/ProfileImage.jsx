// import { useState, useRef } from "react";
// import { Camera, XCircle } from "lucide-react";
// import { authImages } from "../assets/images/auth";
// import { useNavigate } from "react-router-dom";
// import {
//   useGetUploadUrlQuery,
//   useUploadProfilePictureMutation,
//   useUpdateOrRemoveImageKeyMutation,
//   useMeQuery,
// } from "@/features/api/userApiSlice";

// export default function ProfileUpload() {
//   const [image, setImage] = useState(null); // Store the raw File here
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   const { data: user } = useMeQuery();
//   const { refetch: fetchUploadUrl } = useGetUploadUrlQuery();
//   const [uploadProfilePicture] = useUploadProfilePictureMutation();
//   const [updateOrRemoveImageKey] = useUpdateOrRemoveImageKeyMutation();

//   // ─────────────────────────────────────────────────────────
//   // 1. Handle the "Save" button - upload the raw file
//   // ─────────────────────────────────────────────────────────
//   const handleSaveChanges = async () => {
//     // If user didn’t choose an image, just navigate away
//     if (!image) {
//       navigate("/");
//       return;
//     }

//     setIsUploading(true);
//     try {
//       // 1. Get the presigned PUT URL from your backend
//       const { imageKey, uploadUrl } = await fetchUploadUrl().unwrap();

//       // 2. Upload the raw file (no FormData)
//       await uploadProfilePicture({
//         signedUrl: uploadUrl,
//         file: image, // direct file object
//       }).unwrap();

//       // 3. Tell the backend which imageKey we used
//       await updateOrRemoveImageKey({ action: "update", imageKey }).unwrap();

//       // 4. Navigate or show success
//       navigate("/");
//     } catch (error) {
//       console.error("Upload failed", error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────
//   // 2. Remove the selected image
//   // ─────────────────────────────────────────────────────────
//   const handleRemoveImage = () => {
//     setImage(null);
//   };

//   // ─────────────────────────────────────────────────────────
//   // 3. Capture the raw File in state
//   // ─────────────────────────────────────────────────────────
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file); // store the raw File
//     }
//   };

//   // ─────────────────────────────────────────────────────────
//   // 4. Open file dialog
//   // ─────────────────────────────────────────────────────────
//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   // ─────────────────────────────────────────────────────────
//   // 5. Render
//   // ─────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
//       <div className="flex flex-col md:flex-row-reverse w-full max-w-4xl bg-dark-800 shadow-2xl rounded-3xl overflow-hidden transition-all">

//         {/* Right / Image side */}
//         <div className="hidden md:block w-1/2 relative">
//           <img
//             src={authImages.verification}
//             alt="Profile Background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
//         </div>

//         {/* Left / Form side */}
//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-white">
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//             Complete Profile{" "}
//             <span className="text-sm text-gray-500 font-normal">
//               (Optional)
//             </span>
//           </h2>
//           <p className="text-gray-400 mt-2 text-center">
//             Upload a profile picture to personalize your experience.
//           </p>

//           {/* Profile Image Display */}
//           <div
//             className="relative w-44 h-44 mt-6 rounded-full overflow-hidden bg-dark-600 shadow-xl border-4 border-accent-200 flex items-center justify-center group transition-all duration-300 cursor-pointer"
//             onClick={handleImageClick}
//           >
//             {image ? (
//               // If user selected a file, show a preview using `createObjectURL`
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="Profile"
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//             ) : (
//               // Else show 2-letter fallback
//               <div className="w-full h-full flex items-center justify-center text-dark-100 font-bold text-6xl bg-gradient-to-r from-accent-100 to-accent-200">
//                 {`${user?.me?.firstName?.charAt(0) || ""}${
//                   user?.me?.lastName?.charAt(0) || ""
//                 }`}
//               </div>
//             )}

//             {/* Hidden file input */}
//             <input
//               type="file"
//               accept="image/*"
//               ref={fileInputRef}
//               className="hidden"
//               onChange={handleImageChange}
//               disabled={isUploading}
//             />

//             {/* Camera overlay on hover */}
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300">
//               <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition duration-300" />
//             </div>

//             {/* Loading overlay if uploading */}
//             {isUploading && (
//               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white font-medium">
//                 <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
//                 Uploading...
//               </div>
//             )}
//           </div>

//           {/* Username or name under the image */}
//           <div className="mt-6 text-center">
//             <h3 className="text-2xl font-semibold">
//               {user?.me?.firstName} {user?.me?.lastName}
//             </h3>
//             <p className="text-gray-500">Your Profile Name</p>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-6">
//             {image && (
//               <button
//                 className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-600 transition-all flex items-center gap-2"
//                 onClick={handleRemoveImage}
//                 disabled={isUploading}
//               >
//                 <XCircle className="w-5 h-5" />
//                 Remove
//               </button>
//             )}
//             <button
//               className="bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
//               disabled={isUploading}
//               onClick={handleSaveChanges}
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
import {
  Camera,
  XCircle,
  Check,
  User,
  Shield,
  Bell,
  Users,
  Key,
} from "lucide-react";
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
    // If user didn't choose an image, just navigate away
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

  // Get initials for avatar fallback
  const getInitials = () => {
    return `${user?.me?.firstName?.charAt(0) || ""}${
      user?.me?.lastName?.charAt(0) || ""
    }`;
  };

  // ─────────────────────────────────────────────────────────
  // 5. Render
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-800 via-dark-900 to-dark-950 px-4 py-10">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-accent-100/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl opacity-30"></div>

        {/* Particle effects */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30 animate-pulse-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-gradient-to-br from-dark-800 to-dark-900 shadow-2xl rounded-3xl overflow-hidden transition-all border border-dark-600">
        {/* Left / Form side */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-white">
          <div className="w-full max-w-md">
            {/* Title with animated underline */}
            <h2 className="text-3xl font-bold relative inline-block">
              <span className="bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
                Complete Your Profile
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              <span className="text-sm text-gray-400 font-normal ml-2">
                (Optional)
              </span>
            </h2>

            {/* UPDATED: App-specific description */}
            <p className="text-gray-400 mt-4 leading-relaxed">
              Add a profile picture to enhance your Sacred Secret experience.
            </p>

            {/* Profile Image Display */}
            <div className="mt-10 flex flex-col items-center">
              <div
                className="relative w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-accent-100/30 flex items-center justify-center group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-accent-100/70"
                onClick={handleImageClick}
              >
                {/* Profile image or placeholder */}
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-6xl bg-gradient-to-br from-accent-100/90 to-accent-200/90">
                    <span className="text-dark-900">{getInitials()}</span>
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

                {/* Overlay effect on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-dark-900/0 via-dark-900/60 to-dark-900/90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Camera className="w-10 h-10 text-white mb-2" />
                  <span className="text-sm font-medium text-white">
                    Choose Photo
                  </span>
                </div>

                {/* Loading overlay if uploading */}
                {isUploading && (
                  <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white font-medium z-10">
                    <div className="w-10 h-10 border-4 border-accent-100 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <span className="text-sm">Uploading...</span>
                  </div>
                )}

                {/* Pulsing ring effect around the profile picture */}
                <div className="absolute -inset-1 rounded-full border border-accent-100/30 animate-pulse-slow"></div>
              </div>

              {/* Username under the image */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {user?.me?.firstName} {user?.me?.lastName}
                </h3>
                <p className="text-gray-400 mt-1">
                  @{user?.me?.username || "username"}
                </p>
              </div>

              {/* Action buttons with enhanced styling */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-xs">
                {image && (
                  <button
                    className="flex-1 bg-dark-700 hover:bg-red-900/40 text-red-400 border border-red-500/30 px-5 py-3.5 rounded-xl font-medium shadow-inner hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    onClick={handleRemoveImage}
                    disabled={isUploading}
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Remove</span>
                  </button>
                )}

                <button
                  className={`flex-1 px-5 py-3.5 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2
                    ${
                      image
                        ? "bg-gradient-to-r from-accent-100 to-accent-200 text-dark-900 hover:from-accent-100/90 hover:to-accent-200/90"
                        : "bg-dark-700 text-white border border-accent-100/30 hover:bg-dark-600/80"
                    }`}
                  disabled={isUploading}
                  onClick={handleSaveChanges}
                >
                  {image ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Save Profile</span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      <span>Continue Without Photo</span>
                    </>
                  )}
                </button>
              </div>

              {/* Help text */}
              <p className="text-gray-500 text-xs mt-6 text-center max-w-xs">
                You can always update your profile picture later from your
                account settings.
              </p>
            </div>
          </div>
        </div>

        {/* Right / Image side - UPDATED WITH APP-SPECIFIC CONTENT */}
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          {/* Background image with tinted overlay for better contrast */}
          <div className="absolute inset-0 bg-dark-900/80"></div>
          <img
            src={authImages.verification}
            alt="Profile Background"
            className="w-full h-full object-cover scale-110 opacity-40"
          />

          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/85 to-dark-800/75" />

          {/* UPDATED: Content overlay with app-specific features */}
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-center">
            <div className="bg-dark-800/80 backdrop-blur-md p-8 rounded-2xl border border-accent-100/10 shadow-lg max-w-md transform transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-4">
                Your Security Platform
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Sacred Secret provides powerful tools to protect and manage your
                digital life. Personalize your experience to get started.
              </p>

              {/* UPDATED: App-specific features */}
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent-100/20 flex items-center justify-center mb-2">
                    <Key className="w-6 h-6 text-accent-100" />
                  </div>
                  <span className="text-xs text-gray-300">
                    Manage Credentials
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent-100/20 flex items-center justify-center mb-2">
                    <Bell className="w-6 h-6 text-accent-100" />
                  </div>
                  <span className="text-xs text-gray-300">
                    Smart Notifications
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent-100/20 flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-accent-100" />
                  </div>
                  <span className="text-xs text-gray-300">
                    Choose Your Nominee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
