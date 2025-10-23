import { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/authSlice';
import toast from 'react-hot-toast';

// Get timeout values from environment variables (in minutes)
const TIMEOUT_MINUTES = Number(import.meta.env.VITE_INACTIVITY_TIMEOUT) || 15;
const WARNING_MINUTES = Number(import.meta.env.VITE_WARNING_TIME) || 14;

// Convert to milliseconds
const INACTIVITY_TIMEOUT = TIMEOUT_MINUTES * 60 * 1000;
const WARNING_TIME = WARNING_MINUTES * 60 * 1000;

// Calculate countdown duration in seconds
const COUNTDOWN_DURATION = Math.round((INACTIVITY_TIMEOUT - WARNING_TIME) / 1000);

export const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  
  const [showCountdown, setShowCountdown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_DURATION);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/signin');
    toast.error('You have been logged out due to inactivity');
    setShowCountdown(false);
  }, [dispatch, navigate]);

  const showWarning = useCallback(() => {
    setShowCountdown(true);
    setSecondsLeft(COUNTDOWN_DURATION);
    
    // Start countdown
    countdownIntervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const resetTimer = useCallback(() => {
    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    // Hide countdown modal
    setShowCountdown(false);

    // Only set timers if user is logged in
    if (token) {
      // Set warning timer
      warningTimeoutRef.current = setTimeout(() => {
        showWarning();
      }, WARNING_TIME);

      // Set logout timer
      timeoutRef.current = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
    }
  }, [token, handleLogout, showWarning]);

  useEffect(() => {
    if (!token) {
      return;
    }

    // Events that indicate user activity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Reset timer on any activity
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Initialize timer on mount
    resetTimer();

    // Cleanup
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [token, resetTimer]);

  return { 
    showCountdown, 
    secondsLeft, 
    resetTimer,
    countdownDuration: COUNTDOWN_DURATION // Export this for the modal
  };
};