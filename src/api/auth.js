import axios from 'axios';
import { generateUserId } from '../utils/idGenerator';

// Mock API responses for development
const mockRegisterResponse = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate permanent unique ID
      const userId = generateUserId();
      
      // Generate avatar using DiceBear API
      const avatar = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${userData.fullName}`;
      
      console.log(`Verification code 123456 sent to ${userData.email}`);
      resolve({
        message: 'Registration successful! Please check your email for verification code.',
        verificationCode: '123456', // In real app, this would be sent via email
        user: {
          ...userData,
          userId, // Permanent unique ID
          accountId: userId, // For backward compatibility
          avatar
        }
      });
    }, 1000);
  });
};

const mockVerifyResponse = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Email verified successfully!',
        user: {
          ...userData,
          subscription: {
            type: 'Free',
            status: 'active',
            features: ['Basic Storage', 'Single Nominee', 'Email Support']
          }
        },
        token: 'mock-jwt-token'
      });
    }, 1000);
  });
};

const mockLoginResponse = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'john@example.com' && credentials.password === 'Password123!') {
        resolve({
          user: {
            id: 1,
            userId: 'SS-1234567890-ABCDE', // Permanent ID persists across sessions
            fullName: 'John Doe',
            email: 'john@example.com',
            accountId: 'SS-1234567890-ABCDE',
            avatar: `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=John Doe`,
            subscription: {
              type: 'Free',
              status: 'active',
              features: ['Basic Storage', 'Single Nominee', 'Email Support']
            }
          },
          token: 'mock-jwt-token'
        });
      } else {
        reject({ message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

export const register = async (userData) => {
  try {
    const response = await mockRegisterResponse(userData);
    return response;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const verify = async (verificationData) => {
  try {
    const response = await mockVerifyResponse(verificationData);
    return response;
  } catch (error) {
    throw error.response?.data || { message: 'Verification failed' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await mockLoginResponse(credentials);
    return response;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const forgotPassword = async (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Reset code 123456 sent to ${email}`);
      resolve({ message: 'Reset code sent to your email' });
    }, 1000);
  });
};

export const resetPassword = async (resetData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Password reset successful' });
    }, 1000);
  });
};