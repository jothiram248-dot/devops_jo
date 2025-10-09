// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useMeQuery } from "@/features/api/userApiSlice";
// import { useCheckOutMutation } from "@/features/api/orderApiSlice";

// // Utility class for feature code and pricing mapping
// class SubscriptionUtil {
//   static pricingTable = {
//     SMART_NOTIFICATIONS: {
//       quarterly: 250,
//       halfyearly: 500,
//       yearly: 1000,
//     },
//     NOMINEE: {
//       quarterly: 250,
//       halfyearly: 500,
//       yearly: 1000,
//     },
//   };

//   static featureCodeMap = {
//     SN: "SMART_NOTIFICATIONS",
//     NM: "NOMINEE",
//   };

//   static billingCycleMap = {
//     QUAT: "quarterly",
//     HY: "halfyearly",
//     YR: "yearly",
//   };

//   static getFeatureCode(feature) {
//     return Object.keys(this.featureCodeMap).find(
//       (key) => this.featureCodeMap[key] === feature
//     );
//   }

//   static getBillingCode(cycle) {
//     return Object.keys(this.billingCycleMap).find(
//       (key) => this.billingCycleMap[key] === cycle
//     );
//   }

//   static getCodeFromSelection(feature, billingCycle) {
//     const featureCode = this.getFeatureCode(feature);
//     const billingCode = this.getBillingCode(billingCycle);

//     if (featureCode && billingCode) {
//       return `${featureCode}-${billingCode}`;
//     }
//     return null;
//   }
// }

// const RazorpayPayment = ({ feature, selectedPlan, onSuccess, onError }) => {
//   const navigate = useNavigate();
//   const [checkout, { isLoading }] = useCheckOutMutation();
//   const { data: userData } = useMeQuery();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Extract billing cycle from selected plan
//   const extractBillingCycle = (planLabel) => {
//     if (!planLabel) return null;

//     if (planLabel.toLowerCase().includes("quarterly")) {
//       return "quarterly";
//     } else if (
//       planLabel.toLowerCase().includes("half-yearly") ||
//       planLabel.toLowerCase().includes("halfyearly")
//     ) {
//       return "halfyearly";
//     } else if (planLabel.toLowerCase().includes("yearly")) {
//       return "yearly";
//     }

