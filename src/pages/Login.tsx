import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Try demo@hackingshiksha.com / demo123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await resetPassword(forgotEmail);
      if (success) {
        setForgotPasswordSent(true);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForgotPasswordState = () => {
    setShowForgotPassword(false);
    setForgotPasswordSent(false);
    setForgotEmail('');
    setError('');
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-10"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="cyber-card p-8 rounded-lg w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4"
            >
              <Lock className="h-8 w-8 text-red-500 glow-effect" />
            </motion.div>
            <h2 className="text-3xl font-bold cyber-text">Reset Password</h2>
            <p className="text-gray-400 mt-2">Enter your email to receive reset instructions</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          {forgotPasswordSent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded mb-6">
                <p className="font-semibold mb-2">Reset Email Sent!</p>
                <p className="text-sm">Password reset instructions have been sent to {forgotEmail}</p>
                <p className="text-xs mt-2 text-green-300">Check your inbox and spam folder</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={resetForgotPasswordState}
                  className="w-full cyber-button py-3"
                >
                  Back to Login
                </button>
                <button
                  onClick={() => {
                    setForgotPasswordSent(false);
                    setError('');
                  }}
                  className="w-full text-gray-400 hover:text-white transition-colors py-2"
                >
                  Send Another Reset Email
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full cyber-button py-3 relative overflow-hidden"
              >
                {isLoading && <div className="loading-bar absolute top-0 left-0 right-0"></div>}
                <span className={isLoading ? 'opacity-50' : ''}>
                  {isLoading ? 'Sending Reset Email...' : 'Send Reset Link'}
                </span>
              </button>

              <button
                type="button"
                onClick={resetForgotPasswordState}
                className="w-full flex items-center justify-center text-gray-400 hover:text-white transition-colors py-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </button>
            </form>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-10"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="cyber-card p-8 rounded-lg w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4"
          >
            <Shield className="h-8 w-8 text-red-500 glow-effect" />
          </motion.div>
          <h2 className="text-3xl font-bold cyber-text">Access Terminal</h2>
          <p className="text-gray-400 mt-2">Enter your credentials to continue</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded mb-6 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                placeholder="Enter your email"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </motion.div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            type="submit"
            disabled={isLoading}
            className="w-full cyber-button py-3 relative overflow-hidden"
          >
            {isLoading && <div className="loading-bar absolute top-0 left-0 right-0"></div>}
            <span className={isLoading ? 'opacity-50' : ''}>
              {isLoading ? 'Authenticating...' : 'Access Granted'}
            </span>
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-red-400 hover:text-red-300 transition-colors">
              Create Account
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700"
        >
          <p className="text-xs text-gray-400 text-center">
            Demo Credentials:<br />
            Email: demo@hackingshiksha.com<br />
            Password: demo123
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;