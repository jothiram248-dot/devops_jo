import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, Pause } from "lucide-react";

const testimonials = [
  {
    name: "John Anderson",
    role: "Security Expert",
    quote: "SacredSecret revolutionized how I protect my digital assets",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Privacy Advocate",
    quote: "The most secure way to manage digital inheritance",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
  },
  {
    name: "Mike Johnson",
    role: "Digital Asset Manager",
    quote: "Finally, a solution that puts security first",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
  },
  {
    name: "Emma Davis",
    role: "Tech Innovator",
    quote: "The future of digital asset management is here",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
  },
];

const WhySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => resetTimeout();
  }, [currentIndex, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetTimeout();
  };

  return (
    <section className="py-20 section-light" id="why">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark-100">
            Why Choose SacredSecret?
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-12">
            Experience unparalleled security and control over your digital
            assets
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${testimonials.length * 100}%`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full px-4 flex-shrink-0"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                  <div className="relative aspect-video">
                    <img
                      src={testimonial.thumbnail}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 rounded-full bg-accent-100/90 flex items-center justify-center transform transition-transform hover:scale-110">
                        <Play className="w-8 h-8 text-dark-100 ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-accent-100"
                      />
                      <div>
                        <h3 className="font-semibold text-dark-100">
                          {testimonial.name}
                        </h3>
                        <p className="text-dark-300 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-dark-300 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-accent-100 hover:bg-accent-200 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-dark-100" />
              ) : (
                <Play className="w-5 h-5 text-dark-100" />
              )}
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? "bg-accent-100" : "bg-dark-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-dark-100">
            Let's Hear From the Experts
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
