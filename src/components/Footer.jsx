

// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";

// const Footer = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleNavigation = (path) => {
//     if (path === "/") {
//       if (location.pathname === "/") {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       } else {
//         navigate("/");
//         setTimeout(() => {
//           window.scrollTo({ top: 0, behavior: "smooth" });
//         }, 100);
//       }
//     } else if (path.startsWith("#")) {
//       const element = document.getElementById(path.substring(1));
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       } else {
//         navigate("/", { state: { scrollTo: path.substring(1) } });
//       }
//     } else {
//       navigate(path);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   return (
//     <footer className="relative bg-gradient-to-b from-dark-200 to-dark-300 pt-16 pb-10 px-4 overflow-hidden">
//       {/* background elements */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.18),transparent_50%)]"></div>
//       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-100/60 to-transparent"></div>
//       <div className="absolute -top-40 right-20 w-80 h-80 bg-indigo-600/15 rounded-full filter blur-3xl"></div>
//       <div className="absolute -bottom-40 left-20 w-80 h-80 bg-purple-600/15 rounded-full filter blur-3xl"></div>

//       {/* Subtle dot pattern */}
//       <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-14 md:gap-20 mb-16">
//           {/* Column 1: Logo and Description */}
//           <div className="flex flex-col items-center md:items-start text-center md:text-left">
//             <div className="flex items-center -mt-4 mb-6">
//               <img
//                 src="/SacredSecret logo color white.svg"
//                 alt="Logo"
//                 className="h-20 w-auto transform scale-125"
//               />
//             </div>
//             <p className="text-gray-300 leading-relaxed mb-6">
//               Securing your digital assets with advanced technology and an
//               unwavering commitment to privacy.
//             </p>

//             {/* Back to top button */}
//             <button
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               className="mt-6 inline-flex items-center gap-2 text-accent-100 hover:text-accent-200 transition-colors"
//             >
//               <span className="text-sm font-medium">Back to top</span>
//               <div className="w-6 h-6 rounded-full border border-accent-100/70 flex items-center justify-center group-hover:border-accent-200">
//                 <ArrowUp className="w-3 h-3" />
//               </div>
//             </button>
//           </div>

//           {/* Column 2 and Column 3 */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-14">
//             {/* Column 2: Quick Links */}
//             <div className="flex flex-col items-center md:items-start text-center md:text-left">
//               <h4 className="text-lg font-semibold mb-6 text-white">
//                 Quick Links
//               </h4>
//               <ul className="space-y-3">
//                 {["Home", "Features", "About Us", "Contact"].map(
//                   (link, index) => (
//                     <li key={index}>
//                       <button
//                         onClick={() =>
//                           handleNavigation(
//                             link === "Home"
//                               ? "/"
//                               : `/${link.toLowerCase().replace(" ", "-")}`
//                           )
//                         }
//                         className="text-gray-300 hover:text-accent-100 transition-colors flex items-center group"
//                       >
//                         <div className="w-0 h-px bg-accent-100 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></div>
//                         {link}
//                       </button>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>

//             {/* Column 3: Contact Info */}
//             <div className="flex flex-col items-center md:items-start text-center md:text-left">
//               <h4 className="text-lg font-semibold mb-6 text-white">
//                 Contact Info
//               </h4>
//               <ul className="space-y-5">
//                 {[
//                   { icon: Mail, text: "support@sacredsecret.in" },
//                   { icon: Phone, text: "+91 8007774047" },
//                   {
//                     icon: MapPin,
//                     text: "301, Shiva Sai Enclave, 1st Cross, K Ramaiya Layout, Horamavu Agara, Bangalore 560043",
//                   },
//                 ].map((item, index) => (
//                   <li key={index} className="flex items-start space-x-3 group">
//                     {/* Icon container stays circular */}
//                     <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-dark-100 to-dark-50/90 flex items-center justify-center shadow-inner group-hover:shadow-accent-100/10 transition-all duration-300">
//                       <item.icon className="w-4 h-4 text-accent-100" />
//                     </div>

//                     {/* Text wraps nicely without pushing the circle */}
//                     <span className="text-gray-300 leading-relaxed">
//                       {item.text}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section with improved divider */}
//         <div className="relative">
//           <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
//           <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm">
//               © {new Date().getFullYear()} SacredSecret. All rights reserved.
//             </p>

//             {/* Social links */}
//             <div className="flex space-x-6 mt-4 md:mt-0">
//               {[
//                 "Privacy Policy",
//                 "Refund Policy",
//                 "Terms of Service",
//                 "FAQ",
//               ].map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() =>
//                     handleNavigation(
//                       `/${item.toLowerCase().replace(/\s+/g, "-")}`
//                     )
//                   }
//                   className="text-sm text-gray-400 hover:text-accent-100 transition-colors"
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowUp, Linkedin, Instagram } from "lucide-react";

