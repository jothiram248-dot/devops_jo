// // import React from "react";
// // import { motion } from "framer-motion";
// // import { useInView } from "react-intersection-observer";
// // import { Shield, Lock, Key, Bell, Users, Database, Server } from "lucide-react";

// // const bigBoxes = [
// //   {
// //     icon: Shield,
// //     title: "End-to-End Encryption",
// //     description:
// //       "Military-grade encryption ensures your data remains secure from end to end, protecting your digital assets at every step.",
// //   },
// //   {
// //     icon: Lock,
// //     title: "Multi-Factor Authentication",
// //     description:
// //       "Advanced authentication protocols with multiple layers of security to verify legitimate access attempts.",
// //   },
// //   {
// //     icon: Key,
// //     title: "Secure Nominee Access",
// //     description:
// //       "A rigorous verification process ensures only authorized nominees can access designated assets.",
// //   },
// // ];

// // const smallBoxes = [
// //   {
// //     icon: Bell,
// //     title: "Real-time Alerts",
// //     description: "Instant notifications for any security-related activities",
// //   },
// //   {
// //     icon: Users,
// //     title: "Access Control",
// //     description: "Granular control over who can access what",
// //   },
// //   {
// //     icon: Database,
// //     title: "Encrypted Storage",
// //     description: "Your data is encrypted at rest and in transit.",
// //   },
// //   {
// //     icon: Server,
// //     title: "Secure Infrastructure",
// //     description: "Enterprise-grade security infrastructure in place.",
// //   },
// // ];

// // const SecuritySection = () => {
// //   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

// //   return (
// //     <section className="relative py-16 overflow-hidden" id="security">
// //       {/* Light Theme Background with Gradient */}
// //       <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-100/90 z-0"></div>

// //       {/* Ambient gradient overlays */}
// //       <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-200/30 to-transparent opacity-60 z-0"></div>
// //       <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-200/30 to-transparent opacity-50 z-0"></div>

// //       {/* Floating gradient spheres */}
// //       <div className="absolute top-40 right-20 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-float-slow"></div>
// //       <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-30 animate-float-slow-reverse"></div>
// //       <div className="absolute top-10 left-1/4 w-64 h-64 bg-sky-300 rounded-full filter blur-3xl opacity-30 animate-float-medium"></div>

// //       {/* Mesh gradient overlay */}
// //       <div className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.3),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.3),_transparent_70%)]"></div>

// //       {/* Subtle pattern overlay */}
// //       <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xN2MwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTcgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0wIDE3YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>

// //       <div className="container mx-auto px-6 relative z-10">
// //         {/* Section Header */}
// //         <motion.div
// //           ref={ref}
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={inView ? { opacity: 1, y: 0 } : {}}
// //           transition={{ duration: 0.6 }}
// //           className="text-center mb-16 relative z-10"
// //         >
// //           {/* Section accent line with glow */}
// //           <div className="relative w-24 h-1 mx-auto mb-8">
// //             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
// //             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-sm opacity-70"></div>
// //           </div>

// //           <h2 className="text-4xl md:text-5xl py-1 font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
// //             Security First
// //           </h2>

// //           <p className="text-lg text-gray-700 max-w-3xl mx-auto">
// //             Your security is our top priority. We use industry-leading security
// //             measures to protect your digital assets.
// //           </p>
// //         </motion.div>

