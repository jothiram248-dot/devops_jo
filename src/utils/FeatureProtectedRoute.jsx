// import { useMeQuery } from "@/features/api/userApiSlice";
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const PremiumLoader = () => (
//   <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
//     <div className="flex flex-col items-center">
//       {/* Spinner animation */}
//       <div className="relative w-16 h-16 mb-4">
//         {/* Outer spinning circle */}
//         <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

//         {/* Inner spinning circle (opposite direction) */}
//         <div
//           className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-500 border-l-transparent animate-spin"
//           style={{ animationDirection: "reverse", animationDuration: "1s" }}
//         ></div>

//         {/* Center logo */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
//             <span className="text-white font-bold text-xs">SS</span>
//           </div>
//         </div>
//       </div>

//       {/* Loading text */}
//       <div className="text-white text-sm font-medium tracking-wider">
//         LOADING
//       </div>

//       {/* Simple loading dots */}
//       <div className="flex mt-2 space-x-1">
//         <div
//           className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
//           style={{ animationDelay: "0s" }}
//         ></div>
//         <div
//           className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
//           style={{ animationDelay: "0.2s" }}
//         ></div>
//         <div
//           className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
//           style={{ animationDelay: "0.4s" }}
//         ></div>
//       </div>
//     </div>
//   </div>
// );

// /**
//  * A component that checks if the user has the specified feature activated
//  * before allowing access to the protected route.
//  */
// const FeatureProtectedRoute = ({ children, featureName }) => {
//   const location = useLocation();
//   const { data, isLoading, error } = useMeQuery();

//   // If loading, show the loader
//   if (isLoading) {
//     return <PremiumLoader />;
//   }

//   // If error, or user not found, redirect to signin
//   if (error || !data?.me) {
//     return (
//       <Navigate to="/signin" state={{ from: location.pathname }} replace />
//     );
//   }

//   // Check if the user has the required feature activated
//   const hasFeature = data.me.features && data.me.features[featureName] === true;

//   // If the feature is not active, redirect to the upgrade page
//   if (!hasFeature) {
//     // You can redirect to a specific page, such as the feature's main page or an upgrade page
//     const redirectPath =
//       featureName === "nominee"
//         ? "/choose-nominee"
//         : featureName === "smartNotifications"
//         ? "/smart-notifications"
//         : "/dashboard";

//     return (
//       <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
//     );
//   }

//   // If the user has the feature, render the children
//   return children;
// };

// export default FeatureProtectedRoute;


// --------------------------------- v2 with trail support ---------------------------------

// src/components/FeatureProtectedRoute.jsx
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useMeQuery } from "@/features/api/userApiSlice";

// const PremiumLoader = () => (
//   <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
//     <div className="flex flex-col items-center">
//       <div className="relative w-16 h-16 mb-4">
//         <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
//         <div
//           className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-500 border-l-transparent animate-spin"
//           style={{ animationDirection: "reverse", animationDuration: "1s" }}
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
//             <span className="text-white font-bold text-xs">SS</span>
//           </div>
//         </div>
//       </div>

//       <div className="text-white text-sm font-medium tracking-wider">
//         LOADING
//       </div>

//       <div className="flex mt-2 space-x-1">
//         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
//         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
//         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
//       </div>
//     </div>
//   </div>
// );

// /**
//  * Trial-aware route guard:
//  * Grants access if:
//  *  - Top-level feature flag is true, OR
//  *  - trials[featureName].paidActive === true, OR
//  *  - trials[featureName] is trial-active with hasAccess === true
//  */
// const FeatureProtectedRoute = ({ children, featureName }) => {
//   const location = useLocation();
//   const { data, isLoading, isFetching, error } = useMeQuery();

//   const fromPath = `${location.pathname}${location.search || ""}${location.hash || ""}`;

//   if (isLoading || isFetching) {
//     return <PremiumLoader />;
//   }

//   if (error || !data?.me) {
//     return <Navigate to="/signin" state={{ from: fromPath }} replace />;
//   }

