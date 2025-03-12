import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import CryptoJS from "crypto-js";
const AgreementPage = () => {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const agreementRef = useRef(null);
  const downloadControlsRef = useRef(null);

  const [agreementData, setAgreementData] = useState(null);

  const [downloadFormat, setDownloadFormat] = useState("");

  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
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
      const secretKey = "1234567890abcdef";
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
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .save();
    } else if (downloadFormat === "png" || downloadFormat === "jpeg") {
      const canvas = await html2canvas(element);
      const image = canvas.toDataURL(`image/${downloadFormat}`);

      const link = document.createElement("a");
      link.href = image;
      link.download = `Agreement_${agreementData.referenceId}.${downloadFormat}`;
      link.click();
    }

    // Show controls after download
    controls.style.display = "block";
  };

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

  return agreementData ? (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div
        ref={agreementRef}
        className="max-w-4xl mx-auto bg-white p-10 shadow-2xl rounded-xl border-4 border-gray-300 relative"
      >
        <div className="text-center mb-6">
          <img
            src="/SacredSecret logo.svg"
            alt="SacredSecret Logo"
            className="h-32 mx-auto mb-4"
            crossOrigin="anonymous"
          />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-widest uppercase">
            Agreement
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 mx-auto my-2"></div>
          <p className="text-gray-600 italic text-sm">
            Ensuring Your Legacy, Protecting Your Wishes
          </p>
        </div>

        <div className="border-t-2 border-yellow-500 my-6"></div>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Agreement Reference ID
          </h2>
          <p className="text-gray-700 font-bold">{referenceId}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Introduction
          </h2>
          <p className="text-gray-700 leading-8 text-justify">
            This <strong>Agreement</strong> is made on behalf of{" "}
            <strong>{userName}</strong>. The purpose of this agreement is to
            officially designate <strong>{nomineeName}</strong> as the
            authorized person to manage, access, and oversee the personal and
            digital assets on the <strong>{platformName}</strong> platform
            according to the wishes outlined in this document.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Declaration of Intent
          </h2>
          <p className="text-gray-700 leading-8 text-justify">
            I, <strong>{userName}</strong>, hereby declare that I am of sound
            mind and legal capacity to execute this Will Agreement. I
            voluntarily appoint <strong>{nomineeName}</strong> as my nominee,
            granting them the authority to manage, control, and access my assets
            associated with the <strong>{platformName}</strong> platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Nominee's Responsibilities
          </h2>
          <ul className="list-disc pl-6 text-gray-700 leading-7 space-y-1">
            <li>Manage the designated assets responsibly and ethically.</li>
            <li>
              Ensure the privacy and security of all sensitive information.
            </li>
            <li>Act in accordance with the wishes stated in this agreement.</li>
            <li>
              Make decisions in the best interest of preserving the legacy of
              the asset owner.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Terms and Conditions
          </h2>
          <p className="text-gray-700 leading-8 text-justify">
            By signing this agreement, both parties acknowledge the accuracy of
            the provided information. The nominee agrees to act responsibly and
            ethically, ensuring the proper management of the assets as per the
            instructions outlined in this document.
          </p>
        </section>

        <section className="flex justify-between mt-10 space-x-8">
          <div className="text-center w-1/2">
            <p className="border-t-2 border-gray-700 pt-3 text-gray-800 font-semibold">
              {userName}'s Signature
            </p>
            <p className="text-gray-500 text-sm">Asset Owner</p>
          </div>
          <div className="text-center w-1/2">
            <p className="border-t-2 border-gray-700 pt-3 text-gray-800 font-semibold">
              {nomineeName}'s Signature
            </p>
            <p className="text-gray-500 text-sm">Nominee</p>
          </div>
        </section>

        <footer className="mt-10 text-center text-gray-500 text-sm print:hidden">
          For support, contact us at{" "}
          <a
            href="mailto:support@sacredsecret.com"
            className="text-yellow-600 underline"
          >
            support@sacredsecret.in
          </a>
        </footer>
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
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500 text-xl font-semibold">
      Loading...
    </div>
  );
};

export default AgreementPage;