// //         <div className="flex flex-col md:flex-row gap-0 relative z-10 items-start">
// //           {/* Left Column: Big Features */}
// //           <div className="w-full md:w-2/5 flex flex-col gap-6 max-w-sm mx-auto">
// //             {bigBoxes.map((box, index) => (
// //               <motion.div
// //                 key={box.title}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={inView ? { opacity: 1, y: 0 } : {}}
// //                 transition={{ duration: 0.6, delay: index * 0.2 }}
// //                 className="relative h-60 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] backdrop-blur-xl cursor-pointer group bg-gradient-to-br from-black/90 to-gray-900/90 border border-gray-800"
// //               >
// //                 <div
// //                   className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-all duration-500"
// //                   style={{
// //                     backgroundImage:
// //                       "url('/assets/pattern/securityPattern.jpg')",
// //                     backgroundSize: "cover",
// //                     backgroundPosition: "center",
// //                     backgroundRepeat: "no-repeat",
// //                   }}
// //                 />
// //                 <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
// //                 <div
// //                   className={`absolute inset-0 bg-gradient-to-tr 
// //             ${
// //               index === 0
// //                 ? "from-blue-500/30 via-blue-400/20 to-transparent"
// //                 : ""
// //             }
// //             ${
// //               index === 1
// //                 ? "from-purple-500/30 via-purple-400/20 to-transparent"
// //                 : ""
// //             }
// //             ${
// //               index === 2
// //                 ? "from-indigo-500/30 via-indigo-400/20 to-transparent"
// //                 : ""
// //             }
// //             opacity-80 group-hover:opacity-90 transition-all duration-500`}
// //                 />
// //                 <div
// //                   className={`absolute top-4 left-4 p-3 rounded-2xl shadow-lg backdrop-blur-xl z-50
// //             ${index === 0 ? "bg-gradient-to-br from-blue-50 to-blue-100" : ""}
// //             ${
// //               index === 1
// //                 ? "bg-gradient-to-br from-purple-50 to-purple-100"
// //                 : ""
// //             }
// //             ${
// //               index === 2
// //                 ? "bg-gradient-to-br from-indigo-50 to-indigo-100"
// //                 : ""
// //             }
// //           `}
// //                 >
// //                   <div
// //                     className={`rounded-xl p-3 shadow-inner
// //               ${
// //                 index === 0 ? "bg-gradient-to-br from-blue-400 to-blue-600" : ""
// //               }
// //               ${
// //                 index === 1
// //                   ? "bg-gradient-to-br from-purple-400 to-purple-600"
// //                   : ""
// //               }
// //               ${
// //                 index === 2
// //                   ? "bg-gradient-to-br from-indigo-400 to-indigo-600"
// //                   : ""
// //               }
// //             `}
// //                   >
// //                     {React.createElement(box.icon, {
// //                       className: "w-6 h-6 text-white drop-shadow-lg",
// //                     })}
// //                   </div>
// //                 </div>
// //                 <div className="absolute inset-x-0 bottom-0 pt-16 px-6 pb-6 bg-gradient-to-t from-black/40 via-black/30 to-transparent backdrop-blur-md">
// //                   <div className="relative mb-3">
// //                     <h3 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors duration-300">
// //                       {box.title}
// //                     </h3>

// //                     <div
// //                       className={`absolute -bottom-1 left-0 h-0.5 w-10 group-hover:w-3/4 transition-all duration-300 ease-in-out
// //                 ${index === 0 ? "bg-blue-400 group-hover:bg-blue-600" : ""}
// //                 ${index === 1 ? "bg-purple-400 group-hover:bg-purple-600" : ""}
// //                 ${index === 2 ? "bg-indigo-400 group-hover:bg-indigo-600" : ""}
// //             `}
// //                     ></div>
// //                   </div>
// //                   <p className="text-sm text-gray-300">{box.description}</p>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           <div className="md:hidden w-full h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent my-8"></div>
// //           <div className="hidden md:block w-px h-full min-h-[600px] bg-gradient-to-b from-transparent via-gray-700/40 to-transparent self-stretch mx-8 my-auto"></div>

// //           {/* Right Column: Small Features */}
// //           <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-[700px] mt-8 md:mt-0 md:left-0 lg:left-20 xl:left-40 px-4 md:px-0">
// //             {/* Mobile view - stacked cards */}
// //             <div className="md:hidden flex flex-col gap-6">
// //               {smallBoxes.map((box, index) => (
// //                 <motion.div
// //                   key={`mobile-${box.title}`}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={inView ? { opacity: 1, y: 0 } : {}}
// //                   transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
// //                   whileHover={{ scale: 1.03 }}
// //                   className="relative w-full overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800"
// //                   style={{
// //                     transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})`,
// //                   }}
// //                 >
// //                   <div className="absolute inset-0 backdrop-blur-md bg-black/20 z-0"></div>
// //                   <div
// //                     className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r 
// //               ${index % 4 === 0 ? "from-blue-600 to-blue-700" : ""}
// //               ${index % 4 === 1 ? "from-purple-600 to-purple-700" : ""}
// //               ${index % 4 === 2 ? "from-amber-600 to-amber-700" : ""}
// //               ${index % 4 === 3 ? "from-emerald-600 to-emerald-700" : ""}
// //           `}
// //                   ></div>

