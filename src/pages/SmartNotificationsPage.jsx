import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bell,
  BellRing,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  Database,
  FolderLock,
  Gamepad2,
  Key,
  Lock,
  Share2,
  Shield,
  ShieldCheck,
  Sliders,
  TrendingUp,
  Tv,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useSelector } from "react-redux";
import FAQ from "../components/FAQ";
import CredentialTypes from "../components/CredentialTypes";
import SecurityFeatures from "../components/SecurityFeatures";
import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";
import NotificationGrid from "../components/NotificationGrid";
import RazorpayPayment from "@/utils/RazorpayPayment";
import toast from "react-hot-toast";
import {
  useActivateSmartNotificationsTrialMutation,
  useMeQuery,
} from "@/features/api/userApiSlice";
import NotificationHub from "../components/NotificationGrid";

export const notificationFaqs = [
  {
    question: "How do notifications work?",
    answer:
      "Our smart notification system tracks your subscription dates and sends timely reminders through your chosen channels (Email, SMS, WhatsApp). You can set custom reminder intervals and choose when to be notified.",
  },
  {
    question: "What types of notifications can I set up?",
    answer:
      "You can set up notifications for social media subscriptions, business tools, entertainment platforms, online gift vouchers, and other automated payments. Each type can be customized with different reminder intervals.",
  },

  {
    question: "How secure are my notification settings?",
    answer:
      "All your notification settings and subscription details are encrypted and stored securely. We use end-to-end encryption for notification delivery and never share your data with third parties.",
  },
  {
    question: "Can I manage notifications for multiple accounts?",
    answer:
      "Yes, you can set up and manage notifications for multiple accounts across different platforms. Each can have its own reminder settings and notification preferences.",
  },
];

// const notificationTypes = [
//   {
//     title: "Social Media Subscriptions",
//     icon: CreditCard,
//     // image: '/images/banking.jpg',
//     image: "${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/Banking_credentials.jpg",
//     description:
//       "Track your social media platform subscriptions and premium features.",
//   },
//   {
//     title: "Business Tools Subscriptions",
//     icon: TrendingUp,
//     // image: "/images/investment.jpg",
//     image: "${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/Investment_credneitals.jpg",

//     description:
//       "Manage your business software and tool subscriptions efficiently.",
//   },
//   {
//     title: "Entertainment Platform Subscriptions",
//     icon: Tv,
//     // image: "/images/entertainment.jpg",
//     image: "${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/Entertainment.jpg",

