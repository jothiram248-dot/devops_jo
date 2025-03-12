// import React from "react";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../hooks/useAuth";

// const ForgotPasswordPage = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { forgotPassword, loading } = useAuth();

//   const onSubmit = async (data) => {
//     try {
//       await forgotPassword(data.email);
//     } catch (error) {
//       console.error("Forgot password error:", error);
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
//             Reset Your Password
//           </h2>
//           <p className="text-gray-300 mb-8">
//             Enter your email address and we'll send you a code to reset your
//             password.
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
//                     message: "Invalid email address",
//                   },
//                 })}
//                 type="email"
//                 className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-400">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//             >
//               {loading ? "Sending..." : "Send Reset Code"}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ForgotPasswordPage;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useForgotPassMutation } from "@/features/api/userApiSlice";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgotPassword, { isLoading }] = useForgotPassMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.message) {
      setIsExpired(true);
      setShowModal(true);
    }
  }, [location.state]);
  const onSubmit = async (data) => {
    try {
      const response = await forgotPassword({ loginId: data.email }).unwrap();
      if (response.success) {
        setModalMessage(
          response.message ||
            "Reset link sent! Please check your email for further instructions."
        );
        setShowModal(true);
        setTimeout(() => {
          // setShowModal(false);
          navigate("/signin", { replace: true });
        }, 6000);
      } else {
        toast.error(
          <div>
            <p className="font-bold text-lg">Error!</p>
            <p className="text-sm text-gray-400">
              {response.message || "An error occurred."}
            </p>
            <p className="text-sm text-gray-400">{response.details?.message}</p>
          </div>,
          {
            icon: "⚠️",
            style: {
              borderRadius: "10px",
              background: "#2d3748",
              color: "#ffffff",
              padding: "16px",
            },
            duration: 5000,
          }
        );
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Error occurred. Please try again later."
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
            {isExpired ? "Oops! Link Expired" : "Forgot Your Password?"}
          </h2>
          <p className="text-gray-300 mb-8">
            {isExpired
              ? "Please enter your email address below to receive a new password reset link."
              : "Enter your email address, and we'll send you a code to reset your password."}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                type="email || text"
                className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-400 text-white focus:outline-none focus:border-accent-100"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-dark-200 to-dark-300 rounded-lg shadow-lg p-6 w-full max-w-md text-center"
          >
            <div className="flex flex-col items-center space-y-4">
              {/* Icon or Illustration */}
              <div className="w-16 h-16 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-8 h-8 text-dark-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m0 0a9 9 0 11-12.73 0A9 9 0 0112 3m0 0l4 4-4-4z"
                  />
                </svg>
              </div>

              {/* Header */}
              <h3 className="text-2xl font-bold text-accent-100">
                Reset Link Sent!
              </h3>

              {/* Message */}
              <p className="text-gray-300 text-sm">
                {modalMessage ||
                  "We’ve sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password."}
              </p>

              {/* CTA Button */}
              <button
                onClick={() => navigate("/signin", { replace: true })}
                className="mt-6 px-4 py-3 bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Go to Sign-In
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal for Success Message */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-300 rounded-lg shadow-lg p-6 w-80 text-center"
          >
            <h3 className="text-xl font-bold text-accent-100 mb-4">
              Reset Link Sent!
            </h3>
            <p className="text-gray-300">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-4 py-2 bg-accent-100 text-dark-100 rounded-lg hover:bg-accent-200 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )} */}
    </div>
  );
};

export default ForgotPasswordPage;
