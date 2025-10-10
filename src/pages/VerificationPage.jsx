// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   useVerifyMutation,
//   useCodeMutation,
// } from "@/features/api/userApiSlice";
// import { authImages } from "../assets/images/auth";
// import { useDispatch, useSelector } from "react-redux";

// import { toast } from "react-hot-toast";
// import { setCredentials } from "@/features/auth/authSlice";

// const VerificationPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // API hooks for verifying and resending the code
//   const [verifyCode, { isLoading: isVerifying }] = useVerifyMutation();
//   const [resendCode, { isLoading: isResending }] = useCodeMutation();
//   const verificationData = useSelector((state) => state.auth.loginIdUsername);

//   // States for verification code, timer, and user info
//   // const [verificationCode, setVerificationCode] = useState([
//   //   "",
//   //   "",
//   //   "",
//   //   "",
//   //   "",
//   //   "",
//   // ]);
//   const [verificationCode, setVerificationCode] = useState(["", "", "", ""]); // 4 digits
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
//   const [resendDisabled, setResendDisabled] = useState(true); // Initially disabled

//   // const inputs = Array(6).fill(0);
//   const inputs = Array(4).fill(0);

//   useEffect(() => {
//     // Start countdown timer
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setResendDisabled(false); // Enable resend button after timer ends
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer); // Cleanup on unmount
//   }, []);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
//   };

//   const handleChange = (index, value) => {
//     if (value.length <= 1) {
//       const newCode = [...verificationCode];
//       newCode[index] = value;
//       setVerificationCode(newCode);

//       // Auto-focus next input
//       if (value && index < 5) {
//         const nextInput = document.querySelector(
//           `input[name=code-${index + 1}]`
//         );
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
//       const prevInput = document.querySelector(`input[name=code-${index - 1}]`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const code = verificationCode.join(""); // Combine the 6-digit code into a string

//   //   if (code.length === 6) {
//   //     try {
//   //       const response = await verifyCode({
//   //         loginId: verificationData,
//   //         code,
//   //       }).unwrap();

//   //       if (response.message?.includes("successfully")) {
//   //         toast.success("Verification successful!");
//   //         if (response.token) {
//   //           dispatch(setCredentials({ token: response.token }));
//   //           navigate("/verification-success");
//   //         } else navigate("/signin");
//   //       } else {
//   //         toast.error(response.message || "Verification failed.");
//   //       }
//   //     } catch (error) {
//   //       console.error("Verification error:", error);
//   //       toast.error(
//   //         error?.data?.message || "Error verifying the code. Please try again."
//   //       );
//   //     }
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const code = verificationCode.join(""); // Combine the 4-digit code

//     if (code.length === 4) {
//       try {
//         const response = await verifyCode({
//           loginId: verificationData,
//           code,
//         }).unwrap();

//         if (response.message?.includes("successfully")) {
//           toast.success("Verification successful!");
//           if (response.token) {
//             // dispatch(setCredentials({ token: response.token }));
//             dispatch(
//               setCredentials({
//                 token: response.token,
//                 controlSignature: response["control-signature"],
//                 hashToken: response["hash-token"],
//               })
//             );

//             navigate("/verification-success");
//           } else navigate("/signin");
//         } else {
//           toast.error(response.message || "Verification failed.");
//         }
//       } catch (error) {
//         console.error("Verification error:", error);
//         toast.error(
//           error?.data?.message || "Error verifying the code. Please try again."
//         );
//       }
//     }
//   };

