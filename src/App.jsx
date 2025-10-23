// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";
// import VoiceBot from "./components/VoiceBot";
// import ChatBot from "./components/ChatBot";
// import LandingPage from "./pages/LandingPage";
// import SignUpPage from "./pages/SignUpPage";
// import SignInPage from "./pages/SignInPage";
// import VerificationPage from "./pages/VerificationPage";
// import VerificationSuccessPage from "./pages/VerificationSuccessPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";
// import ProfilePage from "./pages/ProfilePage";
// import DashboardPage from "./pages/DashboardPage";
// import ContactPage from "./pages/ContactPage";
// import FeaturesPage from "./pages/FeaturesPage";
// import AboutPage from "./pages/AboutPage";
// import ManageCredentialsPage from "./pages/ManageCredentialsPage";
// import SmartNotificationsPage from "./pages/SmartNotificationsPage";
// import ChooseNomineePage from "./pages/ChooseNomineePage";
// import CredentialListPage from "./pages/credentials/CredentialListPage";
// import CredentialFormPage from "./pages/credentials/CredentialFormPage";
// import PaymentPage from "./pages/PaymentPage";
// import PaymentSuccessPage from "./pages/PaymentSuccessPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import NotificationListPage from "./pages/notifications/NotificationListPage";
// import NotificationFormPage from "./pages/notifications/NotificationFormPage";
// import NotificationDetailsPage from "./pages/notifications/NotificationDetailPage";
// import AgreementPage from "./pages/nominees/AgreementPage";
// import NomineeFormPage from "./pages/nominees/NomineeFormPage";
// import NomineeListPage from "./pages/nominees/NomineeListPage";
// import { match } from "path-to-regexp";
// import ProfileUpload from "./pages/ProfileImage";
// import HelpAssistant from "./components/HelpAssistant";

// function App() {
//   const hideNavbarPaths = [
//     "/signin",
//     "/signup",
//     "/verify/:encryptedEmail",
//     "/verification-success",
//     "/reset-password",
//     "/profileimage-upload",
//     "/nominees/:type/agreement",
//   ];
//   const voiceBotRef = React.useRef();
//   const location = useLocation();

//   const handleStartReading = () => {
//     if (voiceBotRef.current?.startReading) {
//       voiceBotRef.current.startReading();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-dark-100">
//       <div className="relative">
//         <div className="fixed inset-0 bg-gradient-dark opacity-50 pointer-events-none" />
//         <div className="relative z-10">
//           {!hideNavbarPaths.some((path) => {
//             const matcher = match(path, { decode: decodeURIComponent });
//             return matcher(location.pathname);
//           }) && <Navbar />}

//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/signup" element={<SignUpPage />} />
//             <Route path="/signin" element={<SignInPage />} />
//             <Route
//               path="/verify/:encryptedEmail"
//               element={<VerificationPage />}
//             />
//             <Route
//               path="/verification-success"
//               element={<VerificationSuccessPage />}
//             />
//             <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//             <Route path="/reset-password" element={<ResetPasswordPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/features" element={<FeaturesPage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route
//               path="/manage-credentials"
//               element={<ManageCredentialsPage />}
//             />
//             <Route
//               path="/smart-notifications"
//               element={<SmartNotificationsPage />}
//             />
//             <Route path="/choose-nominee" element={<ChooseNomineePage />} />

//             {/* Payment Routes */}
//             <Route path="/payment" element={<PaymentPage />} />
//             <Route path="/payment/success" element={<PaymentSuccessPage />} />

//             {/* Protected Routes */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <DashboardPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <ProfilePage />
//                   {/* <ProfileUpload /> */}
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profileimage-upload"
//               element={
//                 <ProtectedRoute>
//                   <ProfileUpload />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Credential Routes */}
//             <Route
//               path="/credentials/:type"
//               element={
//                 <ProtectedRoute>
//                   <CredentialListPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/credentials/:type/add"
//               element={
//                 <ProtectedRoute>
//                   <CredentialFormPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/credentials/:type/edit/:id"
//               element={
//                 <ProtectedRoute>
//                   <CredentialFormPage />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/notifications/:type"
//               element={
//                 <ProtectedRoute>
//                   <NotificationListPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/notifications/:type/add"
//               element={
//                 <ProtectedRoute>
//                   <NotificationFormPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/notifications/:type/:id/view"
//               element={
//                 <ProtectedRoute>
//                   <NotificationDetailsPage />
//                 </ProtectedRoute>
//               }
//             />

