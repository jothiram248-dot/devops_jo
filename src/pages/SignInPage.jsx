// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, ArrowLeft } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useLoginMutation, useMeQuery } from "@/features/api/userApiSlice"; // Adjust the path as needed
// import { toast } from "react-hot-toast";
// import { authImages } from "../assets/images/auth";
// import { authContent } from "../assets/content/auth";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "@/features/auth/authSlice";

// const SignInPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [login, { isLoading: loading }] = useLoginMutation();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { data: user } = useMeQuery();
//   const [showPassword, setShowPassword] = useState(false);
//   const content = authContent.signIn;

//   const onSubmit = async (data) => {
//     const requestPayload = {
//       login: data.email,
//       password: data.password,
//     };
//     try {
//       const response = await login(requestPayload).unwrap();
//       console.log(response);
//       toast.success("Login successful!");
//       dispatch(
//         setCredentials({
//           token: response.token,
//           controlSignature: response["control-signature"],
//           hashToken: response["hash-token"],
//         })
//       );

//       const from = location.state?.from || "/dashboard";
//       // navigate(from, { replace: true });
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error(error?.data?.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full md:w-1/2 px-8 md:px-16 bg-dark-100"
//       >
//         <div className="pt-16">
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
//                   placeholder="Enter your email"
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.email.message}
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
//                   })}
//                   type={showPassword ? "text" : "password"}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="Enter password"
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
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 rounded border-dark-300 text-accent-100 focus:ring-accent-100"
//                   />
//                   <span className="ml-2 text-sm text-gray-300">
//                     Remember me
//                   </span>
//                 </label>
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-accent-100 hover:text-accent-200 transition-colors"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//               >
//                 {loading ? "Signing in..." : "Sign In"}
//               </button>

//               <p className="text-center text-gray-300">
//                 Don't have an account?{" "}
//                 <Link
//                   to="/signup"
//                   state={{ from: location.state?.from }}
//                   className="text-accent-100 hover:text-accent-200 transition-colors"
//                 >
//                   Sign up
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
//             src={authImages.signIn}
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
//     </div>
//   );
// };

// export default SignInPage;


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  useLoginMutation,
  useCodeMutation,
  useVerifyMutation,
} from "@/features/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";