// //                   <div className="relative z-10 p-5">
// //                     <div className="flex items-center gap-4 mb-3">
// //                       <div
// //                         className={`w-10 h-10 rounded-xl bg-gradient-to-br
// //                   ${index % 4 === 0 ? "from-blue-700 to-blue-900" : ""}
// //                   ${index % 4 === 1 ? "from-purple-700 to-purple-900" : ""}
// //                   ${index % 4 === 2 ? "from-amber-700 to-amber-900" : ""}
// //                   ${index % 4 === 3 ? "from-emerald-700 to-emerald-900" : ""}
// //                   flex items-center justify-center shadow-lg
// //               `}
// //                       >
// //                         {React.createElement(box.icon, {
// //                           className: "w-5 h-5 text-white",
// //                         })}
// //                       </div>
// //                       <h4 className="text-lg font-bold text-white">
// //                         {box.title}
// //                       </h4>
// //                     </div>
// //                     <p className="text-sm text-gray-300 leading-relaxed">
// //                       {box.description}
// //                     </p>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </div>

// //             <div className="hidden md:block">
// //               {smallBoxes.map((box, index) => {
// //                 // More responsive positions
// //                 const positions = [
// //                   { left: "15%", top: "5%", rotate: "-4deg" },
// //                   { left: "-15%", top: "30%", rotate: "3deg" },
// //                   { left: "15%", top: "55%", rotate: "-3deg" },
// //                   { left: "-15%", top: "80%", rotate: "4deg" },
// //                 ];

// //                 const pos = positions[index % positions.length];

// //                 return (
// //                   <motion.div
// //                     key={`desktop-${box.title}`}
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={inView ? { opacity: 1, y: 0 } : {}}
// //                     transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
// //                     whileHover={{
// //                       scale: 1.05,
// //                       rotate: pos.rotate.includes("-")
// //                         ? parseInt(pos.rotate) - 1 + "deg"
// //                         : parseInt(pos.rotate) + 1 + "deg",
// //                     }}
// //                     className="absolute w-64 md:w-60 overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800"
// //                     style={{
// //                       left: pos.left,
// //                       top: pos.top,
// //                       transform: `rotate(${pos.rotate})`,
// //                       zIndex: 10 - index,
// //                       rotate: pos.rotate.includes("-")
// //                         ? parseInt(pos.rotate) - 1 + "deg"
// //                         : parseInt(pos.rotate) + 1 + "deg",
// //                     }}
// //                   >
// //                     <div
// //                       className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-md z-30
// //                 ${index % 4 === 0 ? "bg-blue-500" : ""}
// //                 ${index % 4 === 1 ? "bg-purple-500" : ""}
// //                 ${index % 4 === 2 ? "bg-amber-500" : ""}
// //                 ${index % 4 === 3 ? "bg-emerald-500" : ""}
// //             `}
// //                     ></div>

// //                     <div className="absolute inset-0 backdrop-blur-md bg-black/20 z-0"></div>
// //                     <div
// //                       className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r 
// //                 ${index % 4 === 0 ? "from-blue-600 to-blue-700" : ""}
// //                 ${index % 4 === 1 ? "from-purple-600 to-purple-700" : ""}
// //                 ${index % 4 === 2 ? "from-amber-600 to-amber-700" : ""}
// //                 ${index % 4 === 3 ? "from-emerald-600 to-emerald-700" : ""}
// //                 group-hover:h-2 transition-all duration-300
// //             `}
// //                     ></div>

// //                     {/* <div className={`absolute top-3 left-3 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold
// //                 ${index % 4 === 0 ? "bg-blue-500/20 text-blue-300" : ""}
// //                 ${index % 4 === 1 ? "bg-purple-500/20 text-purple-300" : ""}
// //                 ${index % 4 === 2 ? "bg-amber-500/20 text-amber-300" : ""}
// //                 ${index % 4 === 3 ? "bg-emerald-500/20 text-emerald-300" : ""}
// //             `}>
// //               0{index + 1}
// //             </div> */}

// //                     <div className="relative z-10 p-5 pt-7">
// //                       <div
// //                         className={`w-12 h-12 rounded-xl bg-gradient-to-br float-right ml-2 mb-1
// //                   ${index % 4 === 0 ? "from-blue-700 to-blue-900" : ""}
// //                   ${index % 4 === 1 ? "from-purple-700 to-purple-900" : ""}
// //                   ${index % 4 === 2 ? "from-amber-700 to-amber-900" : ""}
// //                   ${index % 4 === 3 ? "from-emerald-700 to-emerald-900" : ""}
// //                   flex items-center justify-center shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-1 transition-all duration-300
// //               `}
// //                       >
// //                         {React.createElement(box.icon, {
// //                           className: "w-6 h-6 text-white drop-shadow-md",
// //                         })}
// //                       </div>

