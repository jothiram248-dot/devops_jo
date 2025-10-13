import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

/** Extract a YouTube video ID from common URL formats */
const getYouTubeId = (url = "") => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1); // youtu.be/<id>
    if (u.searchParams.get("v")) return u.searchParams.get("v");     // watch?v=<id>
    const parts = u.pathname.split("/");                              // /embed/<id>
    return parts[parts.length - 1];
  } catch {
    return "";
  }
};

const VideoPlayer = ({ videoUrl, thumbnailUrl, title }) => {
  const isYouTube = useMemo(
    () => typeof videoUrl === "string" && /(youtube\.com|youtu\.be)/i.test(videoUrl),
    [videoUrl]
  );

  const youTubeId = useMemo(() => (isYouTube ? getYouTubeId(videoUrl) : ""), [isYouTube, videoUrl]);

  // Explicitly enable fullscreen (fs=1) + playsinline to avoid iOS auto-FS issues
  const youTubeSrc = youTubeId
    ? `https://www.youtube.com/embed/${youTubeId}?rel=0&modestbranding=1&controls=1&fs=1&playsinline=1`
    : "";

  // MP4-only state/refs (YouTube uses native controls)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(!isYouTube);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    setShowControls(!isYouTube);
  }, [isYouTube]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // MP4 handlers (ignored for YouTube)
  const togglePlay = () => {
    if (isYouTube) return;
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await containerRef.current?.requestFullscreen();
    else await document.exitFullscreen();
  };

  const toggleMute = () => {
    if (isYouTube) return;
    if (videoRef.current) {
      setVolume(videoRef.current.muted ? videoRef.current.volume : 0);
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleVolumeChange = (e) => {
    if (isYouTube) return;
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
    setVolume(newVolume);
  };

  const handleTimeUpdate = () => {
    if (isYouTube) return;
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleSeek = (e) => {
    if (isYouTube) return;
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleLoadedMetadata = () => {
    if (isYouTube) return;
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleMouseMove = () => {
    if (isYouTube) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), isPlaying ? 3000 : 4000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor((time || 0) / 60);
    const seconds = Math.floor((time || 0) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black rounded-xl overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {isYouTube ? (
        <iframe
          className="w-full h-full"
          src={youTubeSrc}
          title={title || "Video"}
          frameBorder="0"
          // Important: allow fullscreen explicitly + the modern allow tokens
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          // Just in case any ancestor overlays affect clicks
          style={{ pointerEvents: "auto", display: "block" }}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
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
      )}

      {/* Custom controls are only for MP4s */}
      {!isYouTube && showControls && (
        <AnimatePresence>
          <motion.div
            key="controls"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex flex-col justify-between"
          >
            <div className="p-4">
              <h3 className="text-white text-lg font-semibold">{title}</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
                  >
                    {volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
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

                <div className="flex items-center space-x-2 flex-grow mx-4">
                  <span className="text-sm text-gray-300">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-grow"
                  />
                  <span className="text-sm text-gray-300">{formatTime(duration)}</span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full bg-dark-100/80 text-white hover:bg-dark-100 transition-colors"
                >
                  {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default VideoPlayer;