//             {/* // nominee */}

//             <Route
//               path="/nominees/:type"
//               element={
//                 <ProtectedRoute>
//                   {/* <NomineesListPage /> */}
//                   <NomineeListPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/nominees/:type/add"
//               element={
//                 <ProtectedRoute>
//                   <NomineeFormPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/nominees/:type/edit/:id"
//               element={
//                 <ProtectedRoute>
//                   <NomineeFormPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/nominees/:type/agreement"
//               element={
//                 <ProtectedRoute>
//                   <AgreementPage />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </div>

//       {/* Voice Bot */}
//       {/* <VoiceBot ref={voiceBotRef} /> */}

//       {/* Chat Bot */}
//       {/* <ChatBot onStartReading={handleStartReading} /> */}
//       <HelpAssistant />

//       <Toaster position="top-right" />
//     </div>
//   );
// }

// export default App;

// import React, { lazy, Suspense } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { match } from "path-to-regexp";
// import Navbar from "./components/Navbar";
// import HelpAssistant from "./components/HelpAssistant";
// import OrderHistory from "./pages/OrderHistory";
// import OrderDetailPage from "./pages/OrderDetailPage";

// const PremiumLoader = () => {
//   const [progress, setProgress] = useState(0);
//   const [loadingPhase, setLoadingPhase] = useState(0);
//   const loadingPhrases = [
//     "Initializing secure connection",
//     "Processing credentials",
//     "Preparing your assets",
//     "Almost there"
//   ];

//   // Progress animation
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (progress < 100) {
//         setProgress(prevProgress => {
//           const newProgress = prevProgress + (0.5 + Math.random() * 1.5);
//           // Update loading phase based on progress
//           if (newProgress > 25 && loadingPhase === 0) setLoadingPhase(1);
//           else if (newProgress > 60 && loadingPhase === 1) setLoadingPhase(2);
//           else if (newProgress > 85 && loadingPhase === 2) setLoadingPhase(3);
//           return Math.min(newProgress, 100);
//         });
//       }
//     }, 60);

//     return () => clearTimeout(timer);
//   }, [progress, loadingPhase]);

//   // Format percentage with leading zeros
//   const formattedProgress = progress.toFixed(1).padStart(5, ' ');

//   // Number of particles
//   const particles = Array(12).fill(0);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
//       {/* Dynamic background with subtle animation */}
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
//         animate={{
//           background: [
//             'radial-gradient(circle at 20% 30%, rgba(13, 16, 45, 1) 0%, rgba(7, 11, 25, 1) 70%, rgba(4, 7, 20, 1) 100%)',
//             'radial-gradient(circle at 30% 40%, rgba(13, 16, 45, 1) 0%, rgba(7, 11, 25, 1) 70%, rgba(4, 7, 20, 1) 100%)',
//             'radial-gradient(circle at 20% 30%, rgba(13, 16, 45, 1) 0%, rgba(7, 11, 25, 1) 70%, rgba(4, 7, 20, 1) 100%)'
//           ]
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       >
//         {/* Animated grid pattern */}
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, rgba(37, 38, 77, 0.05) 1px, transparent 1px),
//               linear-gradient(to bottom, rgba(37, 38, 77, 0.05) 1px, transparent 1px)
//             `,
//             backgroundSize: '80px 80px',
//             opacity: 0.4
//           }}
//         ></div>

//         {/* Subtle particles floating around */}
//         <div className="absolute inset-0 overflow-hidden">
//           {particles.map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 rounded-full bg-blue-500 opacity-20"
//               initial={{
//                 x: Math.random() * window.innerWidth,
//                 y: Math.random() * window.innerHeight,
//                 opacity: 0.1 + Math.random() * 0.3
//               }}
//               animate={{
//                 x: [null, Math.random() * window.innerWidth],
//                 y: [null, Math.random() * window.innerHeight],
//                 opacity: [0.1 + Math.random() * 0.3, 0.1, 0.3, 0.1]
//               }}
//               transition={{
//                 duration: 10 + Math.random() * 20,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//               style={{
//                 width: 1 + Math.random() * 2 + 'px',
//                 height: 1 + Math.random() * 2 + 'px',
//               }}
//             />
//           ))}
//         </div>
//       </motion.div>

//       {/* Main loader container with glass effect */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="relative z-10 flex flex-col items-center justify-center w-80 max-w-sm"
//       >
//         {/* Futuristic orbiting rings */}
//         <div className="relative w-36 h-36 mb-8">
//           {/* Glow effect behind the rings */}
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-blue-500/10 blur-xl"></div>

//           {/* Rotating rings with gradient effects */}
//           <motion.div
//             className="absolute inset-0 rounded-full border border-transparent"
//             style={{
//               background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.3), transparent)',
//               backgroundSize: '200% 100%',
//             }}
//             animate={{ rotate: 360 }}
//             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//           ></motion.div>

//           <motion.div
//             className="absolute inset-2 rounded-full border border-transparent"
//             style={{
//               background: 'linear-gradient(to right, transparent, rgba(99, 102, 241, 0.3), transparent)',
//               backgroundSize: '200% 100%',
//             }}
//             animate={{ rotate: -360 }}
//             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//           ></motion.div>

//           <motion.div
//             className="absolute inset-4 rounded-full border border-transparent"
//             style={{
//               background: 'linear-gradient(to right, transparent, rgba(139, 92, 246, 0.3), transparent)',
//               backgroundSize: '200% 100%',
//             }}
//             animate={{ rotate: 360 }}
//             transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//           ></motion.div>

//           {/* Central pulsing element */}
//           <motion.div
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center"
//             style={{
//               boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
//               border: '1px solid rgba(255, 255, 255, 0.1)'
//             }}
//             animate={{
//               boxShadow: [
//                 '0 0 20px rgba(59, 130, 246, 0.1)',
//                 '0 0 25px rgba(59, 130, 246, 0.3)',
//                 '0 0 20px rgba(59, 130, 246, 0.1)'
//               ]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             {/* Logo element */}
//             <motion.div
//               className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center"
//               animate={{
//                 scale: [1, 1.05, 1],
//                 background: [
//                   'linear-gradient(to bottom right, rgba(37, 99, 235, 1), rgba(79, 70, 229, 1))',
//                   'linear-gradient(to bottom right, rgba(59, 130, 246, 1), rgba(99, 102, 241, 1))',
//                   'linear-gradient(to bottom right, rgba(37, 99, 235, 1), rgba(79, 70, 229, 1))'
//                 ]
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             >
//               <span className="text-white font-bold text-lg">SS</span>
//             </motion.div>
//           </motion.div>

//           {/* Animated particles orbiting the center */}
//           {[...Array(6)].map((_, i) => {
//             const angle = (i * 60) * (Math.PI / 180);
//             const radius = 60;
//             const x = radius * Math.cos(angle);
//             const y = radius * Math.sin(angle);

//             return (
//               <motion.div
//                 key={i}
//                 className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-blue-500"
//                 style={{
//                   marginLeft: '-4px',
//                   marginTop: '-4px',
//                   boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)'
//                 }}
//                 initial={{
//                   x,
//                   y,
//                   opacity: 0.6 + (i * 0.05)
//                 }}
//                 animate={{
//                   x: [x, x * 1.1, x],
//                   y: [y, y * 1.1, y],
//                   opacity: [0.6 + (i * 0.05), 0.8 + (i * 0.05), 0.6 + (i * 0.05)]
//                 }}
//                 transition={{
//                   duration: 2 + (i * 0.3),
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               />
//             );
//           })}
//         </div>

//         {/* Advanced loading status with dynamic text */}
//         <div className="w-full mb-6">
//           <div className="flex justify-between mb-1 text-xs text-gray-400">
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               {loadingPhrases[loadingPhase]}...
//             </motion.span>
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="font-mono"
//             >
//               {formattedProgress}%
//             </motion.span>
//           </div>