// //                       <div className="relative mb-2">
// //                         <h4 className="text-base font-bold text-gray-300 group-hover:text-white transition-colors duration-300">
// //                           {box.title}
// //                         </h4>

// //                         <div
// //                           className={`absolute -bottom-1.5 left-0 h-0.5 w-8 mr-14 group-hover:w-2/3 transition-all duration-300 ease-in-out
// //                   ${index % 4 === 0 ? "bg-blue-500" : ""}
// //                   ${index % 4 === 1 ? "bg-purple-500" : ""}
// //                   ${index % 4 === 2 ? "bg-amber-500" : ""}
// //                   ${index % 4 === 3 ? "bg-emerald-500" : ""}
// //                 `}
// //                         ></div>
// //                       </div>

// //                       <p className="text-xs text-gray-400 leading-relaxed font-medium clear-both">
// //                         {box.description}
// //                       </p>
// //                     </div>

// //                     <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-70"></div>

// //                     <div
// //                       className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-tl-xl bg-gradient-to-tl 
// //               ${index % 4 === 0 ? "from-blue-700/30 via-blue-500/20" : ""}
// //               ${index % 4 === 1 ? "from-purple-700/30 via-purple-500/20" : ""}
// //               ${index % 4 === 2 ? "from-amber-700/30 via-amber-500/20" : ""}
// //               ${index % 4 === 3 ? "from-emerald-700/30 via-emerald-500/20" : ""}
// //               to-transparent
// //             `}
// //                     ></div>
// //                   </motion.div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default SecuritySection;




// import React from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Shield, Lock, Key, Bell, Users, Database, Server } from "lucide-react";

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
//     <section className="relative py-16 overflow-hidden" id="security">
//       {/* Dark Theme Background with Gradient */}
//       <div className="absolute inset-0 bg-dark-100 bg-[url('/assets/pattern/securityPattern.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
      
//       {/* Enhanced background effects - DARK theme */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/50 backdrop-blur-[6px] opacity-85 z-0 pointer-events-none"></div>
//       <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none z-0"></div>

//       {/* Floating gradient spheres - darker colors */}
//       <div className="absolute top-40 right-20 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-float-slow"></div>
//       <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-10 animate-float-slow-reverse"></div>
//       <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-float-medium"></div>

//       {/* Mesh gradient overlay - darker */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.2),transparent_70%),radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.2),transparent_70%)]"></div>

//       {/* Additional dark gradients */}
//       <div className="absolute top-1/4 right-1/6 w-80 h-80 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
//       <div className="absolute bottom-1/4 left-1/6 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>

//       {/* Enhanced floating particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/40 animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${15 + Math.random() * 15}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         {/* Section Header */}
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16 relative z-10"
//         >
//           {/* Section accent line with glow */}
//           <div className="relative w-24 h-1 mx-auto mb-8">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-sm opacity-70"></div>
//           </div>

//           <h2 className="text-4xl md:text-5xl py-1 font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
//             Security First
//           </h2>

//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             Your security is our top priority. We use industry-leading security
//             measures to protect your digital assets.
//           </p>
//         </motion.div>

