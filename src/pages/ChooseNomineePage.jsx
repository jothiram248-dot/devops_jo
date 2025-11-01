// import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   Users,
//   CreditCard,
//   Share2,
//   FileText,
//   TrendingUp,
//   FolderLock,
//   ChevronRight,
// } from "lucide-react";
// import Footer from "../components/Footer";

// const features = [
//   {
//     title: "Online Banking Details",
//     icon: CreditCard,
//     description: "Securely share banking credentials with your chosen nominee.",
//     image:
//       "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80",
//   },
//   {
//     title: "Social Media Details",
//     icon: Share2,
//     description: "Pass on access to your social media accounts.",
//     image:
//       "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80",
//   },
//   {
//     title: "Last Wishes",
//     icon: FileText,
//     description: "Document and share your final wishes securely.",
//     image:
//       "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80",
//   },
//   {
//     title: "Investment Details",
//     icon: TrendingUp,
//     description: "Ensure your investments are properly transferred.",
//     image:
//       "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80",
//   },
//   {
//     title: "Others",
//     icon: FolderLock,
//     description: "Custom access settings for any other digital assets.",
//     image:
//       "https://images.unsplash.com/photo-1618044619888-009e412ff12a?auto=format&fit=crop&q=80",
//   },
// ];

// const ChooseNomineePage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="pt-24 min-h-screen bg-dark-100">
//       {/* Hero Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
//               Choose Your Nominee
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
//               Choose your nominees to share access to all important details,
//               such as banking credentials, social media accounts, last wishes
//               and more, in case of an emergency or after you are gone. This
//               empowers users to assert their will, independent of societal or
//               systemic norms.
//             </p>
//           </motion.div>

//           {/* Features Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="group relative overflow-hidden rounded-xl bg-dark-200"
//               >
//                 <div className="aspect-video relative overflow-hidden">
//                   <img
//                     src={feature.image}
//                     alt={feature.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/50 to-transparent" />
//                 </div>

//                 <div className="p-6 relative">
//                   <feature.icon className="w-8 h-8 text-accent-100 mb-4" />
//                   <h3 className="text-xl font-semibold mb-2 text-white">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-300 mb-4">{feature.description}</p>

//                   <button className="flex items-center text-accent-100 hover:text-accent-200 transition-colors">
//                     <span className="mr-2">Learn more</span>
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-20 bg-dark-200">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <Users className="w-16 h-16 text-accent-100 mx-auto mb-8" />
//             <h2 className="text-4xl font-bold text-white mb-8">
//               Why Choose a Nominee?
//             </h2>
//             <p className="text-xl text-gray-300">
//               Ensure your digital assetsis passed on according to your wishes.
//               Make the transition easier for your loved ones during difficult
//               times by providing organized access to your digital assets and
//               final wishes.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default ChooseNomineePage;

import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Check, ChevronDown, Package, Phone } from "lucide-react";

import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";

// Import the Lucide icons you want to use:
import {
  CreditCard,
  TrendingUp,
  Tv,
  Share2,
  Gamepad2,
  FolderLock,
  Shield,
  Lock,
  Key,
  Database,
  Bell,
  Users,
  CheckCircle2,
} from "lucide-react";

import FAQ from "@/components/FAQ";
import { useInView } from "react-intersection-observer";
import RazorpayPayment from "@/utils/RazorpayPayment";
import toast from "react-hot-toast";

import {
  useMeQuery,
  useActivateSmartNotificationsTrialMutation,
} from "@/features/api/userApiSlice";
import NomineeHub from "@/components/NomineeHub";

// 3) FAQ Data
const faqs = [
  {
    question: "Why designate nominees?",
    answer:
      "Nominees ensure your credentials are passed on securely, preventing complications in emergencies or after your passing.",
  },
  {
    question: "Can I control which credentials nominees see?",
    answer:
      "Yes. You decide which categories of credentials each nominee can access and under what conditions.",
  },
  {
    question: "Is there a limit to how many nominees I can add?",
    answer:
      "No. You can add as many nominees as you need. Each nominee will only see the specific credentials you grant them permission to view.",
  },
  {
    question: "Do nominees also need to sign up?",
    answer:
      "Nominees do not need a full account, but they must pass a secure verification process before gaining access to any credentials you've shared with them.",
  },
  {
    question: "What if a nominee fails or refuses the verification process?",
    answer:
      "They won't be granted access. You retain full control and can revoke or modify nominee permissions at any time.",
  },
  {
    question: "Can I see logs of when my nominees access credentials?",
    answer:
      "Yes. Our audit logs track every login and credential access so you can monitor nominee activity and stay informed.",
  },
];

