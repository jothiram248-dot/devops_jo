import React, { useState, useMemo } from "react";
import {
  Clock,
  CheckCircle,
  FileText,
  Shield,
  RefreshCw,
  Tag,
  AlertCircle,
  Calendar,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import { useGetAllOrdersQuery } from "@/features/api/orderApiSlice";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const navigate = useNavigate();

  // Format currency to INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date in a more readable format
  const formatDate = (dateString) => {
    // Return date directly from API for this example
    return dateString;
  };

  // Feature code mappings - this is fully dynamic
  const featureCodeMap = {
    SN: "SMART_NOTIFICATIONS",
    NM: "NOMINEE",
  };

  // Billing cycle mappings
  const billingCycleMap = {
    QUAT: "quarterly",
    HY: "halfyearly",
    YR: "yearly",
  };

  // Get subscription details from feature code - fully dynamic!
  const getSubscriptionDetails = (featureCode) => {
    if (!featureCode) {
      return {
        name: "Unknown Subscription",
        period: "Subscription",
        icon: <AlertCircle className="w-5 h-5 text-gray-400" />,
        bgColor: "bg-dark-400/50",
        iconBgColor: "bg-dark-300",
        textColor: "text-gray-400",
        gradientFrom: "from-gray-700",
        gradientTo: "to-gray-800",
      };
    }

    // Split feature code to get the base code and cycle
    const [baseCode, cycleCode] = featureCode.split("-");

    // Feature details mapping with gradients for more premium look
    const featureDetails = {
      SN: {
        name: "Smart Notification",
        icon: <Shield className="w-5 h-5 text-purple-400" />,
        bgColor: "bg-purple-900/10",
        iconBgColor: "bg-purple-900/20",
        textColor: "text-purple-400",
        gradientFrom: "from-purple-900/20",
        gradientTo: "to-purple-800/10",
      },
      NM: {
        name: "Choose Your Nominee",
        icon: <RefreshCw className="w-5 h-5 text-blue-400" />,
        bgColor: "bg-blue-900/10",
        iconBgColor: "bg-blue-900/20",
        textColor: "text-blue-400",
        gradientFrom: "from-blue-900/20",
        gradientTo: "to-blue-800/10",
      },
    };

    // Get the feature detail
    const detail = featureDetails[baseCode] || {
      name: baseCode,
      icon: <FileText className="w-5 h-5 text-gray-400" />,
      bgColor: "bg-dark-400/50",
      iconBgColor: "bg-dark-300",
      textColor: "text-gray-400",
      gradientFrom: "from-gray-700",
      gradientTo: "to-gray-800",
    };

    // Get the period name based on cycle code
    const periodName =
      {
        QUAT: "Quarterly",
        HY: "Half-Yearly",
        YR: "Yearly",
      }[cycleCode] || "Subscription";

    return {
      ...detail,
      name: detail.name,
      period: `${periodName} Subscription`,
    };
  };

  // Generate status badge based on order status
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
      pending: {
        label: "Pending",
        bgColor: "bg-blue-900/10",
        textColor: "text-blue-400",
        borderColor: "border-blue-500/20",
        icon: <Clock className="w-3.5 h-3.5" />,
      },
    };

    const config = statusConfig[status] || statusConfig.processing;

    return (
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}
      >
        {config.icon}
        <span>{config.label}</span>
      </div>
    );
  };

  // Get all orders to display
  const getOrders = () => {
    return data?.orders || [];
  };

  // Count active subscriptions (only completed/active status)
  const activeSubscriptions = useMemo(() => {
    if (!data?.orders) return 0;
    return data.orders.filter((order) => order.status === "completed").length;
  }, [data?.orders]);

  // Count pending subscriptions
  const pendingSubscriptions = useMemo(() => {
    if (!data?.orders) return 0;
    return data.orders.filter((order) => order.status === "pending").length;
  }, [data?.orders]);

  return (
    <div className="bg-dark-200 rounded-xl shadow-xl overflow-hidden border border-dark-100/10 pt-24">
      {/* Header with glowing accent */}
      <div className="relative bg-dark-300 px-6 py-5 border-b border-dark-100/40 overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent-100/10 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-accent-100" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Subscription History
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Manage your active subscriptions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              {/* UPDATED: Now showing only active subscription count */}
              {activeSubscriptions > 0 ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  {activeSubscriptions} Active{" "}
                  {activeSubscriptions === 1 ? "Subscription" : "Subscriptions"}
                </span>
              ) : pendingSubscriptions > 0 ? (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {pendingSubscriptions} Pending{" "}
                  {pendingSubscriptions === 1
                    ? "Subscription"
                    : "Subscriptions"}
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
                  No Active Subscriptions
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Subtle glow effect */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-100/5 rounded-full blur-3xl"></div>
      </div>

      {/* Summary Section */}
      <div className="bg-dark-300/50 px-6 py-3 border-b border-dark-100/10">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-purple-900/20 flex items-center justify-center border border-dark-100/20 z-10">
                <Shield className="w-3 h-3 text-purple-400" />
              </div>
              <div className="w-6 h-6 rounded-full bg-blue-900/20 flex items-center justify-center border border-dark-100/20">
                <RefreshCw className="w-3 h-3 text-blue-400" />
              </div>
            </div>
            {/* UPDATED: Display active and pending counts */}
            <div className="flex gap-2">
              {activeSubscriptions > 0 && (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  {activeSubscriptions} Active
                </span>
              )}
              {pendingSubscriptions > 0 && (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                  {pendingSubscriptions} Pending
                </span>
              )}
              {activeSubscriptions === 0 && pendingSubscriptions === 0 && (
                <span>No Subscriptions</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2"></div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-14">
            <div className="animate-pulse flex flex-col space-y-6 w-full px-6">
              <div className="flex space-x-4">
                <div className="rounded-lg bg-dark-300/80 h-12 w-12"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-dark-300/80 rounded w-3/4"></div>
                  <div className="h-3 bg-dark-300/80 rounded w-1/3"></div>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="rounded-lg bg-dark-300/80 h-12 w-12"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-dark-300/80 rounded w-3/4"></div>
                  <div className="h-3 bg-dark-300/80 rounded w-1/3"></div>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="rounded-lg bg-dark-300/80 h-12 w-12"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-dark-300/80 rounded w-3/4"></div>
                  <div className="h-3 bg-dark-300/80 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-dark-300/50 mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-5">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-xl font-medium text-white">
              Failed to load subscriptions
            </h3>
            <p className="text-gray-400 mt-3 max-w-md mx-auto">
              We're having trouble connecting to our servers. Please check your
              connection and try again.
            </p>
            <button className="mt-6 px-6 py-2.5 bg-accent-100 rounded-lg text-white hover:bg-accent-200 transition-colors">
              Retry
            </button>
          </div>
        ) : getOrders().length > 0 ? (
          <div className="px-6 py-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-100/10">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Subscription
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Reference ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getOrders().map((order, index) => {
                    const subscription = getSubscriptionDetails(
                      order.featureCode
                    );
                    return (
                      <tr
                        key={order.id}
                        className={`
                          hover:bg-dark-300/30 transition-colors group
                          ${
                            index !== getOrders().length - 1
                              ? "border-b border-dark-100/5"
                              : ""
                          }
                        `}
                      >
                        <td className="px-4 py-5">
                          <div className="flex items-center">
                            <div
                              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${subscription.gradientFrom} ${subscription.gradientTo} flex items-center justify-center p-0.5`}
                            >
                              <div
                                className={`w-full h-full ${subscription.iconBgColor} rounded-md flex items-center justify-center`}
                              >
                                {subscription.icon}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white group-hover:text-accent-100 transition-colors">
                                {subscription.name}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 text-gray-500" />
                                <span>{subscription.period}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="text-sm text-gray-300 font-mono">
                            {order.displayId}
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="text-sm text-gray-300">
                            {formatDate(order.updatedAt)}
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex items-center text-sm font-medium text-green-400 gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-green-500" />
                            {formatCurrency(order.amount)}
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-4 py-5 text-right">
                          <div className="flex items-center justify-end">
                            <button
                              onClick={() =>
                                navigate(`/account/order/${order?.id}`)
                              }
                              className="px-3 py-1.5 bg-dark-400/80 hover:bg-accent-100/10 rounded-lg text-xs text-gray-300 hover:text-accent-100 transition-colors flex items-center gap-1.5"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="mt-6 flex items-center justify-end">
              <button className="px-4 py-2 bg-accent-100 hover:bg-accent-200 transition-colors rounded-lg text-white text-sm flex items-center">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 px-6">
            <div className="w-20 h-20 mx-auto bg-dark-400/50 rounded-full flex items-center justify-center mb-5">
              <Tag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-white">
              No Active Subscriptions
            </h3>
            <p className="text-gray-400 mt-3 max-w-md mx-auto">
              You don't have any active subscriptions yet. Explore our plans to
              enhance your account with premium features.
            </p>
            <button className="mt-6 px-6 py-2.5 bg-accent-100 rounded-lg text-white text-sm font-medium hover:bg-accent-200 transition-colors shadow-sm">
              <Tag className="w-4 h-4 mr-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
