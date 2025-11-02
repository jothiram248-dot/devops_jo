
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { authImages } from "../assets/images/auth";
// import { authContent } from "../assets/content/auth";
// import { useRegisterMutation } from "@/features/api/userApiSlice";
// import toast from "react-hot-toast";
// import { setloginId } from "@/features/auth/authSlice";
// import { useDispatch } from "react-redux";
// import CustomToast from "@/components/CustomToast";
// import { FaWhatsapp } from "react-icons/fa";
// import CryptoJS from "crypto-js";

// const secretKey = import.meta.env.VITE_AES_SECRET_KEY;

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [registerUser, { isLoading: loading }] = useRegisterMutation();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
//   const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
//   const [toastData, setToastData] = useState({ message: "", type: "" });
//   const content = authContent.signUp;

//   const password = watch("password", "");

//   const passwordCriteria = [
//     { label: "At least 8 characters", test: (value) => value.length >= 8 },
//     { label: "Contains uppercase letter", test: (value) => /[A-Z]/.test(value) },
//     { label: "Contains lowercase letter", test: (value) => /[a-z]/.test(value) },
//     { label: "Contains number", test: (value) => /\d/.test(value) },
//     {
//       label: "Contains special character",
//       test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
//     },
//   ];

//   // Custom error message mappings
// const customErrorMessages = {
//   username: {
//     "must only contain alpha-numeric characters": "Username must contain alpha-numeric characters and cannot be an email ID.",
//     "must only contain alphanumeric characters": "Username must contain alpha-numeric characters and cannot be an email ID.",
//   },
//   // Add more custom mappings as needed
// };

// const mapCustomErrorMessage = (field, message) => {
//   const fieldMappings = customErrorMessages[field.toLowerCase()];
//   if (!fieldMappings) return message;
  
//   // Check if the message matches any of our custom mappings
//   for (const [key, customMsg] of Object.entries(fieldMappings)) {
//     if (message.toLowerCase().includes(key.toLowerCase())) {
//       return customMsg;
//     }
//   }
  
//   return message;
// };

// // --- Error helpers (replace your existing versions) ---
// const normalizeErrorMessage = (err) => {
//   if (!err) return null;

//   // RTK Query style
//   if (err?.data?.message) return err.data.message;
//   if (err?.data?.error) return err.data.error;

//   // Plain object
//   if (err?.message) return err.message;
//   if (err?.error) return err.error;

//   // Raw response as string (try JSON parse)
//   if (typeof err === "string") {
//     try {
//       const parsed = JSON.parse(err);
//       return parsed?.message || parsed?.error || err;
//     } catch {
//       return err;
//     }
//   }

//   return null;
// };

// const extractValidationDetails = (err) => {
//   // Supports Joi-like: { message: "...", details: [{ message, path, context }] }
//   const details =
//     err?.data?.details ||
//     err?.details ||
//     (typeof err === "string"
//       ? (() => {
//           try {
//             const parsed = JSON.parse(err);
//             return parsed?.details || null;
//           } catch {
//             return null;
//           }
//         })()
//       : null);

//   if (!Array.isArray(details) || details.length === 0) return [];

//   const cap = (s) => (typeof s === "string" && s.length ? s[0].toUpperCase() + s.slice(1) : s);
//   const tidy = (s) => (typeof s === "string" ? s.replace(/"/g, "").trim() : s);

//   return details.map((d) => {
//     const field =
//       d?.context?.label ||
//       (Array.isArray(d?.path) ? d.path.filter(Boolean).join(".") : d?.path) ||
//       "";
//     let msg = tidy(d?.message || "");

//     // If Joi prefixes the field name in the message, strip it for readability
//     if (field && msg.toLowerCase().startsWith(field.toLowerCase())) {
//       msg = msg.slice(field.length).trim();
//       // Remove leading words like "must", punctuation duplication, etc.
//       msg = msg.replace(/^[:\-–]\s*/, "");
//     }

//     msg = mapCustomErrorMessage(field, msg);

//     // Examples:
//     // field: "username", msg: "must only contain alpha-numeric characters"
//     return field ? `${cap(field)}: ${msg}` : msg;
//   });
// };