//         <div className="flex flex-col md:flex-row gap-0 relative z-10 items-start">
//           {/* Left Column: Big Features - LIGHT CARDS */}
//           <div className="w-full md:w-2/5 flex flex-col gap-6 max-w-sm mx-auto">
//             {bigBoxes.map((box, index) => (
//               <motion.div
//                 key={box.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 className="relative h-60 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] backdrop-blur-xl cursor-pointer group bg-gradient-to-br from-white/95 to-gray-50/95 border border-gray-200"
//               >
//                 <div
//                   className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-all duration-500"
//                   style={{
//                     backgroundImage:
//                       "url('/assets/pattern/securityPattern.jpg')",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-tr 
//             ${
//               index === 0
//                 ? "from-blue-100/50 via-blue-50/30 to-transparent"
//                 : ""
//             }
//             ${
//               index === 1
//                 ? "from-purple-100/50 via-purple-50/30 to-transparent"
//                 : ""
//             }
//             ${
//               index === 2
//                 ? "from-indigo-100/50 via-indigo-50/30 to-transparent"
//                 : ""
//             }
//             opacity-80 group-hover:opacity-90 transition-all duration-500`}
//                 />
//                 <div
//                   className={`absolute top-4 left-4 p-3 rounded-2xl shadow-lg backdrop-blur-xl z-50
//             ${index === 0 ? "bg-gradient-to-br from-blue-50 to-blue-100" : ""}
//             ${
//               index === 1
//                 ? "bg-gradient-to-br from-purple-50 to-purple-100"
//                 : ""
//             }
//             ${
//               index === 2
//                 ? "bg-gradient-to-br from-indigo-50 to-indigo-100"
//                 : ""
//             }
//           `}
//                 >
//                   <div
//                     className={`rounded-xl p-3 shadow-inner
//               ${
//                 index === 0 ? "bg-gradient-to-br from-blue-400 to-blue-600" : ""
//               }
//               ${
//                 index === 1
//                   ? "bg-gradient-to-br from-purple-400 to-purple-600"
//                   : ""
//               }
//               ${
//                 index === 2
//                   ? "bg-gradient-to-br from-indigo-400 to-indigo-600"
//                   : ""
//               }
//             `}
//                   >
//                     {React.createElement(box.icon, {
//                       className: "w-6 h-6 text-white drop-shadow-md",
//                     })}
//                   </div>
//                 </div>
//                 <div className="relative z-10 p-6 h-full flex flex-col justify-end">
//                   <div>
//                     <h3 className="text-2xl font-bold mb-3 text-gray-900 drop-shadow-sm tracking-tight">
//                       {box.title}
//                     </h3>
//                     <p className="text-sm text-gray-700 leading-relaxed">
//                       {box.description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Right Column: Small Features Grid - LIGHT CARDS */}
//           <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-[700px] mt-8 md:mt-0 md:left-0 lg:left-20 xl:left-40 px-4 md:px-0">
//             {/* Mobile view - stacked cards */}
//             <div className="md:hidden flex flex-col gap-6">
//               {smallBoxes.map((box, index) => (
//                 <motion.div
//                   key={`mobile-${box.title}`}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={inView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
//                   whileHover={{ scale: 1.03 }}
//                   className="relative w-full overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl border border-gray-200"
//                   style={{
//                     transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})`,
//                   }}
//                 >
//                   <div className="absolute inset-0 backdrop-blur-md bg-white/20 z-0"></div>
//                   <div
//                     className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r 
//               ${index % 4 === 0 ? "from-blue-400 to-blue-500" : ""}
//               ${index % 4 === 1 ? "from-purple-400 to-purple-500" : ""}
//               ${index % 4 === 2 ? "from-amber-400 to-amber-500" : ""}
//               ${index % 4 === 3 ? "from-emerald-400 to-emerald-500" : ""}
//           `}
//                   ></div>

//                   <div className="relative z-10 p-5">
//                     <div className="flex items-center gap-4 mb-3">
//                       <div
//                         className={`w-10 h-10 rounded-xl bg-gradient-to-br
//                   ${index % 4 === 0 ? "from-blue-400 to-blue-600" : ""}
//                   ${index % 4 === 1 ? "from-purple-400 to-purple-600" : ""}
//                   ${index % 4 === 2 ? "from-amber-400 to-amber-600" : ""}
//                   ${index % 4 === 3 ? "from-emerald-400 to-emerald-600" : ""}
//                   flex items-center justify-center shadow-lg
//               `}
//                       >
//                         {React.createElement(box.icon, {
//                           className: "w-5 h-5 text-white",
//                         })}
//                       </div>
//                       <h4 className="text-lg font-bold text-gray-900">
//                         {box.title}
//                       </h4>
//                     </div>
//                     <p className="text-sm text-gray-700 leading-relaxed">
//                       {box.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             <div className="hidden md:block">
//               {smallBoxes.map((box, index) => {
//                 // More responsive positions
//                 const positions = [
//                   { left: "15%", top: "5%", rotate: "-4deg" },
//                   { left: "-15%", top: "30%", rotate: "3deg" },
//                   { left: "15%", top: "55%", rotate: "-3deg" },
//                   { left: "-15%", top: "80%", rotate: "4deg" },
//                 ];

//                 const pos = positions[index % positions.length];

