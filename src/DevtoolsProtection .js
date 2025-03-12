import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
// import { logout } from "./store/authSlice"; // your logout action

const DevtoolsProtection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    // Detect if devtools are open by comparing outer and inner dimensions
    let devtoolsOpen = false;
    const threshold = 100; // adjust threshold as needed

    const detectDevtools = () => {
      const widthDifference = window.outerWidth - window.innerWidth;
      const heightDifference = window.outerHeight - window.innerHeight;

      // If the difference exceeds the threshold, assume devtools are open
      if (widthDifference > threshold || heightDifference > threshold) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          console.warn("DevTools detected, logging out...");
          dispatch(logout());
        }
      } else {
        devtoolsOpen = false;
      }
    };

    // Check at intervals
    const interval = setInterval(detectDevtools, 500);

    // Optionally, listen for specific key combinations
    const handleKeyDown = (e) => {
      // Common shortcuts: F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        dispatch(logout());
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [dispatch]);

  return null; // This component doesn't render anything visible.
};

export default DevtoolsProtection;
