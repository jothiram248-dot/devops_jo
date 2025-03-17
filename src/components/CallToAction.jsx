// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import useAuthStore from "../store/authStore";

// const CallToAction = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuthStore();

//   // Don't render if user is authenticated
//   if (isAuthenticated) {
//     return null;
//   }

//   return (
//     <section className="py-20 bg-dark-100" id="cta">
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="glow-box relative overflow-hidden"
//         >
//           <div className="absolute inset-0">
//             <img
//               src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
//               alt="Start Your assets"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-dark-100/95 to-dark-200/95" />
//           </div>

//           <div className="relative py-16 px-8 md:px-16 text-center">
//             <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//               Ready to Start Your Journey With SacredSecret?
//             </h2>
//             {/* <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//               Join thousands of users who trust SacredSecret with their digital
//               assets. Start securing your digital assets today.
//             </p> */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate("/signup")}
//               className="inline-flex items-center px-8 py-4 rounded-lg bg-accent-100 text-dark-100 hover:bg-accent-200 transition-colors text-lg font-semibold"
//             >
//               Let's Start
//               <ArrowRight className="ml-2 w-5 h-5" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CallToAction;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useAuthStore from "../store/authStore";

const CallToAction = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Don't render if user is authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <section className=" bg-gray-950" id="cta">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl border border-indigo-500/10 shadow-2xl"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
              alt="Start Your journey"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-indigo-950/90 to-gray-950/95" />

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            {/* accent glow */}
            <div className="absolute -top-20 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative py-20 px-8 md:px-16 text-center">
            <div className="w-20 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

            <h2 className="text-4xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-indigo-300 via-accent-100 to-indigo-300 bg-clip-text text-transparent leading-tight">
              Ready to Start Your Journey With SacredSecret?
            </h2>

            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/signup")}
              className="inline-flex items-center px-10 py-4 rounded-lg bg-accent-100 text-gray-900 hover:bg-accent-200 transition-all duration-300 text-lg font-medium shadow-md"
            >
              Let's Start
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
