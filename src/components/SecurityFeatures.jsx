import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Lock, Key, Database, Bell, Users } from "lucide-react";

const features = [
  {
    title: "Advanced Protection",
    icon: Shield,
    description: "Best-in-class security to safeguard your digital assets",
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    accentColor: "bg-green-400",
    textColor: "text-green-600",
    details: [
      "Military-grade encryption",
      "Secure data transmission",
      "Protected storage",
      "Regular security updates",
    ],
  },
  {
    title: "Smart Authentication",
    icon: Lock,
    description: "Multiple layers of security for your peace of mind",
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    accentColor: "bg-blue-400",
    textColor: "text-blue-600",
    details: [
      "Fingerprint verification",
      "Face recognition support",
      "Two-factor authentication",
      "Secure password policies",
    ],
  },
  {
    title: "Privacy Controls",
    icon: Key,
    description: "You have complete control over your data",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    accentColor: "bg-purple-400",
    textColor: "text-purple-600",
    details: [
      "Customizable privacy settings",
      "Granular access controls",
      "Data ownership rights",
      "Consent management",
    ],
  },
  {
    title: "Data Protection",
    icon: Database,
    description: "Your information is always protected and available",
    color: "from-amber-400 to-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    accentColor: "bg-amber-400",
    textColor: "text-amber-600",
    details: [
      "Encrypted storage",
      "Automatic backups",
      "Data recovery options",
      "Zero-knowledge security",
    ],
  },
  {
    title: "Smart Alerts",
    icon: Bell,
    description: "Stay informed about your digital assets",
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    accentColor: "bg-red-400",
    textColor: "text-red-600",
    details: [
      "Security notifications",
      "Access alerts",
      "Update reminders",
      "Activity monitoring",
    ],
  },
  {
    title: "Nominee Management",
    icon: Users,
    description: "Securely delegate access to your trusted nominees",
    color: "from-cyan-400 to-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    accentColor: "bg-cyan-400",
    textColor: "text-cyan-600",
    details: [
      "Nominee verification",
      "Access scheduling",
      "Permission management",
      "Secure handover process",
    ],
  },
];

