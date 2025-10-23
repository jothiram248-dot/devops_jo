import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
  SubscriptIcon,
  ArrowRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import CryptoJS from "crypto-js";
import { toast } from "react-hot-toast";
import { useCreateCredMutation } from "@/features/api/userCredApiSlice";
import { useCreateNomineeMutation } from "@/features/api/userNomineeApiSlice";
import { useMeQuery } from "@/features/api/userApiSlice";

const NomineeFormPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [createNominee, { isLoading }] = useCreateNomineeMutation();

  const location = useLocation();
  const locationState = location.state || {};
  const initialDisplayName = locationState.displayName || "";
  const isOthers = locationState.isOthers || false; // Extract `isOthers` properly

  const [showCustomField, setShowCustomField] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const { data } = useMeQuery();
  const username = data?.me?.username;

  const {
    register,
    handleSubmit,
    watch,
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
  //     toast.success("Nominee added successfully!");
  //     navigate(`/Nominees/${type}`);
  //   } catch (error) {
  //     toast.error("Failed to add Nominee. Please try again.");
  //   }
  // };

  // State to control sections
  const [showNomineeSection, setShowNomineeSection] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Step control
  const [isFormComplete, setIsFormComplete] = useState(false); // Form completeness
  const [dynamicFieldValue, setDynamicFieldValue] = useState("");

  // Handler for Next and Save Buttons
  const handleNext = () => setCurrentStep(2);
  const handleBack = () => setCurrentStep(1);
  const handleAgreementCheck = (e) => setAgreementChecked(e.target.checked);

  // Watch all form fields
  const watchedFields = watch();

  // Monitor form completeness
  // Monitor form completeness
  useEffect(() => {
    let requiredFields;

    if (type === "emergencyContacts") {
      requiredFields = [
        watchedFields.displayName,
        watchedFields.name,
        watchedFields.role,
        watchedFields.phone,
        watchedFields.email,
      ];
    } else {
      requiredFields = [
        watchedFields.displayName,
        ...(!type === "banking" || !type === "investment"
          ? [watchedFields.userId]
          : []),
        ...(!type === "banking" || !type === "investment"
          ? [watchedFields.password]
          : []),
        watchedFields.nomineeName,
        watchedFields.nomineePhone,
        watchedFields.nomineeEmail,
      ];
    }

    const allFieldsFilled = requiredFields.every(
      (field) => field && field.trim() !== ""
    );
    setIsFormComplete(allFieldsFilled && agreementChecked);
  }, [watchedFields, agreementChecked, type]);

  const dynamicFieldLabels = {
    "Cloud Storage": "Storage Provider Name",
    "OTT Streaming Services": "Streaming Service Name",
    "Music Streaming Services": "Music Platform Name",
    "E-Books & Audiobooks": "E-Books/Audiobooks Platform Name",
  };

  const isDynamicFieldRequired = dynamicFieldLabels[initialDisplayName];

  const onSubmit = async (data) => {
    const payload = {
      category: type,
      data: {
        ...(type === "emergencyContacts"
          ? {
              platformName: isOthers ? "Others" : initialDisplayName,
              ...(isOthers && { otherPlatformName: initialDisplayName }), // Add otherPlatformName if needed
              name: data.name, // Only name is required
              role: data.role,
              phone: data.phone,
              email: data.email,
              additionalInfo: data.additionalInfo || "",
              nominee: {
                name: data.nomineeName || "",
                phone: data.nomineePhone || "",
                email: data.nomineeEmail || "",
                additionalInfo: data.nomineeAdditionalInfo || "",
              },
            }
          : {
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

              ...(initialDisplayName === "Cloud Storage" ||
              initialDisplayName === "OTT Streaming Services" ||
              initialDisplayName === "Music Streaming Services" ||
              initialDisplayName === "E-Books & Audiobooks"
                ? { otherPlatformName: data.customPlatformName }
                : {}),

              userId: data.userId,
              password: data.password,
              additionalInfo: data.additionalInfo || "",

              nominee: {
                name: data.nomineeName || "",
                phone: data.nomineePhone || "",
                email: data.nomineeEmail || "",
                additionalInfo: data.nomineeAdditionalInfo || "",
              },
            }),
      },
    };
    // console.log("Payload:", payload);
    try {
      await createNominee(payload).unwrap();
      toast.success("Nominee added successfully!");
      navigate(`/nominees/${type}`);
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
        return "Banking Details";
      case "investment":
        return "Investment Details";
      case "emergencyContacts":
        return "Emergency Contacts";
      case "socialMedia":
        return "Social Media Details";
      case "subscriptions":
        return "Subscription Services Details";
      case "gamingPlatform":
        return "Gaming Platform Details";
      case "others":
        return "Details";
      default:
        return "Add New Nominees";
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

  const handleViewAgreement = () => {
    let requiredFields;

    if (type === "emergencyContacts") {
      requiredFields = [
        watchedFields.name,
        watchedFields.role,
        watchedFields.phone,
        watchedFields.email,
        watchedFields.nomineeName,
        watchedFields.nomineePhone,
        watchedFields.nomineeEmail,
      ];
    } else {
      requiredFields = [
        // watchedFields.userId,

        watchedFields.displayName,
        watchedFields.nomineeName,
        watchedFields.nomineePhone,
        watchedFields.nomineeEmail,
      ];
    }

    const allFieldsFilled = requiredFields.every(
      (field) => field && field.trim() !== ""
    );

    if (!allFieldsFilled) {
      setIsPromptOpen(true);
      return;
    }

    const platformNameData =
      type === "investment"
        ? watch("platformName")?.trim() || initialDisplayName // Use typed value first
        : type === "others" &&
          ([
            "E-Commerce Accounts",
            "Educational Platform",
            "Jobs Platform",
          ].includes(initialDisplayName) ||
            Object.keys(dynamicFieldLabels)
              .map((item) => item.toLowerCase())
              .includes(initialDisplayName.toLowerCase()))
        ? watch("customPlatformName")?.trim() || initialDisplayName
        : initialDisplayName;

    const agreementData = {
      platformName: platformNameData,
      platformCategory: type,
      userId: watchedFields.userId || "N/A",
      userName: username,
      userAdditionalInfo: watchedFields.additionalInfo || "None",
      nomineeName: watchedFields.nomineeName || "N/A",
      nomineePhone: watchedFields.nomineePhone || "N/A",
      nomineeEmail: watchedFields.nomineeEmail || "N/A",
      nomineeAdditionalInfo: watchedFields.nomineeAdditionalInfo || "None",
      agreementDate: new Date().toLocaleDateString(),
      referenceId: `AG-${Date.now()}`,
    };

    console.log("Agreement Data:", agreementData);

    const secretKey = import.meta.env.VITE_AES_SECRET_KEY;
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(agreementData),
      secretKey
    ).toString();

    // Open Agreement in a New Tab
    const agreementWindow = window.open(
      `/nominees/${type}/agreement?agree=${encodeURIComponent(encryptedData)}`,
      "_blank"
    );

    // Send a validation message to the new tab
    if (agreementWindow) {
      setTimeout(() => {
        agreementWindow.postMessage(
          { validSession: true },
          window.location.origin
        );
      }, 500); // Delay to ensure the new tab is fully loaded
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
            {currentStep === 1 && (
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
                Add Your {getTitle()}
              </h2>
            )}
            {/* <div
              className={`transition-transform duration-500 ${
                showNomineeSection ? "-translate-x-full" : ""
              }`}
            > */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Display Name */}

              {currentStep === 1 &&
                (type === "emergencyContacts" ? (
                  <>
                    {/* Platform Name */}
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
                              ? "bg-gradient-to-r from-dark-200 to-dark-300 border border-accent-200 text-accent-100 font-bold focus:ring-2 focus:ring-accent-200"
                              : "bg-gradient-to-r from-dark-300 to-dark-200 border border-gray-500 text-white font-semibold focus:ring-2 focus:ring-gray-400"
                          }`}
                          placeholder="Enter a name for this Nominee"
                        />
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Profession/Designation
                      </label>
                      <input
                        {...register("role", {
                          required: "Profession/Designation is required",
                        })}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                        placeholder="Enter Profession/Designation"
                      />
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        {...register("name", {
                          required: "Name is required",
                        })}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                        placeholder="Enter Name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/, // Ensures exactly 10 digits
                            message: "Phone number must be exactly 10 digits",
                          },
                        })}
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                        placeholder="Enter Phone Number"
                        maxLength={10}
                        onInput={(e) => {
                          // Ensure the value contains only numbers
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                        })}
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                        placeholder="Enter Email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Additional Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Additional Info
                      </label>
                      <textarea
                        {...register("additionalInfo")}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                        placeholder="Enter Additional Information"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
                    >
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Next
                    </button>
                  </>
                ) : (
                  <>
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
                                ? "bg-gradient-to-r from-dark-200 to-dark-300 border border-accent-200 text-accent-100 font-bold focus:ring-2 focus:ring-accent-200"
                                : "bg-gradient-to-r from-dark-300 to-dark-200 border border-gray-500 text-white font-semibold focus:ring-2 focus:ring-gray-400"
                            }`}
                            placeholder="Enter a name for this Nominee"
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
                                  <option value="Savings A/C">
                                    Savings A/C
                                  </option>
                                  <option value="Current A/C">
                                    Current A/C
                                  </option>
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
                        Object.keys(dynamicFieldLabels)
                          .map((item) => item.toLowerCase())
                          .includes(initialDisplayName.toLowerCase())) && (
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
                            // placeholder={`Enter ${dynamicFieldLabels[initialDisplayName]}`}
                            placeholder={`Enter Your Platform Name`}
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
                    {!(type === "banking" || type === "investment") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          {initialDisplayName === "Email Accounts"
                            ? ""
                            : "User ID"}
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
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
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
                        {/* {isBankingForm
                      ? "Other Information" */}
                        {/* :  */}
                        Additional Information
                        {/* } */}
                      </label>
                      <textarea
                        {...register("additionalInfo")}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                        placeholder={getAdditionalInfoPlaceholder()}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
                    >
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Next
                    </button>
                  </>
                ))}

              {/* Nominee Details Section */}
              {/* <div
                    className={`transition-transform duration-500 ${
                      showNomineeSection ? "" : "translate-x-full"
                    }`}
                  >
                    <form className="space-y-6"> */}

              {currentStep === 2 && (
                <>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
                    Add Nominee Details
                  </h2>

                  {/* Nominee Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      {...register("nomineeName", {
                        required: "Nominee Name is required",
                      })}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-gray-600 text-white"
                      placeholder="Enter Nominee's Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Phone
                    </label>
                    <input
                      {...register("nomineePhone", {
                        required: "Nominee Phone is required",
                        pattern: {
                          value: /^[0-9]{10}$/, // Ensures exactly 10 digits
                          message: "Nominee phone must be exactly 10 digits",
                        },
                      })}
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-gray-600 text-white"
                      placeholder="Enter Nominee's Phone"
                      maxLength={10}
                      onInput={(e) => {
                        // Restrict input to only numbers and enforce 10 digits
                        e.target.value = e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, 10); // Remove non-numeric and limit to 10 digits
                      }}
                    />
                    {errors.nomineePhone && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.nomineePhone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      {...register("nomineeEmail", {
                        required: "Nominee Email is required",
                      })}
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-gray-600 text-white"
                      placeholder="Enter Nominee's Email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Additional Info
                    </label>
                    <textarea
                      {...register("nomineeAdditionalInfo")}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-gray-600 text-white"
                      placeholder="Enter Additional Info for Nominee"
                    />
                  </div>
                </>
              )}

              {/* Agreement Checkbox */}
              {currentStep === 2 && (
                <div className="flex items-start mt-6">
                  <input
                    type="checkbox"
                    id="will-agreement"
                    checked={agreementChecked}
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                    className="w-5 h-5 text-accent-100 focus:ring-2 focus:ring-offset-2 focus:ring-accent-200"
                  />
                  <label
                    htmlFor="will-agreement"
                    className="ml-3 text-sm text-gray-400"
                  >
                    I acknowledge and agree to the{" "}
                    <button
                      type="button"
                      onClick={handleViewAgreement}
                      className="text-accent-200 hover:underline"
                    >
                      Agreement
                    </button>
                    .
                  </label>
                </div>
              )}

              {/* Buttons Section */}
              <div className="flex justify-between items-center mt-6">
                {currentStep === 2 && (
                  <>
                    {/* Back Button */}
                    <button
                      type="button"
                      onClick={handleBack}
                      className="py-3 px-4 rounded-lg bg-gradient-to-r from-dark-300 to-gray-700 text-gray-300 font-semibold hover:from-gray-500 hover:to-gray-600 hover:text-white transition-all flex items-center justify-center"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back
                    </button>

                    {/* Save Button */}
                    <button
                      type="submit"
                      disabled={!isFormComplete}
                      className={`py-3 px-4 rounded-lg ${
                        isFormComplete
                          ? "bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100"
                          : "bg-dark-300 text-gray-500 cursor-not-allowed"
                      } font-semibold hover:opacity-90 transition-opacity flex items-center justify-center`}
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Save
                    </button>
                  </>
                )}
              </div>

              {/* </form>
                </div> */}

              {/* <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  {isLoading ? "Saving..." : <Save className="w-5 h-5 mr-2" />}
                  {isLoading ? "" : "Save Nominees"}
                </motion.button> */}
            </form>
            {/* </div> */}
          </div>
        </motion.div>
      </div>

      {isPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-gray-300 transform transition-transform scale-100 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 110 20 10 10 0 010-20z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              Incomplete Information
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Please fill in all the required fields before viewing the
              agreement.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setIsPromptOpen(false)}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NomineeFormPage;
