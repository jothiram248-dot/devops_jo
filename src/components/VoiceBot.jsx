import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageContent } from '../content/pageContent';

const VoiceBot = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voice, setVoice] = useState(null);
  const utteranceRef = useRef(null);
  const location = useLocation();

  // Get current page content based on route
  const getCurrentPageContent = useCallback(() => {
    const path = location.pathname.replace('/', '') || 'home';
    return pageContent[path] || '';
  }, [location]);

  // Initialize voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => 
        v.lang === 'en-US' && v.localService
      ) || voices.find(v => 
        v.lang.startsWith('en-')
      ) || voices[0];
      
      if (englishVoice) {
        setVoice(englishVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Create and configure utterance
  const createUtterance = useCallback((text) => {
    const newUtterance = new SpeechSynthesisUtterance(text);
    
    if (voice) {
      newUtterance.voice = voice;
    }
    
    newUtterance.rate = 0.9;
    newUtterance.pitch = 1;

    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    newUtterance.onerror = (event) => {
      if (event.error !== 'interrupted') {
        console.error('Speech synthesis error:', event);
      }
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    return newUtterance;
  }, [voice]);

  const handlePlay = useCallback(() => {
    const synth = window.speechSynthesis;
    const content = getCurrentPageContent();
    
    if (!content) return;
    
    if (isPaused) {
      synth.resume();
    } else {
      synth.cancel();
      utteranceRef.current = createUtterance(content);
      synth.speak(utteranceRef.current);
    }

    setIsPlaying(true);
    setIsPaused(false);
  }, [getCurrentPageContent, isPaused, createUtterance]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const handleClose = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setIsVisible(false);
  }, []);

  // Expose methods to parent through ref
  useImperativeHandle(ref, () => ({
    startReading: () => {
      setIsVisible(true);
      handlePlay();
    },
    stopReading: handleClose,
    pauseReading: handlePause
  }));

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
    };
  }, []);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        handleClose();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, handleClose]);

  // Stop reading when route changes
  useEffect(() => {
    handleClose();
  }, [location, handleClose]);

  if (!voice || !getCurrentPageContent() || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 z-50 bg-dark-200 rounded-lg shadow-xl p-4"
        >
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              {isPlaying ? (
                <button
                  onClick={handlePause}
                  className="p-2 rounded-full bg-accent-100 text-dark-100 hover:bg-accent-200 transition-colors"
                  title="Pause reading"
                >
                  <Pause className="w-6 h-6" />
                </button>
              ) : (
                <button
                  onClick={handlePlay}
                  className="p-2 rounded-full bg-accent-100 text-dark-100 hover:bg-accent-200 transition-colors"
                  title="Start reading"
                >
                  <Play className="w-6 h-6" />
                </button>
              )}

              <div className="text-sm text-gray-300">
                {isPlaying ? 'Reading...' : isPaused ? 'Paused' : 'Click to read'}
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-dark-300 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

VoiceBot.displayName = 'VoiceBot';

export default VoiceBot;