// Custom X (Twitter) Icon Component
const XIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (path === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
    } else if (path.startsWith("#")) {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: path.substring(1) } });
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  const bottomLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "FAQ", path: "/faq" },
  ];

  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      url: "https://www.linkedin.com/company/your-company" // Replace with your LinkedIn URL
    },
    { 
      name: "Instagram", 
      icon: Instagram, 
      url: "https://www.instagram.com/your-company" // Replace with your Instagram URL
    },
    { 
      name: "X", 
      icon: XIcon, 
      url: "https://x.com/your-company" // Replace with your X/Twitter URL
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-dark-200 to-dark-300 pt-16 pb-10 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.18),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-100/60 to-transparent"></div>
      <div className="absolute -top-40 right-20 w-80 h-80 bg-indigo-600/15 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 left-20 w-80 h-80 bg-purple-600/15 rounded-full filter blur-3xl"></div>
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-14 md:gap-20 mb-16">
          {/* Column 1: Logo and Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center -mt-4 mb-6">
              <img
                src="/SacredSecret logo color white.svg"
                alt="Logo"
                className="h-20 w-auto transform scale-125"
              />
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Securing your digital assets with advanced technology and an
              unwavering commitment to privacy.
            </p>

            {/* Back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-6 inline-flex items-center gap-2 text-accent-100 hover:text-accent-200 transition-colors"
            >
              <span className="text-sm font-medium">Back to top</span>
              <div className="w-6 h-6 rounded-full border border-accent-100/70 flex items-center justify-center group-hover:border-accent-200">
                <ArrowUp className="w-3 h-3" />
              </div>
            </button>
          </div>

          {/* Column 2 and Column 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14">
            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-gray-300 hover:text-accent-100 transition-colors flex items-center group"
                    >
                      <div className="w-0 h-px bg-accent-100 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></div>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-lg font-semibold mb-6 text-white">
                Contact Info
              </h4>
              <ul className="space-y-5">
                {[
                  { icon: Mail, text: "support@sacredsecret.in" },
                  { icon: Phone, text: "+91 8007774047" },
                  {
                    icon: MapPin,
                    text:
                      "301, Shiva Sai Enclave, 1st Cross, K Ramaiya Layout, Horamavu Agara, Bangalore 560043",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-dark-100 to-dark-50/90 flex items-center justify-center shadow-inner group-hover:shadow-accent-100/10 transition-all duration-300">
                      <item.icon className="w-4 h-4 text-accent-100" />
                    </div>
                    <span className="text-gray-300 leading-relaxed">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-gray-400 text-sm order-1 lg:order-1">
              © {new Date().getFullYear()} SacredSecret. All rights reserved.
            </p>

            {/* Social Media Links - Middle */}
            <div className="flex items-center gap-4 order-2 lg:order-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-dark-100 to-dark-50/90 flex items-center justify-center hover:from-accent-100/20 hover:to-accent-200/20 transition-all duration-300 group border border-gray-700/50 hover:border-accent-100/50"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-accent-100 transition-colors" />
                </a>
              ))}
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 order-3 lg:order-3">
              {bottomLinks.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="text-sm text-gray-400 hover:text-accent-100 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;