import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Save, ArrowLeft, SubscriptIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useCreateCredMutation } from "@/features/api/userCredApiSlice";

const CredentialFormPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [createCred, { isLoading }] = useCreateCredMutation();
  const location = useLocation();
  const locationState = location.state || {};
  const initialDisplayName = locationState.displayName || "";
  const isOthers = locationState.isOthers || false; // Extract `isOthers` properly

  const [showCustomField, setShowCustomField] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(initialDisplayName, isOthers);
  // const onSubmit = async (data) => {
  //   const payload = {
  //     category: type,
  //     data: {
  //       ...(isBankingForm
  //         ? { bankName: isOthers ? "Others" : initialDisplayName }
  //         : { platformName: isOthers ? "Others" : initialDisplayName }),

  //       ...(isOthers && {
  //         ...(isBankingForm
  //           ? { otherBankName: initialDisplayName }
  //           : { otherPlatformName: initialDisplayName }),
  //       }),

  //       ...(type === "others"
  //         ? { accountType: data.customAccountType }
  //         : !(type === "entertainmentPlatform")
  //         ? { accountType: selectedOption }
  //         : { subscriptionType: selectedOption }),
  //       userId: data.userId,
  //       password: data.password,
  //       additionalInfo: data.additionalInfo || "",
  //       // ...(data.metaIFSC || data.metaAccountType
  //       //   ? {
  //       //       meta: {
  //       //         ifsc: data.metaIFSC || "",
  //       //         accountType: data.metaAccountType || "",
  //       //       },
  //       //     }
  //       //   : {}),
  //     },
  //   };

  //   try {
  //     await createCred(payload).unwrap();
  //     toast.success("Credential added successfully!");
  //     navigate(`/credentials/${type}`);
  //   } catch (error) {
  //     toast.error("Failed to add credential. Please try again.");
  //   }
  // };

  const onSubmit = async (data) => {
    const payload = {
      category: type,
      data: {
        ...(isBankingForm
          ? { bankName: isOthers ? "Others" : initialDisplayName }
          : { platformName: isOthers ? "Others" : initialDisplayName }),

        ...(isOthers && {
          ...(isBankingForm
            ? { otherBankName: initialDisplayName }
            : { otherPlatformName: initialDisplayName }),
        }),

        ...(type === "investment"
          ? { accountType: data.platformName }
          : type === "others"
          ? { accountType: data.customPlatformName }
          : type === "banking" && selectedOption === "Others"
          ? {
              accountType: "Others",
              otherAccountType: data.customAccountType,
            }
          : type !== "gamingPlatform" &&
            type !== "socialMedia" &&
            type !== "entertainmentPlatform" &&
            selectedOption
          ? { accountType: selectedOption }
          : {}),

        // Add otherPlatformName when condition is met
        ...(initialDisplayName === "Music Streaming Platforms" ||
        initialDisplayName === "Adults Platforms"
          ? { otherPlatformName: data.customPlatformName }
          : {}),

        userId: data.userId,
        password: data.password,
        additionalInfo: data.additionalInfo || "",
      },
    };

    try {
      await createCred(payload).unwrap();
      toast.success("Credential added successfully!");
      navigate(`/credentials/${type}`);
    } catch (error) {
      if (error?.data?.message === "Validation error" && error?.data?.details) {
        const errorMessages = error.data.details
          .map((detail) => detail.message)
          .join(", ");
        toast.error(`Validation Error: ${errorMessages}`);
      } else if (error?.data?.message === "Credential already exists") {
        toast.error("Credential already exists. Please use a different one.");
      } else {
        toast.error("Failed to add Nominee. Please try again.");
      }
    }
  };

  const getTitle = () => {
    switch (type) {
      case "banking":
        return "Banking Credentials";
      case "investment":
        return "Investment Credentials";
      case "entertainmentPlatform":
        return "Entertainment Platform";
      case "socialMedia":
        return "Social Media Account";
      case "gamingPlatform":
        return "Gaming Platform";
      case "others":
        return "Other Credentials";
      default:
        return "Add New Credentials";
    }
  };

  const isBankingForm = type === "banking";

  const getAdditionalInfoPlaceholder = () => {
    if (type === "banking") {
      return "Bank Account Number\nBank Branch\nIFSC Code\nDebit Card / Credit Card Details (PIN) Optional\nOnline Banking Details (Login ID & Password) Optional";
    } else if (type === "investment") {
      if (initialDisplayName === "Insurance") {
        return "Policy number\nBank account details for claim settlement\nPolicy details\nPlatform's login id and password (optional)\nAdditional details";
      } else {
        return "Customer ID/Account ID\nAccount details\nPoint of contact (if any)\nPlatform's login id and password (optional)\nOffice address\nAdditional details";
      }
    } else {
      return "Enter any additional information";
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="glow-box p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Add New {getTitle()}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Display Name */}
              <div>
                {type !== "investment" && (
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {type === "banking" ? "Bank Name" : "Platform Name"}
                  </label>
                )}

                <div>
                  <div className="relative">
                    <input
                      {...register("displayName", {
                        required: "Display name is required",
                      })}
                      value={
                        type === "investment"
                          ? `${initialDisplayName} Platform`
                          : initialDisplayName
                      }
                      readOnly
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none cursor-not-allowed transition ${
                        type === "investment"
                          ? "bg-dark-300 border-accent-200 text-accent-100 font-semibold"
                          : "bg-dark-300 border-gray-600 text-gray-400"
                      }`}
                      placeholder="Enter a name for this credential"
                    />
                  </div>
                </div>

                {errors.displayName && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.displayName.message}
                  </p>
                )}
              </div>

              <div>
                {/* Conditional label rendering */}
                {type === "banking" && (
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {type === "banking"
                      ? "Account Type"
                      : "Custom Account Type"}
                  </label>
                )}

                <div className="space-y-4">
                  {/* Investment: Show normal input field */}
                  {type === "investment" ? (
                    <input
                      {...register("platformName", {
                        required: "Platform Name is required",
                      })}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                      placeholder="Enter Your Platform Name"
                    />
                  ) : (
                    // Dropdown for banking and others only
                    type === "banking" && (
                      <select
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                        value={selectedOption}
                        onChange={(e) => {
                          setSelectedOption(e.target.value);
                          setShowCustomField(e.target.value === "Others"); // Show custom field if "Others" is selected
                        }}
                      >
                        <option value="">Select an option</option>
                        {type === "banking" && (
                          <>
                            <option value="Savings A/C">Savings A/C</option>
                            <option value="Current A/C">Current A/C</option>
                            <option value="Fixed Deposit A/C">
                              Fixed Deposit A/C
                            </option>
                            <option value="Loan A/C">Loan A/C</option>
                            <option value="Others">Others</option>
                          </>
                        )}
                      </select>
                    )
                  )}

                  {/* Custom Input Field for "Others" */}
                  {showCustomField && (
                    <input
                      {...register("customAccountType", {
                        required: "Custom account type is required",
                      })}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                      placeholder="Enter Your Account Type"
                    />
                  )}
                </div>

                {((type === "others" &&
                  [
                    "E-Commerce Accounts",
                    "Educational Platform",
                    "Jobs Platform",
                  ].includes(initialDisplayName)) ||
                  initialDisplayName === "Music Streaming Platforms" ||
                  initialDisplayName === "Adults Platforms") && (
                  <div>
                    {/* <label className="block text-sm font-medium text-gray-300 mb-1">
                      Enter Your Platform Name
                  </label> */}
                    <input
                      {...register("customPlatformName", {
                        required: "Platform name is required",
                      })}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                      placeholder="Enter Your Platform Name"
                    />
                    {errors.customPlatformName && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.customPlatformName.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Error Message */}
                {errors.accountType && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.accountType.message}
                  </p>
                )}
              </div>

              {/* User ID */}
              {!(type === "banking" || type === "investment") && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {initialDisplayName === "Email Accounts" ? "" : "User ID"}
                  </label>
                  <input
                    {...register("userId", {
                      required:
                        initialDisplayName === "Email Accounts"
                          ? "Email or Phone No is required"
                          : "User ID is required",
                    })}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder={
                      initialDisplayName === "Email Accounts"
                        ? "Enter Email or Phone No"
                        : "Enter User ID"
                    }
                  />
                  {errors.userId && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.userId.message}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              {!(type === "banking" || type === "investment") && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Additional Information
                </label>
                <textarea
                  {...register("additionalInfo")}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder={getAdditionalInfoPlaceholder()}
                />
              </div>

              {/* Meta Information */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Meta Information (Optional)
                </label>
                <div className="space-y-4">
                  <input
                    {...register("metaIFSC")}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="Enter IFSC code"
                  />
                  <input
                    {...register("metaAccountType")}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="Enter account type (e.g., Savings, Current)"
                  />
                </div>
              </div> */}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                {isLoading ? "Saving..." : <Save className="w-5 h-5 mr-2" />}
                {isLoading ? "" : "Save Credentials"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CredentialFormPage;
