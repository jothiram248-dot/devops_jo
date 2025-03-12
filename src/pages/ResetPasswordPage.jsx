// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import { useAuth } from '../hooks/useAuth';
// import { Eye, EyeOff } from 'lucide-react';

// const ResetPasswordPage = () => {
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();
//   const { resetPassword, loading } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const password = watch('password');

//   const onSubmit = async (data) => {
//     try {
//       await resetPassword({
//         email: data.email,
//         code: data.code,
//         newPassword: data.password
//       });
//     } catch (error) {
//       console.error('Reset password error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-dark-100 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-md w-full"
//       >
//         <div className="glow-box p-8">
//           <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//             Create New Password
//           </h2>
//           <p className="text-gray-300 mb-8">
//             Enter the code sent to your email and create a new password.
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Email Address
//               </label>
//               <input
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address"
//                   }
//                 })}
//                 type="email"
//                 className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Reset Code
//               </label>
//               <input
//                 {...register("code", {
//                   required: "Reset code is required",
//                   pattern: {
//                     value: /^\d{6}$/,
//                     message: "Code must be 6 digits"
//                   }
//                 })}
//                 type="text"
//                 maxLength={6}
//                 className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                 placeholder="Enter 6-digit code"
//               />
//               {errors.code && (
//                 <p className="mt-1 text-sm text-red-400">{errors.code.message}</p>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 New Password
//               </label>
//               <input
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters"
//                   },
//                   pattern: {
//                     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//                   }
//                 })}
//                 type={showPassword ? "text" : "password"}
//                 className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                 placeholder="Enter new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-9 text-gray-400 hover:text-white"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Confirm New Password
//               </label>
//               <input
//                 {...register("confirmPassword", {
//                   required: "Please confirm your password",
//                   validate: value => value === password || "Passwords do not match"
//                 })}
//                 type={showConfirmPassword ? "text" : "password"}
//                 className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                 placeholder="Confirm new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-9 text-gray-400 hover:text-white"
//               >
//                 {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//               {errors.confirmPassword && (
//                 <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//             >
//               {loading ? 'Resetting...' : 'Reset Password'}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ResetPasswordPage;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import { Eye, EyeOff } from "lucide-react";
// import { useForgotResetPassMutation } from "@/features/api/userApiSlice";
// import toast from "react-hot-toast";
// import { useNavigate, useLocation } from "react-router-dom";

// const ResetPasswordPage = () => {
//   const { search } = useLocation(); // Access query params from the URL
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [forgotResetPassword, { isLoading }] = useForgotResetPassMutation();
//   const [loginId, setLoginId] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const password = watch("password");

//   const decryptQueryParam = (encryptedParam) => {
//     try {
//       const decodedString = atob(encryptedParam); // Base64 decode

//       return decodedString;
//     } catch (error) {
//       console.error("Failed to decrypt query parameter:", error);
//       return null;
//     }
//   };

//   const extractEmail = (data) => {
//     const parts = data.split(":");
//     console.log(parts[0], parts[1], parts[2], parts[3]);
//     return parts[1];
//   };

//   useEffect(() => {
//     const params = new URLSearchParams(search);
//     const encryptedAuth = params.get("auth");
//     if (!encryptedAuth) {
//       navigate("/signin");
//     }

//     if (encryptedAuth) {
//       const decryptedAuth = decryptQueryParam(encryptedAuth);
//       if (!extractEmail) {
//         navigate("/signin");
//       }
//       const loginData = extractEmail(decryptedAuth);
//       setLoginId(loginData);
//     } else {
//       toast.error("Invalid or missing reset password token.");
//       navigate("/signin");
//     }
//   }, [search, navigate]);

//   // useEffect(() => {
//   //   // Extract query parameters
//   //   const queryParams = new URLSearchParams(location.search);
//   //   const auth = queryParams.get("auth");

//   //   if (!auth) {
//   //     navigate("/signin");
//   //     return;
//   //   }

//   //   try {
//   //     // Decrypt the auth string
//   //     const decryptData = atob(auth); // Replace with your decryption logic if different
//   //     const parts = decryptData.split(":");
//   //     const email = parts[1]; // Email is the second part

//   //     if (!email) {
//   //       navigate("/signin");
//   //     }
//   //   } catch (error) {
//   //     console.error("Invalid auth data:", error);
//   //     navigate("/signin");
//   //   }
//   // }, [location.search, navigate]);

//   const onSubmit = async (data) => {
//     try {
//       const response = await forgotResetPassword({
//         loginId,
//         code: data.code,
//         newPassword: data.password,
//       }).unwrap();

