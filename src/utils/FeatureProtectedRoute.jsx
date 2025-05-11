import { useMeQuery } from "@/features/api/userApiSlice";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

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

/**
 * A component that checks if the user has the specified feature activated
 * before allowing access to the protected route.
 */
const FeatureProtectedRoute = ({ children, featureName }) => {
  const location = useLocation();
  const { data, isLoading, error } = useMeQuery();

  // If loading, show the loader
  if (isLoading) {
    return <PremiumLoader />;
  }

  // If error, or user not found, redirect to signin
  if (error || !data?.me) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }

  // Check if the user has the required feature activated
  const hasFeature = data.me.features && data.me.features[featureName] === true;

  // If the feature is not active, redirect to the upgrade page
  if (!hasFeature) {
    // You can redirect to a specific page, such as the feature's main page or an upgrade page
    const redirectPath =
      featureName === "nominee"
        ? "/choose-nominee"
        : featureName === "smartNotifications"
        ? "/smart-notifications"
        : "/dashboard";

    return (
      <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
    );
  }

  // If the user has the feature, render the children
  return children;
};

export default FeatureProtectedRoute;
