import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  CheckCircle,
  Download,
  Home,
  RefreshCw,
  AlertCircle,
  Calendar,
  Clock,
  CreditCard,
  Copy,
  CheckCheck,
  File,
  FileText,
  ArrowRight,
  Shield,
  RefreshCcw,
  Award,
  Sparkles,
  Share,
  Mail,
  ExternalLink,
  Gift,
  StarIcon,
  Calendar as CalendarIcon,
  Star,
  LucideFileCheck,
  Wallet,
  CreditCard as CreditCardIcon,
  Timer,
  CheckCircle2,
  Bookmark,
  Box,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  useGetOrderByIdQuery,
  useGetOrderByIdWithPaymentInfoQuery,
} from "@/features/api/orderApiSlice";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useMeQuery } from "@/features/api/userApiSlice";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  // Get order details from URL query parameters
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/payment/success" } });
      return;
    }

    // First, check if we have parameters in the URL query string
    const searchParams = new URLSearchParams(window.location.search);
    const paramOrderId = searchParams.get("orderId");
    const paramPaymentId = searchParams.get("razorpay_payment_id");

    if (paramOrderId) {
      setOrderId(paramOrderId);
    } else if (location.state?.orderId) {
      // If not in URL, check location state
      setOrderId(location.state.orderId);
    }

    if (paramPaymentId) {
      setPaymentId(paramPaymentId);
    } else if (location.state?.paymentId) {
      setPaymentId(location.state.paymentId);
    }

    // Clean up session storage used for the redirect flow
    sessionStorage.removeItem("razorpay_pending_feature");
    sessionStorage.removeItem("razorpay_pending_plan");
  }, [location, navigate, isAuthenticated]);

  const { refetch: refetchUserData } = useMeQuery();

  // Use the same queries as OrderDetailPage
  const { data: orderData, isLoading: orderLoading } = useGetOrderByIdQuery(
    orderId,
    {
      skip: !orderId,
    }
  );

  const { data: paymentData, isLoading: paymentLoading } =
    useGetOrderByIdWithPaymentInfoQuery(orderId, {
      skip: !orderId,
    });

  useEffect(() => {
    // Only run this once when payment data first loads
    if (paymentData && !initialLoadComplete) {
      setInitialLoadComplete(true);

      const payment = paymentData?.payment;
      // If payment exists and was successful, manually trigger a refetch of user data
      if (
        payment &&
        (payment.status === "success" || payment.method === "razorpay")
      ) {
        // Refetch user data in case the automatic invalidation didn't work
        // This is a backup measure, the tag invalidation should handle this
        refetchUserData();
      }
    }
  }, [paymentData, initialLoadComplete, refetchUserData]);

  const isLoading = orderLoading || paymentLoading;
  const order = orderData?.order;
  const payment = paymentData?.payment;

  // Format currency to INR
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date in a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // If already formatted (from updatedAt field)
    if (typeof dateString === "string" && dateString.includes("/")) {
      return dateString;
    }

    // For ISO dates (from start/end date fields)
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Handle copying the order ID
  const handleCopyId = () => {
    if (!order) return;

    navigator.clipboard
      .writeText(order.displayId)
      .then(() => {
        setCopiedId(true);
        toast.success("Order ID copied to clipboard");
        setTimeout(() => setCopiedId(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy order ID");
      });
  };

  const handleGoToHome = () => {
    navigate("/dashboard");
  };

  const handleViewOrderDetails = () => {
    navigate(`/account/order/${orderId}`);
  };

  // Get subscription icon and style
  const getSubscriptionIcon = (featureCode) => {
    if (!featureCode) return <FileText className="w-5 h-5 text-gray-400" />;

    const baseCode = featureCode.split("-")[0];

    switch (baseCode) {
      case "SN":
        return <Shield className="w-6 h-6 text-purple-400" />;
      case "NM":
        return <RefreshCcw className="w-6 h-6 text-blue-400" />;
      default:
        return <FileText className="w-6 h-6 text-gray-400" />;
    }
  };

  // Get feature background style based on feature code
  const getFeatureStyle = (featureCode) => {
    if (!featureCode)
      return {
        gradientFrom: "from-green-900/20",
        gradientTo: "to-green-800/10",
        bgColor: "bg-green-900/20",
        accentColor: "accent-green-500",
        baseColor: "text-green-500",
        lightColor: "text-green-400",
        borderColor: "border-green-500/20",
        bgGradient: "from-green-500/10 to-green-600/5",
        darkBgGradient: "from-green-900/30 to-green-800/20",
      };

    const baseCode = featureCode.split("-")[0];

    switch (baseCode) {
      case "SN":
        return {
          gradientFrom: "from-purple-500/30",
          gradientTo: "to-indigo-600/20",
          bgColor: "bg-purple-900/30",
          accentColor: "accent-purple-500",
          baseColor: "text-purple-500",
          lightColor: "text-purple-400",
          borderColor: "border-purple-500/30",
          bgGradient: "from-purple-500/10 to-indigo-600/5",
          darkBgGradient: "from-purple-900/30 to-indigo-900/20",
        };
      case "NM":
        return {
          gradientFrom: "from-blue-500/30",
          gradientTo: "to-cyan-600/20",
          bgColor: "bg-blue-900/30",
          accentColor: "accent-blue-500",
          baseColor: "text-blue-500",
          lightColor: "text-blue-400",
          borderColor: "border-blue-500/30",
          bgGradient: "from-blue-500/10 to-cyan-600/5",
          darkBgGradient: "from-blue-900/30 to-cyan-900/20",
        };
      default:
        return {
          gradientFrom: "from-teal-500/30",
          gradientTo: "to-emerald-600/20",
          bgColor: "bg-teal-900/30",
          accentColor: "accent-teal-500",
          baseColor: "text-teal-500",
          lightColor: "text-teal-400",
          borderColor: "border-teal-500/30",
          bgGradient: "from-teal-500/10 to-emerald-600/5",
          darkBgGradient: "from-teal-900/30 to-emerald-900/20",
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-accent-100 animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-accent-100/30 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-dark-300/80 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-accent-100" />
            </div>
          </div>
          <p className="mt-4 text-white font-medium">
            Processing your payment...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Please wait while we confirm your order
          </p>
        </div>
      </div>
    );
  }

  if (!order && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-dark-300 rounded-xl overflow-hidden border border-dark-100/20 shadow-xl">
            {/* Error banner */}
            <div className="bg-gradient-to-r from-red-500/80 to-red-600/80 p-6">
              <div className="w-20 h-20 rounded-full bg-dark-300/20 backdrop-blur-sm mx-auto flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Payment Verification Failed
              </h2>
              <p className="text-gray-400 mb-8">
                We couldn't verify your payment. This could be due to a
                technical issue or because the payment wasn't completed.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/account/orders")}
                  className="w-full py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-dark-400/30 transition-colors flex items-center justify-center"
                >
                  <File className="mr-2" size={18} />
                  View Orders
                </button>

                <button
                  onClick={handleGoToHome}
                  className="w-full py-3 bg-accent-100 text-white rounded-lg font-semibold hover:bg-accent-200 transition-colors flex items-center justify-center"
                >
                  <Home className="mr-2" size={18} />
                  Return to Home
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-dark-100/10 text-gray-400 text-sm">
                If you believe this is an error, please contact our support
                team.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get feature details
  const featureCode = order?.purchaseDetails?.featureCode;
  const featureName = order?.purchaseDetails?.featureName || "Subscription";
  const billingCycle = order?.purchaseDetails?.billingCycle
    ? order.purchaseDetails.billingCycle.charAt(0).toUpperCase() +
      order.purchaseDetails.billingCycle.slice(1)
    : "";

  // Calculate amounts
  const subtotal = order?.amount - (payment?.fee || 0);
  const tax = payment?.tax || 0;
  const processingFee = payment?.fee || 0;
  const total = order?.amount;

  // Get feature styling
  const featureStyle = getFeatureStyle(featureCode);

  // Generate feature-specific subscription details
  let subscriptionFeatures = [];

  if (featureCode?.startsWith("SN")) {
    subscriptionFeatures = [
      "Unlimited notification setup",
      "Multiple notification channels (SMS, Email, Call)",
      "Custom reminder intervals",
      "Priority notifications",
      "Payment tracking alerts",
      "Subscription renewal reminders",
    ];
  } else if (featureCode?.startsWith("NM")) {
    subscriptionFeatures = [
      "Banking Credentials",
      "Investment Credentials",
      "Social Media Platform",
      "Subscription Services",
      "Gaming Credentials",
      "Other Credentials",
    ];
  } else {
    subscriptionFeatures = [
      "All premium features included",
      "24/7 customer support",
      "Regular updates and improvements",
    ];
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 via-dark-200 to-dark-100">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ambient gradient overlays */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-accent-100/5 to-transparent opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-purple-500/5 to-transparent opacity-50 z-0"></div>

        {/* Floating gradient spheres */}
        <div className="absolute top-40 right-20 w-80 h-80 bg-accent-100/10 rounded-full filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-30 animate-float-slow-reverse"></div>

        {/* Particle effects */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30 animate-pulse-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Success Confirmation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-dark-300 rounded-2xl overflow-hidden shadow-2xl border border-dark-100/20 relative">
              {/* Premium success banner with animated elements */}
              <div className="relative overflow-hidden">
                {/* Gradient background */}
                <div
                  className={`bg-gradient-to-r from-accent-100 to-accent-200 pt-12 pb-16 px-8 text-center relative`}
                >
                  {/* 3D animated checkmark container */}
                  <motion.div
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.3,
                      damping: 15,
                    }}
                    className="mx-auto relative"
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl transform scale-110"></div>
                    <div className="h-24 w-24 rounded-full bg-white shadow-lg flex items-center justify-center relative mx-auto">
                      {/* Inner glowing effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white via-white to-white/80"></div>
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="relative z-10"
                      >
                        <CheckCircle className="h-14 w-14 text-accent-100 drop-shadow-md" />
                      </motion.div>
                    </div>

                    {/* Animated rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping-slow"></div>
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-ping-slower scale-110"></div>
                  </motion.div>

                  {/* Success messages with staggered animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-6"
                  >
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-sm">
                      Payment Successful!
                    </h1>
                    <p className="text-white/90 text-lg">
                      Your subscription has been activated successfully
                    </p>
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 mix-blend-overlay"></div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 mix-blend-overlay"></div>

                  {/* Floating particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1, 0] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 4,
                        delay: i * 0.8,
                        ease: "easeInOut",
                      }}
                      className="absolute rounded-full bg-white/30 w-3 h-3"
                      style={{
                        left: `${25 + Math.random() * 50}%`,
                        top: `${20 + Math.random() * 50}%`,
                      }}
                    ></motion.div>
                  ))}
                </div>

                {/* Curved shape divider */}
                <div className="absolute -bottom-2 left-0 right-0 h-16 bg-dark-300 rounded-t-[50%] transform translate-y-1/2"></div>
              </div>

              {/* Main content area with order details */}
              <div className="p-8 pt-16">
                {/* Feature and Order reference card */}
                <div className="bg-dark-400/30 rounded-xl border border-dark-100/20 p-6 mb-8 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${featureStyle.gradientFrom} ${featureStyle.gradientTo} rounded-xl flex items-center justify-center p-0.5 shadow-sm`}
                      >
                        <div
                          className={`w-full h-full ${featureStyle.bgColor} rounded-lg flex items-center justify-center`}
                        >
                          {getSubscriptionIcon(featureCode)}
                        </div>
                      </div>

                      <div>
                        <div className="text-lg font-bold text-white">
                          {featureName}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{billingCycle} Subscription</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-900/20 text-green-400 border border-green-500/30">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </div>

                      <div className="text-sm text-gray-400 flex items-center">
                        Order ID:{" "}
                        <span className="text-gray-300 font-mono ml-1">
                          {order?.displayId}
                        </span>
                        <button
                          onClick={handleCopyId}
                          className="ml-2 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {copiedId ? (
                            <CheckCheck className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="bg-dark-400/30 rounded-xl border border-dark-100/20 p-5 mb-8 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-4 justify-between items-center">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">
                        Order Reference
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-mono">
                          {order?.displayId}
                        </span>
                        <button
                          onClick={handleCopyId}
                          className="p-1.5 rounded-md hover:bg-dark-300 transition-colors text-gray-400 hover:text-white"
                          title="Copy Order ID"
                        >
                          {copiedId ? (
                            <CheckCheck className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-900/20 text-green-400 border border-green-500/30">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-accent-100/10 text-accent-100 border border-accent-100/30">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>{billingCycle}</span>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* Information Cards Grid - Responsive 3 columns on desktop, 1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Card 1: Amount */}
                  <div
                    className={`bg-gradient-to-br from-emerald-900/40 to-teal-900/30 rounded-xl border border-emerald-500/30 p-6 relative overflow-hidden`}
                  >
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-emerald-500/10"></div>

                    <div className="flex justify-between items-start mb-4">
                      <Wallet className="w-6 h-6 text-emerald-400" />
                      <div className="text-xs font-semibold uppercase text-emerald-400">
                        Paid
                      </div>
                    </div>

                    <div className="text-2xl font-bold text-white mb-1">
                      {formatCurrency(total)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDate(order?.createdAt)}
                    </div>
                  </div>

                  {/* Card 2: Subscription Period */}
                  <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 rounded-xl border border-blue-500/30 p-6 relative overflow-hidden">
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-blue-500/10"></div>

                    <div className="flex justify-between items-start mb-4">
                      <Calendar className="w-6 h-6 text-blue-400" />
                      <div className="text-xs font-semibold uppercase text-blue-400">
                        Period
                      </div>
                    </div>

                    <div className="text-white mb-1">
                      <span className="font-medium">
                        {formatDate(order?.purchaseDetails?.startDate)}
                      </span>
                      <span className="mx-2 text-gray-500">to</span>
                      <span className="font-medium">
                        {formatDate(order?.purchaseDetails?.endDate)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Active for {billingCycle.toLowerCase()} period
                    </div>
                  </div>

                  {/* Card 3: Payment Method */}
                  <div className="bg-gradient-to-br from-violet-900/40 to-fuchsia-900/30 rounded-xl border border-violet-500/30 p-6 relative overflow-hidden">
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-violet-500/10"></div>

                    <div className="flex justify-between items-start mb-4">
                      <CreditCardIcon className="w-6 h-6 text-violet-400" />
                      <div className="text-xs font-semibold uppercase text-violet-400">
                        Method
                      </div>
                    </div>

                    <div className="text-white mb-1 capitalize font-medium">
                      {payment?.method || "Card Payment"}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {payment?.id
                        ? `Transaction ID: ${payment.id.substring(0, 12)}...`
                        : "Razorpay"}
                    </div>
                  </div>
                </div>

                {/* Features and Benefits Section */}
                <div className="bg-dark-400/20 rounded-xl border border-dark-100/20 p-6 mb-8">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-5 h-5 text-accent-100" />
                    <h3 className="text-lg font-semibold text-white">
                      What You Get
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subscriptionFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <div
                            className={`w-5 h-5 rounded-full bg-accent-100/15 flex items-center justify-center`}
                          >
                            <Check className="h-3 w-3 text-accent-100" />
                          </div>
                        </div>
                        <span className="text-gray-300 ml-3">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Premium Payment Summary Card */}
                <div className="bg-dark-400/20 backdrop-blur-sm rounded-xl border border-dark-100/20 overflow-hidden mb-8">
                  <div className="border-b border-dark-100/20 px-6 py-4 flex items-center justify-between">
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <FileText className="w-5 h-5 text-accent-100" />
                      Payment Summary
                    </h3>
                    <div className="text-sm text-gray-400">
                      {formatDate(order?.createdAt)}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="text-white">
                          {formatCurrency(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax</span>
                        <span className="text-white">
                          {formatCurrency(tax)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Processing Fee</span>
                        <span className="text-white">
                          {formatCurrency(processingFee)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-dark-100/20">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">
                          Total Paid
                        </span>
                        <span className="text-green-400 font-bold">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewOrderDetails}
                    className="py-3.5 border border-accent-100/50 text-accent-100 rounded-lg font-semibold hover:bg-accent-100/5 transition-all flex items-center justify-center"
                  >
                    <File className="mr-2" size={18} />
                    View Order Details
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoToHome}
                    className={`py-3.5 bg-gradient-to-r from-accent-100 to-accent-200 text-white rounded-lg font-semibold hover:brightness-110 transition-all flex items-center justify-center`}
                  >
                    <ArrowRight className="mr-2" size={18} />
                    Continue to Dashboard
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow-reverse {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(0.8);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.1;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        @keyframes ping-slower {
          0% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.05;
          }
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-reverse {
          animation: float-slow-reverse 9s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s infinite;
        }

        .animate-ping-slower {
          animation: ping-slower 5s infinite;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
