import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, LogIn, LogOut, Plus, Trash2 } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useCredentialStore from '../store/credentialStore';

const testUsers = [
  {
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'Test123!',
    phone: '+1234567890',
    country: 'USA'
  },
  {
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Test123!',
    phone: '+1987654321',
    country: 'Canada'
  }
];

const TestUsers = () => {
  const navigate = useNavigate();
  const { setAuth, logout, user } = useAuthStore();
  const { clearUserCredentials } = useCredentialStore();
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: 'Test123!',
    phone: '',
    country: ''
  });

  const loginAsUser = (userData) => {
    setAuth({
      user: {
        ...userData,
        accountId: `SS${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      },
      token: 'test-token'
    });
    navigate('/dashboard');
  };

  const handleLogout = () => {
    clearUserCredentials();
    logout();
    navigate('/');
  };

  const handleAddUser = () => {
    if (newUser.fullName && newUser.email) {
      testUsers.push({ ...newUser });
      setNewUser({
        fullName: '',
        email: '',
        password: 'Test123!',
        phone: '',
        country: ''
      });
    }
  };

  const removeUser = (index) => {
    testUsers.splice(index, 1);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-200 rounded-lg shadow-xl p-4 w-96"
      >
        <h3 className="text-xl font-bold mb-4 text-white">Test Users</h3>
        
        {user ? (
          <div className="mb-4 p-3 bg-dark-300 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">{user.fullName}</p>
                <p className="text-sm text-gray-400">{user.accountId}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-dark-300 rounded-lg">
            <p className="text-gray-400">No user logged in</p>
          </div>
        )}

        <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
          {testUsers.map((testUser, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-dark-300 rounded-lg"
            >
              <div>
                <p className="text-white font-semibold">{testUser.fullName}</p>
                <p className="text-sm text-gray-400">{testUser.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => loginAsUser(testUser)}
                  className="p-2 rounded-lg bg-accent-100/20 text-accent-100 hover:bg-accent-100/30"
                  disabled={user?.email === testUser.email}
                >
                  <LogIn size={18} />
                </button>
                <button
                  onClick={() => removeUser(index)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={newUser.fullName}
            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
            placeholder="Full Name"
            className="w-full px-3 py-2 rounded-lg bg-dark-300 text-white placeholder-gray-500"
          />
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            className="w-full px-3 py-2 rounded-lg bg-dark-300 text-white placeholder-gray-500"
          />
          <button
            onClick={handleAddUser}
            disabled={!newUser.fullName || !newUser.email}
            className="w-full py-2 rounded-lg bg-accent-100 text-dark-100 font-semibold hover:bg-accent-200 disabled:opacity-50 flex items-center justify-center"
          >
            <Plus size={18} className="mr-2" />
            Add Test User
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TestUsers;