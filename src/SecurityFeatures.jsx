// import React from "react";
// import { motion } from "framer-motion";
// import { Shield, Lock, Key, Database, Bell, Users } from "lucide-react";

// const features = [
//   {
//     title: "Advanced Protection",
//     icon: Shield,
//     description: "Best-in-class security to safeguard your digital assets",
//     details: [
//       "Military-grade encryption",
//       "Secure data transmission",
//       "Protected storage",
//       "Regular security updates",
//     ],
//   },
//   {
//     title: "Smart Authentication",
//     icon: Lock,
//     description: "Multiple layers of security for your peace of mind",
//     details: [
//       "Fingerprint verification",
//       "Face recognition support",
//       "Two-factor authentication",
//       "Secure password policies",
//     ],
//   },
//   {
//     title: "Privacy Controls",
//     icon: Key,
//     description: "You have complete control over your data",
//     details: [
//       "Customizable privacy settings",
//       "Granular access controls",
//       "Data ownership rights",
//       "Consent management",
//     ],
//   },
//   {
//     title: "Data Protection",
//     icon: Database,
//     description: "Your information is always protected and available",
//     details: [
//       "Encrypted storage",
//       "Automatic backups",
//       "Data recovery options",
//       "Zero-knowledge security",
//     ],
//   },
//   {
//     title: "Smart Alerts",
//     icon: Bell,
//     description: "Stay informed about your digital assets",
//     details: [
//       "Security notifications",
//       "Access alerts",
//       "Update reminders",
//       "Activity monitoring",
//     ],
//   },
//   {
//     title: "Nominee Management",
//     icon: Users,
//     description: "Secure access delegation to your trusted nominees",
//     details: [
//       "Nominee verification",
//       "Access scheduling",
//       "Permission management",
//       "Secure handover process",
//     ],
//   },
// ];

// const SecurityFeatures = () => {
//   return (
//     <section className="py-20 bg-dark-100">
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent py-2">
//             Uncompromising Security
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Your digital assetsdeserves the highest level of protection. We've
//             built our platform with security at its core, ensuring your data
//             remains private, protected, and accessible only to those you trust.
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="bg-dark-200 rounded-xl p-8 hover:bg-dark-300 transition-colors"
//             >
//               <feature.icon className="w-12 h-12 text-accent-100 mb-6" />
//               <h3 className="text-xl font-bold mb-4 text-white">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-300 mb-6">{feature.description}</p>
//               <ul className="space-y-2">
//                 {feature.details.map((detail, idx) => (
//                   <li key={idx} className="flex items-center text-gray-400">
//                     <div className="w-1.5 h-1.5 rounded-full bg-accent-100 mr-2" />
//                     {detail}
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SecurityFeatures;