//     description: "Keep track of your streaming and entertainment subscriptions",
//   },
//   {
//     title: "Online Gift Voucher",
//     icon: Share2,
//     image: "${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/SocialMedia.jpg",
//     description: "Never let your gift cards and vouchers expire",
//   },
//   {
//     title: "Auto Payment Tracking",
//     icon: Gamepad2,
//     image: "${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/gaming_credentials.jpg",
//     description: "Monitor all your automated payments and subscriptions",
//   },
// ];
// const TRIAL_DAYS = 30;
const features = [
  {
    title: "Secure Delivery",
    icon: ShieldCheck,
    description:
      "State-of-the-art security measures to protect your notifications.",
    image: `${
      import.meta.env.VITE_DO_BUCKET_URL
    }/assets/Images/smart_notification/Secure_Delivery.jpg`,
    details: [
      "End-to-end encrypted notification delivery system",
      "TLS 1.3 for all data in transit",
      "Regular security audits and penetration testing",
      "Compliance with industry-standard security protocols",
    ],
  },
  {
    title: "Private Data",
    icon: Lock,
    description: "Ensuring that your data remains confidential and protected.",
    image: `${
      import.meta.env.VITE_DO_BUCKET_URL
    }/assets/Images/smart_notification/Private_data.jpg`,
    details: [
      "Your subscription details are kept completely private",
      "Data anonymization techniques applied",
      "Strict access controls and user authentication",
      "Regular data purging of unnecessary information",
    ],
  },
  {
    title: "Reliable Alerts",
    icon: BellRing,
    description:
      "Ensuring that your notifications always reach their destination.",
    image: `${
      import.meta.env.VITE_DO_BUCKET_URL
    }/assets/Images/smart_notification/Reliable_Alerts.jpg`,
    details: [
      "Multiple notification channels ensure delivery",
      "Automatic failover to secondary delivery methods",
      "Real-time monitoring of delivery status",
      "Retry mechanism for failed notifications",
    ],
  },
  {
    title: "Real-time Updates",
    icon: Clock,
    description: "Lightning-fast delivery of time-sensitive information.",
    image: `${
      import.meta.env.VITE_DO_BUCKET_URL
    }/assets/Images/smart_notification/Real-time_Updates.jpg`,
    details: [
      "Instant notifications for important events",
      "Low-latency push notification system",
      "WebSocket support for live updates",
      "Customizable notification priorities",
    ],
  },
  {
    title: "Analytics and Insights",
    icon: BarChart,
    description:
      "Powerful tools to understand and optimize your notification strategy.",
    image: `${
      import.meta.env.VITE_DO_BUCKET_URL
    }/assets/Images/smart_notification/Analytics_and_Insights.jpg`,
    details: [
      "Advanced analytics dashboard for user engagement tracking",
      "Predictive analysis for optimal notification timing",
      "Segmentation tools for targeted notification campaigns",
      "Conversion tracking and ROI measurement for notifications",
    ],
  },
  {
    title: "Customization Options",
    icon: Sliders,
    description: "Tailor the system to fit your unique requirements.",
    image: `${
      import.meta.env.VITE_DO_BUCKET_URL
    }/assets/Images/smart_notification/Customization_Options.png`,
    details: [
      "Fully customizable notification templates",
      "Branding options for white-label solutions",
      "API for seamless integration with existing systems",
      "Flexible notification scheduling and frequency controls",
    ],
  },
];

const SmartNotificationsPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const videoRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Read current user + trial state
  const { data: meData, refetch: refetchMe } = useMeQuery();
  const [activateTrial, { isLoading: activatingTrial }] =
    useActivateSmartNotificationsTrialMutation();

  const smartTrial = meData?.me?.features?.trials?.smartNotifications;
  const paidActive = !!meData?.me?.features?.smartNotifications;
  const trialActive =
    smartTrial?.hasAccess && smartTrial?.status === "trial-active";
  const trialEligible =
    smartTrial?.status === "trial-eligible" ||
    smartTrial?.trial?.eligible === true;
  const trialRemaining = smartTrial?.trial?.remainingHuman;

  // --- add below trial flags ---
  const TRIAL_DAYS = 30;

  const goToSubscription = () => {
    const el = document.getElementById("sm"); // subscription section container
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCardClick = () => {
    // If not paid and no active trial => scroll to subscription
    if (!paidActive && !trialActive) {
      goToSubscription();
      return;
    }
    // Otherwise go straight to dashboard notifications tab
    navigate("/dashboard", { state: { id: "smartNotifications" } });
  };

  const ctaLabel =
    paidActive || trialActive
      ? "Go to Dashboard"
      : `Start ${TRIAL_DAYS} days free trial`;

  const handleHeroCta = () => {
    if (paidActive || trialActive) {
      navigate("/dashboard", { state: { id: "smartNotifications" } });
    } else {
      goToSubscription();
    }
  };

  const startTrial = async () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: window.location.pathname } });
      return;
    }

    try {
      const res = await activateTrial({
        featureKey: "smartNotifications",
      }).unwrap();
      toast.success(res?.message || "Trial activated!");
      setShowTrialModal(true);
      await refetchMe(); // refresh UI immediately
    } catch (e) {
      const msg =
        e?.data?.message ||
        e?.data?.error ||
        e?.message ||
        "Couldn’t start trial, please try again.";
      toast.error(msg);
    }
  };

  const handlePlanChange = (value) => {
    setSelectedPlan(value);
    setIsOpen(false);
  };
  // const handlePlanChange = (event) => {
  //   setSelectedPlan(event.target.value);
  // };
  const { scrollY } = useScroll();
  const handleGoToDown = useCallback(() => {
    const goToStartForFree = document.getElementById("gotostartforfree");
    if (goToStartForFree) {
      goToStartForFree.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
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

  // const handleGetStarted = () => {
  //   if (!isAuthenticated) {
  //     navigate("/signin", { state: { from: "/payment" } });
  //     return;
  //   }

  //   navigate("/payment/success", {
  //     state: {
  //       subscription: {
  //         id: "starter",
  //         title: "Free Forever Plan",
  //         price: 0,
  //         features: [
  //           "Store unlimited credentials",
  //           "Secure encryption",
  //           "Multi-factor authentication",
  //           "Mobile access",
  //           "Email support",
  //           "Regular security updates",
  //         ],
  //       },
  //       orderId: "free_" + Math.random().toString(36).substr(2, 9),
  //     },
  //   });
  // };

  // Handler for successful payment
  const handlePaymentSuccess = (paymentData) => {
    toast.success("Payment successful!");
    navigate("/payment/success", {
      state: {
        subscription: {
          id: paymentData.orderId,
          title: "Smart Notifications " + selectedPlan,
          price: paymentData.amount / 100, // Convert from paise to rupees
          features: [
            // "Unlimited notification setup",
            // "Multiple notification channels (SMS, Email, Call)",
            // "Custom reminder intervals",
            // "Priority notifications",
            // "Payment tracking alerts",
            // "Subscription renewal reminders",

            "Store unlimited credentials",
            "Secure encryption",
            "Multi-factor authentication",
            "Mobile access",
            "Email support",
            "Regular security updates",
          ],
        },
        orderId: paymentData.orderId,
        paymentId: paymentData.razorpay_payment_id,
      },
    });
  };

  const handlePaymentError = (error) => {
    toast.error(error || "Payment failed. Please try again.");
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      // Handle subscription logic here
      console.log(`Subscribed to ${selectedPlan}`);
    }
  };

  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  return (
    <div className="min-h-screen bg-dark-100">
      {/* Hero Section */}
      <section
      ref={videoRef}
      className="relative overflow-hidden"
      id="smart-notifications-hero"
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
          {/* Cinematic Background Video with Custom Masking */}
          <video
            autoPlay
            muted
            loop
            playsInline
            id="bg-video"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source
              src={`${
                import.meta.env.VITE_DO_BUCKET_URL
              }/assets/Images/smart_notifications.mp4`}
              type="video/mp4"
            />
          </video>

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
                Smart{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Notifications
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
                  Receive{" "}
                  <span className="highlight-text">
                    important notifications
                  </span>{" "}
                  for automatic payments—whether subscriptions, credit cards,
                  or other recurring charges{" "}
                  <span className="highlight-text">
                    linked to your payment method
                  </span>
                  . Stay informed and{" "}
                  <span className="highlight-text">
                    manage your auto-renewals
                  </span>{" "}
                  and unused subscriptions.
                </p>

                {/* CTA Button - Compact */}
                <div className="mt-4 lg:mt-5 flex justify-start">
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 20px rgba(176, 132, 199, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleHeroCta}
                    className="px-6 py-2.5 lg:px-8 lg:py-3 text-sm md:text-base font-semibold rounded-full bg-gradient-to-r from-indigo-100 via-cyan-100 to-purple-100 text-gray-800 transition-all shadow-lg border border-white/30 relative overflow-hidden group neo-button"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/0 via-white/60 to-indigo-200/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10 flex items-center font-bold">
                      {ctaLabel} <span className="ml-2 arrow-icon">→</span>
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Column: Video with Player - Compact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative flex justify-center items-center"
              >
                {/* Video/Image Container - Compact */}
                <div className="w-full max-w-2xl mx-auto">
                  {/* Video with Styling */}
                  <div className="relative rounded-xl overflow-hidden shadow-2xl group border border-white/20 video-frame">
                    {/* Corner Accents - Smaller */}
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-400/70 rounded-tl-xl z-20"></div>
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-purple-500/70 rounded-br-xl z-20"></div>

                    {/* Image/Video Player */}
                    <div
                      className="relative z-10"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <VideoPlayer
                        videoUrl="https://www.youtube.com/watch?v=I-720U4Iur0"
                        title="Smart Notifications"
                      />

                      {/* Overlay */}
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

      {/* CSS Styles */}
      <style jsx>{`
        .hero-viewport {
          position: relative;
          height: 100svh;
          height: 100dvh;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        /* Neo-Morphic Glass Effect with Depth */
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

        .neo-glass:before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(56, 189, 248, 0.08),
            transparent
          );
          transform: translateX(-100%);
          animation: neo-shine 8s infinite;
          z-index: -1;
        }

        /* Enterprise-grade heading style */
        .enterprise-heading {
          letter-spacing: -0.02em;
          line-height: 1.1;
          font-weight: 800;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Video container styling */
        .video-container {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          width: 100%;
          aspect-ratio: 16/9;
          background-color: rgba(17, 24, 39, 0.7);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2),
            0 10px 10px -5px rgba(0, 0, 0, 0.1);
        }

        .text-gradient-animated {
          background: linear-gradient(
            to right,
            #38bdf8,
            #818cf8,
            #c084fc,
            #38bdf8
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradient-text 6s linear infinite;
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

        /* Holographic Card Effects */
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
        @keyframes neo-shine {
          0% {
            transform: translateX(-100%);
          }
          20%,
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradient-text {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

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

      {/* Notification Types Section */}
      {/* <NotificationGrid  /> */}

      {/* Notification Types Section */}
      <NotificationHub
        onCardClick={(categoryId) => {
          // not signed in → send to sign-in
          if (!isAuthenticated) {
            navigate("/signin", { state: { from: window.location.pathname } });
            return;
          }

          // signed in, but no payment & no active trial → scroll to subscription
          if (!paidActive && !trialActive) {
            document
              .getElementById("sm")
              ?.scrollIntoView({ behavior: "smooth" });
            return;
          }

          // paid or trial active → go to the category page (or your dashboard tab)
          navigate(`/notifications/${categoryId}`);
          // or: navigate("/dashboard", { state: { id: "smartNotifications" } });
        }}
      />

      {/*  Features Section - Premium Style */}
      {/* 
<section className="relative py-20 overflow-hidden">
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black"></div>

    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.2),transparent_70%),radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.2),transparent_70%)]"></div>

    <div className="absolute top-1/4 right-1/6 w-80 h-80 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-1/4 left-1/6 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>

    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-5"></div>

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
      <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        <div className="h-px w-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
          Secure and Reliable
        </span>
        <br />
        <span className="relative inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Notifications
          <span className="absolute -top-2 -right-8 w-6 h-6 rounded-full bg-purple-500/10 blur-sm"></span>
          <span className="absolute bottom-0 -left-4 w-4 h-4 rounded-full bg-indigo-500/10 blur-sm"></span>
        </span>
      </h2>

      <div className="flex justify-center items-center gap-3 my-8">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/70"></div>
        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/70"></div>
      </div>

      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        <span className="text-white font-medium">
          Our notification system is built with security and reliability
          in mind.
        </span>{" "}
        We ensure your alerts remain private, protected, and delivered
        exactly when you need them.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const colorSchemes = [
          {
            bgColor: "bg-white",
            accentColor: "bg-indigo-500",
            color: "from-indigo-500 to-purple-600",
            textColor: "text-indigo-600",
            borderColor: "border-indigo-200",
          },
          {
            bgColor: "bg-white",
            accentColor: "bg-teal-500",
            color: "from-teal-500 to-emerald-600",
            textColor: "text-teal-600",
            borderColor: "border-teal-200",
          },
          {
            bgColor: "bg-white",
            accentColor: "bg-amber-500",
            color: "from-amber-500 to-orange-600",
            textColor: "text-amber-600",
            borderColor: "border-amber-200",
          },
          {
            bgColor: "bg-white",
            accentColor: "bg-rose-500",
            color: "from-rose-500 to-pink-600",
            textColor: "text-rose-600",
            borderColor: "border-rose-200",
          },
          {
            bgColor: "bg-white",
            accentColor: "bg-blue-500",
            color: "from-blue-500 to-sky-600",
            textColor: "text-blue-600",
            borderColor: "border-blue-200",
          },
          {
            bgColor: "bg-white",
            accentColor: "bg-purple-500",
            color: "from-purple-500 to-violet-600",
            textColor: "text-purple-600",
            borderColor: "border-purple-200",
          },
        ];

        const colors = colorSchemes[index % colorSchemes.length];

        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative h-auto min-h-[300px] overflow-hidden rounded-2xl shadow-lg group cursor-pointer [perspective:1200px]"
          >
            <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]">
                <div
                  className={`absolute inset-0 ${colors.bgColor}`}
                ></div>

                <style jsx>{`
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
                          fill="currentColor"
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

                <div
                  className={`absolute top-0 right-0 w-full h-full opacity-5 transform rotate-[-15deg] translate-x-1/3 -translate-y-1/4 ${colors.accentColor} rounded-full`}
                ></div>

                <div
                  className={`absolute top-0 left-0 w-full h-1 ${colors.accentColor}`}
                ></div>

                <div
                  className={`absolute top-4 left-4 group-hover:left-5 transition-all duration-500 bg-white border ${colors.borderColor} p-3 rounded-2xl shadow-lg`}
                >
                  <div
                    className={`relative overflow-hidden bg-gradient-to-br ${colors.color} rounded-xl p-3 shadow-inner`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      <div className="absolute -inset-[100%] animate-shine bg-white/30 rotate-[25deg] transform-gpu"></div>
                    </div>
                    {React.createElement(feature.icon, {
                      className:
                        "w-6 h-6 text-white drop-shadow-lg relative z-10",
                    })}
                  </div>
                </div>

                <div
                  className={`absolute top-0 right-0 w-20 h-20 opacity-60 bg-gradient-to-bl ${
                    feature.bgColor || "bg-white"
                  } to-transparent rounded-bl-full`}
                ></div>

                <div className="absolute inset-x-0 top-28 px-6">
                  <h3
                    className={`text-xl font-bold mb-2 text-gray-800 group-hover:${
                      feature.textColor || "text-indigo-500"
                    } transition-colors duration-300`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-md leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div
                  className={`absolute left-0 top-1/4 bottom-1/4 w-1 ${
                    feature.borderColor || "bg-indigo-200"
                  }`}
                ></div>

                <div
                  className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 ${
                    feature.accentColor || "bg-indigo-500"
                  }`}
                ></div>

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

              <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className={`absolute inset-0 bg-white`}></div>

                <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${
                    feature.color || "from-indigo-500 to-purple-600"
                  }`}
                ></div>
                <div
                  className={`absolute left-0 top-2 bottom-0 w-2 bg-gradient-to-b ${
                    feature.color || "from-indigo-500 to-purple-600"
                  } opacity-10`}
                ></div>

                <div
                  className={`absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 bg-gradient-to-bl ${
                    feature.color || "from-indigo-500 to-purple-600"
                  }`}
                  style={{ transform: "translate(50%, -50%)" }}
                ></div>

                <div className="relative h-full flex flex-col p-6">
                  <div className="absolute top-3 right-4">
                    <div
                      className={`relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br ${
                        feature.color || "from-indigo-500 to-purple-600"
                      } text-white shadow-lg border border-white/10`}
                    >
                      {React.createElement(feature.icon, {
                        className: "w-5 h-5",
                        strokeWidth: 1.5,
                      })}
                      <div
                        className={`absolute -bottom-1.5 inset-x-1 h-2 bg-black/20 blur rounded-full`}
                      ></div>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <h3
                      className={`text-xl font-bold mb-1 text-gray-800`}
                    >
                      {feature.title}
                    </h3>
                    <div
                      className={`h-0.5 w-10 ${
                        feature.accentColor || "bg-indigo-500"
                      }`}
                    ></div>
                  </div>

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
                        <div
                          className={`flex-shrink-0 w-5 h-5 mr-3 rounded-full bg-gradient-to-br ${
                            feature.color ||
                            "from-indigo-500 to-purple-600"
                          } flex items-center justify-center text-white`}
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

                        <span className="text-sm font-medium">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

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
            `}</style>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>
*/}

      <section className="py-20 relative overflow-hidden">
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
          id="sm"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent"
              id="startfreetrialheader"
            >
              Start Your Free Trial
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Try our comprehensive notification system risk-free for{" "}
              {TRIAL_DAYS} days.
            </p>
          </motion.div>

          {/* Premium Light-Themed Pricing Card with Prominent Glow */}
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
                  "0 0 30px rgba(122, 162, 247, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-white"></div>

              {/* Glowing border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 border-4 border-accent-100/20 rounded-xl"></div>
                <div className="absolute top-0 right-0 bottom-0 left-0 border border-white/50 rounded-xl"></div>
              </div>

              {/* Prominent Badge - Positioned higher to be fully visible */}
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <div className="px-6 py-2 bg-gradient-to-r from-accent-100 to-accent-200 text-white font-bold rounded-b-lg shadow-lg transform translate-y-0">
                  ELITE PLAN
                </div>
              </div>

              {/* Card content with proper padding for badge */}
              <div className="relative p-8 pt-10 z-10">
                {/* Price Display */}
                <div className="text-center mb-6 mt-2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Smart Notifications
                  </h3>
                  <p className="text-gray-600 text-lg mb-4">
                    Get premium notification services with advanced features.
                  </p>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-blue-500/20 my-6"></div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {[
                    "Store unlimited credentials",
                    "Secure encryption",
                    "Multi-factor authentication",
                    "Mobile access",
                    "Email support",
                    "Regular security updates",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center py-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100/10 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-accent-100" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Subscription Plan Dropdown */}
                <div className="mb-6 relative">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select a subscription plan:
                  </label>

                  <div
                    className="relative w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 
                       focus:border-accent-100 focus:ring-2 focus:ring-accent-100/50 transition-all 
                       text-lg font-semibold cursor-pointer select-none flex justify-between items-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span>{selectedPlan ? selectedPlan : "Choose a plan"}</span>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-blue-500" />
                    </motion.div>
                  </div>

                  {/* Dropdown Options */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg z-20"
                      >
                        {[
                          { value: "quarterly", label: "Quarterly - ₹250" },
                          { value: "halfYearly", label: "Half-Yearly - ₹500" },
                          { value: "yearly", label: "Yearly - ₹1000" },
                        ].map((option, index) => (
                          <motion.li
                            key={index}
                            onClick={() => handlePlanChange(option.label)}
                            whileHover={{
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                            }}
                            className="px-4 py-3 text-gray-700 cursor-pointer transition-all hover:text-blue-500"
                          >
                            {option.label}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA Button with prominent glow */}
                <div className="relative space-y-3">
                  <div className="absolute -inset-1 bg-blue-500/40 rounded-lg blur-md"></div>

                  {/* Start 30-day Trial (only when eligible and not already paid/trial) */}
                  {(!isAuthenticated ||
                    (trialEligible && !paidActive && !trialActive)) && (
                    <button
                      onClick={startTrial}
                      disabled={activatingTrial}
                      className="relative w-full py-3.5 rounded-lg font-bold text-lg border border-indigo-300/70 bg-white text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-60"
                    >
                      {activatingTrial
                        ? "Activating trial…"
                        : `Start ${TRIAL_DAYS}-day free trial`}
                    </button>
                  )}

                  {/* Trial status badge (only when trial is running and not paid) */}
                  {trialActive && !paidActive && (
                    <div className="relative w-full text-center text-sm text-emerald-500">
                      Trial active — {trialRemaining || "time remaining"} •
                      Upgrade anytime
                    </div>
                  )}

                  {/* Existing paid subscription CTA (unchanged) */}
                  <RazorpayPayment
                    feature="SMART_NOTIFICATIONS"
                    selectedPlan={selectedPlan}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </div>

                {/* Trust badge */}
                <div className="mt-5 text-center">
                  {/* <span className="inline-flex items-center text-xs text-gray-500">
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
                    Secure & encrypted, {TRIAL_DAYS}-day free trial
                  </span> */}
                </div>
              </div>

              {/* Bottom glow effect */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
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

      {/* FAQ Section */}
      <FAQ faqs={notificationFaqs} />

      {/* Footer */}
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
                  Your {TRIAL_DAYS}-day Smart Notifications trial is now active.
                  You can start setting reminders right away.
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
                  navigate("/dashboard", {
                    state: { id: "smartNotifications" },
                  })
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

export default SmartNotificationsPage;