//     return null;
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     if (!isAuthenticated) {
//       navigate("/signin", { state: { from: window.location.pathname } });
//       return;
//     }

//     const billingCycle = extractBillingCycle(selectedPlan);
//     if (!billingCycle) {
//       if (onError) onError("Invalid plan selected");
//       return;
//     }

//     try {
//       // Construct the code based on feature and billing cycle
//       const code = SubscriptionUtil.getCodeFromSelection(feature, billingCycle);

//       if (!code) {
//         if (onError) onError("Invalid feature or billing cycle");
//         return;
//       }

//       // Store feature and plan info in session storage for retrieval after redirect
//       sessionStorage.setItem("razorpay_pending_feature", feature);
//       sessionStorage.setItem("razorpay_pending_plan", selectedPlan);

//       // Call the checkout API
//       const response = await checkout({ code }).unwrap();

//       // Initialize Razorpay
//       const res = await loadRazorpayScript();

//       if (!res) {
//         if (onError) onError("Razorpay SDK failed to load");
//         return;
//       }

//       // Create success URL with order ID
//       const successUrl = `${window.location.origin}/payment/success`;

//       // Configure Razorpay options
//       const options = {
//         key: response.order.key,
//         amount: response.order.amount,
//         currency: "INR",
//         name: "Sacred Secret",
//         image: "/SacredSecret_logo1.svg",
//         order_id: response.order.razorpay_order_id,
//         // Pass the success route and order ID in the callback URL
//         callback_url: `${
//           window.location.origin
//         }/api/paymentverification?orderId=${
//           response.order.id
//         }&redirectUrl=${encodeURIComponent(successUrl)}`,
//         prefill: {
//           name: userData?.me
//             ? `${userData.me.firstName} ${userData.me.lastName}`
//             : "",
//           email: userData?.me?.email || "",
//           contact: userData?.me?.phone || "",
//         },
//         notes: {
//           feature_code: code,
//           feature_name: feature,
//           billing_cycle: billingCycle,
//           plan: selectedPlan,
//         },
//         theme: {
//           color: "#5E249D",
//         },
//         modal: {
//           ondismiss: function () {
//             if (onError) onError("Payment cancelled by user");
//           },
//         },
//         handler: function (razorpayResponse) {
//           // This will be called after successful payment if using popup mode
//           // For redirects, Razorpay will use the callback_url instead

//           // Construct the success URL with all necessary parameters
//           const redirectUrl = `${successUrl}?orderId=${response.order.id}&razorpay_payment_id=${razorpayResponse.razorpay_payment_id}&razorpay_order_id=${razorpayResponse.razorpay_order_id}&razorpay_signature=${razorpayResponse.razorpay_signature}`;

//           // If we're in handler, either redirect manually or call onSuccess
//           if (onSuccess) {
//             onSuccess({
//               ...razorpayResponse,
//               orderId: response.order.id,
//               amount: response.order.amount,
//               plan: selectedPlan,
//               feature,
//             });
//           } else {
//             // Fallback: Redirect to success page
//             window.location.href = redirectUrl;
//           }
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error("Payment initiation failed:", error);
//       if (onError) onError(error.message || "Payment initiation failed");
//     }
//   };

//   return (
//     <button
//       disabled={isLoading || !selectedPlan}
//       onClick={handlePayment}
//       className={`relative w-full py-3.5 rounded-lg font-bold text-lg shadow-lg transition-all ${
//         selectedPlan && !isLoading
//           ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-[1.03] active:scale-[0.98]"
//           : "bg-gray-200 text-gray-400 cursor-not-allowed"
//       }`}
//     >
//       {isLoading ? "Processing..." : "Subscribe Now"}
//     </button>
//   );
// };

// export default RazorpayPayment;


import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMeQuery } from "@/features/api/userApiSlice";
import { useCheckOutMutation } from "@/features/api/orderApiSlice";
import { toast } from "react-hot-toast";

// Utility class for feature code and pricing mapping
class SubscriptionUtil {
  static pricingTable = {
    SMART_NOTIFICATIONS: {
      quarterly: 250,
      halfyearly: 500,
      yearly: 1000,
    },
    NOMINEE: {
      quarterly: 250,
      halfyearly: 500,
      yearly: 1000,
    },
  };

  static featureCodeMap = {
    SN: "SMART_NOTIFICATIONS",
    NM: "NOMINEE",
  };

  static billingCycleMap = {
    QUAT: "quarterly",
    HY: "halfyearly",
    YR: "yearly",
  };

  static getFeatureCode(feature) {
    return Object.keys(this.featureCodeMap).find(
      (key) => this.featureCodeMap[key] === feature
    );
  }

  static getBillingCode(cycle) {
    return Object.keys(this.billingCycleMap).find(
      (key) => this.billingCycleMap[key] === cycle
    );
  }

  static getCodeFromSelection(feature, billingCycle) {
    const featureCode = this.getFeatureCode(feature);
    const billingCode = this.getBillingCode(billingCycle);
    if (featureCode && billingCode) return `${featureCode}-${billingCode}`;
    return null;
  }
}

