import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Lock, Save, Eye, EyeOff, CheckCircle, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AccountSettingsProps {
  onClose: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onClose }) => {
  const { user, sendVerificationCode, verifyEmail, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    location: '',
    website: ''
  });

  const [emailVerification, setEmailVerification] = useState({
    newEmail: '',
    verificationCode: '',
    isCodeSent: false,
    isVerifying: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    marketingEmails: false
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    updateUser({
      name: profileData.name,
      email: profileData.email
    });
    
    alert('Profile updated successfully!');
    setIsLoading(false);
  };

  const handleSendVerificationCode = async () => {
    if (!emailVerification.newEmail) {
      alert('Please enter a new email address');
      return;
    }

    setEmailVerification({ ...emailVerification, isVerifying: true });
    
    const success = await sendVerificationCode(emailVerification.newEmail);
    
    if (success) {
      setEmailVerification({
        ...emailVerification,
        isCodeSent: true,
        isVerifying: false
      });
    } else {
      setEmailVerification({ ...emailVerification, isVerifying: false });
      alert('Failed to send verification code');
    }
  };

  const handleVerifyEmail = async () => {
    if (!emailVerification.verificationCode) {
      alert('Please enter the verification code');
      return;
    }

    setEmailVerification({ ...emailVerification, isVerifying: true });
    
    const success = await verifyEmail(emailVerification.verificationCode);
    
    if (success) {
      updateUser({ 
        email: emailVerification.newEmail,
        isEmailVerified: true 
      });
      setProfileData({ ...profileData, email: emailVerification.newEmail });
      setEmailVerification({
        newEmail: '',
        verificationCode: '',
        isCodeSent: false,
        isVerifying: false
      });
      alert('Email verified and updated successfully!');
    } else {
      setEmailVerification({ ...emailVerification, isVerifying: false });
      alert('Invalid verification code');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsLoading(false);
  };

  const handleNotificationUpdate = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Notification settings updated!');
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black border border-red-500/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-red-500/30 flex items-center justify-between">
          <h2 className="text-2xl font-bold cyber-text">Account Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-black/50 border-r border-red-500/30">
            <div className="p-4 space-y-2">
              {[
                { id: 'profile', label: 'Profile Information', icon: <User className="h-5 w-5" /> },
                { id: 'email', label: 'Email Settings', icon: <Mail className="h-5 w-5" /> },
                { id: 'security', label: 'Security', icon: <Lock className="h-5 w-5" /> },
                { id: 'notifications', label: 'Notifications', icon: <Mail className="h-5 w-5" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={profileData.email}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400"
                        />
                        {user?.isEmailVerified && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        To change email, use the Email Settings tab
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                        placeholder="City, Country"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="cyber-button px-6 py-3 flex items-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </form>
              </motion.div>
            )}

            {/* Email Settings Tab */}
            {activeTab === 'email' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl font-bold mb-6">Email Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Email</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300">{user?.email}</span>
                      {user?.isEmailVerified ? (
                        <span className="flex items-center text-green-400 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-yellow-400 text-sm">Not Verified</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Change Email Address</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          New Email Address
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="email"
                            value={emailVerification.newEmail}
                            onChange={(e) => setEmailVerification({ 
                              ...emailVerification, 
                              newEmail: e.target.value 
                            })}
                            className="flex-1 px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                            placeholder="Enter new email address"
                            disabled={emailVerification.isCodeSent}
                          />
                          <button
                            type="button"
                            onClick={handleSendVerificationCode}
                            disabled={emailVerification.isVerifying || emailVerification.isCodeSent}
                            className="cyber-button px-4 py-3 flex items-center space-x-2"
                          >
                            <Send className="h-4 w-4" />
                            <span>
                              {emailVerification.isVerifying ? 'Sending...' : 'Send Code'}
                            </span>
                          </button>
                        </div>
                      </div>

                      {emailVerification.isCodeSent && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Verification Code
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={emailVerification.verificationCode}
                              onChange={(e) => setEmailVerification({ 
                                ...emailVerification, 
                                verificationCode: e.target.value 
                              })}
                              className="flex-1 px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                              placeholder="Enter 6-digit code"
                              maxLength={6}
                            />
                            <button
                              type="button"
                              onClick={handleVerifyEmail}
                              disabled={emailVerification.isVerifying}
                              className="cyber-button px-4 py-3"
                            >
                              {emailVerification.isVerifying ? 'Verifying...' : 'Verify'}
                            </button>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Check your email for the verification code
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl font-bold mb-6">Security Settings</h3>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="cyber-button px-6 py-3"
                  >
                    {isLoading ? 'Updating...' : 'Change Password'}
                  </button>
                </form>

                <div className="mt-8 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                  <h4 className="font-bold text-yellow-400 mb-2">Security Tips</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Use a strong password with at least 8 characters</li>
                    <li>• Include uppercase, lowercase, numbers, and symbols</li>
                    <li>• Don't reuse passwords from other accounts</li>
                    <li>• Enable two-factor authentication when available</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>
                <div className="space-y-6">
                  {[
                    {
                      key: 'emailNotifications',
                      title: 'Email Notifications',
                      description: 'Receive important updates via email'
                    },
                    {
                      key: 'courseUpdates',
                      title: 'Course Updates',
                      description: 'Get notified about new courses and content'
                    },
                    {
                      key: 'marketingEmails',
                      title: 'Marketing Emails',
                      description: 'Receive promotional offers and news'
                    }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{setting.title}</h4>
                        <p className="text-sm text-gray-400">{setting.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            [setting.key]: e.target.checked
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                      </label>
                    </div>
                  ))}

                  <button
                    onClick={handleNotificationUpdate}
                    disabled={isLoading}
                    className="cyber-button px-6 py-3"
                  >
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountSettings;