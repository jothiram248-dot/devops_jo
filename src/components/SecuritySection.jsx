// import React from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import {
//   Shield,
//   Lock,
//   Key,
//   Bell,
//   Users,
//   Database,
//   Server,
// } from "lucide-react";

// const bigBoxes = [
//   {
//     icon: Shield,
//     title: "End-to-End Encryption",
//     description:
//       "Military-grade encryption ensures your data remains secure from end to end, protecting your digital assets at every step.",
//   },
//   {
//     icon: Lock,
//     title: "Multi-Factor Authentication",
//     description:
//       "Advanced authentication protocols with multiple layers of security to verify legitimate access attempts.",
//   },
//   {
//     icon: Key,
//     title: "Secure Nominee Access",
//     description:
//       "A rigorous verification process ensures only authorized nominees can access designated assets.",
//   },
// ];

// const smallBoxes = [
//   {
//     icon: Bell,
//     title: "Real-time Alerts",
//     description: "Instant notifications for any security-related activities",
//   },
//   {
//     icon: Users,
//     title: "Access Control",
//     description: "Granular control over who can access what",
//   },
//   {
//     icon: Database,
//     title: "Encrypted Storage",
//     description: "Your data is encrypted at rest and in transit.",
//   },
//   {
//     icon: Server,
//     title: "Secure Infrastructure",
//     description: "Enterprise-grade security infrastructure in place.",
//   },
// ];

// const SecuritySection = () => {
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

//   return (
//     <>
//       <section
//         className="relative py-16 overflow-hidden"
//         id="security"
//       >
//         {/* Light Theme Background with Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-100/90 z-0"></div>
        
//         {/* Ambient gradient overlays */}
//         <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-200/30 to-transparent opacity-60 z-0"></div>
//         <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-200/30 to-transparent opacity-50 z-0"></div>
        
//         {/* Floating gradient spheres */}
//         <div className="absolute top-40 right-20 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-float-slow"></div>
//         <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-30 animate-float-slow-reverse"></div>
//         <div className="absolute top-10 left-1/4 w-64 h-64 bg-sky-300 rounded-full filter blur-3xl opacity-30 animate-float-medium"></div>
        
//         {/* Mesh gradient overlay */}
//         <div className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.3),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.3),_transparent_70%)]"></div>
        
//         {/* Subtle pattern overlay */}
//         <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xN2MwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTcgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0wIDE3YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>

//         <div className="container mx-auto px-6 relative z-10">
//           {/* Section Header */}
//           <motion.div
//             ref={ref}
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16 relative z-10"
//           >
//             {/* Section accent line with glow */}
//             <div className="relative w-24 h-1 mx-auto mb-8">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-sm opacity-70"></div>
//             </div>
            
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
//               Security First
//             </h2>
            
//             {/* Accent diamond */}
//             {/* <div className="flex justify-center mb-8">
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1, rotate: 45 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="w-3 h-3 bg-gradient-to-br from-blue-400 to-indigo-400 shadow-lg shadow-blue-500/30"
//               ></motion.div>
//             </div> */}
            
//             <p className="text-lg text-gray-700 max-w-3xl mx-auto">
//               Your security is our top priority. We use industry-leading security
//               measures to protect your digital assets.
//             </p>
//           </motion.div>

//           {/* Big Features Section - Keeping dark cards for contrast */}
//           <div className="grid md:grid-cols-3 gap-8 mb-12 relative z-10">
//             {bigBoxes.map((box, index) => (
//               <motion.div
//                 key={box.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 className="relative h-64 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] backdrop-blur-xl cursor-pointer group bg-gradient-to-br from-black/90 to-gray-900/90 border border-gray-800"
//               >
//                 {/* Background Pattern with Adjusted Opacity */}
//                 <div
//                   className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-all duration-500"
//                   style={{
//                     backgroundImage: "url('/assets/pattern/securityPattern.jpg')",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                   }}
//                 />

//                 {/* Glass Morphism Base Layer */}
//                 <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

//                 {/* Gradient Overlay */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-tr 
//                   ${index === 0 ? "from-blue-500/30 via-blue-400/20 to-transparent" : ""}
//                   ${index === 1 ? "from-purple-500/30 via-purple-400/20 to-transparent" : ""}
//                   ${index === 2 ? "from-indigo-500/30 via-indigo-400/20 to-transparent" : ""}
//                   opacity-80 group-hover:opacity-90 transition-all duration-500`}
//                 />

//                 {/* Icon */}
//                 <div
//                   className={`absolute top-4 left-4 p-3 rounded-2xl shadow-lg backdrop-blur-xl z-50
//                   ${index === 0 ? "bg-gradient-to-br from-blue-50 to-blue-100" : ""}
//                   ${index === 1 ? "bg-gradient-to-br from-purple-50 to-purple-100" : ""}
//                   ${index === 2 ? "bg-gradient-to-br from-indigo-50 to-indigo-100" : ""}`}
//                 >
//                   <div
//                     className={`rounded-xl p-3 shadow-inner
//                     ${index === 0 ? "bg-gradient-to-br from-blue-400 to-blue-600" : ""}
//                     ${index === 1 ? "bg-gradient-to-br from-purple-400 to-purple-600" : ""}
//                     ${index === 2 ? "bg-gradient-to-br from-indigo-400 to-indigo-600" : ""}`}
//                   >
//                     {React.createElement(box.icon, {
//                       className: "w-6 h-6 text-white drop-shadow-lg",
//                     })}
//                   </div>
//                 </div>

//                 {/* Content Section with Animated Underline */}
//                 <div className="absolute inset-x-0 bottom-0 pt-16 px-6 pb-6 bg-gradient-to-t from-black/40 via-black/30 to-transparent backdrop-blur-md">
//                   {/* Title with Hover Animated Underline */}
//                   <div className="relative mb-3">
//                     <h3 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors duration-300">
//                       {box.title}
//                     </h3>
//                     <div className={`absolute -bottom-1 left-0 h-0.5 w-10 group-hover:w-3/4 transition-all duration-700 ease-in-out
//                       ${index === 0 ? "bg-blue-400 group-hover:bg-blue-600" : ""}
//                       ${index === 1 ? "bg-purple-400 group-hover:bg-purple-600" : ""}
//                       ${index === 2 ? "bg-indigo-400 group-hover:bg-indigo-600" : ""}
//                     `}></div>
//                   </div>

//                   {/* Description */}
//                   <p className="text-sm text-gray-300">{box.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Small Features Section - Updated for light theme but keeping dark cards for contrast */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
//             {smallBoxes.map((box, index) => (
//               <motion.div
//                 key={box.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
//                 className="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800"
//               >
//                 {/* Glass Morphism Layer */}
//                 <div className="absolute inset-0 backdrop-blur-md bg-black/20 z-0"></div>
                
//                 {/* Background Pattern with Enhanced Visibility */}
//                 <div
//                   className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-all duration-500"
//                   style={{
//                     backgroundImage: "url('/assets/pattern/smallFeaturesPattern.png')",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                     filter: "contrast(1.1) brightness(0.9)",
//                   }}
//                 />
                
//                 {/* Dynamic Gradient Overlay */}
//                 <div className={`absolute inset-0 opacity-30 group-hover:opacity-50 transition-all duration-500 bg-gradient-to-br 
//                   ${index % 4 === 0 ? "from-blue-900/40 to-blue-700/20" : ""}
//                   ${index % 4 === 1 ? "from-purple-900/40 to-purple-700/20" : ""}
//                   ${index % 4 === 2 ? "from-amber-900/40 to-amber-700/20" : ""}
//                   ${index % 4 === 3 ? "from-emerald-900/40 to-emerald-700/20" : ""}
//                 `}></div>
                
//                 {/* Animated Top Accent Line */}
//                 <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r 
//                   ${index % 4 === 0 ? "from-blue-600 to-blue-700" : ""}
//                   ${index % 4 === 1 ? "from-purple-600 to-purple-700" : ""}
//                   ${index % 4 === 2 ? "from-amber-600 to-amber-700" : ""}
//                   ${index % 4 === 3 ? "from-emerald-600 to-emerald-700" : ""}
//                   group-hover:h-2 transition-all duration-300
//                 `}></div>
                
//                 {/* Icon Container with 3D Effect */}
//                 <div className="relative z-10 p-5">
//                   <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br 
//                     ${index % 4 === 0 ? "from-blue-700 to-blue-900" : ""}
//                     ${index % 4 === 1 ? "from-purple-700 to-purple-900" : ""}
//                     ${index % 4 === 2 ? "from-amber-700 to-amber-900" : ""}
//                     ${index % 4 === 3 ? "from-emerald-700 to-emerald-900" : ""}
//                     flex items-center justify-center shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-1 transition-all duration-300
//                   `}>
//                     {React.createElement(box.icon, { className: "w-7 h-7 text-white drop-shadow-md" })}
//                   </div>
//                   {/* Icon Glow Effect */}
//                   <div className={`absolute top-6 left-6 w-12 h-12 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500
//                     ${index % 4 === 0 ? "bg-blue-500" : ""}
//                     ${index % 4 === 1 ? "bg-purple-500" : ""}
//                     ${index % 4 === 2 ? "bg-amber-500" : ""}
//                     ${index % 4 === 3 ? "bg-emerald-500" : ""}
//                   `}></div>
//                 </div>
                
