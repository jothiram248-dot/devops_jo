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

// const secretKey = "YOUR_SECRET_KEY";

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // const { register: registerUser, loading } = useAuth();
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
//   const [toast, setToast] = useState({ message: "", type: "" });
//   const content = authContent.signUp;

//   const password = watch("password", "");

//   const passwordCriteria = [
//     { label: "At least 8 characters", test: (value) => value.length >= 8 },
//     {
//       label: "Contains uppercase letter",
//       test: (value) => /[A-Z]/.test(value),
//     },
//     {
//       label: "Contains lowercase letter",
//       test: (value) => /[a-z]/.test(value),
//     },
//     { label: "Contains number", test: (value) => /\d/.test(value) },
//     {
//       label: "Contains special character",
//       test: (value) => /[!@#$%^&*(),.?\":{}|<>]/.test(value),
//     },
//   ];

//   const handleRegistrationError = (errorMessage) => {
//     let formattedMessage = "Registration failed. Please try again.";

//     if (errorMessage?.includes("E11000 duplicate key error")) {
//       const duplicateField = errorMessage.match(/index:\s(.*?)\sdup key/);
//       const duplicateValue = errorMessage.match(/dup key:\s\{.*"(.*)".*\}/);

//       if (duplicateField && duplicateValue) {
//         const fieldName = duplicateField[1].split("_")[0];
//         const value = duplicateValue[1];
//         const fieldNameData =
//           fieldName === "phone" ? "phone number" : fieldName;

//         formattedMessage = `The ${fieldName} "${value}" is already registered. Please use a different ${fieldNameData}.`;
//       }
//     }

//     setToast({ message: formattedMessage, type: "error" });
//   };

//   const onSubmit = async (data) => {
//     try {
//       const userData = {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         username: data.username,
//         email: data.email,
//         phone: data.phone,
//         // gender: data.gender,
//         password: data.password,
//       };

//       const response = await registerUser(userData).unwrap();

//       if (response.user && response.user.id) {
//         setToast({
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
//         // navigate("/verify");
//       } else {
//         console.log("Registration failed:", response.error);
//         handleRegistrationError(response.error);
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       // handleRegistrationError(error?.data?.error || error?.message);
//       handleRegistrationError(error?.data?.error || error?.message);

//       // setToast({
//       //   message: error?.data?.error || error?.message,
//       //   type: "error",
//       // });
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
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
//                 {/* Updated Phone Number Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Phone Number
//                   </label>
//                   <div className="relative">
//                     <FaWhatsapp
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
//                       size={20}
//                     />
//                     <input
//                       {...register("phone", {
//                         required: "WhatsApp number is required",
//                         pattern: {
//                           value: /^[0-9]{10}$/, // Regex for a 10-digit number
//                           message: "Phone number must be 10 digits",
//                         },
//                       })}
//                       className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                       placeholder="1234567784"
//                       maxLength={10}
//                       inputMode="numeric"
//                       onInput={(e) => {
//                         // Allow only numeric input
//                         e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                       }}
//                       onFocus={() => setShowPhoneTooltip(true)}
//                       onBlur={() => setShowPhoneTooltip(false)}
//                     />
//                     {showPhoneTooltip && (
//                       <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 w-max bg-dark-300 text-white text-xs px-3 py-2 rounded shadow-lg z-50">
//                         Use your WhatsApp registered number.
//                         {/* Arrow */}
//                         <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full border-8 border-transparent border-r-dark-300" />
//                       </div>
//                     )}
//                   </div>
//                   {errors.phone && (
//                     <p className="mt-1 text-sm text-red-400">
//                       {errors.phone.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     {...register("gender", { required: "Gender is required" })}
//                     className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   >
//                     <option value="">Select</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                   {errors.gender && (
//                     <p className="mt-1 text-sm text-red-400">
//                       {errors.gender.message}
//                     </p>
//                   )}
//                 </div> */}
//               </div>

