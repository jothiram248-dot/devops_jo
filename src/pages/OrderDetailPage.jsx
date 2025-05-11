import React, { useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  RefreshCw,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  Download,
  ChevronLeft,
  Share2,
  Copy,
  Printer,
  CreditCard,
  AlertCircle,
  ArrowLeft,
  CheckCheck,
  DownloadCloud,
  Mail,
  Check,
  Home,
  RefreshCcw,
  Award,
  Sparkles,
  ExternalLink,
  Gift,
  Star,
  File,
  Timer,
  CheckCircle2,
  Bookmark,
  Box,
  ArrowRight,
  Wallet,
  CreditCardIcon,
} from "lucide-react";
import {
  useGetOrderByIdQuery,
  useGetOrderByIdWithPaymentInfoQuery,
} from "@/features/api/orderApiSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoImg from "/SacredSecret_logo1.svg";
import toast from "react-hot-toast";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: orderData, isLoading: orderLoading } = useGetOrderByIdQuery(id);
  const { data: paymentData, isLoading: paymentLoading } =
    useGetOrderByIdWithPaymentInfoQuery(id);
  const [activeTab, setActiveTab] = useState("details"); // "details" or "invoice"
  const [copiedId, setCopiedId] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const invoiceRef = useRef(null);
  const detailsRef = useRef(null);

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

  // Generate professional PDF document with logo and proper currency symbol
  const generatePDF = useCallback(async () => {
    if (!order) return;

    setPdfGenerating(true);

    try {
      // Create a new PDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Set up dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;

      // Helper functions
      const addText = (text, x, y, options = {}) => {
        const defaults = {
          align: "left",
          fontSize: 10,
          fontStyle: "normal",
          textColor: "#000000",
        };
        const opts = { ...defaults, ...options };

        doc.setFont("helvetica", opts.fontStyle);
        doc.setFontSize(opts.fontSize);
        doc.setTextColor(opts.textColor);
        doc.text(text, x, y, { align: opts.align });
      };

      // Add the logo to the PDF directly at the proper position
      try {
        // Create an image element to load the logo
        const img = new Image();
        img.src = logoImg;

        // Use a promise to wait for the image to load
        const loadLogoPromise = new Promise((resolve, reject) => {
          img.onload = () => {
            try {
              // Convert the image to a data URL
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              const logoDataUrl = canvas.toDataURL("image/png");

              // Add the logo to the PDF
              doc.addImage(logoDataUrl, "PNG", margin, margin, 40, 15);
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          img.onerror = reject;
        });

        await loadLogoPromise;
      } catch (logoError) {
        console.error("Error adding logo to PDF:", logoError);
        // Fallback text if logo fails
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("SACRED SECRET", margin, margin + 10);
      }

      // Company info at the right
      const companyInfoX = pageWidth - margin;
      addText("SacredSecret Pvt. Ltd.", companyInfoX, margin + 10, {
        fontSize: 12,
        fontStyle: "bold",
        align: "right",
      });
      addText("994, 1# Block, Koramangala", companyInfoX, margin + 16, {
        fontSize: 9,
        align: "right",
      });
      addText("Bangalore South 560034, Karnataka", companyInfoX, margin + 21, {
        fontSize: 9,
        align: "right",
      });
      addText("Email: support@sacredsecret.in", companyInfoX, margin + 26, {
        fontSize: 9,
        align: "right",
      });
      addText("Phone: +91 8007774047", companyInfoX, margin + 31, {
        fontSize: 9,
        align: "right",
      });

      // Title and reference - positioned below the logo
      addText(
        activeTab === "invoice" ? "INVOICE" : "ORDER DETAILS",
        margin,
        margin + 25,
        { fontSize: 22, fontStyle: "bold" }
      );
      addText(`#${order.displayId}`, margin, margin + 33, { fontSize: 14 });
      addText(`Date: ${formatDate(order.createdAt)}`, margin, margin + 40, {
        fontSize: 10,
      });

      // Divider line
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, margin + 45, pageWidth - margin, margin + 45);

      // Billing info section
      let currentY = margin + 55;

      addText("BILLED TO:", margin, currentY, {
        fontSize: 10,
        fontStyle: "bold",
      });
      currentY += 6;
      addText(payment?.email || "Customer", margin, currentY, { fontSize: 10 });
      if (payment?.contact) {
        currentY += 5;
        addText(payment.contact, margin, currentY, { fontSize: 9 });
      }

      // Status & Order Summary
      addText("STATUS:", pageWidth - margin, currentY - 6, {
        fontSize: 10,
        fontStyle: "bold",
        align: "right",
      });
      const statusText =
        order.status === "completed"
          ? "Active"
          : order.status.charAt(0).toUpperCase() + order.status.slice(1);
      const statusColor = order.status === "completed" ? "#22c55e" : "#f59e0b";
      addText(statusText, pageWidth - margin, currentY, {
        fontSize: 10,
        fontStyle: "bold",
        textColor: statusColor,
        align: "right",
      });

      // Subscription details
      currentY += 15;

      // Gray background for the subscription section
      doc.setFillColor(248, 248, 248);
      doc.rect(margin, currentY - 5, contentWidth, 15, "F");

      addText("SUBSCRIPTION DETAILS", margin + 5, currentY + 2, {
        fontSize: 10,
        fontStyle: "bold",
      });
      currentY += 15;

      // Subscription info table
      const labelWidth = 50;
      const valueX = margin + labelWidth + 10;

      // Feature
      addText("Feature:", margin, currentY, {
        fontSize: 9,
        textColor: "#666666",
      });
      addText(
        order.purchaseDetails?.featureName || "Subscription",
        valueX,
        currentY,
        { fontSize: 9 }
      );
      currentY += 6;

      // Feature Code
      addText("Feature Code:", margin, currentY, {
        fontSize: 9,
        textColor: "#666666",
      });
      addText(order.purchaseDetails?.featureCode || "N/A", valueX, currentY, {
        fontSize: 9,
      });
      currentY += 6;

      // Billing Cycle
      addText("Billing Cycle:", margin, currentY, {
        fontSize: 9,
        textColor: "#666666",
      });
      const billingCycle = order.purchaseDetails?.billingCycle
        ? order.purchaseDetails.billingCycle.charAt(0).toUpperCase() +
          order.purchaseDetails.billingCycle.slice(1)
        : "N/A";
      addText(billingCycle, valueX, currentY, { fontSize: 9 });
      currentY += 6;

      // Validity
      addText("Validity:", margin, currentY, {
        fontSize: 9,
        textColor: "#666666",
      });
      const startDate = formatDate(order.purchaseDetails?.startDate) || "N/A";
      const endDate = formatDate(order.purchaseDetails?.endDate) || "N/A";
      addText(`${startDate} to ${endDate}`, valueX, currentY, { fontSize: 9 });
      currentY += 15;

      // Items table header
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, currentY - 5, contentWidth, 10, "F");

      const colWidths = [
        contentWidth * 0.5,
        contentWidth * 0.15,
        contentWidth * 0.17,
        contentWidth * 0.18,
      ];
      const col1X = margin;
      const col2X = margin + colWidths[0];
      const col3X = col2X + colWidths[1];
      const col4X = col3X + colWidths[2];

      // Table headers
      addText("DESCRIPTION", col1X + 2, currentY, {
        fontSize: 8,
        fontStyle: "bold",
      });
      addText("QTY", col2X + 2, currentY, {
        fontSize: 8,
        fontStyle: "bold",
        align: "left",
      });
      addText("UNIT PRICE", col3X + 2, currentY, {
        fontSize: 8,
        fontStyle: "bold",
        align: "left",
      });
      addText("AMOUNT", col4X + 2, currentY, {
        fontSize: 8,
        fontStyle: "bold",
        align: "left",
      });

      // Item row
      currentY += 10;
      const subtotal = order.amount - (payment?.fee || 0);

      // Description
      addText(
        `${
          order.purchaseDetails?.featureName || "Subscription"
        } - ${billingCycle} Plan`,
        col1X + 2,
        currentY,
        { fontSize: 9 }
      );
      currentY += 5;
      addText(`Validity: ${startDate} to ${endDate}`, col1X + 2, currentY, {
        fontSize: 8,
        textColor: "#666666",
      });

      // Quantity, price and amount - use proper currency symbol
      addText("1", col2X + 2, currentY - 5, { fontSize: 9 });

      // Calculate the amounts
      const amountStr = Math.round(subtotal).toString();
      const taxStr = Math.round(payment?.tax || 0).toString();
      const feeStr = Math.round(payment?.fee || 0).toString();
      const totalStr = Math.round(order.amount).toString();

      // Use the proper Unicode rupee symbol
      const rupeeSymbol = "₹";

      // Format the prices with proper spacing
      const formattedPrice = `${rupeeSymbol} ${amountStr}`;
      const formattedTotal = `${rupeeSymbol} ${amountStr}`;
      const formattedTax = `${rupeeSymbol} ${taxStr}`;
      const formattedFee = `${rupeeSymbol} ${feeStr}`;
      const formattedGrandTotal = `${rupeeSymbol} ${totalStr}`;

      // Set the font encoding to ensure proper symbol rendering
      doc.setFont("helvetica", "normal");

      addText(formattedPrice, col3X + 2, currentY - 5, { fontSize: 9 });
      addText(formattedTotal, col4X + 2, currentY - 5, { fontSize: 9 });

      // Divider line
      currentY += 10;
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, currentY, pageWidth - margin, currentY);

      // Totals section
      currentY += 10;
      const totalsX = col3X - 10; // Align with the right side
      const totalsValueX = pageWidth - margin;

      // Subtotal
      addText("Subtotal:", totalsX, currentY, { fontSize: 9, align: "left" });
      addText(formattedTotal, totalsValueX, currentY, {
        fontSize: 9,
        align: "right",
      });
      currentY += 6;

      // Tax
      addText("Tax:", totalsX, currentY, { fontSize: 9, align: "left" });
      addText(formattedTax, totalsValueX, currentY, {
        fontSize: 9,
        align: "right",
      });
      currentY += 6;

      // Processing Fee
      addText("Processing Fee:", totalsX, currentY, {
        fontSize: 9,
        align: "left",
      });
      addText(formattedFee, totalsValueX, currentY, {
        fontSize: 9,
        align: "right",
      });
      currentY += 8;

      // Total line
      doc.setDrawColor(200, 200, 200);
      doc.line(totalsX - 10, currentY - 3, totalsValueX, currentY - 3);

      // Total amount
      addText("Total:", totalsX, currentY + 5, {
        fontSize: 10,
        fontStyle: "bold",
        align: "left",
      });
      addText(formattedGrandTotal, totalsValueX, currentY + 5, {
        fontSize: 10,
        fontStyle: "bold",
        align: "right",
        textColor: "#22c55e",
      });

      // Payment info section
      if (payment) {
        currentY += 20;

        // Payment heading
        doc.setFillColor(248, 248, 248);
        doc.rect(margin, currentY - 5, contentWidth, 10, "F");
        addText("PAYMENT INFORMATION", margin + 5, currentY, {
          fontSize: 10,
          fontStyle: "bold",
        });

        currentY += 10;

        // Payment method
        addText("Payment Method:", margin, currentY, {
          fontSize: 9,
          textColor: "#666666",
        });
        const methodText = payment.method
          ? payment.method.charAt(0).toUpperCase() + payment.method.slice(1)
          : "N/A";
        addText(methodText, margin + 45, currentY, { fontSize: 9 });

        // Payment status
        addText("Status:", margin + 120, currentY, {
          fontSize: 9,
          textColor: "#666666",
        });
        const paymentStatusText =
          payment.status === "captured" ? "Paid" : payment.status;
        const paymentStatusColor =
          payment.status === "captured" ? "#22c55e" : "#f59e0b";
        addText(paymentStatusText, margin + 150, currentY, {
          fontSize: 9,
          fontStyle: "bold",
          textColor: paymentStatusColor,
        });

        currentY += 6;

        // Transaction ID
        addText("Transaction ID:", margin, currentY, {
          fontSize: 9,
          textColor: "#666666",
        });
        addText(payment.id || "N/A", margin + 45, currentY, { fontSize: 9 });

        // Payment date
        addText("Date:", margin + 120, currentY, {
          fontSize: 9,
          textColor: "#666666",
        });
        const paymentDate = payment.created_at
          ? new Date(payment.created_at * 1000).toLocaleDateString("en-IN")
          : formatDate(order.updatedAt);
        addText(paymentDate, margin + 150, currentY, { fontSize: 9 });
      }

      // Footer
      const footerY = pageHeight - 15;
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);

      addText("Thank you for your business.", pageWidth / 2, footerY - 5, {
        fontSize: 9,
        align: "center",
      });
      addText(
        "For any inquiries, please contact support@sacredsecret.in",
        pageWidth / 2,
        footerY,
        { fontSize: 9, align: "center" }
      );

      // Generate filename with order ID
      const filename = `Order_${order.displayId}_${
        activeTab === "invoice" ? "Invoice" : "Details"
      }.pdf`;

      // Download the PDF
      doc.save(filename);
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setPdfGenerating(false);
    }
  }, [order, activeTab, formatDate, payment]);

  // Handle direct PDF download
  const handleDownload = () => {
    if (!order) return;
    generatePDF();
  };

  // Get subscription icon and style
  const getSubscriptionIcon = (featureCode) => {
    if (!featureCode) return <FileText className="w-6 h-6 text-gray-400" />;

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

  // Get status badge
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      completed: {
        label: "Active",
        bgColor: "bg-green-900/10",
        textColor: "text-green-400",
        borderColor: "border-green-500/20",
        icon: <CheckCircle className="w-3.5 h-3.5" />,
      },
      processing: {
        label: "Processing",
        bgColor: "bg-yellow-900/10",
        textColor: "text-yellow-400",
        borderColor: "border-yellow-500/20",
        icon: <Clock className="w-3.5 h-3.5" />,
      },
      failed: {
        label: "Failed",
        bgColor: "bg-red-900/10",
        textColor: "text-red-400",
        borderColor: "border-red-500/20",
        icon: <AlertCircle className="w-3.5 h-3.5" />,
      },
      // For Razorpay payment status
      captured: {
        label: "Paid",
        bgColor: "bg-green-900/10",
        textColor: "text-green-400",
        borderColor: "border-green-500/20",
        icon: <CheckCircle className="w-3.5 h-3.5" />,
      },
      authorized: {
        label: "Authorized",
        bgColor: "bg-blue-900/10",
        textColor: "text-blue-400",
        borderColor: "border-blue-500/20",
        icon: <Clock className="w-3.5 h-3.5" />,
      },
      refunded: {
        label: "Refunded",
        bgColor: "bg-gray-900/10",
        textColor: "text-gray-400",
        borderColor: "border-gray-500/20",
        icon: <RefreshCw className="w-3.5 h-3.5" />,
      },
    };

    const config = statusConfig[status] || {
      label: status || "Unknown",
      bgColor: "bg-dark-400/60",
      textColor: "text-gray-400",
      borderColor: "border-dark-100/20",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    };

    return (
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}
      >
        {config.icon}
        <span>{config.label}</span>
      </div>
    );
  };

  // Get payment method icon
  const PaymentMethodIcon = ({ method }) => {
    switch (method) {
      case "upi":
        return (
          <div className="w-10 h-10 bg-indigo-900/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-indigo-400">UPI</span>
          </div>
        );
      case "card":
        return (
          <div className="w-10 h-10 bg-blue-900/10 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-400" />
          </div>
        );
      case "netbanking":
        return (
          <div className="w-10 h-10 bg-green-900/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-green-400" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
        );
    }
  };

  // Loading state
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
            Loading order details...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Please wait while we fetch your order information
          </p>
        </div>
      </div>
    );
  }

  // Order not found state
  if (!order) {
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
                Order Not Found
              </h2>
              <p className="text-gray-400 mb-8">
                We couldn't find the order you're looking for. It may have been
                deleted or the ID is incorrect.
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
                  onClick={() => navigate("/")}
                  className="w-full py-3 bg-accent-100 text-white rounded-lg font-semibold hover:bg-accent-200 transition-colors flex items-center justify-center"
                >
                  <Home className="mr-2" size={18} />
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate amounts
  const subtotal = order.amount - (payment?.fee || 0);
  const tax = payment?.tax || 0;
  const processingFee = payment?.fee || 0;
  const total = order.amount;

  // Get feature styling
  const featureStyle = getFeatureStyle(order.purchaseDetails?.featureCode);
  const featureCode = order.purchaseDetails?.featureCode;
  const featureName = order.purchaseDetails?.featureName || "Subscription";
  const billingCycle = order.purchaseDetails?.billingCycle
    ? order.purchaseDetails.billingCycle.charAt(0).toUpperCase() +
      order.purchaseDetails.billingCycle.slice(1)
    : "";

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

  // Order Details Tab
  const renderOrderDetails = () => {
    return (
      <div className="space-y-8" ref={detailsRef}>
        {/* Order Summary Card */}
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100/10 shadow-lg overflow-hidden relative">
          {/* Background gradient effect */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-100/5 rounded-full blur-3xl opacity-60 z-0"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl opacity-50 z-0"></div>

          <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 bg-gradient-to-br ${featureStyle.gradientFrom} ${featureStyle.gradientTo} rounded-xl flex items-center justify-center p-0.5 shadow-sm`}
              >
                <div
                  className={`w-full h-full ${featureStyle.bgColor} rounded-lg flex items-center justify-center`}
                >
                  {getSubscriptionIcon(order.purchaseDetails?.featureCode)}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{featureName}</h3>
                <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{billingCycle} Subscription</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge status={order.status} />
              <div className="text-sm text-gray-400 flex items-center">
                Order ID:{" "}
                <span className="text-gray-300 font-mono ml-1">
                  {order.displayId}
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
              <CreditCard className="w-6 h-6 text-violet-400" />
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
        <div className="bg-dark-300 rounded-xl border border-dark-100/20 p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-accent-100" />
            <h3 className="text-lg font-semibold text-white">
              Subscription Features
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subscriptionFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
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

        {/* Payment Summary Card */}
        <div className="bg-dark-300 backdrop-blur-sm rounded-xl border border-dark-100/20 overflow-hidden mb-8">
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
                <span className="text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax</span>
                <span className="text-white">{formatCurrency(tax)}</span>
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
                <span className="text-white font-medium">Total Paid</span>
                <span className="text-green-400 font-bold">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        {payment && (
          <div className="bg-dark-300 rounded-xl border border-dark-100/20 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-violet-900/20 to-indigo-900/10 px-6 py-4 border-b border-dark-100/20 flex items-center justify-between">
              <h3 className="text-white font-medium flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-violet-400" />
                Payment Details
              </h3>
              <StatusBadge status={payment.status} />
            </div>

            <div className="p-6">
              {/* Payment Method */}
              <div className="flex items-center gap-4 p-4 bg-dark-400/30 rounded-xl mb-6">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-900/30 to-indigo-900/20 rounded-xl flex items-center justify-center p-0.5 shadow-sm">
                    <div className="w-full h-full bg-dark-300 rounded-lg flex items-center justify-center">
                      {payment.method === "upi" ? (
                        <div className="text-lg font-bold text-violet-400">
                          UPI
                        </div>
                      ) : payment.method === "card" ? (
                        <CreditCard className="w-6 h-6 text-violet-400" />
                      ) : (
                        <CreditCard className="w-6 h-6 text-violet-400" />
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-dark-300 rounded-full border border-dark-100/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-white font-medium capitalize">
                        {payment.method || "Card"} Payment
                      </div>
                      <div className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {payment.created_at
                            ? new Date(
                                payment.created_at * 1000
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : formatDate(order.updatedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-green-400">
                      {formatCurrency(total)}
                    </div>
                  </div>

                  {payment.email && (
                    <div className="mt-3 text-sm text-gray-400 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{payment.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction IDs in grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-dark-400/50 to-dark-400/30 rounded-xl border border-dark-100/10 overflow-hidden shadow-sm">
                  <div className="px-4 py-3 bg-dark-400/30 border-b border-dark-100/10">
                    <div className="text-xs font-medium uppercase text-gray-400">
                      Transaction ID
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-sm text-white truncate max-w-[200px]">
                        {payment.id}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(payment.id);
                          toast.success("Transaction ID copied");
                        }}
                        className="ml-2 p-1.5 bg-dark-300 rounded-md text-gray-400 hover:text-white hover:bg-dark-500 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {payment.order_id && (
                  <div className="bg-gradient-to-br from-dark-400/50 to-dark-400/30 rounded-xl border border-dark-100/10 overflow-hidden shadow-sm">
                    <div className="px-4 py-3 bg-dark-400/30 border-b border-dark-100/10">
                      <div className="text-xs font-medium uppercase text-gray-400">
                        Payment Order ID
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-sm text-white truncate max-w-[200px]">
                          {payment.order_id}
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(payment.order_id);
                            toast.success("Order ID copied");
                          }}
                          className="ml-2 p-1.5 bg-dark-300 rounded-md text-gray-400 hover:text-white hover:bg-dark-500 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional payment details */}
              {(payment.acquirer_data?.rrn ||
                payment.acquirer_data?.upi_transaction_id) && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Additional References
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {payment.acquirer_data?.rrn && (
                      <div className="bg-dark-400/20 rounded-lg p-3 border border-dark-100/10">
                        <div className="text-xs text-gray-500 mb-1">RRN</div>
                        <div className="text-sm text-white font-mono">
                          {payment.acquirer_data.rrn}
                        </div>
                      </div>
                    )}

                    {payment.acquirer_data?.upi_transaction_id && (
                      <div className="bg-dark-400/20 rounded-lg p-3 border border-dark-100/10">
                        <div className="text-xs text-gray-500 mb-1">
                          UPI Transaction ID
                        </div>
                        <div className="text-sm text-white font-mono truncate">
                          {payment.acquirer_data.upi_transaction_id}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Payment details disclaimer */}
              <div className="mt-6 pt-4 border-t border-dark-100/10">
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <div className="mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    This payment was processed securely through Razorpay. The
                    transaction details are stored for your reference.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/account/orders")}
            className="py-3.5 border border-accent-100/50 text-accent-100 rounded-lg font-semibold hover:bg-accent-100/5 transition-all flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Orders
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className={`py-3.5 bg-gradient-to-r from-accent-100 to-accent-200 text-white rounded-lg font-semibold hover:brightness-110 transition-all flex items-center justify-center`}
          >
            <Download className="mr-2" size={18} />
            Download Invoice
          </motion.button>
        </div>
      </div>
    );
  };

  // Invoice Tab
  const renderInvoice = () => {
    return (
      <div
        className="bg-dark-300 rounded-xl border border-dark-100/20 overflow-hidden shadow-lg"
        ref={invoiceRef}
      >
        {/* Invoice Header */}
        <div className="bg-gradient-to-r from-dark-400 to-dark-300 px-6 py-4 border-b border-dark-100/40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent-100" />
            <h3 className="text-lg font-bold text-white">Invoice</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`p-2 bg-dark-400/80 rounded-lg ${
                pdfGenerating
                  ? "text-gray-500"
                  : "text-gray-300 hover:text-white"
              } transition-colors`}
              onClick={handleDownload}
              disabled={pdfGenerating}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-6">
          <div className="flex flex-wrap justify-between mb-8 gap-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Order Reference</div>
              <div className="text-white font-medium flex items-center">
                #{order.displayId}
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
            <div>
              <div className="text-sm text-gray-400 mb-1">Invoice Date</div>
              <div className="text-white">{formatDate(order.createdAt)}</div>
            </div>
          </div>

          {/* Customer & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div className="bg-dark-400/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-2 font-medium">
                BILLED TO
              </div>
              <div className="text-white font-medium">
                {payment?.email || "Customer"}
              </div>
              <div className="text-gray-400 mt-1">{payment?.contact || ""}</div>
            </div>
            <div className="bg-dark-400/30 p-4 rounded-lg text-right">
              <div className="text-sm text-gray-400 mb-2 font-medium">FROM</div>
              <div className="text-white font-medium">
                SacredSecret Pvt. Ltd.
              </div>
              <div className="text-gray-400 mt-1">
                994, 1# Block, Koramangala
                <br />
                Bangalore South 560034, Karnataka
              </div>
            </div>
          </div>

          {/* Feature Info */}
          <div className="bg-dark-400/20 p-4 rounded-lg mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${featureStyle.gradientFrom} ${featureStyle.gradientTo} rounded-lg flex items-center justify-center p-0.5 shadow-sm`}
              >
                <div
                  className={`w-full h-full ${featureStyle.bgColor} rounded-md flex items-center justify-center`}
                >
                  {getSubscriptionIcon(order.purchaseDetails?.featureCode)}
                </div>
              </div>
              <div>
                <div className="text-white font-medium">{featureName}</div>
                <div className="text-sm text-gray-400">
                  {billingCycle} Subscription
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Validity Period: {formatDate(order.purchaseDetails?.startDate)} to{" "}
              {formatDate(order.purchaseDetails?.endDate)}
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-100/20">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dark-100/10">
                  <td className="py-4 px-4">
                    <div className="text-white">
                      {featureName} - {billingCycle} Plan
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      Validity: {formatDate(order.purchaseDetails?.startDate)}{" "}
                      to {formatDate(order.purchaseDetails?.endDate)}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-white">1</td>
                  <td className="py-4 px-4 text-right text-white">
                    {formatCurrency(subtotal)}
                  </td>
                  <td className="py-4 px-4 text-right text-white">
                    {formatCurrency(subtotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Invoice Summary */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs">
              <div className="flex justify-between py-2">
                <div className="text-gray-400">Subtotal</div>
                <div className="text-white">{formatCurrency(subtotal)}</div>
              </div>
              <div className="flex justify-between py-2">
                <div className="text-gray-400">Tax</div>
                <div className="text-white">{formatCurrency(tax)}</div>
              </div>
              <div className="flex justify-between py-2">
                <div className="text-gray-400">Processing Fee</div>
                <div className="text-white">
                  {formatCurrency(processingFee)}
                </div>
              </div>
              <div className="flex justify-between py-3 border-t border-dark-100/20 mt-2">
                <div className="text-white font-medium">Total</div>
                <div className="text-green-400 font-bold">
                  {formatCurrency(total)}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-dark-100/20">
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={payment?.status || order.status} />
                    <span className="text-white">
                      {payment?.status === "captured"
                        ? "Paid"
                        : "Payment Status"}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {payment?.created_at
                      ? new Date(payment.created_at * 1000).toLocaleDateString(
                          "en-IN"
                        )
                      : formatDate(order.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Footer */}
        <div className="px-6 py-4 bg-dark-400/30 border-t border-dark-100/20 text-center">
          <div className="text-gray-400 text-sm">
            Thank you for your business. For any questions, please contact
            support@sacredsecret.in
          </div>
        </div>
      </div>
    );
  };

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
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/account/orders")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Orders</span>
          </motion.button>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-dark-300 rounded-2xl p-6 border border-dark-100/10 shadow-lg relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-100/5 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Order Details
                  </h1>
                  <div className="text-gray-400 mt-1">
                    {formatDate(order.createdAt)} • {featureName}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-dark-400/80 hover:bg-dark-400 transition-colors rounded-lg text-gray-300 text-sm"
                    onClick={handleCopyId}
                  >
                    {copiedId ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-dark-400/80 hover:bg-dark-400 transition-colors rounded-lg text-gray-300 text-sm"
                    onClick={handleDownload}
                    disabled={pdfGenerating}
                  >
                    {pdfGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-t-transparent border-accent-100 rounded-full animate-spin"></div>
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex border-b border-dark-100/20 mb-6">
            <button
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "details"
                  ? "text-white border-b-2 border-accent-100"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Order Details
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "invoice"
                  ? "text-white border-b-2 border-accent-100"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("invoice")}
            >
              Invoice
            </button>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "details" ? renderOrderDetails() : renderInvoice()}
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

      {/* PDF generation overlay */}
      {pdfGenerating && (
        <div className="fixed inset-0 bg-dark-200/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-300 rounded-lg p-8 shadow-lg border border-dark-100/10 max-w-md w-full">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 rounded-full border-t-2 border-accent-100 animate-spin"></div>
                <div className="absolute inset-0 rounded-full border-t-2 border-accent-100/30 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-dark-300/80 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent-100" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Generating PDF
              </h3>
              <p className="text-gray-400">
                Please wait while we prepare your document...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