//                 {/* Content Section with Enhanced Typography */}
//                 <div className="relative z-10 px-5 pb-5">
//                   {/* Title with Animated Line */}
//                   <div className="relative mb-3">
//                     <h4 className={`text-base font-bold text-gray-300 group-hover:text-white transition-colors duration-300`}>
//                       {box.title}
//                     </h4>
//                     <div className={`absolute -bottom-1.5 left-0 h-0.5 w-8 group-hover:w-full transition-all duration-500 ease-in-out
//                       ${index % 4 === 0 ? "bg-blue-500" : ""}
//                       ${index % 4 === 1 ? "bg-purple-500" : ""}
//                       ${index % 4 === 2 ? "bg-amber-500" : ""}
//                       ${index % 4 === 3 ? "bg-emerald-500" : ""}
//                     `}></div>
//                   </div>
                  
//                   <p className="text-xs text-gray-400 leading-relaxed font-medium">
//                     {box.description}
//                   </p>
//                 </div>
                
//                 {/* Decorative Elements */}
//                 <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-70"></div>
                
//                 {/* Corner Elements */}
//                 <div className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-tl-xl bg-gradient-to-tl 
//                   ${index % 4 === 0 ? "from-blue-700/30 via-blue-500/20" : ""}
//                   ${index % 4 === 1 ? "from-purple-700/30 via-purple-500/20" : ""}
//                   ${index % 4 === 2 ? "from-amber-700/30 via-amber-500/20" : ""}
//                   ${index % 4 === 3 ? "from-emerald-700/30 via-emerald-500/20" : ""}
//                   to-transparent
//                 `}></div>
                
//                 {/* Subtle Dots in Background */}
//                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:8px_8px]"></div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SecuritySection;











import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Lock,
  Key,
  Bell,
  Users,
  Database,
  Server,
} from "lucide-react";

const bigBoxes = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "Military-grade encryption ensures your data remains secure from end to end, protecting your digital assets at every step.",
  },
  {
    icon: Lock,
    title: "Multi-Factor Authentication",
    description:
      "Advanced authentication protocols with multiple layers of security to verify legitimate access attempts.",
  },
  {
    icon: Key,
    title: "Secure Nominee Access",
    description:
      "A rigorous verification process ensures only authorized nominees can access designated assets.",
  },
];

const smallBoxes = [
  {
    icon: Bell,
    title: "Real-time Alerts",
    description: "Instant notifications for any security-related activities",
  },
  {
    icon: Users,
    title: "Access Control",
    description: "Granular control over who can access what",
  },
  {
    icon: Database,
    title: "Encrypted Storage",
    description: "Your data is encrypted at rest and in transit.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security infrastructure in place.",
  },
];



const SecuritySection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-16 overflow-hidden" id="security">
      {/* Light Theme Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-100/90 z-0"></div>
      
      {/* Ambient gradient overlays */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-200/30 to-transparent opacity-60 z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-200/30 to-transparent opacity-50 z-0"></div>
      
      {/* Floating gradient spheres */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-float-slow"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-30 animate-float-slow-reverse"></div>
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-sky-300 rounded-full filter blur-3xl opacity-30 animate-float-medium"></div>
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.3),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.3),_transparent_70%)]"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xN2MwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTcgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0wIDE3YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          {/* Section accent line with glow */}
          <div className="relative w-24 h-1 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-sm opacity-70"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl py-1 font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            Security First
          </h2>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Your security is our top priority. We use industry-leading security
            measures to protect your digital assets.
          </p>
        </motion.div>



