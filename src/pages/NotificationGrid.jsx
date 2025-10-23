import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, BarChart2, Tv, Gift, Repeat } from "lucide-react";
import { useNavigate } from "react-router-dom";

const notificationTypes = [
  {
    id: "socialMedia",
    title: "Social Media Subscriptions",
    icon: CreditCard,
    image: "/assets/Images/smart_notification/social_Media_Subscription.jpg",
    description: "Get notified before your social media auto-renewal.",
  },
  {
    id: "businessTools",
    title: "Business Tools Subscriptions",
    icon: BarChart2,
    image: "/assets/Images/smart_notification/Business_Tool.jpg",
    description: "Get notified before your business tools auto-renewal.",
  },
  {
    id: "entertainmentPlatform",
    title: "Entertainment Platform Subscriptions",
    icon: Tv,
    image: "/assets/Images/smart_notification/Entertainment.jpg",
    description:
      "Get notified before your streaming and entertainment platforms auto-renewal.",
  },
  {
    id: "onlineGiftVoucher",
    title: "Online Gift Voucher",
    icon: Gift,
    image: "/assets/Images/smart_notification/gift_voucher.jpg",
    description: "Get notified before your gift vouchers expire.",
  },
  {
    id: "otherAutoPay",
    title: "Other Payments and Billing Cycle",
    icon: Repeat,
    image: "/assets/Images/smart_notification/Auto_payment.jpg",
    description: "Get notified before any auto-payment deduction or billing cycle.",
  },
];

const PremiumNotificationCard = ({ feature, index, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className="relative h-full rounded-2xl overflow-hidden shadow-xl group will-change-transform flex flex-col cursor-pointer"
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
      </div>

      {/* Card border and accent */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-800/50 group-hover:border-accent-100/30 transition-colors duration-300">
        {/* Top border accent with glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-100 via-purple-600 to-accent-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Subtle gradient overlay */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent">
          {/* Animated gradient shimmer */}
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
            {/* Decorative element */}
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

        {/* Content area with fixed spacing */}
        <div className="mt-auto">
          {/* Title with consistent height */}
          <div className="mb-3 min-h-[3.5rem] flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-100 transition-colors duration-300 truncate text-[clamp(1.05rem,1.1vw+0.95rem,1.35rem)]">
              {feature.title}
            </h3>

            {/* Animated underline */}
            <div className="h-0.5 w-0 bg-gradient-to-r from-accent-100 to-accent-200 mt-2 rounded-full group-hover:w-24 transition-all duration-500 ease-out"></div>
          </div>

          {/* Description */}
          <p className="text-[0.95rem] text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-light">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const NotificationHub = ({ onCardClick }) => {
  const [isInView, setIsInView] = useState(false);
  const navigate = useNavigate();

  // Updated function to navigate to specific notification category
  const goToNotificationCategory = (categoryId) => {
    if (onCardClick) {
      onCardClick();
    } else {
      navigate(`/notifications/${categoryId}`);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("notification-hub-section");
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
        id="notification-hub-section"
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

        {/* Premium gradient overlays */}
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
              Your Centralized Notifications Hub
            </h2>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
              Stay in control of your subscription renewals and payment cycles with our advanced notification system.
            </p>
          </motion.div>

          {/* First row - 3 cards */}
          <div className="grid md:grid-cols-3 gap-8 relative z-10 mb-8">
            {notificationTypes.slice(0, 3).map((feature, index) => (
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
                <PremiumNotificationCard
                  feature={feature}
                  index={index}
                  onClick={() => goToNotificationCategory(feature.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* Second row - 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10 max-w-4xl mx-auto">
            {notificationTypes.slice(3, 5).map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.5,
                  delay: (index + 3) * 0.1,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <PremiumNotificationCard
                  feature={feature}
                  index={index + 3}
                  onClick={() => goToNotificationCategory(feature.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Define required animations */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%) skewX(-12deg);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.1;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow-reverse {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(15px);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-medium-reverse {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-float-slow-reverse {
          animation: float-slow-reverse 13s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 7s ease-in-out infinite;
        }

        .animate-float-medium-reverse {
          animation: float-medium-reverse 9s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default NotificationHub;