const SecurityFeatures = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Premium Dark Background with effects */}
      
      <div className="absolute inset-0 -z-10">
        {/* Deep space gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black"></div>
        
        {/* Background Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.2),transparent_70%),radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.2),transparent_70%)]"></div>
        
        {/* Premium ambient blurs */}
        <div className="absolute top-1/4 right-1/6 w-80 h-80 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/6 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>
        
        {/* Subtle mesh grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-5"></div>
        
        {/* Enhanced floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/40 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`
              }}
            />
          ))}
        </div>
        
        {/* Responsive glow based on mouse position */}
        <div className="absolute opacity-30" style={{
          left: `${mousePosition.x - 200}px`,
          top: `${mousePosition.y - 200}px`,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.6) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}></div>
      </div>



      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
      
          
          {/* Title with premium visual treatment */}
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
             <div className="h-px w-16 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">Uncompromising</span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Security
              {/* Decorative elements */}
              <span className="absolute -top-2 -right-8 w-6 h-6 rounded-full bg-purple-500/10 blur-sm"></span>
              <span className="absolute bottom-0 -left-4 w-4 h-4 rounded-full bg-indigo-500/10 blur-sm"></span>
            </span>
          </h2>
          
          {/* Enhanced divider */}
          <div className="flex justify-center items-center gap-3 my-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/70"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/70"></div>
          </div>
          
          {/* Description with improved typography */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-white font-medium">Your digital assets deserve the highest level of protection.</span> We've
            built our platform with security at its core, ensuring that your
            data remains private, protected, and accessible only to you and
            those you trust.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative h-64 overflow-hidden rounded-2xl shadow-lg group cursor-pointer [perspective:1200px]"
            >
              {/* Card with 3D flip effect */}
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]">
                  {/* Base clean background */}
                  <div className={`absolute inset-0 ${feature.bgColor}`}></div>
                  
                  {/* Add shine animation keyframes */}
                  <style jsx>{`
                    @keyframes shine {
                      0% {
                        left: -100%;
                      }
                      100% {
                        left: 200%;
                      }
                    }
                    .animate-shine {
                      animation: shine 2s infinite linear;
                    }
                    
                    @keyframes shimmer {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(500%); }
                    }
                    .animate-shimmer {
                      animation: shimmer 3s infinite;
                    }
                    
                    @keyframes float {
                      0%, 100% { transform: translateY(0) translateX(0); }
                      25% { transform: translateY(-10px) translateX(5px); }
                      75% { transform: translateY(-5px) translateX(-5px); }
                    }
                    .animate-float {
                      animation: float 15s ease-in-out infinite;
                    }
                  `}</style>
                  
                  {/* Subtle dot pattern overlay */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-all duration-500">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`premium-dots-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1" fill={feature.textColor.replace('text-', '')} />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#premium-dots-${index})`} />
                    </svg>
                  </div>
                  
                  {/* Diagonal premium accent */}
                  <div className={`absolute top-0 right-0 w-full h-full opacity-5 transform rotate-[-15deg] translate-x-1/3 -translate-y-1/4 ${feature.accentColor} rounded-full`}></div>
                  
                  {/* Elegant accent border at top */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${feature.accentColor}`}></div>

                  {/* Premium icon container with white background and shiny icon */}
                  <div className={`absolute top-4 left-4 group-hover:left-5 transition-all duration-500 bg-white border ${feature.borderColor} p-3 rounded-2xl shadow-lg`}>
                    <div className={`relative overflow-hidden bg-gradient-to-br ${feature.color} rounded-xl p-3 shadow-inner`}>
                      {/* Shiny effect overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                        <div className="absolute -inset-[100%] animate-shine bg-white/30 rotate-[25deg] transform-gpu"></div>
                      </div>
                      {React.createElement(feature.icon, { 
                        className: "w-6 h-6 text-white drop-shadow-lg relative z-10"
                      })}
                    </div>
                  </div>

                  {/* Subtle corner accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 opacity-60 bg-gradient-to-bl ${feature.bgColor} to-transparent rounded-bl-full`}></div>

                  {/* Professional content area */}
                    {/* Fixed position title and description section */}
                    <div className="absolute inset-x-0 top-28 px-6">
                    <h3 className={`text-xl font-bold mb-2 text-gray-800 group-hover:${feature.textColor} transition-colors duration-300`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-md leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Left side accent */}
                  <div className={`absolute left-0 top-1/4 bottom-1/4 w-1 ${feature.borderColor}`}></div>
                  
                  {/* Subtle floating detail effect */}
                  <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 ${feature.accentColor}`}></div>
                  
                  {/* Card flip indicator */}
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 flex items-center space-x-1 opacity-80">
                    <span>Flip for details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  {/* Professional clean white background */}
                  <div className={`absolute inset-0 bg-white`}></div>
                  
                  {/* Subtle grain texture for depth */}
                  <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
                  
                  {/* Premium border and accents */}
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <div className={`absolute left-0 top-2 bottom-0 w-2 bg-gradient-to-b ${feature.color} opacity-10`}></div>
                  
                  {/* Subtle curved accent in corner */}
                  <div className={`absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 bg-gradient-to-bl ${feature.color}`} style={{ transform: 'translate(50%, -50%)' }}></div>
                  
                  {/* Content Container */}
                  <div className="relative h-full flex flex-col p-6">
                    {/* Premium Icon with 3D effect */}
                    <div className="absolute top-3 right-4">
                      <div className={`relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg border border-white/10`}>
                        {React.createElement(feature.icon, {
                          className: "w-5 h-5",
                          strokeWidth: 1.5
                        })}
                        {/* Subtle shadow for 3D effect */}
                        <div className={`absolute -bottom-1.5 inset-x-1 h-2 bg-black/20 blur rounded-full`}></div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <div className="relative mb-6">
                      <h3 className={`text-xl font-bold mb-1 text-gray-800`}>
                        {feature.title}
                      </h3>
                      <div className={`h-0.5 w-10 ${feature.accentColor}`}></div>
                    </div>
                    
                    {/* Details List with staggered animation */}
                    <ul className="space-y-3 flex-grow">
                      {feature.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-gray-600 transition-colors duration-300"
                          style={{
                            opacity: 0,
                            animation: `fadeIn 0.5s forwards ${idx * 0.1 + 0.2}s`,
                          }}
                        >
                          {/* Professional checkmark */}
                          <div className={`flex-shrink-0 w-5 h-5 mr-3 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          
                          {/* Text */}
                          <span className="text-sm font-medium">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Professional flip back button */}
                    {/* <div className="flex justify-end mt-4">
                      <button className={`text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 border ${feature.borderColor} flex items-center space-x-1 hover:bg-gray-200 transition-colors duration-300`}>
                        <span>Back to summary</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
              
              {/* Add animation for staggered list items */}
              <style jsx>{`
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </motion.div>
          ))}
        </div>
     
      </div>
    </section>
  );
};

export default SecurityFeatures;