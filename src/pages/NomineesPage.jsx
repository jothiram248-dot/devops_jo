import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Mail, Phone, Shield, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';

const NomineesPage = () => {
  const [nominees, setNominees] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      relationship: 'Family',
      status: 'active',
      accessLevel: 'Full Access'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      phone: '+1 (555) 987-6543',
      relationship: 'Friend',
      status: 'pending',
      accessLevel: 'Limited Access'
    }
  ]);

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              Manage Nominees
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-accent-100 text-dark-100 flex items-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add Nominee</span>
            </motion.button>
          </div>

          {/* Nominees List */}
          <div className="space-y-6">
            {nominees.map((nominee) => (
              <motion.div
                key={nominee.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-lg bg-dark-200 hover:bg-dark-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-accent-100/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent-100" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {nominee.name}
                      </h3>
                      <p className="text-gray-400">{nominee.relationship}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      nominee.status === 'active' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {nominee.status.charAt(0).toUpperCase() + nominee.status.slice(1)}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Mail className="w-4 h-4" />
                    <span>{nominee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Phone className="w-4 h-4" />
                    <span>{nominee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Shield className="w-4 h-4" />
                    <span>{nominee.accessLevel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {nominees.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">No nominees found</p>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default NomineesPage;