//   const features = data.me.features || {};
//   const trialObj = features?.trials?.[featureName];

//   const topLevelPaid = !!features?.[featureName];               // e.g., features.smartNotifications === true
//   const paidViaTrial = !!trialObj?.paidActive;                  // backend may reflect paid here
//   const trialActive = !!(trialObj?.hasAccess && trialObj?.status === "trial-active");

//   const hasFeatureAccess = topLevelPaid || paidViaTrial || trialActive;

//   if (!hasFeatureAccess) {
//     const redirectPath =
//       featureName === "nominee"
//         ? "/choose-nominee"
//         : featureName === "smartNotifications"
//         ? "/smart-notifications"
//         : "/dashboard";

//     return <Navigate to={redirectPath} state={{ from: fromPath }} replace />;
//   }

//   return children;
// };

// export default FeatureProtectedRoute;


// ----------------------------------- with nominee kyc and emergency contact check -----------------------------------

// src/components/FeatureProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useMeQuery } from "@/features/api/userApiSlice";

const PremiumLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div
          className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-500 border-l-transparent animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">SS</span>
          </div>
        </div>
      </div>

      <div className="text-white text-sm font-medium tracking-wider">
        LOADING
      </div>

      <div className="flex mt-2 space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  </div>
);

/**
 * Trial-aware route guard:
 * Grants access if:
 *  - Top-level feature flag is true, OR
 *  - trials[featureName].paidActive === true, OR
 *  - trials[featureName] is trial-active with hasAccess === true
 * 
 * ADDITIONAL NOMINEE PROTECTION:
 *  - For nominee feature, also requires:
 *    - Aadhaar verification (aadhaarVerified === true)
 *    - At least one emergency contact (contacts > 0)
 */
const FeatureProtectedRoute = ({ children, featureName }) => {
  const location = useLocation();
  const { data, isLoading, isFetching, error } = useMeQuery();

  const fromPath = `${location.pathname}${location.search || ""}${location.hash || ""}`;

  if (isLoading || isFetching) {
    return <PremiumLoader />;
  }

  if (error || !data?.me) {
    return <Navigate to="/signin" state={{ from: fromPath }} replace />;
  }

  const features = data.me.features || {};
  const trialObj = features?.trials?.[featureName];

  const topLevelPaid = !!features?.[featureName];               // e.g., features.smartNotifications === true
  const paidViaTrial = !!trialObj?.paidActive;                  // backend may reflect paid here
  const trialActive = !!(trialObj?.hasAccess && trialObj?.status === "trial-active");

  const hasFeatureAccess = topLevelPaid || paidViaTrial || trialActive;

  // First check: Does user have access to the feature at all?
  if (!hasFeatureAccess) {
    const redirectPath =
      featureName === "nominee"
        ? "/choose-nominee"
        : featureName === "smartNotifications"
        ? "/smart-notifications"
        : "/dashboard";

    return <Navigate to={redirectPath} state={{ from: fromPath }} replace />;
  }

  // ADDITIONAL CHECK FOR NOMINEE FEATURE
  // Even if they have the nominee feature unlocked, they need:
  // 1. Aadhaar verified
  // 2. At least one emergency contact
  if (featureName === "nominee") {
    const isAadhaarVerified = data.me.aadhaarVerified || false;
    const hasEmergencyContacts = (data.me.contacts || 0) > 0;

    // If Aadhaar not verified OR no emergency contacts, redirect to dashboard
    // The dashboard will show the appropriate modal (Aadhaar or Emergency Contact)
    if (!isAadhaarVerified || !hasEmergencyContacts) {
      return (
        <Navigate 
          to="/dashboard" 
          state={{ 
            id: "nominee", // This will trigger the nominee feature in dashboard
            from: fromPath 
          }} 
          replace 
        />
      );
    }
  }

  // All checks passed - render the protected component
  return children;
};

export default FeatureProtectedRoute;