//                 return (
//                   <motion.div
//                     key={`desktop-${box.title}`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={inView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
//                     whileHover={{
//                       scale: 1.05,
//                       rotate: pos.rotate.includes("-")
//                         ? parseInt(pos.rotate) - 1 + "deg"
//                         : parseInt(pos.rotate) + 1 + "deg",
//                     }}
//                     className="absolute w-64 md:w-60 overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl border border-gray-200"
//                     style={{
//                       left: pos.left,
//                       top: pos.top,
//                       transform: `rotate(${pos.rotate})`,
//                       zIndex: 10 - index,
//                       rotate: pos.rotate.includes("-")
//                         ? parseInt(pos.rotate) - 1 + "deg"
//                         : parseInt(pos.rotate) + 1 + "deg",
//                     }}
                  
//                   >
//                     <div
//                       className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-md z-30
//                 ${index % 4 === 0 ? "bg-blue-500" : ""}
//                 ${index % 4 === 1 ? "bg-purple-500" : ""}
//                 ${index % 4 === 2 ? "bg-amber-500" : ""}
//                 ${index % 4 === 3 ? "bg-emerald-500" : ""}
//             `}
//                     ></div>

//                     <div className="absolute inset-0 backdrop-blur-md bg-white/20 z-0"></div>
//                     <div
//                       className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r 
//                 ${index % 4 === 0 ? "from-blue-400 to-blue-500" : ""}
//                 ${index % 4 === 1 ? "from-purple-400 to-purple-500" : ""}
//                 ${index % 4 === 2 ? "from-amber-400 to-amber-500" : ""}
//                 ${index % 4 === 3 ? "from-emerald-400 to-emerald-500" : ""}
//                 group-hover:h-2 transition-all duration-300
//             `}
//                     ></div>

//                     {/* <div className={`absolute top-3 left-3 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold
//                 ${index % 4 === 0 ? "bg-blue-500/20 text-blue-300" : ""}
//                 ${index % 4 === 1 ? "bg-purple-500/20 text-purple-300" : ""}
//                 ${index % 4 === 2 ? "bg-amber-500/20 text-amber-300" : ""}
//                 ${index % 4 === 3 ? "bg-emerald-500/20 text-emerald-300" : ""}
//             `}>
//               0{index + 1}
//             </div> */}

//                     <div className="relative z-10 p-5 pt-7">
//                       <div
//                         className={`w-12 h-12 rounded-xl bg-gradient-to-br float-right ml-2 mb-1
//                   ${index % 4 === 0 ? "from-blue-400 to-blue-600" : ""}
//                   ${index % 4 === 1 ? "from-purple-400 to-purple-600" : ""}
//                   ${index % 4 === 2 ? "from-amber-400 to-amber-600" : ""}
//                   ${index % 4 === 3 ? "from-emerald-400 to-emerald-600" : ""}
//                   flex items-center justify-center shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-1 transition-all duration-300
//               `}
//                       >
//                         {React.createElement(box.icon, {
//                           className: "w-6 h-6 text-white drop-shadow-md",
//                         })}
//                       </div>

//                       <div className="relative mb-2">
//                         <h4 className="text-base font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
//                           {box.title}
//                         </h4>

//                         <div
//                           className={`absolute -bottom-1.5 left-0 h-0.5 w-8 mr-14 group-hover:w-2/3 transition-all duration-300 ease-in-out
//                   ${index % 4 === 0 ? "bg-blue-500" : ""}
//                   ${index % 4 === 1 ? "bg-purple-500" : ""}
//                   ${index % 4 === 2 ? "bg-amber-500" : ""}
//                   ${index % 4 === 3 ? "bg-emerald-500" : ""}
//                 `}
//                         ></div>
//                       </div>

//                       <p className="text-xs text-gray-600 leading-relaxed font-medium clear-both">
//                         {box.description}
//                       </p>
//                     </div>

//                     <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-70"></div>

//                     <div
//                       className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-tl-xl bg-gradient-to-tl 
//               ${index % 4 === 0 ? "from-blue-200/50 via-blue-100/30" : ""}
//               ${index % 4 === 1 ? "from-purple-200/50 via-purple-100/30" : ""}
//               ${index % 4 === 2 ? "from-amber-200/50 via-amber-100/30" : ""}
//               ${index % 4 === 3 ? "from-emerald-200/50 via-emerald-100/30" : ""}
//               to-transparent
//             `}
//                     ></div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SecuritySection;




import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Lock, Key, Bell, Users, Database, Server } from "lucide-react";