const RazorpayPayment = ({ feature, selectedPlan, onSuccess, onError }) => {
  const navigate = useNavigate();
  const [checkout, { isLoading }] = useCheckOutMutation();
  const { data: userData } = useMeQuery();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const extractBillingCycle = (planLabel) => {
    if (!planLabel) return null;
    const p = planLabel.toLowerCase();
    if (p.includes("quarterly")) return "quarterly";
    if (p.includes("half-yearly") || p.includes("halfyearly")) return "halfyearly";
    if (p.includes("yearly")) return "yearly";
    return null;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // Callbacks-first emitters: toast only if no callback supplied (prevents duplicates)
  const emitError = (msg) => {
    if (onError) onError(msg);
    else toast.error(msg, { id: "razorpay-error" });
  };
  const emitInfo = (msg) => {
    if (!onError && !onSuccess) toast(msg, { id: "razorpay-info" });
  };
  const emitSuccess = (msg) => {
    if (!onSuccess) toast.success(msg, { id: "razorpay-success" });
  };

  const normalizeApiError = (err) =>
    err?.data?.error ||
    err?.data?.message ||
    err?.error ||
    (typeof err === "string" ? err : null);

  const handlePayment = async () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: window.location.pathname } });
      return;
    }

    const billingCycle = extractBillingCycle(selectedPlan);
    if (!billingCycle) {
      emitError("Invalid plan selected");
      return;
    }

    try {
      // Build product code
      const code = SubscriptionUtil.getCodeFromSelection(feature, billingCycle);
      if (!code) {
        emitError("Invalid feature or billing cycle");
        return;
      }

      // Persist selection pre-redirect
      sessionStorage.setItem("razorpay_pending_feature", feature);
      sessionStorage.setItem("razorpay_pending_plan", selectedPlan);

      // Call checkout API
      let response;
      try {
        response = await checkout({ code }).unwrap();
      } catch (err) {
        const msg =
          normalizeApiError(err) ||
          'You already own this feature or access is denied.';
        emitError(msg);
        return; // stop here
      }

      // If backend (unexpectedly) returns 200 with an "error" field
      if (response?.error) {
        emitError(response.error);
        return;
      }

      // Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        emitError("Razorpay SDK failed to load");
        return;
      }

      const successUrl = `${window.location.origin}/payment/success`;

      const options = {
        key: response.order.key,
        amount: response.order.amount,
        currency: "INR",
        name: "Sacred Secret",
        image: "/SacredSecret_logo1.svg",
        order_id: response.order.razorpay_order_id,
        callback_url: `${window.location.origin}/api/paymentverification?orderId=${
          response.order.id
        }&redirectUrl=${encodeURIComponent(successUrl)}`,
        prefill: {
          name: userData?.me
            ? `${userData.me.firstName} ${userData.me.lastName}`
            : "",
          email: userData?.me?.email || "",
          contact: userData?.me?.phone || "",
        },
        notes: {
          feature_code: code,
          feature_name: feature,
          billing_cycle: billingCycle,
          plan: selectedPlan,
        },
        theme: { color: "#5E249D" },
        modal: {
          ondismiss: function () {
            emitInfo("Payment cancelled");
          },
        },
        handler: function (razorpayResponse) {
          const redirectUrl = `${successUrl}?orderId=${
            response.order.id
          }&razorpay_payment_id=${
            razorpayResponse.razorpay_payment_id
          }&razorpay_order_id=${
            razorpayResponse.razorpay_order_id
          }&razorpay_signature=${razorpayResponse.razorpay_signature}`;

          // Pass details to parent; parent can toast if it wants.
          if (onSuccess) {
            onSuccess({
              ...razorpayResponse,
              orderId: response.order.id,
              amount: response.order.amount,
              plan: selectedPlan,
              feature,
            });
          } else {
            emitSuccess("Payment successful");
            // Fallback: redirect if no onSuccess handler provided
            window.location.href = redirectUrl;
          }
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      const msg =
        normalizeApiError(error) || error?.message || "Payment initiation failed";
      emitError(msg);
    }
  };

  return (
    <button
      disabled={isLoading || !selectedPlan}
      onClick={handlePayment}
      className={`relative w-full py-3.5 rounded-lg font-bold text-lg shadow-lg transition-all ${
        selectedPlan && !isLoading
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-[1.03] active:scale-[0.98]"
          : "bg-gray-200 text-gray-400 cursor-not-allowed"
      }`}
    >
      {isLoading ? "Processing..." : "Subscribe Now"}
    </button>
  );
};

export default RazorpayPayment;
