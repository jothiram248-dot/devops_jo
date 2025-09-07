import React from "react";

const RefundPolicy = () => {
  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Refund & Cancellation Policy
        </h1>

        <p className="text-gray-600 mb-6 text-right">
          Last Updated: 01st March 2025
        </p>

        <div className="prose max-w-none text-gray-800">
          <p>
            At SacredSecret, we strive to provide a secure and seamless
            experience in managing your digital legacy. This Refund and
            Cancellation Policy outlines the terms under which refunds or
            cancellations may be processed for services rendered through our
            platform.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            1. Scope of This Policy
          </h2>
          <p>
            This policy applies to subscription-based services offered on the
            SacredSecret platform, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Choose Your Nominee (assign nominees for digital assets)</li>
            <li>Smart Notifications (manage subscription services)</li>
            <li>Manage Credentials (credential storage)</li>
          </ul>
          <p>
            This policy does not cover refunds related to third-party service
            integrations, payment gateway issues outside our control, or
            disputes involving nominee access following the user&apos;s death or
            incapacitation.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            2. Eligibility for Refunds
          </h2>
          <p>Refunds are considered only under the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Duplicate payment for the same service.</li>
            <li>
              Technical error causing a transaction to complete in error on our
              side.
            </li>
            <li>
              Failure to deliver service: You paid for a subscription but were
              unable to access the promised features, and our support team could
              not resolve the issue within 7 business days.
            </li>
          </ul>
          <p>
            Refunds will not be issued for accidental purchases, change of mind,
            or dissatisfaction with features if the service has been accessed
            and used as intended.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            3. Cancellation Policy
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              You may cancel your active subscription at any time via the
              SacredSecret app or by contacting support.
            </li>
            <li>Cancellations take effect from the next billing cycle.</li>
            <li>
              No pro-rata refunds for the remainder of the current cycle after
              cancellation.
            </li>
            <li>
              If your subscription lapses (not renewed within 30 days of
              expiry), your account will be deactivated. After 90 days of
              inactivity, your account and all stored data will be permanently
              deleted per our Terms and Privacy Policy.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            4. Reporting a Payment Discrepancy
          </h2>
          <p>
            Report payment errors within 7 calendar days of the transaction.
            Delayed reports may not be eligible for a refund.
          </p>
          <p className="mb-2">
            <strong>Email:</strong> support@sacredsecret.in
          </p>
          <p className="mb-2">
            <strong>Subject:</strong> &quot;Refund Request – [Your
            Name/Transaction ID]&quot;
          </p>
          <p>Include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Transaction ID</li>
            <li>Date and time of payment</li>
            <li>Payment method used</li>
            <li>Description of the issue</li>
            <li>
              Screenshots or other supporting documentation (if available)
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            5. Investigation & Refund Processing
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Our support team will investigate and may request additional
              details.
            </li>
            <li>
              If approved, refunds are processed to the original payment method
              (bank account, card, or UPI) within 7–10 business days.
            </li>
            <li>You will be notified of the outcome via email.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            6. Late or Missing Refunds
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Double-check your bank or payment statement.</li>
            <li>
              Contact your bank or payment provider (posting times may vary).
            </li>
            <li>
              Still no update? Email us at support@sacredsecret.in for further
              help.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            7. Non-Refundable Scenarios
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Service was accessed/used as described, but you later decided you
              no longer want it.
            </li>
            <li>Failure to cancel before the next billing cycle.</li>
            <li>
              Refund request submitted after 7 days from the transaction date.
            </li>
            <li>
              Issues tied to third-party providers, Aadhaar API, or
              banking/payment disputes outside SacredSecret.
            </li>
            <li>
              Disputes about nominee access or ownership after incapacitation or
              death.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
            8. Contact Us
          </h2>
          <p className="mb-2">
            <strong>Email:</strong> support@sacredsecret.in
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> +91 8007774047
          </p>
          <p className="mb-2">
            <strong>Address:</strong> SacredSecret Pvt. Ltd., 301, Shiva Sai
            Enclave, 1st Cross, K Ramaiya Layout, Horamavu Agara, Bangalore
            560043
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
