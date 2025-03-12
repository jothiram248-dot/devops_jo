import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import * as authApi from '../api/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth, setVerificationEmail } = useAuthStore();

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authApi.register(userData);
      setVerificationEmail(userData.email);
      toast.success('Registration successful! Please check your email for verification code.');
      navigate('/verify');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const verify = async (verificationData) => {
    setLoading(true);
    try {
      const response = await authApi.verify(verificationData);
      setAuth({
        user: response.user,
        token: response.token
      });
      toast.success('Email verified successfully!');
      navigate('/verification-success');
    } catch (error) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authApi.login(credentials);
      setAuth({
        user: response.user,
        token: response.token
      });
      toast.success('Login successful!');
      // Navigation is now handled by the component
    } catch (error) {
      if (error.response?.data?.needsVerification) {
        setVerificationEmail(credentials.email);
        navigate('/verify');
      } else {
        toast.error(error.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      toast.success('Password reset code sent to your email');
      navigate('/reset-password');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (resetData) => {
    setLoading(true);
    try {
      await authApi.resetPassword(resetData);
      toast.success('Password reset successful! Please login with your new password.');
      navigate('/signin');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    useAuthStore.getState().logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return {
    register,
    verify,
    login,
    logout,
    forgotPassword,
    resetPassword,
    loading
  };
};

export default useAuth;