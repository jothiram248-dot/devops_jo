// Razorpay integration utilities
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_URL = import.meta.env.VITE_API_URL;

export const loadRazorpay = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      resolve(window.Razorpay);
    };
    
    script.onerror = () => {
      reject(new Error("Razorpay SDK failed to load"));
    };

    document.body.appendChild(script);
  });
};

export const createOrder = async (amount, subscription) => {
  try {
    // In a real app, this would be an API call to your backend
    // For demo, we'll simulate an order creation
    const order = {
      id: 'order_' + Math.random().toString(36).substr(2, 9),
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: 'rcpt_' + Math.random().toString(36).substr(2, 9)
    };
    
    return order;
  } catch (error) {
    console.error('Order creation failed:', error);
    throw new Error('Failed to create order');
  }
};

export const initializePayment = async ({
  amount,
  subscription,
  user,
  onSuccess,
  onError
}) => {
  try {
    if (!RAZORPAY_KEY) {
      throw new Error('Razorpay key not found');
    }

    const razorpay = await loadRazorpay();
    const order = await createOrder(amount, subscription);

    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "SacredSecret",
      description: `${subscription.title} Subscription`,
      image: "/logo-purple.svg",
      order_id: order.id,
      handler: function (response) {
        onSuccess({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
        });
      },
      prefill: {
        name: user.fullName,
        email: user.email,
        contact: user.phone
      },
      notes: {
        subscriptionId: subscription.id
      },
      theme: {
        color: "#7AA2F7"
      }
    };

    const rzp = new razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      onError(new Error('Payment failed: ' + response.error.description));
    });

    rzp.open();
  } catch (error) {
    console.error('Payment initialization failed:', error);
    onError(error);
  }
};