//               {/* Password Field */}
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
//                 {/* Tooltip for password criteria */}
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
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

//       <motion.div
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="hidden md:block w-1/2 relative"
//       >
//         <div className="absolute inset-0">
//           <img
//             src={authImages.signUp}
//             alt={content.imageAlt}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center p-8">
//               <h2 className="text-4xl font-bold mb-4 text-white">
//                 {content.rightPanelTitle}
//               </h2>
//               <p className="text-xl text-gray-300">{content.rightPanelText}</p>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//       {toast.message && (
//         <CustomToast
//           type={toast.type}
//           message={toast.message}
//           onClose={() => setToast({ message: "", type: "" })}
//         />
//       )}
//     </div>
//   );
// };

// export default SignUpPage;




// new ui

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

const secretKey = "YOUR_SECRET_KEY";

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
  const content = authContent.signUp;

  const password = watch("password", "");

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

  const normalizeErrorMessage = (err) => {
    if (!err) return null;
  
    // If it's already a string, try to parse JSON first, else return as-is
    if (typeof err === "string") {
      try {
        const parsed = JSON.parse(err);
        if (parsed?.message) return parsed.message;
        if (parsed?.error) return parsed.error;
      } catch {
        // not JSON, use raw string
      }
      return err;
    }
  
    // Prefer message fields commonly returned by APIs/RTK Query
    return (
      err?.message ||
      err?.error ||
      err?.data?.message ||
      err?.data?.error ||
      null
    );
  };
  

  // const handleRegistrationError = (errorMessage) => {
  //   let formattedMessage = "Registration failed. Please try again.";

  //   if (errorMessage?.includes("E11000 duplicate key error")) {
  //     const duplicateField = errorMessage.match(/index:\s(.*?)\sdup key/);
  //     const duplicateValue = errorMessage.match(/dup key:\s\{.*"(.*)".*\}/);

  //     if (duplicateField && duplicateValue) {
  //       const fieldName = duplicateField[1].split("_")[0];
  //       const value = duplicateValue[1];
  //       const fieldNameData = fieldName === "phone" ? "phone number" : fieldName;

  //       formattedMessage = `The ${fieldName} "${value}" is already registered. Please use a different ${fieldNameData}.`;
  //     }
  //   }

  //   setToastData({ message: formattedMessage, type: "error" });
  // };
  
  const handleRegistrationError = (err) => {
    const msg = normalizeErrorMessage(err);
    let formattedMessage = msg || "Registration failed. Please try againn.";
  
    // Mongo duplicate key (if your backend passes raw error)
    if (typeof formattedMessage === "string" && formattedMessage.includes("E11000 duplicate key error")) {
      const duplicateField = formattedMessage.match(/index:\s(.*?)\sdup key/);
      const duplicateValue = formattedMessage.match(/dup key:\s\{.*"(.*)".*\}/);
      if (duplicateField && duplicateValue) {
        const fieldName = duplicateField[1].split("_")[0];
        const value = duplicateValue[1];
        const fieldNameData = fieldName === "phone" ? "phone number" : fieldName;
        formattedMessage = `The ${fieldName} "${value}" is already registered. Please use a different ${fieldNameData}.`;
      }
    }
  
    setToastData({ message: formattedMessage, type: "error" });
  };
  
  const onSubmit = async (data) => {
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

        // 1) Encrypt the user email using CryptoJS
        const encryptedEmail = CryptoJS.AES.encrypt(
          response.user.email,
          secretKey
        ).toString();

        // 2) Encode it so it can be safely used in a URL
        const encodedEmail = encodeURIComponent(encryptedEmail);

        // 3) Navigate to /verify/:encryptedEmail
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
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Username"
                  minLength={3}
                />
                {errors.username && (
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
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
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
          {/* <div className="text-center p-8">
            <h2 className="text-4xl font-bold mb-4 text-white">
              {content.rightPanelTitle}
            </h2>
            <p className="text-xl text-gray-300">{content.rightPanelText}</p>
          </div> */}
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