import { authImages } from "../assets/images/auth";
import { authContent } from "../assets/content/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // ───────────── RTK Hooks ─────────────
  const [login, { isLoading: loading }] = useLoginMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useCodeMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyMutation();

  // ───────────── React Hook Form ─────────────
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ───────────── States ─────────────
  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // “Not Verified” modal (red cross)
  const [showNotVerifiedModal, setShowNotVerifiedModal] = useState(false);
  const [notVerifiedMessage, setNotVerifiedMessage] = useState("");

  // User’s typed login (email or phone)
  const [userLogin, setUserLogin] = useState("");

  // “Verification” OTP modal
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  // Step 1 => email, Step 2 => phone
  const [verificationStep, setVerificationStep] = useState(1);

  // OTP code array
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);

  // Timer for re‐sending
  const [timeLeft, setTimeLeft] = useState(300);

  // ───────────── Effects ─────────────
  // If the verification modal is shown, start a countdown
  useEffect(() => {
    if (!showVerificationModal) {
      setTimeLeft(300);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showVerificationModal]);

  // ───────────── Helpers ─────────────
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ───────────── 1) On Submit => login attempt ─────────────
  const onSubmit = async (data) => {
    setUserLogin(data.email); // store typed login

    const requestPayload = {
      login: data.email,
      password: data.password,
    };

    try {
      const response = await login(requestPayload).unwrap();
  

      toast.success("Login successful!");
      dispatch(
        setCredentials({
          token: response.token,
          controlSignature: response["control-signature"],
          hashToken: response["hash-token"],
        })
      );

      const from = location.state?.from;
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      const msg = error?.data?.message?.toLowerCase() || "";
      if (msg.includes("not verified") || msg.includes("please verify")) {
        // Show the red cross modal
        setNotVerifiedMessage(error.data.message);
        setShowNotVerifiedModal(true);
      } else {
        toast.error(error?.data?.message || "Login failed. Please try again.");
      }
    }
  };

  // ───────────── 2) “Not Verified” modal => “Verify” button ─────────────
  const handleVerifyClick = async () => {
    // 1) Close the red cross modal
    setShowNotVerifiedModal(false);

    // 2) Figure out if it's phone or email
    let step = 1; // default = email
    const lowerMsg = notVerifiedMessage.toLowerCase();
    if (lowerMsg.includes("phone")) {
      step = 2; // phone
    }
    setVerificationStep(step);

    // 3) Send OTP
    const serviceType = step === 1 ? "email" : "sms";
    try {
      await sendOtp({
        loginId: userLogin,
        service: serviceType,
      }).unwrap();
      toast.success("OTP sent successfully!");
    } catch (err) {
      console.error("sendOtp error:", err);
      toast.error("Failed to send OTP. Please try again.");
      return;
    }

    // 4) Clear OTP array
    setOtpCode(["", "", "", ""]);

    // 5) Open the “Verification” OTP modal
    setShowVerificationModal(true);
  };

  // ───────────── 3) OTP Verification Flow ─────────────
  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newArr = [...otpCode];
      newArr[index] = value;
      setOtpCode(newArr);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otpCode.join("");
    if (code.length !== 4) {
      toast.error("Please enter a valid 4-digit code");
      return;
    }

    const service = verificationStep === 1 ? "email" : "phone";
    try {
      const response = await verifyOtp({
        loginId: userLogin,
        code,
        service,
      }).unwrap();
      console.log("OTP verify response:", response);

      // If verified => show success, store tokens if returned, etc.
      // For simplicity, assume user must re‐login, or do partial logic:
      if (service === "email") {
        toast.success("Email verified successfully!");
      } else {
        toast.success("Phone verified successfully!");
      }

      // Optionally store new token if returned in response
      if (response.token) {
        dispatch(
          setCredentials({
            token: response.token,
            controlSignature: response["control-signature"],
            hashToken: response["hash-token"],
          })
        );
      }

      // Close verification modal and either navigate or do something
      setShowVerificationModal(false);
      // Possibly force user to login again or go to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("OTP verification error:", err);
      toast.error(
        err?.data?.message || "OTP verification failed. Please try again."
      );
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0) return; // or any other condition
    const serviceType = verificationStep === 1 ? "email" : "sms";
    try {
      await sendOtp({ loginId: userLogin, service: serviceType }).unwrap();
      toast.success("OTP resent successfully!");
      setTimeLeft(300);
    } catch (err) {
      console.error("Resend OTP error:", err);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  // ───────────── Render ─────────────
  const content = authContent.signIn;

  return (
    <>
      {/* “Not Verified” (red cross) Modal */}
      <AnimatePresence>
        {showNotVerifiedModal && (
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-dark-200 text-white rounded-lg p-6 shadow-xl max-w-sm w-full border border-red-600"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowNotVerifiedModal(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Header */}
                <div className="mb-4 flex items-center space-x-2">
                  {/* Red Cross Icon */}
                  <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-red-400">
                    Not Verified
                  </h2>
                </div>

                {/* Body / Message */}
                <p className="text-sm text-gray-300 mb-6">
                  {notVerifiedMessage}
                </p>

                {/* Action Button */}
                <button
                  onClick={handleVerifyClick}
                  disabled={isSendingOtp}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md 
                     font-medium text-white transition disabled:opacity-50"
                >
                  {isSendingOtp ? "Sending OTP..." : "Verify"}
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </AnimatePresence>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showVerificationModal && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          >
            <div className="w-full md:w-1/2 p-8 md:p-16 bg-dark-100 rounded-lg shadow-xl">
              <div className="max-w-md mx-auto">
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <h2 className="text-3xl font-bold mb-6 text-center">
                  {verificationStep === 1
                    ? "Verify Your Email"
                    : "Verify Your Phone"}
                </h2>
                <p className="text-gray-300 mb-4 text-center">
                  {verificationStep === 1
                    ? "Please enter the 4-digit code sent to your email."
                    : "Please enter the 4-digit code sent to your phone."}
                </p>

                <div className="text-center text-gray-400 mb-4">
                  Time left:{" "}
                  <span className="font-semibold">{formatTime(timeLeft)}</span>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="flex justify-center space-x-4">
                    {otpCode.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        id={`otp-${index}`}
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          // Allow only a single digit 0-9
                          if (/^\d?$/.test(e.target.value)) {
                            const newArr = [...otpCode];
                            newArr[index] = e.target.value;
                            setOtpCode(newArr);
                  
                            // 2) Auto-focus the next box if this isn't the last
                            if (e.target.value && index < otpCode.length - 1) {
                              document.getElementById(`otp-${index + 1}`)?.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          // 3) If Backspace on empty input, move focus to the previous
                          if (e.key === "Backspace" && !otpCode[index] && index > 0) {
                            document.getElementById(`otp-${index - 1}`)?.focus();
                          }
                        }}
                        inputMode="numeric"
                        className="w-16 h-16 text-center text-3xl rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:ring-2 focus:ring-accent-100 transition-all duration-300"
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
      </AnimatePresence>

      {/* Main Sign In Layout */}
      <div className="min-h-screen flex">
        {/* LEFT: Sign In Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 px-8 md:px-16 bg-dark-100"
        >
          <div className="pt-16">
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
                {/* Email or Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "This field is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="Enter password"
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-dark-300 text-accent-100 focus:ring-accent-100"
                    />
                    <span className="ml-2 text-sm text-gray-300">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-accent-100 hover:text-accent-200 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>

                <p className="text-center text-gray-300">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    state={{ from: location.state?.from }}
                    className="text-accent-100 hover:text-accent-200 transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Image / Banner */}
        {/* <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block w-1/2 relative"
        >
          <div className="absolute inset-0">
            <img
              src={authImages.signIn}
              alt={content.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-4xl font-bold mb-4 text-white">
                  {content.rightPanelTitle}
                </h2>
                <p className="text-xl text-gray-300">
                  {content.rightPanelText}
                </p>
              </div>
            </div>
          </div>
        </motion.div> */}


        {/* new ui */}
        {/* RIGHT: SacredSecret Logo Design */}
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="hidden md:block w-1/2 relative bg-dark-100"
>
  <div className="absolute inset-0">
    <div
      className="w-full h-full bg-[#f4e7ee] border-2 border-gray-200 rounded-bl-[200px]  bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/SacredSecret logo color-01.svg')" }}
    />
  </div>
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center p-8">
      {/* <h2 className="text-4xl font-bold mb-4 text-gray-800">
        {content.rightPanelTitle}
      </h2>
      <p className="text-xl text-gray-600">
        {content.rightPanelText}
      </p> */}
    </div>
  </div>
</motion.div>

      </div>
    </>
  );
};

export default SignInPage;