//       if (response.success) {
//         toast.success(
//           "Your password has been reset successfully! You can now log in.",
//           {
//             icon: "🎉",
//             style: {
//               borderRadius: "10px",
//               background: "#333",
//               color: "#fff",
//               padding: "16px",
//             },
//           }
//         );
//         navigate("/signin");
//       } else {
//         toast.error(response.error || "Failed to reset the password.");
//       }
//     } catch (error) {
//       toast.error(
//         error?.data?.error || "An error occurred. Please try again later."
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-dark-100 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-md w-full"
//       >
//         <div className="p-8 bg-dark-200 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//             Reset Your Password
//           </h2>
//           <p className="text-gray-300 mb-8">
//             Enter the OTP sent to your email and create a new password.
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Reset Code
//               </label>
//               <input
//                 {...register("code", {
//                   required: "Reset code is required",
//                   pattern: {
//                     value: /^\d{6}$/,
//                     message: "Code must be 6 digits",
//                   },
//                 })}
//                 type="text"
//                 maxLength={6}
//                 className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-400 text-white focus:outline-none focus:border-accent-100"
//                 placeholder="Enter 6-digit code"
//               />
//               {errors.code && (
//                 <p className="mt-1 text-sm text-red-400">
//                   {errors.code.message}
//                 </p>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 New Password
//               </label>
//               <input
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters",
//                   },
//                   pattern: {
//                     value:
//                       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     message:
//                       "Password must include uppercase, lowercase, number, and special character",
//                   },
//                 })}
//                 type={showPassword ? "text" : "password"}
//                 className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-400 text-white focus:outline-none focus:border-accent-100"
//                 placeholder="Enter new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-9 text-gray-400 hover:text-white"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-400">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Confirm New Password
//               </label>
//               <input
//                 {...register("confirmPassword", {
//                   required: "Please confirm your password",
//                   validate: (value) =>
//                     value === password || "Passwords do not match",
//                 })}
//                 type={showConfirmPassword ? "text" : "password"}
//                 className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-400 text-white focus:outline-none focus:border-accent-100"
//                 placeholder="Confirm new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-9 text-gray-400 hover:text-white"
//               >
//                 {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//               {errors.confirmPassword && (
//                 <p className="mt-1 text-sm text-red-400">
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//             >
//               {isLoading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ResetPasswordPage;

//v3

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useForgotResetPassMutation } from "@/features/api/userApiSlice";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

// Token validation function
const validateResetPasswordToken = (token) => {
  try {
    const decodedData = atob(token); // Decode Base64 token
    const [randomStart, loginId, expirationTime, randomEnd] =
      decodedData.split(":");
    const isExpired = Date.now() > parseInt(expirationTime, 10);
    return {
      isValid: !isExpired,
      isExpired,
      loginId,
      expirationTime: parseInt(expirationTime, 10),
    };
  } catch (error) {
    return {
      isValid: false,
      isExpired: true,
      message: "Invalid reset password token",
    };
  }
};

const ResetPasswordPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [forgotResetPassword, { isLoading }] = useForgotResetPassMutation();
  const [loginId, setLoginId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("auth");

    if (!token) {
      toast.error("Missing reset password token.");
      navigate("/signin");
      return;
    }

    const {
      isValid,
      isExpired,
      loginId: extractedLoginId,
      message,
    } = validateResetPasswordToken(token);
    if (!extractedLoginId) {
      navigate("/signin");
    }

    if (!isValid) {
      if (isExpired) {
        toast.error(
          "Reset password link has expired. Please request a new one."
        );
        navigate("/forgot-password", {
          state: { message: isExpired },
        });
      } else {
        toast.error(message || "Invalid reset password token.");
        navigate("/signin");
      }
      return;
    }

    setLoginId(extractedLoginId);
  }, [search, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await forgotResetPassword({
        loginId,
        code: data.code,
        newPassword: data.password,
      }).unwrap();

      if (response.success) {
        toast.success("Password reset successfully! You can now log in.", {
          icon: "🎉",
        });
        navigate("/signin");
      } else {
        toast.error(response.error || "Failed to reset the password.");
      }
    } catch (error) {
      toast.error(
        error?.data?.error || "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="p-8 bg-dark-200 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Reset Your Password
          </h2>
          <p className="text-gray-300 mb-8">
            Enter the OTP sent to your email and create a new password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Reset Code
              </label>
              <input
                {...register("code", {
                  required: "Reset code is required",
                  pattern: {
                    value: /^\d{4}$/,
                    message: "Code must be 4 digits",
                  },
                })}
                type="text"
                maxLength={4}
                className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-400 text-white focus:outline-none focus:border-accent-100"
                placeholder="Enter 4-digit code"
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.code.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-400 text-white focus:outline-none focus:border-accent-100"
                placeholder="Enter new password"
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
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-400 text-white focus:outline-none focus:border-accent-100"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
