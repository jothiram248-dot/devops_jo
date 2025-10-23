import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import CryptoJS from "crypto-js";
import { useGetKycDataQuery } from "@/features/api/userNomineeApiSlice";

const AgreementPage = () => {
  const { type } = useParams();
  const { data: kycData } = useGetKycDataQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const agreementRef = useRef(null);
  const downloadControlsRef = useRef(null);

  const [agreementData, setAgreementData] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState("");
  const [isValidSession, setIsValidSession] = useState(false);
  const [logoDataUrl, setLogoDataUrl] = useState(null);

  // Function to convert image to base64 for PDF embedding
  const getLogoAsDataUrl = async () => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/SacredSecret logo.svg";

      return new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        };
      });
    } catch (error) {
      console.error("Error loading logo:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadLogo = async () => {
      const logoUrl = await getLogoAsDataUrl();
      setLogoDataUrl(logoUrl);
    };

    loadLogo();

    const queryParams = new URLSearchParams(location.search);
    const encryptedData = queryParams.get("agree");

    // Listen for postMessage from the parent tab
    const messageHandler = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.validSession) {
        setIsValidSession(true);
      }
    };

    window.addEventListener("message", messageHandler);

    if (encryptedData) {
      const secretKey = import.meta.env.VITE_AES_SECRET_KEY; 
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setAgreementData(decryptedData);
      } catch (error) {
        console.error("Decryption error:", error);
        navigate("/"); // Redirect if decryption fails
      }
    }

    return () => window.removeEventListener("message", messageHandler);
  }, [location.search, navigate]);

  if (!isValidSession) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500 text-xl font-semibold"></div>
    );
  }

  const handleDownload = async () => {
    const element = agreementRef.current;
    const controls = downloadControlsRef.current;

    // Hide controls before download
    controls.style.display = "none";

    if (downloadFormat === "pdf") {
      await html2pdf()
        .from(element)
        .set({
          margin: 0.5,
          filename: `Agreement_${agreementData.referenceId}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true, // Enable CORS for images
            logging: true, // Enable logging to debug image issues
          },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .save();
    } else if (downloadFormat === "png" || downloadFormat === "jpeg") {
      const canvas = await html2canvas(element, {
        useCORS: true, // Enable CORS for images
        logging: true, // Enable logging to debug image issues
      });
      const image = canvas.toDataURL(`image/${downloadFormat}`);

      const link = document.createElement("a");
      link.href = image;
      link.download = `Agreement_${agreementData.referenceId}.${downloadFormat}`;
      link.click();
    }

    // Show controls after download
    controls.style.display = "block";
  };

  if (!agreementData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const {
    platformName,
    userId,
    userName,
    userAdditionalInfo,
    nomineeName,
    nomineePhone,
    nomineeEmail,
    nomineeAdditionalInfo,
    agreementDate,
    referenceId,
  } = agreementData;

  const displayUserName = kycData?.aadhaar?.name || userName;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div
        ref={agreementRef}
        className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-lg"
      >
        <div className="text-center mb-6">
          {logoDataUrl ? (
            <img
              src={logoDataUrl}
              alt="SacredSecret Logo"
              className="h-24 mx-auto mb-2"
            />
          ) : (
            <img
              src="/SacredSecret logo.svg"
              alt="SacredSecret Logo"
              className="h-28 mx-auto mb-2"
              crossOrigin="anonymous"
            />
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            User's Agreement with SacredSecret Pvt. Ltd.
          </h1>
          <p className="text-sm text-gray-700 mt-2">
            <strong>Effective Date: April 2025</strong>
          </p>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <p className="text-sm text-gray-500 mb-6 text-right">
          Agreement Reference ID: {referenceId}
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Terms and Conditions
          </h2>

          <div className="text-sm text-gray-700 leading-6">
            <p className="mb-4">
              This Agreement ("Agreement") is made between you ("you," the
              "Subscriber" or the "User") and SacredSecret Pvt. Ltd. ("Company,"
              "we," "us," or "Platform") and governs your access to and use of
              the services provided by SacredSecret Pvt. Ltd. via the website
              located at http://sacredsecret.in or any subdomain thereof
              (collectively, the "Website") and/or the SacredSecret Mobile App
              (available on Android and iOS platforms) (collectively, the
              "Services"). Please read this Agreement carefully. By accessing or
              using the Services, you agree to be bound by the terms and
              conditions set forth herein.
            </p>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Introduction
              </h2>
              <div className="text-sm text-gray-700 leading-6">
                <p className="mb-3 text-justify">
                  The purpose of this agreement is to officially designate{" "}
                  <strong>{nomineeName}</strong> as the authorized person to
                  manage, access, and oversee the personal and digital assets on
                  the <strong>{platformName}</strong> platform, in accordance
                  with the wishes outlined in this document.
                </p>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Declaration of Intent
              </h2>
              <div className="text-sm text-gray-700 leading-6">
                <p className="mb-3 text-justify">
                  I, <strong>{displayUserName}</strong>, hereby declare that I am of
                  sound mind and legal capacity to execute this Will Agreement.
                  I voluntarily appoint <strong>{nomineeName}</strong> as my
                  nominee, granting them the authority to manage, control, and
                  access my assets associated with the{" "}
                  <strong>{platformName}</strong> platform.
                </p>
              </div>
            </section>

            <p className="font-semibold mb-1">
              1. Clarification of Platform's Role
            </p>
            <p className="mb-3">
              SacredSecret Pvt. Ltd. operates as a digital platform that
              facilitates the secure storage and sharing of digital asset
              information as specified by the User. The Platform does not own,
              control, or manage any of the digital assets stored, nor does it
              take responsibility for the validity or accuracy of any
              information provided by the User. The Platform acts solely as an
              intermediary to store and transmit digital asset details as
              directed by the User, in accordance with this Agreement.
            </p>

            <p className="font-semibold mb-1">
              2. Exemption from Liability Regarding Disputes Between Nominee and
              Legal Heirs
            </p>
            <p className="mb-3">
              The Platform is not responsible or liable for any disputes,
              conflicts, or claims arising between the User's legal heirs and
              Nominees regarding the ownership or access to the digital assets.
              The User acknowledges that the Platform's role is limited to
              sharing the assets with the Nominee as per the instructions
              provided by the User. The Platform shall not be involved in any
              legal disputes or challenges that arise thereafter.
            </p>

            <p className="font-semibold mb-1">
              3. User Authorization to Share Digital Assets
            </p>
            <p className="mb-3">
              By agreeing to this Agreement, the User grants the Platform the
              absolute and irrevocable right to share the User's digital asset
              details, including but not limited to banking credentials, social
              media details, investment information, and other data, with the
              respective Nominees designated by the User. Users must provide
              accurate and complete information during registration. The Company
              reserves the right to suspend or terminate accounts suspected of
              unauthorized access or fraudulent activity.
            </p>

            <p className="font-semibold mb-1">
              4. User Authorization Regarding Nominee Verification
            </p>
            <p className="mb-3">
              By agreeing to this Agreement, the User agrees that the Platform
              is not responsible for verifying the details of the Nominees. The
              Platform will directly share the User's digital asset details with
              the respective Nominees without any further verification process.
            </p>

            <p className="font-semibold mb-1">
              5. Nominee Designation and Transfer of Assets
            </p>
            <p className="mb-3">
              Users may designate only one nominee for each of their digital
              assets to receive the details of the digital assets in the event
              of their death or incapacitation. Transfers will only be executed
              upon verification of the event, which may include but is not
              limited to legal documentation (e.g., death certificate, court
              order, medical certificate). Users are responsible for keeping
              Nominee details accurate and up to date. The Company is not liable
              for disputes arising between Users and Nominees regarding asset
              distribution. If a designated Nominee predeceases the User or is
              otherwise unavailable, the Company will follow the alternative
              instructions provided by the User or, in the absence of such
              instructions, the digital assets will be transferred to the User's
              legal heirs as per applicable law. If there are multiple claimants
              to the digital assets, the Company shall not be held responsible
              for any delays in the transfer of assets. The transfer will only
              proceed once all disputes have been legally resolved.
            </p>

            <p className="font-semibold mb-1">
              6. Nominee Declaration and Responsibility
            </p>
            <p className="mb-3">
              By using the platform to designate nominees for your digital
              assets—including but not limited to online banking, investments,
              financial services, social media accounts, subscription services,
              emergency contacts, and any other digital information—you
              acknowledge and agree that: The Nominee designated on the platform
              will be treated as your legal heirs for the purpose of digital
              asset succession, unless expressly stated otherwise by you. It is
              solely your responsibility to ensure that the Nominee listed on
              the platform align with those declared with the respective
              institutions or service providers. The platform bears no
              responsibility or liability for any discrepancies, conflicts, or
              disputes arising between the Nominee listed on the platform and
              those registered with other institutions or service providers. You
              are solely responsible for verifying and maintaining the accuracy
              of Nominee information across all relevant platforms and services.
              The Company shall not be liable for any contradictions, disputes,
              or delays arising from such discrepancies. For the purpose of this
              Agreement, "Nominee" refers to a recipient designated by the User
              to receive digital assets upon a specified event (e.g.,
              incapacitation or death).
            </p>

            <p className="font-semibold mb-1">
              7. Scenarios And Handling Procedures
            </p>
            <p className="mb-3">
              <u>Death of the User</u>
              <br />
              • Verification: Requires submission of a certified death
              certificate and/or confirmation from a legal authority.
              <br />
              • Transfer Process: Once verified, assets are transferred to the
              designated Nominee(s) per the User's instructions.
              <br />
              <br />
              <u>Incapacitation of the User</u>
              <br />
              • Verification: Requires submission of medical records, a court
              declaration, or a power of attorney.
              <br />
              • Transfer Process: If a Nominee has been designated for this
              event, assets will be transferred upon verification.
              <br />
              • Disputes: If a legal guardian disputes the transfer, the Company
              will defer to legal authority.
              <br />
              <br />
              <u>No Response from User for a Prolonged Period</u>
              <br />
              • The Company will attempt to contact the User through registered
              details.
              <br />
              • If the User remains unresponsive for a predefined period (e.g.,
              3 months), assets will be handled per the User's designated
              instructions.
              <br />
              • If no instructions exist, assets may be subject to escheatment
              laws as per the applicable jurisdiction.
              <br />
              <br />
              <u>Change of Nominee</u>
              <br />
              • Users can update or remove Nominees at any time through their
              account settings.
              <br />
              • Changes become effective immediately upon confirmation.
              <br />
              <br />
              <u>Regulatory Seizure or Legal Complications</u>
              <br />• If digital assets are subject to government seizure, court
              orders, or regulatory action, the Company will comply with legal
              obligations and inform the User or their Nominee accordingly.
            </p>

            <p className="font-semibold mb-1">
              8. User Authorization to Contact Emergency Contact
            </p>
            <p className="mb-3">
              By agreeing to this Agreement, the User authorizes the Platform to
              contact the emergency contact(s) provided by the User during
              registration in the event the User fails to respond to two
              consecutive push notifications sent by the Platform, which are
              intended to verify the User's well-being. These notifications are
              sent every 15 days, and the User is required to click on the
              provided link to confirm their status. If the User does not
              acknowledge the notification on two consecutive occasions, the
              Platform will contact the emergency contact(s) to assess the
              User's condition. The User acknowledges that the Platform is not
              responsible for the actions or inactions of the emergency
              contact(s) and shall not be liable for any delay in confirming the
              User's status.
            </p>

            <p className="font-semibold mb-1">
              9. User's Responsibility for Keeping Details Updated
            </p>
            <p className="mb-3">
              The User agrees to update and maintain accurate and current
              information regarding their digital assets, emergency contacts,
              and Nominees on the Platform. Failure to do so may result in
              delays or errors in processing the transfer of digital asset
              information. The Platform shall not be held liable for any
              consequences arising from outdated or incorrect information
              provided by the User.
            </p>

            <p className="font-semibold mb-1">
              10. No Liability for Non-Usage or Service Cancellation
            </p>
            <p className="mb-3">
              The User acknowledges that the Platform is not responsible for
              providing refunds in cases of non-usage, cancellation of
              subscription, or failure to use the Platform after signing up. All
              payments made are non-refundable under any circumstances.
            </p>

            <p className="font-semibold mb-1">
              11. Death or Health Certification Requirements
            </p>
            <p className="mb-3">
              Upon the User's death or incapacitation, access to their digital
              assets will only be granted to the Nominee upon submission of a
              valid death certificate, medical certificate, or any other proof
              of incapacity as required by the Platform. The Platform reserves
              the right to verify the authenticity of the submitted documents
              before sharing any assets with the nominated person.
            </p>

            <p className="font-semibold mb-1">12. Indemnity Clause</p>
            <p className="mb-3">
              The User agrees to indemnify, defend, and hold harmless the
              Platform, its affiliates, officers, directors, and employees from
              any and all claims, demands, damages, losses, liabilities, and
              expenses (including legal fees) arising from the misuse of the
              Platform, including but not limited to disputes over asset
              ownership, false information provided by the User, or failure to
              follow the instructions outlined in this Agreement.
            </p>

            <p className="font-semibold mb-1">
              13. Disclaimer of Guarantee on Availability
            </p>
            <p className="mb-3">
              The Platform makes no guarantee or warranty regarding the
              availability, accuracy, or uninterrupted access to the Platform
              and services. The User acknowledges that the Platform may
              experience downtime, and the Platform shall not be held liable for
              any damages or losses resulting from platform outages or
              interruptions in service.
            </p>

            <p className="font-semibold mb-1">
              14. No Ownership of Digital Assets
            </p>
            <p className="mb-3">
              The User acknowledges and agrees that the Platform does not have
              ownership over any digital assets stored or shared through the
              Platform. All digital assets and associated rights remain the
              property of the User or their assigned Nominees and are not
              transferred to the Platform.
            </p>

            <p className="font-semibold mb-1">
              15. Confidentiality of User Information
            </p>
            <p className="mb-3">
              The Platform commits to maintaining the confidentiality of the
              User's digital asset details and personal information in
              compliance with applicable data protection laws. However, the
              Platform may disclose User information to authorized parties, such
              as the Nominees, or regulatory authorities, if required by law or
              as part of the platform's operations.
            </p>

            <p className="font-semibold mb-1">
              16. User's Responsibility for Proper Usage
            </p>
            <p className="mb-3">
              The User agrees to use the Platform for lawful purposes only and
              acknowledges that the Platform is not responsible for the User's
              actions related to unauthorized access, misuse, or improper
              sharing of digital asset details. The User must ensure that their
              credentials and account details are securely managed to prevent
              unauthorized access. Users are responsible for maintaining the
              security of their account credentials and for any activity under
              their account. Users must be at least 18 years old and have full
              legal capacity to enter into this Agreement. The User must ensure
              that their use of our Services complies with applicable laws in
              their jurisdiction.
            </p>

            <p className="font-semibold mb-1">17. Force Majeure Clause</p>
            <p className="mb-3">
              The Platform shall not be held liable for any delay or failure in
              performance under this Agreement caused by events beyond the
              Platform's reasonable control, including but not limited to
              natural disasters, acts of government, pandemics, technological
              failures, or other unforeseen events.
            </p>

            <p className="font-semibold mb-1">
              18. Modifications to the Agreement
            </p>
            <p className="mb-3">
              The Platform reserves the right to modify or amend this Agreement
              at any time, as it sees fit and your continued use of the site
              will signify your acceptance of any adjustment to these terms. The
              User agrees to review these updates regularly. Continued use of
              the Platform after any modification constitutes acceptance of the
              revised terms.
            </p>

            <p className="font-semibold mb-1">
              19. Governing Law and Jurisdiction
            </p>
            <p className="mb-3">
              This Agreement shall be governed by and construed in accordance
              with the laws of India. Subject to clause 31, any disputes arising
              under or in connection with this Agreement shall be subject to the
              exclusive jurisdiction of the courts located in Bangalore, India,
              including the High Court of Karnataka.
            </p>

            <p className="font-semibold mb-1">
              20. Consent to Digital Communication
            </p>
            <p className="mb-3">
              The User consents to receiving all communications, notifications,
              and updates from the Platform through electronic means, including
              but not limited to email, SMS, push notifications, and in-app
              messages. This includes updates about the platform, changes to the
              terms, or any necessary alerts regarding the User's digital assets
              or account.
            </p>

            <p className="font-semibold mb-1">
              21. User's Acknowledgment of Platform Limitations
            </p>
            <p className="mb-3">
              The User acknowledges that the Platform is not a financial
              institution, law firm, or any other professional entity. The
              Platform does not provide legal, financial, or medical advice, and
              any actions taken based on the information stored or shared
              through the Platform are done at the User's own risk. The Platform
              strongly encourages Users to seek professional advice including
              but not limited to legal, financial and other advisory service
              where necessary.
            </p>

            <p className="font-semibold mb-1">
              22. Access Restrictions and Termination of Account
            </p>
            <p className="mb-3">
              The Platform reserves the right to temporarily suspend or
              permanently terminate a User's access to the Platform if the
              Platform determines, in its sole discretion, that the User has
              violated any terms of this Agreement, engaged in unlawful
              activity, or provided false or misleading information. In the
              event of termination, the Platform is not required to refund any
              paid subscription fees.
            </p>

            <p className="font-semibold mb-1">
              23. Data Retention and Deletion
            </p>
            <p className="mb-3">
              The Platform will retain the User's data, including digital asset
              details, as long as the account remains active or until the User
              requests its deletion. The User may request the deletion of their
              account and data at any time. The Platform reserves the right to
              retain necessary User information for legal or compliance
              purposes.
            </p>

            <p className="font-semibold mb-1">
              24. No Responsibility for Misuse of Information
            </p>
            <p className="mb-3">
              The Platform is not liable for any consequences resulting from the
              misuse, damage or loss of the digital asset details stored or
              shared through the Platform, including unauthorized access or
              fraud. The User agrees to take full responsibility for ensuring
              the confidentiality of their login credentials and any information
              stored within the Platform. The Company does not provide
              financial, legal, or investment advice. Users should seek
              professional counsel before engaging in digital asset
              transactions. The Company's liability is strictly limited to the
              amount of fees paid by the User for the Services in the last 6
              months preceding any claim.
            </p>

            <p className="font-semibold mb-1">
              25. Intellectual Property Rights
            </p>
            <p className="mb-3">
              All intellectual property rights, including trademarks, logos, and
              software used on the Platform, are owned by the Platform or its
              licensors. The User agrees not to infringe upon or use these
              intellectual property rights without explicit permission from the
              Platform. The User does not gain any ownership rights over the
              Platform or its intellectual property by using the service.
            </p>

            <p className="font-semibold mb-1">
              26. Platform Security and User Responsibility
            </p>
            <p className="mb-3">
              While the Platform employs industry-standard security measures to
              protect User data, the User understands and agrees that no system
              is completely secure. The User is responsible for securing their
              login credentials, including choosing a strong password and taking
              reasonable precautions to prevent unauthorized access to their
              account. The Platform is not responsible for any loss resulting
              from unauthorized access to the User's account.
            </p>

            <p className="font-semibold mb-1">
              27. Audit and Monitoring of Accounts
            </p>
            <p className="mb-3">
              The Platform reserves the right to audit and monitor User accounts
              to ensure compliance with the terms of service, detect fraud, and
              maintain security. Such audits may involve reviewing the User's
              activity and respective details. The User consents to these audits
              and understands that any violations of the terms may result in
              account suspension or termination.
            </p>

            <p className="font-semibold mb-1">
              28. Service Availability and Maintenance
            </p>
            <p className="mb-3">
              The Platform makes no representations or warranties regarding the
              uninterrupted availability or operation of the Platform. The
              Platform may be temporarily unavailable due to system maintenance,
              upgrades, or unforeseen technical issues. The Platform will
              attempt to notify Users in advance of any scheduled downtime but
              is not liable for any disruption in service or loss of data caused
              by such maintenance or issues.
            </p>

            <p className="font-semibold mb-1">29. Severability</p>
            <p className="mb-3">
              If any provision of this Agreement is found to be unlawful,
              invalid, or unenforceable by a court of competent jurisdiction,
              the remaining provisions shall remain in full force and effect.
              The invalid provision shall be replaced with a valid provision
              that most closely reflects the original intent of the parties.
            </p>

            <p className="font-semibold mb-1">
              30. Acknowledgment of Understanding
            </p>
            <p className="mb-3">
              By accepting this Agreement, the User acknowledges that they have
              read, understood, and agreed to all the terms and conditions
              outlined herein. The User further acknowledges that they have had
              the opportunity to seek independent legal counsel before agreeing
              to these terms and have done so at their own discretion.
            </p>

            <p className="font-semibold mb-1">
              31. Jurisdiction for Dispute Resolution
            </p>
            <p className="mb-3">
              Any dispute arising out of or in connection with this Agreement
              shall first be attempted to be resolved through amicable
              negotiations. If such resolution is not possible, the dispute
              shall be settled by arbitration in accordance with the Arbitration
              and Conciliation Act, 1996, and the seat of arbitration shall be
              Bangalore, India. The arbitration proceedings shall be conducted
              in English.
            </p>

            <p className="font-semibold mb-1">32. Contact Information</p>
            <p className="mb-3">
              For any questions or concerns regarding this Agreement, please
              contact us at{" "}
              <a
                href="mailto:support@sacredsecret.in"
                className="font-bold text-blue-600 hover:underline"
              >
                support@sacredsecret.in
              </a>{" "}
              and +91 – 8007774047. By using our Services, you acknowledge that
              you have read, understood, and agreed to the terms and conditions
              under this Agreement.
            </p>
          </div>
        </section>

        <div
          ref={downloadControlsRef}
          className="text-center mt-8 print:hidden"
        >
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="">Select Format</option>
            <option value="pdf">Download as PDF</option>
            <option value="png">Download as PNG</option>
            <option value="jpeg">Download as JPEG</option>
          </select>

          <button
            onClick={handleDownload}
            disabled={!downloadFormat}
            className={`ml-4 px-6 py-2 ${
              downloadFormat
                ? "bg-yellow-500 hover:bg-yellow-400 text-white"
                : "bg-gray-300 cursor-not-allowed"
            } rounded-md shadow-md transition-transform`}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementPage;
