import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Shield, User, LogOut, Linkedin, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-red-500 glow-effect" />
            <span className="text-xl font-bold cyber-text">HackingShiksha</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:text-red-400 transition-colors px-3 py-2">
                Home
              </Link>
              <Link to="/courses" className="hover:text-red-400 transition-colors px-3 py-2">
                Courses
              </Link>
              <Link to="/verify-certificate" className="hover:text-red-400 transition-colors px-3 py-2">
                Verify Certificate
              </Link>
              <a 
                href="https://www.linkedin.com/company/hackingshiksha/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors px-3 py-2 flex items-center space-x-1"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="hover:text-red-400 transition-colors px-3 py-2">
                    Dashboard
                  </Link>
                  {user?.isAdmin && (
                    <Link to="/admin" className="hover:text-red-400 transition-colors px-3 py-2 bg-red-500/20 rounded">
                      Admin
                    </Link>
                  )}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
                      <User className="h-5 w-5" />
                      <span>{user?.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-red-500/30 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-red-500/20 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="hover:text-red-400 transition-colors px-3 py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="cyber-button"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-400 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block hover:text-red-400 transition-colors px-3 py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="block hover:text-red-400 transition-colors px-3 py-2"
            onClick={() => setIsOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/verify-certificate"
            className="block hover:text-red-400 transition-colors px-3 py-2"
            onClick={() => setIsOpen(false)}
          >
            Verify Certificate
          </Link>
          <a 
            href="https://www.linkedin.com/company/hackingshiksha/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block hover:text-red-400 transition-colors px-3 py-2"
            onClick={() => setIsOpen(false)}
          >
            LinkedIn
          </a>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="block hover:text-red-400 transition-colors px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className="block hover:text-red-400 transition-colors px-3 py-2 bg-red-500/20 rounded mx-3"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left hover:text-red-400 transition-colors px-3 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block hover:text-red-400 transition-colors px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block hover:text-red-400 transition-colors px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;