//   const handleResendCode = async () => {
//     if (!resendDisabled) {
//       try {
//         const response = await resendCode({
//           loginId: verificationData,
//         }).unwrap();
//         toast.success("Verification code resent successfully!");
//         setVerificationCode(["", "", "", "", "", ""]); // Clear previous inputs
//         setTimeLeft(300); // Reset timer to 5 minutes
//         setResendDisabled(true); // Disable the resend button again
//       } catch (error) {
//         console.error("Resend code error:", error);
//         toast.error(
//           error?.data?.message || "Error resending the code. Please try again."
//         );
//       }
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
//         <div className="max-w-md mx-auto">
//           <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//             Verify Your Email
//           </h2>
//           <p className="text-gray-300 mb-8">
//             Please enter the 4-digit code sent to your registered email address.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* <div className="flex justify-between">
//               {inputs.map((_, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   name={`code-${index}`}
//                   maxLength={1}
//                   value={verificationCode[index]}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   className="w-12 h-12 text-center text-2xl rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                 />
//               ))}
//             </div> */}
//             <div className="flex justify-center space-x-4">
//               {inputs.map((_, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   name={`code-${index}`}
//                   maxLength={1}
//                   value={verificationCode[index]}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, ""); // Allow only digits
//                     handleChange(index, value);
//                   }}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   inputMode="numeric"
//                   pattern="[0-9]*" // Allow only digits on virtual keyboards
//                   className="w-16 h-16 text-center text-3xl rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:ring-2 focus:ring-accent-100 transition-all duration-300"
//                 />
//               ))}
//             </div>

//             <div className="text-center">
//               <p className="text-gray-300 mb-4">
//                 Time remaining:{" "}
//                 <span className="text-accent-100">{formatTime(timeLeft)}</span>
//               </p>
//               <button
//                 type="button"
//                 onClick={handleResendCode}
//                 disabled={resendDisabled || isResending}
//                 className="text-accent-100 hover:text-accent-200 transition-colors disabled:opacity-50"
//               >
//                 {isResending ? "Resending..." : "Resend Code"}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={isVerifying || verificationCode.some((v) => !v)}
//               className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//             >
//               {isVerifying ? "Verifying..." : "Verify"}
//             </button>
//           </form>
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
//             src={authImages.verification}
//             alt="Verification"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default VerificationPage;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  useVerifyMutation,
  useCodeMutation,
} from "@/features/api/userApiSlice";
import { authImages } from "../assets/images/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setCredentials } from "@/features/auth/authSlice";
import CryptoJS from "crypto-js";
const secretKey = import.meta.env.VITE_AES_SECRET_KEY;

const VerificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { encryptedEmail } = useParams();

  // ── 2) Decrypt the email. If it fails, handle gracefully. ──
  let decryptedEmail = "";
  try {
    const bytes = CryptoJS.AES.decrypt(
      decodeURIComponent(encryptedEmail),
      secretKey
    );
    decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    toast.error("Invalid or tampered link.");
    // Optionally navigate away or handle error
  }
  // Assume verificationData now has { loginId, email, phone }
  const verificationData =
    useSelector((state) => state.auth.loginIdUsername) || decryptedEmail;
  // For example: { loginId: "user123", email: "user@example.com", phone: "+1234567890" }

  // API hooks for verifying and resending the code
  const [verifyCode, { isLoading: isVerifying }] = useVerifyMutation();
  const [resendCode, { isLoading: isResending }] = useCodeMutation();

  // Step state: 1 for email verification, 2 for mobile (SMS) verification
  const [step, setStep] = useState(1);
  // State to track that the email has been verified
  const [emailVerified, setEmailVerified] = useState(false);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // OTP state for code input (4 digits)
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);

  // Timer and resend states
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true);

  // Array used to render 4 inputs
  const inputs = Array(4).fill(0);

  // (Re)start timer every time the step changes
  useEffect(() => {
    setTimeLeft(300);
    setResendDisabled(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  // Helper to format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle changes for each OTP input
  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...otpCode];
      newCode[index] = value;
      setOtpCode(newCode);

      // Auto-focus next input if available
      if (value && index < inputs.length - 1) {
        const nextInput = document.querySelector(
          `input[name=code-${index + 1}]`
        );
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle Backspace to move focus back
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=code-${index - 1}]`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle OTP form submission with updated API payload and response handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otpCode.join("");

    if (code.length === 4) {
      try {
        let response;
        if (step === 1) {
          // Email verification step: pass service as "email"
          response = await verifyCode({
            loginId: verificationData,
            code,
            service: "email",
          }).unwrap();

          if (response.message?.emailVerifyStatus) {
            toast.success("Email verified successfully!");
            setEmailVerified(true);

            // Show the animated modal
            setShowModal(true);
            // Auto-close modal after 2 seconds
            setTimeout(() => setShowModal(false), 2000);

            // If the phone is not verified, automatically trigger the SMS OTP
            if (!response.message.phoneVerifyStatus) {
              try {
                await resendCode({
                  loginId: verificationData,
                  service: "sms",
                }).unwrap();
                toast.success("OTP sent to your mobile");
              } catch (error) {
                console.error("Resend SMS OTP error:", error);
                toast.error("Error sending OTP to mobile. Please try again.");
              }
            }

            // Move to mobile (SMS) verification step
            setStep(2);
            setOtpCode(["", "", "", ""]);
          } else {
            toast.error("Email verification failed.");
          }
        } else if (step === 2) {
          // Mobile verification step: use service "phone" to verify the OTP sent to the phone
          response = await verifyCode({
            loginId: verificationData,
            code,
            service: "phone",
          }).unwrap();

          // Check if mobile verification is successful by either:
          // 1. A truthy phoneVerifyStatus property, or
          // 2. A message string that includes the expected success text.
          const isMobileVerified =
            response.message?.phoneVerifyStatus ||
            (typeof response.message === "string" &&
              response.message.includes("OTP verified successfully") &&
              response.message.includes("User activated successfully"));

          if (isMobileVerified) {
            toast.success("Mobile verified successfully!");
            if (response.token) {
              dispatch(
                setCredentials({
                  token: response.token,
                  controlSignature: response["control-signature"],
                  hashToken: response["hash-token"],
                })
              );
              navigate("/verification-success");
            } else {
              navigate("/signin");
            }
          } else {
            toast.error("Mobile verification failed.");
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(
          error?.data?.message || "Error verifying the code. Please try again."
        );
      }
    }
  };

  // Handle resending the OTP code with updated service param and additional data
  const handleResendCode = async () => {
    if (!resendDisabled) {
      try {
        await resendCode({
          loginId: verificationData,
          service: step === 1 ? "email" : "sms",
          verificationData,
        }).unwrap();
        toast.success("Verification code resent successfully!");
        setOtpCode(["", "", "", ""]); // Clear previous inputs
        setTimeLeft(300); // Reset timer
        setResendDisabled(true);
      } catch (error) {
        console.error("Resend code error:", error);
        toast.error(
          error?.data?.message || "Error resending the code. Please try again."
        );
      }
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative bg-white rounded-xl p-10 shadow-2xl border border-gray-200 w-80 max-w-sm mx-auto"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Icon */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
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

              {/* Animated Check Mark */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-green-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
              </svg>

              {/* Text Content */}
              <h3 className="mt-6 text-2xl font-bold text-green-600 text-center">
                Email Verified
              </h3>
              <p className="mt-2 text-center text-gray-600">
                Your email has been successfully verified. Please verify your
                mobile number now.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-8 md:p-16 bg-dark-100"
        >
          <div className="max-w-md mx-auto">
            <h2
              className="text-3xl font-bold mb-6 bg-gradient-to-r 
                         from-accent-100 to-accent-200 bg-clip-text text-transparent"
            >
              {step === 1 ? "Verify Your Email" : "Verify Your Mobile"}
            </h2>

            <p className="text-gray-300 mb-8">
              {step === 1
                ? "Please enter the 4-digit code sent to your registered email address."
                : "Please enter the 4-digit code sent to your registered mobile number."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-4">
                {inputs.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`code-${index}`}
                    maxLength={1}
                    value={otpCode[index]}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleChange(index, value);
                    }}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-16 h-16 text-center text-3xl rounded-lg 
                               bg-dark-200 border border-dark-300 text-white 
                               focus:outline-none focus:ring-2 focus:ring-accent-100 
                               transition-all duration-300"
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-gray-300 mb-4">
                  Time remaining:{" "}
                  <span className="text-accent-100">
                    {formatTime(timeLeft)}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendDisabled || isResending}
                  className="text-accent-100 hover:text-accent-200 transition-colors disabled:opacity-50"
                >
                  {isResending ? "Resending..." : "Resend Code"}
                </button>
              </div>

              <button
                type="submit"
                disabled={isVerifying || otpCode.some((v) => !v)}
                className="w-full py-3 px-4 rounded-lg 
                           bg-gradient-to-r from-accent-100 to-accent-200 
                           text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block w-1/2 relative"
        >
          <div className="absolute inset-0">
            <img
              src={authImages.verification}
              alt="Verification"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default VerificationPage;