const UncompromisingSecurity = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Example data - replace with your actual advancedNomineeFeatures data
  const advancedNomineeFeatures = [
    {
      title: "Advanced Protection",
      icon: Shield,
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/advanced-protection.jpg`,
      description: "Best-in-class security to safeguard your digital assets",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      accentColor: "bg-green-400",
      textColor: "text-green-600",
      details: [
        "Military-grade encryption",
        "Secure data transmission",
        "Protected storage",
        "Regular security updates",
      ],
    },
    {
      title: "Smart Authentication",
      icon: Lock,
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/smart-authentication.jpg`,
      description: "Multiple layers of security for your peace of mind",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      accentColor: "bg-blue-400",
      textColor: "text-blue-600",
      details: [
        "Fingerprint verification",
        "Face recognition support",
        "Two-factor authentication",
        "Secure password policies",
      ],
    },
    {
      title: "Privacy Controls",
      icon: Key,
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/privacy-controls.jpg`,
      description: "You have complete control over your data",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      accentColor: "bg-purple-400",
      textColor: "text-purple-600",
      details: [
        "Customizable privacy settings",
        "Granular access controls",
        "Data ownership rights",
        "Consent management",
      ],
    },
    {
      title: "Data Protection",
      icon: Database,
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/data-protection.jpg`,
      description: "Your information is always protected and available",
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      accentColor: "bg-amber-400",
      textColor: "text-amber-600",
      details: [
        "Encrypted storage",
        "Automatic backups",
        "Data recovery options",
        "Zero-knowledge security",
      ],
    },
    {
      title: "Smart Alerts",
      icon: Bell,
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/smart-alerts.jpg`,
      description: "Stay informed about your digital assets",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      accentColor: "bg-red-400",
      textColor: "text-red-600",
      details: [
        "Security notifications",
        "Access alerts",
        "Update reminders",
        "Activity monitoring",
      ],
    },
    {
      title: "Nominee Management",
      icon: Users,
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/nominee-management.jpg`,
      description: "Securely delegate access to your trusted nominees",
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      accentColor: "bg-cyan-400",
      textColor: "text-cyan-600",
      details: [
        "Nominee verification",
        "Access scheduling",
        "Permission management",
        "Secure handover process",
      ],
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Premium Dark Background with effects */}
      <div className="absolute inset-0 -z-10">
        {/* Deep space gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black"></div>

        {/* Background Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.2),transparent_70%),radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.2),transparent_70%)]"></div>

        {/* Premium ambient blurs */}
        <div className="absolute top-1/4 right-1/6 w-80 h-80 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/6 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>

        {/* Subtle mesh grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-5"></div>

        {/* Enhanced floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/40 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            />
          ))}
        </div>

        {/* Responsive glow based on mouse position */}
        <div
          className="absolute opacity-30"
          style={{
            left: `${mousePosition.x - 200}px`,
            top: `${mousePosition.y - 200}px`,
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(79, 70, 229, 0.6) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Title with premium visual treatment */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <div className="h-px w-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              Uncompromising
            </span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Security
              {/* Decorative elements */}
              <span className="absolute -top-2 -right-8 w-6 h-6 rounded-full bg-purple-500/10 blur-sm"></span>
              <span className="absolute bottom-0 -left-4 w-4 h-4 rounded-full bg-indigo-500/10 blur-sm"></span>
            </span>
          </h2>

          {/* Enhanced divider */}
          <div className="flex justify-center items-center gap-3 my-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/70"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/70"></div>
          </div>

          {/* Description with improved typography */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-white font-medium">
              Protect both your and your nominees' digital assets
            </span>{" "}
            with robust, zero‐knowledge security measures built into every
            aspect of our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advancedNomineeFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative h-64 overflow-hidden rounded-2xl shadow-lg group cursor-pointer [perspective:1200px]"
            >
              {/* Card with 3D flip effect */}
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]">
                  {/* Base clean background */}
                  <div className={`absolute inset-0 ${feature.bgColor}`}></div>

                  {/* Subtle dot pattern overlay */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-all duration-500">
                    <svg
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id={`premium-dots-${index}`}
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="1"
                            fill={feature.textColor.replace("text-", "")}
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#premium-dots-${index})`}
                      />
                    </svg>
                  </div>

                  {/* Diagonal premium accent */}
                  <div
                    className={`absolute top-0 right-0 w-full h-full opacity-5 transform rotate-[-15deg] translate-x-1/3 -translate-y-1/4 ${feature.accentColor} rounded-full`}
                  ></div>

                  {/* Elegant accent border at top */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 ${feature.accentColor}`}
                  ></div>

                  {/* Premium icon container with white background and shiny icon */}
                  <div
                    className={`absolute top-4 left-4 group-hover:left-5 transition-all duration-500 bg-white border ${feature.borderColor} p-3 rounded-2xl shadow-lg`}
                  >
                    <div
                      className={`relative overflow-hidden bg-gradient-to-br ${feature.color} rounded-xl p-3 shadow-inner`}
                    >
                      {/* Shiny effect overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                        <div className="absolute -inset-[100%] animate-shine bg-white/30 rotate-[25deg] transform-gpu"></div>
                      </div>
                      {React.createElement(feature.icon, {
                        className:
                          "w-6 h-6 text-white drop-shadow-lg relative z-10",
                      })}
                    </div>
                  </div>

                  {/* Subtle corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 opacity-60 bg-gradient-to-bl ${feature.bgColor} to-transparent rounded-bl-full`}
                  ></div>

                  {/* Professional content area */}
                  <div className="absolute inset-x-0 top-28 px-6">
                    <h3
                      className={`text-xl font-bold mb-2 text-gray-800 group-hover:${feature.textColor} transition-colors duration-300`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-md leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Left side accent */}
                  <div
                    className={`absolute left-0 top-1/4 bottom-1/4 w-1 ${feature.borderColor}`}
                  ></div>

                  {/* Subtle floating detail effect */}
                  <div
                    className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 ${feature.accentColor}`}
                  ></div>

                  {/* Card flip indicator */}
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 flex items-center space-x-1 opacity-80">
                    <span>Flip for details</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  {/* Professional clean white background */}
                  <div className={`absolute inset-0 bg-white`}></div>

                  {/* Subtle grain texture for depth */}
                  <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

                  {/* Premium border and accents */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.color}`}
                  ></div>
                  <div
                    className={`absolute left-0 top-2 bottom-0 w-2 bg-gradient-to-b ${feature.color} opacity-10`}
                  ></div>

                  {/* Subtle curved accent in corner */}
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 bg-gradient-to-bl ${feature.color}`}
                    style={{ transform: "translate(50%, -50%)" }}
                  ></div>

                  {/* Content Container */}
                  <div className="relative h-full flex flex-col p-6">
                    {/* Premium Icon with 3D effect */}
                    <div className="absolute top-3 right-4">
                      <div
                        className={`relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg border border-white/10`}
                      >
                        {React.createElement(feature.icon, {
                          className: "w-5 h-5",
                          strokeWidth: 1.5,
                        })}
                        {/* Subtle shadow for 3D effect */}
                        <div
                          className={`absolute -bottom-1.5 inset-x-1 h-2 bg-black/20 blur rounded-full`}
                        ></div>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="relative mb-6">
                      <h3 className={`text-xl font-bold mb-1 text-gray-800`}>
                        {feature.title}
                      </h3>
                      <div
                        className={`h-0.5 w-10 ${feature.accentColor}`}
                      ></div>
                    </div>

                    {/* Details List with staggered animation */}
                    <ul className="space-y-3 flex-grow">
                      {feature.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-gray-600 transition-colors duration-300"
                          style={{
                            opacity: 0,
                            animation: `fadeIn 0.5s forwards ${
                              idx * 0.1 + 0.2
                            }s`,
                          }}
                        >
                          {/* Professional checkmark */}
                          <div
                            className={`flex-shrink-0 w-5 h-5 mr-3 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>

                          {/* Text */}
                          <span className="text-sm font-medium">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Add animation for staggered list items */}
              <style jsx>{`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                @keyframes shine {
                  0% {
                    left: -100%;
                  }
                  100% {
                    left: 200%;
                  }
                }
                .animate-shine {
                  animation: shine 2s infinite linear;
                }

                @keyframes shimmer {
                  0% {
                    transform: translateX(-100%);
                  }
                  100% {
                    transform: translateX(500%);
                  }
                }
                .animate-shimmer {
                  animation: shimmer 3s infinite;
                }

                @keyframes float {
                  0%,
                  100% {
                    transform: translateY(0) translateX(0);
                  }
                  25% {
                    transform: translateY(-10px) translateX(5px);
                  }
                  75% {
                    transform: translateY(-5px) translateX(-5px);
                  }
                }
                .animate-float {
                  animation: float 15s ease-in-out infinite;
                }
              `}</style>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NomineeCredentialCard = ({ feature, index, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative h-full rounded-2xl overflow-hidden shadow-xl group will-change-transform cursor-pointer"
    >
      {/* Image container */}
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        <img
          src={feature.image}
          alt={feature.title}
          width="400"
          height="256"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={index < 3 ? "eager" : "lazy"}
          style={{ aspectRatio: "400/256" }}
        />

        {/* Lighter overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
      </div>

      {/* Premium glass card overlay */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-800/50 group-hover:border-accent-100/30 transition-colors duration-300">
        {/* Top border accent with glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-100 via-purple-600 to-accent-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Bottom glass panel */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/95 via-black/90 to-transparent backdrop-blur-sm">
          {/* Animated gradient shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
            <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content layout */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        {/* Top section with icon */}
        <div className="flex justify-between items-start">
          <div className="w-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <div className="h-0.5 w-full bg-accent-100/50 rounded-full"></div>
          </div>

          {/* Premium icon */}
          <div className="relative">
            {/* Animated ring */}
            <div className="absolute -inset-1 rounded-full border border-accent-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-ping-slow"></div>

            {/* Icon container with glow */}
            <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-lg border border-gray-700 group-hover:border-accent-100/50 group-hover:bg-gradient-to-br group-hover:from-accent-100 group-hover:to-accent-200 transition-all duration-500">
              <div className="absolute inset-0 rounded-full bg-accent-100/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <feature.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="mt-auto">
          {/* Title with consistent height */}
          <div className="mb-3 min-h-[3.5rem] flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-100 transition-colors duration-300">
              {feature.title}
            </h3>

            {/* Animated underline */}
            <div className="h-0.5 w-0 bg-gradient-to-r from-accent-100 to-accent-200 mt-2 rounded-full group-hover:w-24 transition-all duration-500 ease-out"></div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-light">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const DelegateCredentials = ({ onCardClick }) => {
  const navigate = useNavigate();

  const [isInView, setIsInView] = useState(false);

  // Example data - replace with your actual nomineeCredentialTypes data
  const nomineeCredentialTypes = [
    {
      id: 'banking',
      title: "Banking Details",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={props.className}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      ),
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/Banking_credentials.jpg`,
      description:
        "Assign nominees for your banking details.",
      color: "from-accent-100 to-accent-200",
    },
    {
      id: "investment",
      title: "Investment Details",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={props.className}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/Investment_credneitals.jpg`,
      description:
        "Assign nominees for your investment platform details.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Entertainment Platform Details",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={props.className}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" rx="2" ry="2" x="2" y="3" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      ),
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/Entertainment.jpg`,
      description:
        "Assign nominees for your streaming and entertainment logins.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "socialMedia",
      title: "Social Media Details",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={props.className}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
        </svg>
      ),
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/SocialMedia.jpg`,
      description:
        "Assign nominees for your social media accounts.",
      color: "from-pink-500 to-rose-400",
    },
    {
      id: 5,
      title: "Gaming Platform Details",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={props.className}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="6" x2="10" y1="11" y2="11" />
          <line x1="8" x2="8" y1="9" y2="13" />
          <line x1="15" x2="15.01" y1="12" y2="12" />
          <line x1="18" x2="18.01" y1="10" y2="10" />
          <rect width="20" height="12" x="2" y="6" rx="2" />
        </svg>
      ),
      image: `${
        import.meta.env.VITE_DO_BUCKET_URL
      }/assets/Images/gaming_credentials.jpg`,
      description:
        "Assign nominees for gaming accounts.",
      color: "from-green-500 to-emerald-400",
    },
    {
      id: "others",
      title: "Other Details",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={props.className}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="10" x="5" y="11" rx="2" />
          <circle cx="12" cy="16" r="1" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      ),
      image: `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/others.jpg`,
      description:
        "Assign nominees for all your online platforms and portals.",
      color: "from-amber-500 to-orange-400",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("delegate-credentials-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <>
      {/* Premium border effect */}
      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-100 to-transparent"></div>
      </div>

      <section
        id="delegate-credentials-section"
        className="relative py-20 overflow-hidden"
      >
        {/* Premium background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/95 via-white to-gray-50/95 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-100/90 z-0"></div>

        {/* Ambient gradient overlays */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-200/30 to-transparent opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-purple-200/30 to-transparent opacity-50 z-0"></div>

        {/* Floating gradient spheres */}
        <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-300 rounded-full filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-float-slow-reverse"></div>
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-float-medium"></div>
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-violet-300 rounded-full filter blur-3xl opacity-30 animate-float-medium-reverse"></div>

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,140,248,0.3),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(167,139,250,0.3),_transparent_70%)]"></div>

        {/* Diagonal gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 z-0"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xN2MwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTcgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0wIDE3YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>

        {/* More gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-100/10 via-transparent to-transparent opacity-60 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-200/10 via-transparent to-transparent opacity-40 z-0"></div>

        {/* Floating gradient spheres */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent-100/20 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-300/20 rounded-full filter blur-3xl opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative z-10"
          >
            {/* Premium accent line */}
            <div className="relative w-24 h-px mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full blur-sm opacity-70"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-accent-100 via-purple-600 to-accent-200 tracking-tight">
            Designate Nominees for Your Digital Assets
            </h2>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
              Securely nominate your loved ones for your digital assets with our{" "}
              <span className="text-accent-100 font-medium">
                advanced nominee system
              </span>
              —providing you peace of mind.
            </p>
          </motion.div>

          {/* Premium card grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {nomineeCredentialTypes.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <NomineeCredentialCard
                  feature={feature}
                  index={index}
                  onClick={onCardClick} // ⬅️ forward click
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom animations style */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow-reverse {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-medium-reverse {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(15px);
          }
        }

        @keyframes animate-shimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(100%) skewX(-15deg);
          }
        }

        @keyframes animate-ping-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-reverse {
          animation: float-slow-reverse 9s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-medium-reverse {
          animation: float-medium-reverse 7s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: animate-shimmer 3s infinite;
        }

        .animate-ping-slow {
          animation: animate-ping-slow 3s infinite;
        }
      `}</style>
    </>
  );
};

// 4) MAIN COMPONENT
const ChooseNomineePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // For hero section
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [nomineeCategories, setNomineeCategories] = useState([
    { id: "1", name: "Manage Your Credentials", selected: false, plan: null },
    { id: "2", name: "Investment Credentials", selected: false, plan: null },
    { id: "3", name: "Social Media Platform", selected: false, plan: null },
    { id: "4", name: "Subscription Services", selected: false, plan: null },
    { id: "5", name: "Gaming Credentials", selected: false, plan: null },
    { id: "6", name: "Others", selected: false, plan: null },
  ]);

  // Trial length (single source of truth for labels)
  const TRIAL_DAYS = 30;
  const [showTrialModal, setShowTrialModal] = useState(false);

  // Read current user + nominee trial state
  const { data: meData, refetch: refetchMe } = useMeQuery();
  const [activateTrial, { isLoading: activatingTrial }] =
    useActivateSmartNotificationsTrialMutation();

  // derive nominee trial/paid state
  const nomineeTrial = meData?.me?.features?.trials?.nominee;
  const paidActive = !!meData?.me?.features?.nominee;

  const trialActive =
    nomineeTrial?.hasAccess && nomineeTrial?.status === "trial-active";

  const trialEligible =
    nomineeTrial?.status === "trial-eligible" ||
    nomineeTrial?.trial?.eligible === true;

  const trialRemaining = nomineeTrial?.trial?.remainingHuman;

  // Dynamic CTA label for hero button
  const heroCtaLabel =
    trialEligible && !paidActive && !trialActive
      ? `Start ${TRIAL_DAYS} days free trial`
      : paidActive || trialActive
      ? "Open Nominee"
      : "Get Started";

  // One handler used by hero button AND cards
  // const goToNomineeOrScroll = useCallback(() => {
  //   if (paidActive || trialActive) {
  //     navigate("/dashboard", { state: { id: "nominee" } });
  //     return;
  //   }
  //   const target =
  //     document.getElementById("gotostartforfree") ||
  //     document.getElementById("cyn"); // fallback if you kept 'cyn'
  //   if (target) target.scrollIntoView({ behavior: "smooth" });
  // }, [paidActive, trialActive, navigate]);
  const location = useLocation();
  const scrollToSubscribe = () => {
    const el = document.getElementById("gotostartforfree") 
             || document.getElementById("cyn");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToNomineeOrScroll = useCallback(
    (categoryId) => {
      // 1) not authenticated
      if (!isAuthenticated) {
        navigate("/signin", { state: { from: window.location.pathname } });
        return;
      }
  
      // 2) no payment & no active trial → scroll
      if (!paidActive && !trialActive) {
        scrollToSubscribe();
        return;
      }
      
  
      // 3) paid or trial active → route
      if (categoryId) {
        navigate(`/nominees/${categoryId}`);
      } else {
        navigate("/dashboard", { state: { id: "nominee" } });
      }
    },
    [isAuthenticated, paidActive, trialActive, navigate]
  );

  // Auto-scroll on load if NOT active
  // useEffect(() => {
  //   if (!paidActive && !trialActive) {
  //     const target =
  //       document.getElementById("gotostartforfree") ||
  //       document.getElementById("cyn");
  //     if (target) target.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [paidActive, trialActive]);

  useEffect(() => {
    if (location.hash === "#gotostartforfree") {
      scrollToSubscribe();
    }
  }, [location.hash]);
  

  // start trial handler (featureKey=nominee)
  const startNomineeTrial = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to start your free trial");
      navigate("/signin");
      return;
    }
    try {
      const res = await activateTrial({ featureKey: "nominee" }).unwrap();
      toast.success(res?.message || "Trial activated!");
      setShowTrialModal(true);
      await refetchMe();
    } catch (e) {
      toast.error(
        e?.data?.message || "Couldn’t start trial, please try again."
      );
    }
  };

  const getPlanPrice = () => {
    const prices = {
      quarterly: 250,
      halfYearly: 500,
      yearly: 1000,
    };
    return subscriptionPlan ? prices[subscriptionPlan] : 0;
  };
  // Smooth scroll to CTA
  const handleGoToDown = useCallback(() => {
    const goToStartForFree = document.getElementById("gotostartforfree");
    if (goToStartForFree) {
      goToStartForFree.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // If user not authenticated, prompt login, else next step
  const handleGetStarted = () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/nominee" } });
      return;
    }
    navigate("/nominee/setup");
  };

  // Handler for successful payment
  const handlePaymentSuccess = (paymentData) => {
    toast.success("Payment successful!");
    navigate("/payment/success", {
      state: {
        subscription: {
          id: paymentData.orderId,
          title: "Nominee Plan - " + subscriptionPlan,
          price: paymentData.amount / 100, // Convert from paise to rupees
          features: [
            "Banking Credentials",
            "Investment Credentials",
            "Social Media Platform",
            "Subscription Services",
            "Gaming Credentials",
            "Other Credentials",
          ],
        },
        orderId: paymentData.orderId,
        paymentId: paymentData.razorpay_payment_id,
      },
    });
  };

  // Handler for payment errors
  const handlePaymentError = (error) => {
    toast.error(error || "Payment failed. Please try again.");
  };

  const getFormattedPlan = () => {
    if (!subscriptionPlan) return "";

    switch (subscriptionPlan) {
      case "quarterly":
        return "Quarterly - ₹250";
      case "halfYearly":
        return "Half-Yearly - ₹500";
      case "yearly":
        return "Yearly - ₹1000";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-dark-100">
      {/* ─────────────────────────────────────────
          HERO SECTION with Video
      ───────────────────────────────────────── */}
      <section
      ref={videoRef}
      className="relative overflow-hidden"
      id="choose-nominees-hero"
    >
      {/* Full viewport container */}
      <div className="hero-viewport">
        {/* Immersive Background Base Layer */}
        <div className="absolute inset-0 bg-[#050816]"></div>

        {/* Parallax Animated Background */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Dynamic Multi-Layer Gradient Overlays with Custom Blend Modes */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/90 via-[#050816]/60 to-[#050816]/90 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-80 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent opacity-80 mix-blend-color-dodge"></div>

          {/* Futuristic Grid Elements with Pulse Effect */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM0MzM4REQiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwIEw2MCA2MCIvPjxwYXRoIGQ9Ik02MCAwIEwwIDYwIi8+PHBhdGggZD0iTTMwIDAgTDMwIDYwIi8+PHBhdGggZD0iTTAgMzAgTDYwIDMwIi8+PC9nPjwvc3ZnPg==')] opacity-10 animate-pulse-slow"></div>
        </motion.div>

        {/* Interactive Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Advanced 3D Particle System with Movement Tracking */}
          <div className="particles-3d-container absolute inset-0 opacity-40 pointer-events-none"></div>

          {/* Neon Data Streams with Reactive Animation */}
          <div className="absolute inset-0 data-streams opacity-15">
            {[...Array(8)].map((_, i) => (
              <div
                key={`hline-${i}`}
                className="absolute h-px left-0 right-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent data-line neon-glow"
                style={{ top: `${(i + 1) * 11}%` }}
              ></div>
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={`vline-${i}`}
                className="absolute w-px top-0 bottom-0 bg-gradient-to-b from-transparent via-purple-600 to-transparent data-line neon-glow"
                style={{ left: `${(i + 1) * 11}%` }}
              ></div>
            ))}
          </div>

        
        </div>

        {/* Content Container - Centered with top spacing for navbar */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-16 md:pt-20 lg:pt-24">
          <div className="w-full max-w-7xl mx-auto">
            {/* Compact Header Section */}
            <div className="text-center w-full mb-6 lg:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight enterprise-heading">
                Choose{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Nominees
                </span>
              </h1>

              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200 mb-3">
                with{" "}
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
                  SacredSecret
                </span>
              </h2>

              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Professional Two-Column Compact Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left Column: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative p-4 lg:p-6 flex flex-col justify-center z-10"
                whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
              >
                {/* Text Content - Increased size */}
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed dynamic-text">
                  Securely assign{" "}
                  <span className="highlight-text">nominees for your digital assets</span>
                  {" "}— including banking, investments, social media, and more — to the people you trust. Safeguard your{" "}
                  <span className="highlight-text">digital legacy</span>{" "}
                  while maintaining{" "}
                  <span className="highlight-text">full control</span>{" "}
                  over what your nominees can access and how they can access it, ensuring{" "}
                  <span className="highlight-text">peace of mind</span>{" "}
                  for you and your loved ones.
                </p>

                {/* CTA Button - Compact */}
                <div className="mt-4 lg:mt-5 flex justify-start">
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 20px rgba(176, 132, 199, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={()=>goToNomineeOrScroll()}
                    className="px-6 py-2.5 lg:px-8 lg:py-3 text-sm md:text-base font-semibold rounded-full bg-gradient-to-r from-indigo-100 via-cyan-100 to-purple-100 text-gray-800 transition-all shadow-lg border border-white/30 relative overflow-hidden group neo-button"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/0 via-white/60 to-indigo-200/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10 flex items-center font-bold">
                      {heroCtaLabel}{" "}
                      <span className="ml-2 arrow-icon">→</span>
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Column: Video - Compact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative flex justify-center items-center"
              >
                {/* Video Container - Compact */}
                <div className="w-full max-w-2xl mx-auto">
                  {/* Video with Styling */}
                  <div className="relative rounded-xl overflow-hidden shadow-2xl group border border-white/20 video-frame">
                    {/* Corner Accents - Smaller */}
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-400/70 rounded-tl-xl z-20"></div>
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-purple-500/70 rounded-br-xl z-20"></div>

                    {/* Video Player */}
                    <div
                      className="relative z-10"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <VideoPlayer
                        videoUrl="https://www.youtube.com/watch?v=upbr_i9Xooc"
                        title="Choose Your Nominee"
                      />

                      {/* Video Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 pointer-events-none z-10">
                        {/* Scan Lines */}
                        <div className="absolute inset-0 scan-lines-subtle"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .hero-viewport {
          position: relative;
          height: 100svh;
          height: 100dvh;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        /* Neo-Morphic Glass Effect with Depth */}
        .neo-glass {
          position: relative;
          background: rgba(8, 8, 30, 0.25);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25),
            0 5px 15px rgba(0, 0, 0, 0.1),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
          overflow: hidden;
          transition: all 0.5s ease;
        }

        /* Enterprise-grade heading style */
        .enterprise-heading {
          letter-spacing: -0.02em;
          line-height: 1.1;
          font-weight: 800;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Premium Text Highlighting */
        .dynamic-text {
          letter-spacing: 0.01em;
        }

        .highlight-text {
          position: relative;
          color: #38bdf8;
          font-weight: 600;
        }

        .highlight-text:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          opacity: 0.15;
          border-radius: 4px;
          z-index: -1;
        }

        /* Futuristic Button Styling */
        .neo-button {
          transition: all 0.4s ease;
        }

        .neo-button:hover .arrow-icon {
          transform: translateX(5px);
          transition: transform 0.3s ease;
        }

        .neo-button:before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 999px;
          padding: 2px;
          background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .neo-button:hover:before {
          opacity: 1;
        }

        /* Video frame styling */
        .video-frame {
          transition: transform 0.3s ease-out;
          position: relative;
          background: rgba(8, 8, 30, 0.4);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .video-frame:after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.03) 25%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.03) 75%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.3;
        }

        /* Premium Scan Lines Effect */
        .scan-lines-subtle {
          background-image: repeating-linear-gradient(
            0deg,
            rgba(56, 189, 248, 0.04),
            rgba(56, 189, 248, 0.04) 1px,
            transparent 1px,
            transparent 2px
          );
          background-size: 100% 4px;
          animation: scan-animation-premium 10s linear infinite;
        }

        /* Neon Glow Effects */
        .neon-glow {
          box-shadow: 0 0 5px rgba(56, 189, 248, 0.7),
            0 0 10px rgba(56, 189, 248, 0.5);
        }

        .glow-pulse {
          animation: glow-pulsate 3s infinite alternate;
        }

        .holographic-edge {
          border-image: linear-gradient(
              to right,
              #38bdf8,
              #818cf8,
              #c084fc,
              #38bdf8
            )
            1;
          border-image-slice: 1;
        }

        /* Data Spark Animation */
        .data-spark {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px #38bdf8, 0 0 20px #38bdf8;
          animation: spark-travel 3s infinite linear;
        }

        /* Particle System colors */
        .particle-blue {
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
        }

        .particle-cyan {
          background: #22d3ee;
          box-shadow: 0 0 10px #22d3ee;
        }

        .particle-purple {
          background: #a855f7;
          box-shadow: 0 0 10px #a855f7;
        }

        /* Letter Spacing Utilities */
        .letter-spacing-wide {
          letter-spacing: 0.05em;
        }

        /* Enhanced Animations */
        @keyframes scan-animation-premium {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }

        @keyframes glow-pulsate {
          0% {
            box-shadow: 0 0 5px rgba(56, 189, 248, 0.5);
          }
          100% {
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.8),
              0 0 30px rgba(139, 92, 246, 0.5);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes float-particle-3d {
          0% {
            transform: translate(0, 0) translateZ(var(--z, 0));
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translate(
                calc(var(--x, 50) * 1px),
                calc(var(--y, -500) * 1px)
              )
              translateZ(var(--z, 0));
            opacity: 0;
          }
        }

        @keyframes spark-travel {
          0% {
            left: 0;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes data-stream-pulse {
          0%,
          100% {
            opacity: 0.1;
            filter: blur(0px);
          }
          50% {
            opacity: 0.3;
            filter: blur(1px);
          }
        }

        /* Professional animation speeds */
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        /* Advanced Spin Animations */
        .animate-spin-very-slow {
          animation: spin 120s linear infinite;
        }

        .animate-spin-moderate {
          animation: spin 60s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin 80s linear infinite reverse;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .enterprise-heading {
            font-size: clamp(1.75rem, 6vw, 3rem);
          }
        }
      `}</style>
    </section>

      {/* ─────────────────────────────────────────
          NOMINEE CREDENTIAL TYPES (Fade Overlay)
      ───────────────────────────────────────── */}
      {/* <DelegateCredentials onCardClick={goToNomineeOrScroll} /> */}
      <NomineeHub onCardClick={goToNomineeOrScroll} />

      {/* ─────────────────────────────────────────
          ADVANCED NOMINEE FEATURES (Flipping Cards)
      ───────────────────────────────────────── */}
      {/* <UncompromisingSecurity /> */}

      {/* ─────────────────────────────────────────
          CTA SECTION (Pricing Card)
      ───────────────────────────────────────── */}
      <section id="gotostartforfree" className="py-20 relative overflow-hidden">
        {/* Enhanced background with multiple gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
          {/* Radial gradient overlays */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(136, 58, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(58, 136, 234, 0.15) 0%, transparent 50%)",
            }}
          ></div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                  animation: `float-${i % 3} ${
                    Math.random() * 20 + 10
                  }s infinite ease-in-out`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div
          className="container mx-auto max-w-screen-xl px-6 relative z-10"
          id="cyn"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Choose Your Nominee Subscription
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Secure your digital assets by selecting nominee categories.
            </p>
          </motion.div>

          {/* Premium Light-Themed Subscription Card with Prominent Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg mx-auto relative"
          >
            {/* Prominent outer glow effect */}
            <div className="absolute -inset-3 bg-gradient-to-r from-accent-100/30 via-accent-200/20 to-accent-100/30 rounded-2xl blur-lg"></div>

            {/* Card main container */}
            <div
              className="relative rounded-xl overflow-hidden border border-white/30 shadow-2xl"
              style={{
                boxShadow:
                  "0 0 30px rgba(136, 58, 234, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-white"></div>

              {/* Glowing border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 border-4 border-accent-100/20 rounded-xl"></div>
                <div className="absolute top-0 right-0 bottom-0 left-0 border border-white/50 rounded-xl"></div>
              </div>

              {/* Prominent Badge */}
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <div className="px-6 py-2 bg-gradient-to-r from-accent-100 to-accent-200 text-white font-bold rounded-b-lg shadow-lg transform translate-y-0">
                  CHOOSE YOUR PLAN
                </div>
              </div>

              {/* Card content with proper padding for badge */}
              <div className="relative p-8 pt-10 z-10">
                {/* Title */}
                <div className="text-center mb-8 pt-2">
                  <Users className="w-12 h-12 mx-auto text-accent-100 mb-4" />
                  <p className="text-gray-600 text-lg">
                    Access all nominee features with premium security
                  </p>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-accent-100/20 my-6"></div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {[
                    "Banking Credentials",
                    "Investment Credentials",
                    "Social Media Platform",
                    "Subscription Services",
                    "Gaming Credentials",
                    "Other Credentials",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-accent-100" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Subscription Plan Dropdown */}
                <div className="relative mb-8">
                  <select
                    value={subscriptionPlan}
                    onChange={(e) => setSubscriptionPlan(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 
                   focus:outline-none focus:border-accent-100 focus:ring-2 focus:ring-accent-100/30
                   transition-all cursor-pointer appearance-none"
                  >
                    <option value="">Select a plan</option>
                    <option value="quarterly">Quarterly - ₹250</option>
                    <option value="halfYearly">Half-Yearly - ₹500</option>
                    <option value="yearly">Yearly - ₹1000</option>
                  </select>

                  {/* Dropdown Arrow */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-accent-100" />
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-gray-700">Total:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
                      ₹{getPlanPrice()}
                    </span>
                  </div>
                </div>

                <div className="relative mt-6 space-y-3">
                  {/* glow */}
                  <div className="absolute -inset-1 bg-accent-100/40 rounded-lg blur-md opacity-75"></div>

                  {/* Start 30-day trial CTA (only when eligible and not already paid/trial) */}
                  {(!isAuthenticated || (trialEligible && !paidActive && !trialActive)) && (
                    <button
                      onClick={startNomineeTrial}
                      disabled={activatingTrial}
                      className="relative w-full py-3.5 rounded-lg font-bold text-lg border border-indigo-300/70 bg-white text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-60"
                    >
                      {activatingTrial
                        ? "Activating trial…"
                        : `Start ${TRIAL_DAYS}-day free trial`}
                    </button>
                  )}

                  {/* Trial status badge (when trial running and not paid) */}
                  {trialActive && !paidActive && (
                    <div className="relative w-full text-center text-sm text-emerald-500">
                      Trial active — {trialRemaining || "time remaining"} •
                      Upgrade anytime
                    </div>
                  )}

                  {/* Paid flow (or fallback after trial) */}
                  <RazorpayPayment
                    feature="NOMINEE"
                    selectedPlan={getFormattedPlan()}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </div>

                {/* Trust badge */}
                <div className="mt-5 text-center">
                  <span className="inline-flex items-center text-xs text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Secure payment, premium support included
                  </span>
                </div>
              </div>

              {/* Bottom glow effect */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-accent-100/5 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Custom animations */}
        <style jsx>{`
          @keyframes float-0 {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-30px) translateX(15px);
            }
          }
          @keyframes float-1 {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(20px) translateX(-20px);
            }
          }
          @keyframes float-2 {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-15px) translateX(-25px);
            }
          }
        `}</style>
      </section>

      {/* ─────────────────────────────────────────
          FAQ SECTION
      ───────────────────────────────────────── */}
      {/* <section className="py-20 bg-dark-100">
        <div className="container mx-auto max-w-screen-xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Nominee FAQs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Got questions about setting up your nominees? We have answers.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-dark-200 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {faq.question}
                </h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <FAQ faqs={faqs} />

      {/* FOOTER */}
      <Footer />
      {showTrialModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowTrialModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-[101] w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Trial activated!
                </h3>
                <p className="mt-1 text-gray-600">
                  Your {TRIAL_DAYS}-day Nominee trial is now active. You can
                  start delegating credentials right away.
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowTrialModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() =>
                  navigate("/dashboard", { state: { id: "nominee" } })
                }
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ChooseNomineePage;