// const handleRegistrationError = (err) => {
//   // Base message
//   let base = normalizeErrorMessage(err);

//   // Prefer validation details when present
//   const lines = extractValidationDetails(err);

//   // Mongo duplicate key (raw error string from backend)
//   const raw = base || (typeof err === "string" ? err : "");
//   if (typeof raw === "string" && raw.includes("E11000 duplicate key error")) {
//     const duplicateField = raw.match(/index:\s(.*?)\sdup key/);
//     const duplicateValue = raw.match(/dup key:\s\{.*"(.*)".*\}/);
//     if (duplicateField && duplicateValue) {
//       const fieldName = duplicateField[1].split("_")[0];
//       const value = duplicateValue[1];
//       const fieldNameData = fieldName === "phone" ? "phone number" : fieldName;
//       base = `The ${fieldName} "${value}" is already registered. Please use a different ${fieldNameData}.`;
//     }
//   }

//   // Final formatted message
//   let formatted = base || "Registration failed. Please try again.";
//   if (lines.length) {
//     // Show a clean, readable list (new lines will render if your toast allows)
//     formatted = `Please fix the following:\n• ${lines.join("\n• ")}`;
//   }

//   setToastData({ message: formatted, type: "error" });
// };
// // --- end helpers ---

  
//   const onSubmit = async (data) => {
//     try {
//       const userData = {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         username: data.username,
//         email: data.email,
//         phone: data.phone,
//         password: data.password,
//       };

//       const response = await registerUser(userData).unwrap();

//       if (response.user && response.user.id) {
//         setToastData({
//           message:
//             "Registration successful! Please check your email for verification code.",
//           type: "success",
//         });

//         dispatch(
//           setloginId({
//             email: response.user.email,
//             username: response.user.username,
//           })
//         );

//         // 1) Encrypt the user email using CryptoJS
//         const encryptedEmail = CryptoJS.AES.encrypt(
//           response.user.email,
//           secretKey
//         ).toString();

//         // 2) Encode it so it can be safely used in a URL
//         const encodedEmail = encodeURIComponent(encryptedEmail);