//           {/* Advanced progress bar with glowing effect */}
//           <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
//             <motion.div
//               className="h-full rounded-full"
//               style={{
//                 width: `${progress}%`,
//                 background: 'linear-gradient(to right, #2563eb, #4f46e5, #7c3aed)',
//                 boxShadow: '0 0 8px rgba(79, 70, 229, 0.6)'
//               }}
//               initial={{ width: '0%' }}
//               animate={{ width: `${progress}%` }}
//               transition={{ type: 'spring', stiffness: 50, damping: 20 }}
//             >
//               {/* Animated shine effect overlay */}
//               <div
//                 className="h-full w-full relative overflow-hidden"
//                 style={{ borderRadius: 'inherit' }}
//               >
//                 <motion.div
//                   className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                   animate={{
//                     left: ['-100%', '100%']
//                   }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 1.5,
//                     ease: "easeInOut",
//                     repeatDelay: 0.5
//                   }}
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Connection status indicator */}
//         <div className="flex items-center justify-center text-gray-400 text-xs">
//           <motion.div
//             className="w-2 h-2 rounded-full mr-2"
//             animate={{
//               background: [
//                 'rgba(34, 197, 94, 0.7)',
//                 'rgba(34, 197, 94, 0.3)',
//                 'rgba(34, 197, 94, 0.7)'
//               ],
//               boxShadow: [
//                 '0 0 4px rgba(34, 197, 94, 0.3)',
//                 '0 0 8px rgba(34, 197, 94, 0.6)',
//                 '0 0 4px rgba(34, 197, 94, 0.3)'
//               ]
//             }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//           ></motion.div>
//           <span className="uppercase tracking-wider text-gray-500 font-light">Secure Connection</span>
//         </div>
//       </motion.div>

//       {/* Bottom decorative elements */}
//       <motion.div
//         className="absolute bottom-8 left-0 right-0 flex justify-center"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.8, duration: 0.5 }}
//       >
//         <div className="text-center">
//           <div className="text-gray-500 text-xs tracking-widest uppercase font-light mb-2">
//             Sacred<span className="text-blue-500">Secret</span>
//           </div>
//           <div className="flex space-x-3 opacity-50">
//             {/* Decorative dots */}
//             {[...Array(5)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="w-1 h-1 rounded-full bg-blue-400"
//                 animate={{
//                   opacity: [0.3, 1, 0.3]
//                 }}
//                 transition={{
//                   duration: 1.5,
//                   repeat: Infinity,
//                   delay: i * 0.2,
//                   ease: "easeInOut"
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// Implement a premium loader component
const PremiumLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
    <div className="flex flex-col items-center">
      {/* Spinner animation */}
      <div className="relative w-16 h-16 mb-4">
        {/* Outer spinning circle */}
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

        {/* Inner spinning circle (opposite direction) */}
        <div
          className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-500 border-l-transparent animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        ></div>

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">SS</span>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-white text-sm font-medium tracking-wider">
        LOADING
      </div>

      {/* Simple loading dots */}
      <div className="flex mt-2 space-x-1">
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  </div>
);

// Lazy load components
import React, { lazy, Suspense, useRef } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { match } from "path-to-regexp";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HelpAssistant from "./components/HelpAssistant";
import ProtectedRoute from "./components/ProtectedRoute";
import FeatureProtectedRoute from "./utils/FeatureProtectedRoute";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderHistory from "./pages/OrderHistory";
import RefundPolicy from "./pages/RefundPolicy";
import { useAutoLogout } from "./hooks/useAutoLogout";
import CountdownModal from "./components/CountdownModal";

// import OrderHistory from "./pages/OrderHistory";
// import OrderDetailPage from "./pages/OrderDetailPage";

// Lazy load components
const VoiceBot = lazy(() => import("./components/VoiceBot"));
const ChatBot = lazy(() => import("./components/ChatBot"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const VerificationPage = lazy(() => import("./pages/VerificationPage"));
const VerificationSuccessPage = lazy(() =>
  import("./pages/VerificationSuccessPage")
);
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ManageCredentialsPage = lazy(() =>
  import("./pages/ManageCredentialsPage")
);
const SmartNotificationsPage = lazy(() =>
  import("./pages/SmartNotificationsPage")
);
const ChooseNomineePage = lazy(() => import("./pages/ChooseNomineePage"));
const CredentialListPage = lazy(() =>
  import("./pages/credentials/CredentialListPage")
);
const CredentialFormPage = lazy(() =>
  import("./pages/credentials/CredentialFormPage")
);

const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const NotificationListPage = lazy(() =>
  import("./pages/notifications/NotificationListPage")
);
const NotificationFormPage = lazy(() =>
  import("./pages/notifications/NotificationFormPage")
);
const NotificationDetailsPage = lazy(() =>
  import("./pages/notifications/NotificationDetailPage")
);
const AgreementPage = lazy(() => import("./pages/nominees/AgreementPage"));
const NomineeFormPage = lazy(() => import("./pages/nominees/NomineeFormPage"));
const NomineeListPage = lazy(() => import("./pages/nominees/NomineeListPage"));
const ProfileUpload = lazy(() => import("./pages/ProfileImage"));

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));

