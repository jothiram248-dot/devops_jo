// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, X, Maximize, Minimize } from "lucide-react";

// const VideoPlayer = ({ videoUrl, thumbnailUrl, title }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);
//   const controlsTimeoutRef = useRef(null);

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () =>
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, []);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         const playPromise = videoRef.current.play();
//         if (playPromise !== undefined) {
//           playPromise.catch((error) => {
//             console.error("Video playback failed:", error);
//           });
//         }
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleFullscreen = async () => {
//     if (!document.fullscreenElement) {
//       await containerRef.current.requestFullscreen();
//     } else {
//       await document.exitFullscreen();
//     }
//   };

//   const handleMouseMove = () => {
//     setShowControls(true);
//     if (controlsTimeoutRef.current) {
//       clearTimeout(controlsTimeoutRef.current);
//     }
//     if (isPlaying) {
//       controlsTimeoutRef.current = setTimeout(() => {
//         setShowControls(false);
//       }, 3000);
//     }
//   };

//   const handleClose = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//     }
//     setIsPlaying(false);
//     setIsFullscreen(false);
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-full rounded-xl overflow-hidden"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => setShowControls(true)}
//     >
//       <video
//         ref={videoRef}
//         className="w-full h-full object-cover"
//         poster={thumbnailUrl}
//         playsInline
//         preload="metadata"
//       >
//         <source src={videoUrl} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       <AnimatePresence>
//         {showControls && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"
//           >
//             {/* <div className="absolute top-4 right-4 space-x-2">
//               <button
//                 onClick={toggleFullscreen}
//                 className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
//               >
//                 {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
//               </button>
//               {isFullscreen && (
//                 <button
//                   onClick={handleClose}
//                   className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
//                 >
//                   <X size={20} />
//                 </button>
//               )}
//             </div> */}

//             <div className="absolute top-4 right-4 space-x-2 z-50">
//               <button
//                 onClick={toggleFullscreen}
//                 className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
//               >
//                 {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
//               </button>
//             </div>

//             <div className="absolute inset-0 flex items-center justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={togglePlay}
//                 className="p-4 rounded-full bg-accent-100/90 text-dark-100 hover:bg-accent-100 transition-colors backdrop-blur-sm"
//               >
//                 {isPlaying ? (
//                   <Pause size={32} />
//                 ) : (
//                   <Play size={32} className="ml-1" />
//                 )}
//               </motion.button>
//             </div>

//             <div className="absolute bottom-4 left-4 right-4">
//               <h3 className="text-white text-lg font-semibold">{title}</h3>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

const VideoPlayer = ({ videoUrl, thumbnailUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      setVolume(videoRef.current.muted ? videoRef.current.volume : 0);
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
    setVolume(newVolume);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black rounded-xl overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnailUrl}
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex flex-col justify-between"
          >
            {/* Video Title */}
            <div className="p-4">
              <h3 className="text-white text-lg font-semibold">{title}</h3>
            </div>

            {/* Video Controls */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>

                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
                  >
                    {volume === 0 ? (
                      <VolumeX size={24} />
                    ) : (
                      <Volume2 size={24} />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24"
                  />
                </div>

                {/* Seek Bar */}
                <div className="flex items-center space-x-2 flex-grow mx-4">
                  <span className="text-sm text-gray-300">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-grow"
                  />
                  <span className="text-sm text-gray-300">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize size={24} />
                  ) : (
                    <Maximize size={24} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
