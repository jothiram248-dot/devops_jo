import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Clock, Settings } from 'lucide-react';
import Footer from '../components/Footer';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'security',
      title: 'Security Alert',
      message: 'New login detected from a different device',
      time: '2 hours ago',
      icon: Bell,
      color: 'text-red-400'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Password Update Reminder',
      message: 'Time to update your banking credentials',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-yellow-400'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update',
      message: 'New security features have been added',
      time: '3 days ago',
      icon: Settings,
      color: 'text-blue-400'
    }
  ];

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-white">
            Notifications
          </h1>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            {['all', 'security', 'reminder', 'system'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-accent-100 text-dark-100'
                    : 'text-gray-300 hover:bg-dark-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-lg bg-dark-200 hover:bg-dark-300 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-dark-300 ${notification.color}`}>
                    <notification.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-gray-300 mb-2">{notification.message}</p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">No notifications found</p>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;