//         // 3) Navigate to /verify/:encryptedEmail
//         navigate(`/verify/${encodedEmail}`);
//       } else {
//         console.log("Registration failed:", response.error);
//         handleRegistrationError(response);
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       handleRegistrationError(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* LEFT: Registration Form */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full md:w-1/2 p-8 md:p-16 bg-dark-100"
//       >
//         <div className="px-4">
//           <button
//             onClick={() => navigate("/")}
//             className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Home
//           </button>

//           <div className="max-w-md mx-auto">
//             <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//               {content.title}
//             </h2>
//             <p className="text-gray-300 mb-8">{content.subtitle}</p>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     First Name
//                   </label>
//                   <input
//                     {...register("firstName", {
//                       required: "First name is required",
//                     })}
//                     className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                     placeholder="First Name"
//                   />
//                   {errors.firstName && (
//                     <p className="mt-1 text-sm text-red-400">
//                       {errors.firstName.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Last Name
//                   </label>
//                   <input
//                     {...register("lastName", {
//                       required: "Last name is required",
//                     })}
//                     className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                     placeholder="Last Name"
//                   />
//                   {errors.lastName && (
//                     <p className="mt-1 text-sm text-red-400">
//                       {errors.lastName.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Username
//                 </label>
//                 <input
//                   {...register("username", {
//                     required: "Username is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="Username"
//                   minLength={3}
//                 />
//                 {errors.username && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.username.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="john@example.com"
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <FaWhatsapp
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
//                     size={20}
//                   />
//                   <input
//                     {...register("phone", {
//                       required: "WhatsApp number is required",
//                       pattern: {
//                         value: /^[0-9]{10}$/,
//                         message: "Phone number must be 10 digits",
//                       },
//                     })}
//                     className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                     placeholder="1234567784"
//                     maxLength={10}
//                     inputMode="numeric"
//                     onInput={(e) => {
//                       e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                     }}
//                     onFocus={() => setShowPhoneTooltip(true)}
//                     onBlur={() => setShowPhoneTooltip(false)}
//                   />
//                   {showPhoneTooltip && (
//                     <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 w-max bg-dark-300 text-white text-xs px-3 py-2 rounded shadow-lg z-50">
//                       Use your WhatsApp registered number.
//                       <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full border-8 border-transparent border-r-dark-300" />
//                     </div>
//                   )}
//                 </div>
//                 {errors.phone && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.phone.message}
//                   </p>
//                 )}
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Password
//                 </label>
//                 <input
//                   {...register("password", {
//                     required: "Password is required",
//                     validate: (value) => {
//                       const failedCriteria = passwordCriteria.filter(
//                         (c) => !c.test(value)
//                       );
//                       return (
//                         failedCriteria.length === 0 ||
//                         "Password must meet all criteria below"
//                       );
//                     },
//                   })}
//                   type={showPassword ? "text" : "password"}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="Enter password"
//                   onFocus={() => setShowPasswordTooltip(true)}
//                   onBlur={() => setShowPasswordTooltip(false)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-9 text-gray-400 hover:text-white"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.password.message}
//                   </p>
//                 )}
//                 {showPasswordTooltip && (
//                   <div className="absolute top-full left-0 mt-2 w-full bg-dark-200 border border-dark-300 rounded-lg shadow-lg p-4 z-10">
//                     <p className="text-sm font-medium text-gray-300 mb-2">
//                       Password must contain:
//                     </p>
//                     {passwordCriteria.map((criteria, index) => (
//                       <div key={index} className="flex items-center space-x-2">
//                         {criteria.test(password) ? (
//                           <Check className="w-4 h-4 text-green-500" />
//                         ) : (
//                           <X className="w-4 h-4 text-red-500" />
//                         )}
//                         <span
//                           className={`text-sm ${
//                             criteria.test(password)
//                               ? "text-green-500"
//                               : "text-gray-400"
//                           }`}
//                         >
//                           {criteria.label}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Confirm Password
//                 </label>
//                 <input
//                   {...register("confirmPassword", {
//                     required: "Please confirm your password",
//                     validate: (value) =>
//                       value === password || "Passwords do not match",
//                   })}
//                   type={showConfirmPassword ? "text" : "password"}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="Confirm password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowConfirmPassword(!showConfirmPassword)
//                   }
//                   className="absolute right-3 top-9 text-gray-400 hover:text-white"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff size={20} />
//                   ) : (
//                     <Eye size={20} />
//                   )}
//                 </button>
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//               >
//                 {loading ? "Creating Account..." : "Register"}
//               </button>

//               <p className="text-center text-gray-300">
//                 Already have an account?{" "}
//                 <Link
//                   to="/signin"
//                   className="text-accent-100 hover:text-accent-200 transition-colors"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </motion.div>

//       {/* RIGHT: SacredSecret Logo Panel (Fixed) */}
//       <motion.div
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="hidden md:block w-1/2 fixed right-0 top-0 h-screen"
//       >
//         <div className="absolute inset-0">
//           <div
//             className="w-full h-full bg-blue-50 border-2 border-gray-200 rounded-bl-[200px] bg-contain bg-no-repeat bg-center"
//             style={{ backgroundImage: "url('/SacredSecret logo color-01.svg')" }}
//           />
//         </div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           {/* <div className="text-center p-8">
//             <h2 className="text-4xl font-bold mb-4 text-white">
//               {content.rightPanelTitle}
//             </h2>
//             <p className="text-xl text-gray-300">{content.rightPanelText}</p>
//           </div> */}
//         </div>
//       </motion.div>

//       {toastData.message && (
//         <CustomToast
//           type={toastData.type}
//           message={toastData.message}
//           onClose={() => setToastData({ message: "", type: "" })}
//         />
//       )}
//     </div>
//   );
// };

// export default SignUpPage;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { authImages } from "../assets/images/auth";
import { authContent } from "../assets/content/auth";
import { useRegisterMutation } from "@/features/api/userApiSlice";
import toast from "react-hot-toast";
import { setloginId } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import CustomToast from "@/components/CustomToast";
import { FaWhatsapp } from "react-icons/fa";
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_AES_SECRET_KEY;

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading: loading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [toastData, setToastData] = useState({ message: "", type: "" });
  const [usernameError, setUsernameError] = useState(""); // Real-time username error
  const content = authContent.signUp;

  const password = watch("password", "");
  const username = watch("username", "");

  // Username validation regex - only alphanumeric, no special chars, no email format
  const validateUsername = (value) => {
    if (!value) return true; // Let required validation handle empty
    
    // Check if it looks like an email
    if (value.includes('@') || value.includes('.com') || value.includes('.')) {
      return false;
    }
    
    // Only allow alphanumeric characters (letters and numbers)
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(value);
  };

  // Real-time username validation
  React.useEffect(() => {
    if (username && username.length > 0) {
      if (!validateUsername(username)) {
        setUsernameError('Username must contain only "Alphabets and Numbers", and cannot be an email ID');
      } else {
        setUsernameError("");
      }
    } else {
      setUsernameError("");
    }
  }, [username]);

  const passwordCriteria = [
    { label: "At least 8 characters", test: (value) => value.length >= 8 },
    { label: "Contains uppercase letter", test: (value) => /[A-Z]/.test(value) },
    { label: "Contains lowercase letter", test: (value) => /[a-z]/.test(value) },
    { label: "Contains number", test: (value) => /\d/.test(value) },
    {
      label: "Contains special character",
      test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    },
  ];

  // Custom error message mappings
  const customErrorMessages = {
    username: {
      "must only contain alpha-numeric characters": "Username must contain alpha-numeric characters and cannot be an email ID.",
      "must only contain alphanumeric characters": "Username must contain alpha-numeric characters and cannot be an email ID.",
    },
  };

  const mapCustomErrorMessage = (field, message) => {
    const fieldMappings = customErrorMessages[field.toLowerCase()];
    if (!fieldMappings) return message;
    
    for (const [key, customMsg] of Object.entries(fieldMappings)) {
      if (message.toLowerCase().includes(key.toLowerCase())) {
        return customMsg;
      }
    }
    
    return message;
  };

  const normalizeErrorMessage = (err) => {
    if (!err) return null;
    if (err?.data?.message) return err.data.message;
    if (err?.data?.error) return err.data.error;
    if (err?.message) return err.message;
    if (err?.error) return err.error;

    if (typeof err === "string") {
      try {
        const parsed = JSON.parse(err);
        return parsed?.message || parsed?.error || err;
      } catch {
        return err;
      }
    }

    return null;
  };

  const extractValidationDetails = (err) => {
    const details =
      err?.data?.details ||
      err?.details ||
      (typeof err === "string"
        ? (() => {
            try {
              const parsed = JSON.parse(err);
              return parsed?.details || null;
            } catch {
              return null;
            }
          })()
        : null);

    if (!Array.isArray(details) || details.length === 0) return [];

    const cap = (s) => (typeof s === "string" && s.length ? s[0].toUpperCase() + s.slice(1) : s);
    const tidy = (s) => (typeof s === "string" ? s.replace(/"/g, "").trim() : s);

    return details.map((d) => {
      const field =
        d?.context?.label ||
        (Array.isArray(d?.path) ? d.path.filter(Boolean).join(".") : d?.path) ||
        "";
      let msg = tidy(d?.message || "");

      if (field && msg.toLowerCase().startsWith(field.toLowerCase())) {
        msg = msg.slice(field.length).trim();
        msg = msg.replace(/^[:\-–]\s*/, "");
      }

      msg = mapCustomErrorMessage(field, msg);

      return field ? `${cap(field)}: ${msg}` : msg;
    });
  };

  const handleRegistrationError = (err) => {
    let base = normalizeErrorMessage(err);
    const lines = extractValidationDetails(err);

    const raw = base || (typeof err === "string" ? err : "");
    if (typeof raw === "string" && raw.includes("E11000 duplicate key error")) {
      const duplicateField = raw.match(/index:\s(.*?)\sdup key/);
      const duplicateValue = raw.match(/dup key:\s\{.*"(.*)".*\}/);
      if (duplicateField && duplicateValue) {
        const fieldName = duplicateField[1].split("_")[0];
        const value = duplicateValue[1];
        const fieldNameData = fieldName === "phone" ? "phone number" : fieldName;
        base = `The ${fieldName} "${value}" is already registered. Please use a different ${fieldNameData}.`;
      }
    }

    let formatted = base || "Registration failed. Please try again.";
    if (lines.length) {
      formatted = `Please fix the following:\n• ${lines.join("\n• ")}`;
    }

    setToastData({ message: formatted, type: "error" });
  };

  const onSubmit = async (data) => {
    // Prevent submission if username is invalid
    if (usernameError) {
      setToastData({ 
        message: 'Please fix the username error before submitting', 
        type: 'error' 
      });
      return;
    }

    try {
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

      const response = await registerUser(userData).unwrap();

      if (response.user && response.user.id) {
        setToastData({
          message:
            "Registration successful! Please check your email for verification code.",
          type: "success",
        });

        dispatch(
          setloginId({
            email: response.user.email,
            username: response.user.username,
          })
        );

        const encryptedEmail = CryptoJS.AES.encrypt(
          response.user.email,
          secretKey
        ).toString();

        const encodedEmail = encodeURIComponent(encryptedEmail);

        navigate(`/verify/${encodedEmail}`);
      } else {
        console.log("Registration failed:", response.error);
        handleRegistrationError(response);
      }
    } catch (error) {
      console.error("Registration error:", error);
      handleRegistrationError(error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT: Registration Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 p-8 md:p-16 bg-dark-100"
      >
        <div className="px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              {content.title}
            </h2>
            <p className="text-gray-300 mb-8">{content.subtitle}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters"
                    },
                    validate: {
                      alphanumeric: (value) => 
                        validateUsername(value) || 
                        'Username must contain only "Alphabets and Numbers", and cannot be an email ID'
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg bg-dark-200 border ${
                    usernameError ? 'border-red-500' : 'border-dark-300'
                  } text-white focus:outline-none focus:border-accent-100`}
                  placeholder="Username"
                />
                {/* Show real-time validation error */}
                {usernameError && (
                  <p className="mt-1 text-sm text-yellow-400">
                    {usernameError}
                  </p>
                )}
                {/* Show react-hook-form errors */}
                {errors.username && !usernameError && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <FaWhatsapp
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                    size={20}
                  />
                  <input
                    {...register("phone", {
                      required: "WhatsApp number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="1234567784"
                    maxLength={10}
                    inputMode="numeric"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    onFocus={() => setShowPhoneTooltip(true)}
                    onBlur={() => setShowPhoneTooltip(false)}
                  />
                  {showPhoneTooltip && (
                    <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 w-max bg-dark-300 text-white text-xs px-3 py-2 rounded shadow-lg z-50">
                      Use your WhatsApp registered number.
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full border-8 border-transparent border-r-dark-300" />
                    </div>
                  )}
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) => {
                      const failedCriteria = passwordCriteria.filter(
                        (c) => !c.test(value)
                      );
                      return (
                        failedCriteria.length === 0 ||
                        "Password must meet all criteria below"
                      );
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Enter password"
                  onFocus={() => setShowPasswordTooltip(true)}
                  onBlur={() => setShowPasswordTooltip(false)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
                {showPasswordTooltip && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-dark-200 border border-dark-300 rounded-lg shadow-lg p-4 z-10">
                    <p className="text-sm font-medium text-gray-300 mb-2">
                      Password must contain:
                    </p>
                    {passwordCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {criteria.test(password) ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm ${
                            criteria.test(password)
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        >
                          {criteria.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-9 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || usernameError}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>

              <p className="text-center text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-accent-100 hover:text-accent-200 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>

      {/* RIGHT: SacredSecret Logo Panel (Fixed) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block w-1/2 fixed right-0 top-0 h-screen"
      >
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-blue-50 border-2 border-gray-200 rounded-bl-[200px] bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: "url('/SacredSecret logo color-01.svg')" }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
        </div>
      </motion.div>

      {toastData.message && (
        <CustomToast
          type={toastData.type}
          message={toastData.message}
          onClose={() => setToastData({ message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default SignUpPage;