<div className="flex flex-col md:flex-row gap-0 relative z-10 items-start">
  {/* Left Column: Big Features */}
  <div className="w-full md:w-2/5 flex flex-col gap-6 max-w-sm mx-auto">
    {bigBoxes.map((box, index) => (
      <motion.div
        key={box.title}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="relative h-60 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] backdrop-blur-xl cursor-pointer group bg-gradient-to-br from-black/90 to-gray-900/90 border border-gray-800"
      >
        {/* Big card background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-all duration-500"
          style={{
            backgroundImage: "url('/assets/pattern/securityPattern.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
        <div
          className={`absolute inset-0 bg-gradient-to-tr 
            ${index === 0 ? "from-blue-500/30 via-blue-400/20 to-transparent" : ""}
            ${index === 1 ? "from-purple-500/30 via-purple-400/20 to-transparent" : ""}
            ${index === 2 ? "from-indigo-500/30 via-indigo-400/20 to-transparent" : ""}
            opacity-80 group-hover:opacity-90 transition-all duration-500`}
        />
        <div
          className={`absolute top-4 left-4 p-3 rounded-2xl shadow-lg backdrop-blur-xl z-50
            ${index === 0 ? "bg-gradient-to-br from-blue-50 to-blue-100" : ""}
            ${index === 1 ? "bg-gradient-to-br from-purple-50 to-purple-100" : ""}
            ${index === 2 ? "bg-gradient-to-br from-indigo-50 to-indigo-100" : ""}
          `}
        >
          <div
            className={`rounded-xl p-3 shadow-inner
              ${index === 0 ? "bg-gradient-to-br from-blue-400 to-blue-600" : ""}
              ${index === 1 ? "bg-gradient-to-br from-purple-400 to-purple-600" : ""}
              ${index === 2 ? "bg-gradient-to-br from-indigo-400 to-indigo-600" : ""}
            `}
          >
            {React.createElement(box.icon, {
              className: "w-6 h-6 text-white drop-shadow-lg",
            })}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 pt-16 px-6 pb-6 bg-gradient-to-t from-black/40 via-black/30 to-transparent backdrop-blur-md">
          <div className="relative mb-3">
            <h3 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors duration-300">
              {box.title}
            </h3>
            {/* FIXED: Reduced animation duration from 700ms to 300ms for faster hover tilde effect */}
            <div className={`absolute -bottom-1 left-0 h-0.5 w-10 group-hover:w-3/4 transition-all duration-300 ease-in-out
                ${index === 0 ? "bg-blue-400 group-hover:bg-blue-600" : ""}
                ${index === 1 ? "bg-purple-400 group-hover:bg-purple-600" : ""}
                ${index === 2 ? "bg-indigo-400 group-hover:bg-indigo-600" : ""}
            `}></div>
          </div>
          <p className="text-sm text-gray-300">{box.description}</p>
        </div>
      </motion.div>
    ))}
  </div>

  {/* Divider: Horizontal for mobile, vertical for desktop */}
  <div className="md:hidden w-full h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent my-8"></div>
  <div className="hidden md:block w-px h-full min-h-[600px] bg-gradient-to-b from-transparent via-gray-700/40 to-transparent self-stretch mx-8 my-auto"></div>

  {/* Right Column: Small Features */}
  <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-[700px] mt-8 md:mt-0 md:left-0 lg:left-20 xl:left-40 px-4 md:px-0">
    {/* Mobile view - stacked cards */}
    <div className="md:hidden flex flex-col gap-6">
      {smallBoxes.map((box, index) => (
        <motion.div
          key={`mobile-${box.title}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
          whileHover={{ scale: 1.03 }}
          className="relative w-full overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800"
          style={{ transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})` }}
        >
          <div className="absolute inset-0 backdrop-blur-md bg-black/20 z-0"></div>
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r 
              ${index % 4 === 0 ? "from-blue-600 to-blue-700" : ""}
              ${index % 4 === 1 ? "from-purple-600 to-purple-700" : ""}
              ${index % 4 === 2 ? "from-amber-600 to-amber-700" : ""}
              ${index % 4 === 3 ? "from-emerald-600 to-emerald-700" : ""}
          `}></div>
          
          <div className="relative z-10 p-5">
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br
                  ${index % 4 === 0 ? "from-blue-700 to-blue-900" : ""}
                  ${index % 4 === 1 ? "from-purple-700 to-purple-900" : ""}
                  ${index % 4 === 2 ? "from-amber-700 to-amber-900" : ""}
                  ${index % 4 === 3 ? "from-emerald-700 to-emerald-900" : ""}
                  flex items-center justify-center shadow-lg
              `}>
                {React.createElement(box.icon, { className: "w-5 h-5 text-white" })}
              </div>
              <h4 className="text-lg font-bold text-white">{box.title}</h4>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{box.description}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Desktop view - positioned cards */}
    <div className="hidden md:block">
      {smallBoxes.map((box, index) => {
        // More responsive positions
        const positions = [
          { left: '15%', top: '5%', rotate: '-4deg' },
          { left: '-15%', top: '30%', rotate: '3deg' },
          { left: '15%', top: '55%', rotate: '-3deg' },
          { left: '-15%', top: '80%', rotate: '4deg' },
        ];
        
        const pos = positions[index % positions.length];
        
        return (
          <motion.div
            key={`desktop-${box.title}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: pos.rotate.includes("-")
                ? parseInt(pos.rotate) - 1 + "deg"
                : parseInt(pos.rotate) + 1 + "deg",
            }}
            className="absolute w-64 md:w-60 overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800"
            style={{
              left: pos.left,
              top: pos.top,
              transform: `rotate(${pos.rotate})`,
              zIndex: 10 - index,
              rotate: pos.rotate.includes("-")
              ? parseInt(pos.rotate) - 1 + "deg"
              : parseInt(pos.rotate) + 1 + "deg",
            }}
          >
            <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-md z-30
                ${index % 4 === 0 ? "bg-blue-500" : ""}
                ${index % 4 === 1 ? "bg-purple-500" : ""}
                ${index % 4 === 2 ? "bg-amber-500" : ""}
                ${index % 4 === 3 ? "bg-emerald-500" : ""}
            `}></div>
            
            <div className="absolute inset-0 backdrop-blur-md bg-black/20 z-0"></div>
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r 
                ${index % 4 === 0 ? "from-blue-600 to-blue-700" : ""}
                ${index % 4 === 1 ? "from-purple-600 to-purple-700" : ""}
                ${index % 4 === 2 ? "from-amber-600 to-amber-700" : ""}
                ${index % 4 === 3 ? "from-emerald-600 to-emerald-700" : ""}
                group-hover:h-2 transition-all duration-300
            `}></div>
            
            {/* <div className={`absolute top-3 left-3 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold
                ${index % 4 === 0 ? "bg-blue-500/20 text-blue-300" : ""}
                ${index % 4 === 1 ? "bg-purple-500/20 text-purple-300" : ""}
                ${index % 4 === 2 ? "bg-amber-500/20 text-amber-300" : ""}
                ${index % 4 === 3 ? "bg-emerald-500/20 text-emerald-300" : ""}
            `}>
              0{index + 1}
            </div> */}
            
            <div className="relative z-10 p-5 pt-7">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br float-right ml-2 mb-1
                  ${index % 4 === 0 ? "from-blue-700 to-blue-900" : ""}
                  ${index % 4 === 1 ? "from-purple-700 to-purple-900" : ""}
                  ${index % 4 === 2 ? "from-amber-700 to-amber-900" : ""}
                  ${index % 4 === 3 ? "from-emerald-700 to-emerald-900" : ""}
                  flex items-center justify-center shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-1 transition-all duration-300
              `}>
                {React.createElement(box.icon, { className: "w-6 h-6 text-white drop-shadow-md" })}
              </div>
              
              <div className="relative mb-2">
                <h4 className="text-base font-bold text-gray-300 group-hover:text-white transition-colors duration-300">
                  {box.title}
                </h4>
                {/* FIXED: Added margin-right to prevent underline from touching the icon, reduced duration to 300ms */}
                <div className={`absolute -bottom-1.5 left-0 h-0.5 w-8 mr-14 group-hover:w-2/3 transition-all duration-300 ease-in-out
                  ${index % 4 === 0 ? "bg-blue-500" : ""}
                  ${index % 4 === 1 ? "bg-purple-500" : ""}
                  ${index % 4 === 2 ? "bg-amber-500" : ""}
                  ${index % 4 === 3 ? "bg-emerald-500" : ""}
                `}></div>
              </div>
              
              <p className="text-xs text-gray-400 leading-relaxed font-medium clear-both">
                {box.description}
              </p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-70"></div>
            
            <div className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-tl-xl bg-gradient-to-tl 
              ${index % 4 === 0 ? "from-blue-700/30 via-blue-500/20" : ""}
              ${index % 4 === 1 ? "from-purple-700/30 via-purple-500/20" : ""}
              ${index % 4 === 2 ? "from-amber-700/30 via-amber-500/20" : ""}
              ${index % 4 === 3 ? "from-emerald-700/30 via-emerald-500/20" : ""}
              to-transparent
            `}></div>
          </motion.div>
        );
      })}
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default SecuritySection;