const bigBoxes = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "Military-grade encryption ensures end to end data security both at rest and in transit, protecting your digital assets at every step.",
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
    icon: Server,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security infrastructure in place.",
  },
];

const SecuritySection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-12 md:py-16 overflow-hidden min-h-screen flex items-center" id="security">
      {/* Dark Theme Background with Gradient */}
      <div className="absolute inset-0 bg-dark-100 bg-[url('/assets/pattern/securityPattern.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
      
      {/* Enhanced background effects - DARK theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/50 backdrop-blur-[6px] opacity-85 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Floating gradient spheres - darker colors */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-float-slow"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-10 animate-float-slow-reverse"></div>
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-float-medium"></div>

      {/* Mesh gradient overlay - darker */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.2),transparent_70%),radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.2),transparent_70%)]"></div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full max-w-7xl">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10 relative z-10"
        >
          {/* Section accent line with glow */}
          <div className="relative w-20 h-1 mx-auto mb-4 md:mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-sm opacity-70"></div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl py-1 font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Security First
          </h2>

          <p className="text-sm md:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto">
            Your security is our top priority. We use industry-leading security
            measures to protect your digital assets.
          </p>
        </motion.div>

        {/* Main Features Grid - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
          {bigBoxes.map((box, index) => (
            <motion.div
              key={box.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-xl  group bg-gradient-to-br from-white/95 to-gray-50/95 border border-gray-200"
            >
              {/* Background Pattern */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-all duration-500"
                style={{
                  backgroundImage: "url('/assets/pattern/securityPattern.jpg')",
                }}
              />
              
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br 
                  ${index === 0 ? "from-blue-100/40 via-blue-50/20 to-transparent" : ""}
                  ${index === 1 ? "from-purple-100/40 via-purple-50/20 to-transparent" : ""}
                  ${index === 2 ? "from-indigo-100/40 via-indigo-50/20 to-transparent" : ""}
                  opacity-80 group-hover:opacity-90 transition-all duration-500`}
              />

              {/* Top Left Corner Effect */}
              <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                <div
                  className={`absolute -top-8 -left-8 w-16 h-16 rounded-full
                    ${index === 0 ? "bg-blue-400/20" : ""}
                    ${index === 1 ? "bg-purple-400/20" : ""}
                    ${index === 2 ? "bg-indigo-400/20" : ""}
                  `}
                ></div>
              </div>
              
              {/* Top Right Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                <div
                  className={`absolute top-0 right-0 w-1 h-8
                    ${index === 0 ? "bg-blue-400" : ""}
                    ${index === 1 ? "bg-purple-400" : ""}
                    ${index === 2 ? "bg-indigo-400" : ""}
                  `}
                ></div>
                <div
                  className={`absolute top-0 right-0 w-8 h-1
                    ${index === 0 ? "bg-blue-400" : ""}
                    ${index === 1 ? "bg-purple-400" : ""}
                    ${index === 2 ? "bg-indigo-400" : ""}
                  `}
                ></div>
              </div>

              {/* Bottom Right Corner Effect */}
              <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                <div
                  className={`absolute -bottom-8 -right-8 w-16 h-16 rounded-full
                    ${index === 0 ? "bg-blue-400/20" : ""}
                    ${index === 1 ? "bg-purple-400/20" : ""}
                    ${index === 2 ? "bg-indigo-400/20" : ""}
                  `}
                ></div>
              </div>

              {/* Bottom Left Corner Accent */}
              <div className="absolute bottom-0 left-0 w-20 h-20 opacity-30">
                <div
                  className={`absolute bottom-0 left-0 w-1 h-8
                    ${index === 0 ? "bg-blue-400" : ""}
                    ${index === 1 ? "bg-purple-400" : ""}
                    ${index === 2 ? "bg-indigo-400" : ""}
                  `}
                ></div>
                <div
                  className={`absolute bottom-0 left-0 w-8 h-1
                    ${index === 0 ? "bg-blue-400" : ""}
                    ${index === 1 ? "bg-purple-400" : ""}
                    ${index === 2 ? "bg-indigo-400" : ""}
                  `}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-5">
                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-xl mb-3 shadow-lg
                    ${index === 0 ? "bg-gradient-to-br from-blue-400 to-blue-600" : ""}
                    ${index === 1 ? "bg-gradient-to-br from-purple-400 to-purple-600" : ""}
                    ${index === 2 ? "bg-gradient-to-br from-indigo-400 to-indigo-600" : ""}
                  `}
                >
                  {React.createElement(box.icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                  {box.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  {box.description}
                </p>
              </div>

              {/* Bottom Border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Features Grid - Horizontal Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
          {smallBoxes.map((box, index) => (
            <motion.div
              key={box.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
              className="relative h-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] group bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl border border-gray-200"
            >
              {/* Top Border */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r 
                  ${index % 4 === 0 ? "from-blue-400 to-blue-500" : ""}
                  ${index % 4 === 1 ? "from-purple-400 to-purple-500" : ""}
                  ${index % 4 === 2 ? "from-amber-400 to-amber-500" : ""}
                  ${index % 4 === 3 ? "from-emerald-400 to-emerald-500" : ""}
                  group-hover:h-1.5 transition-all duration-300
                `}
              ></div>

              {/* Top Left Corner Dot */}
              <div
                className={`absolute top-2 left-2 w-2 h-2 rounded-full
                  ${index % 4 === 0 ? "bg-blue-400/50" : ""}
                  ${index % 4 === 1 ? "bg-purple-400/50" : ""}
                  ${index % 4 === 2 ? "bg-amber-400/50" : ""}
                  ${index % 4 === 3 ? "bg-emerald-400/50" : ""}
                  group-hover:scale-150 transition-transform duration-300
                `}
              ></div>

              {/* Top Right Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-20">
                <div
                  className={`absolute top-0 right-0 w-0.5 h-6
                    ${index % 4 === 0 ? "bg-blue-400" : ""}
                    ${index % 4 === 1 ? "bg-purple-400" : ""}
                    ${index % 4 === 2 ? "bg-amber-400" : ""}
                    ${index % 4 === 3 ? "bg-emerald-400" : ""}
                  `}
                ></div>
                <div
                  className={`absolute top-0 right-0 w-6 h-0.5
                    ${index % 4 === 0 ? "bg-blue-400" : ""}
                    ${index % 4 === 1 ? "bg-purple-400" : ""}
                    ${index % 4 === 2 ? "bg-amber-400" : ""}
                    ${index % 4 === 3 ? "bg-emerald-400" : ""}
                  `}
                ></div>
              </div>

              {/* Bottom Right Corner Glow */}
              <div
                className={`absolute bottom-0 right-0 w-12 h-12 rounded-tl-full opacity-10
                  ${index % 4 === 0 ? "bg-blue-400" : ""}
                  ${index % 4 === 1 ? "bg-purple-400" : ""}
                  ${index % 4 === 2 ? "bg-amber-400" : ""}
                  ${index % 4 === 3 ? "bg-emerald-400" : ""}
                  group-hover:opacity-20 transition-opacity duration-300
                `}
              ></div>

              {/* Bottom Left Corner Accent */}
              <div className="absolute bottom-0 left-0 w-12 h-12 opacity-20">
                <div
                  className={`absolute bottom-0 left-0 w-0.5 h-6
                    ${index % 4 === 0 ? "bg-blue-400" : ""}
                    ${index % 4 === 1 ? "bg-purple-400" : ""}
                    ${index % 4 === 2 ? "bg-amber-400" : ""}
                    ${index % 4 === 3 ? "bg-emerald-400" : ""}
                  `}
                ></div>
                <div
                  className={`absolute bottom-0 left-0 w-6 h-0.5
                    ${index % 4 === 0 ? "bg-blue-400" : ""}
                    ${index % 4 === 1 ? "bg-purple-400" : ""}
                    ${index % 4 === 2 ? "bg-amber-400" : ""}
                    ${index % 4 === 3 ? "bg-emerald-400" : ""}
                  `}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-4 h-full flex flex-col">
                {/* Icon and Title Row */}
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300
                      ${index % 4 === 0 ? "bg-gradient-to-br from-blue-400 to-blue-600" : ""}
                      ${index % 4 === 1 ? "bg-gradient-to-br from-purple-400 to-purple-600" : ""}
                      ${index % 4 === 2 ? "bg-gradient-to-br from-amber-400 to-amber-600" : ""}
                      ${index % 4 === 3 ? "bg-gradient-to-br from-emerald-400 to-emerald-600" : ""}
                    `}
                  >
                    {React.createElement(box.icon, {
                      className: "w-4 h-4 text-white",
                    })}
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-gray-900">
                    {box.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="mt-1 text-xs md:text-sm text-gray-700 leading-relaxed">
                  {box.description}
                </p>
              </div>

              {/* Bottom Border */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-70"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;