import { CheckCircle, XCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

const CustomToast = ({ type = "error", message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component mounts
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for the exit animation before closing
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 max-w-sm w-full transform transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-10 opacity-0 scale-90"
      }`}
    >
      <div
        className={`px-5 py-4 rounded-xl shadow-2xl border-l-4 flex items-start gap-3 transition-transform duration-300 ${
          type === "error"
            ? "bg-gradient-to-r from-red-100 to-red-50 border-red-500 text-red-800"
            : "bg-gradient-to-r from-green-100 to-green-50 border-green-500 text-green-800"
        }`}
      >
        <div className="mt-1">
          {type === "error" ? (
            <XCircle className="w-6 h-6 text-red-500 animate-bounce" />
          ) : (
            <CheckCircle className="w-6 h-6 text-green-500 animate-ping" />
          )}
        </div>

        <div className="flex-1">
          <p className="font-semibold text-base leading-snug">{message}</p>
        </div>

        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Add a delay to allow the exit animation
          }}
          className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