function App() {
  const hideNavbarPaths = [
    "/signin",
    "/signup",
    "/verify/:encryptedEmail",
    "/verification-success",
    "/reset-password",
    "/profileimage-upload",
    "/nominees/:type/agreement",
  ];
  const voiceBotRef = useRef();
  const location = useLocation();

  const handleStartReading = () => {
    if (voiceBotRef.current?.startReading) {
      voiceBotRef.current.startReading();
    }
  };

  const shouldHideNavbar = hideNavbarPaths.some((path) => {
    const matcher = match(path, { decode: decodeURIComponent });
    return matcher(location.pathname);
  });
  const { showCountdown, secondsLeft, resetTimer } = useAutoLogout();
  return (
    <div className="min-h-screen bg-dark-100">
      <div className="relative">
        <div className="fixed inset-0 bg-gradient-dark opacity-50 pointer-events-none" />
        <div className="relative z-10">
          {!shouldHideNavbar && <Navbar />}

          <Suspense fallback={<PremiumLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route
                path="/verify/:encryptedEmail"
                element={<VerificationPage />}
              />
              <Route
                path="/verification-success"
                element={<VerificationSuccessPage />}
              />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />

              <Route
                path="/terms-of-service"
                element={<TermsAndConditions />}
              />
              <Route
                path="/manage-credentials"
                element={<ManageCredentialsPage />}
              />
              <Route
                path="/smart-notifications"
                element={<SmartNotificationsPage />}
              />
              <Route path="/choose-nominee" element={<ChooseNomineePage />} />

              {/* Payment Routes */}
              <Route path="/payment/success" element={<PaymentSuccessPage />} />

              {/* Orders Route */}
              <Route
                path="/account/orders"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  </Suspense>
                }
              />

              <Route
                path="/account/order/:id"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <OrderDetailPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />

              {/* Protected Routes - wrapped in their own Suspense for more granular loading */}
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/profileimage-upload"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <ProfileUpload />
                    </ProtectedRoute>
                  </Suspense>
                }
              />

              {/* Credential Routes */}
              <Route
                path="/credentials/:type"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <CredentialListPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/credentials/:type/add"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <CredentialFormPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/credentials/:type/edit/:id"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <CredentialFormPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />

              {/* Notification Routes - NOW WITH FEATURE PROTECTION */}
              <Route
                path="/notifications/:type"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <FeatureProtectedRoute featureName="smartNotifications">
                        <NotificationListPage />
                      </FeatureProtectedRoute>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/notifications/:type/add"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <FeatureProtectedRoute featureName="smartNotifications">
                        <NotificationFormPage />
                      </FeatureProtectedRoute>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/notifications/:type/:id/view"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <FeatureProtectedRoute featureName="smartNotifications">
                        <NotificationDetailsPage />
                      </FeatureProtectedRoute>
                    </ProtectedRoute>
                  </Suspense>
                }
              />

              {/* Nominee Routes - NOW WITH FEATURE PROTECTION */}
              <Route
                path="/nominees/:type"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <FeatureProtectedRoute featureName="nominee">
                        <NomineeListPage />
                      </FeatureProtectedRoute>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/nominees/:type/add"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <FeatureProtectedRoute featureName="nominee">
                        <NomineeFormPage />
                      </FeatureProtectedRoute>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/nominees/:type/edit/:id"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <FeatureProtectedRoute featureName="nominee">
                        <NomineeFormPage />
                      </FeatureProtectedRoute>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/nominees/:type/agreement"
                element={
                  <Suspense fallback={<PremiumLoader />}>
                    <ProtectedRoute>
                      <FeatureProtectedRoute featureName="nominee">
                        <AgreementPage />
                      </FeatureProtectedRoute>
                    </ProtectedRoute>
                  </Suspense>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>

      {/* Help Assistant is always present but components like VoiceBot and ChatBot are lazy loaded */}
      <HelpAssistant />

      <CountdownModal
        isOpen={showCountdown}
        secondsLeft={secondsLeft}
        onStayLoggedIn={resetTimer}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
