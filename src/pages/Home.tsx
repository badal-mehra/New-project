import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Award, 
  Users, 
  BookOpen, 
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Learning",
      description: "Advanced encryption and security protocols protect your learning journey"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Optimized platform for seamless learning experience"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Certified Excellence",
      description: "Industry-recognized certificates with blockchain verification"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and cybersecurity experts"
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Cybersecurity Analyst",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "HackingShiksha transformed my career. The hands-on approach and real-world scenarios prepared me for actual cybersecurity challenges."
    },
    {
      name: "Sarah Johnson",
      role: "Penetration Tester",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "The quality of courses and the futuristic learning environment made complex concepts easy to understand. Highly recommended!"
    },
    {
      name: "Mike Rodriguez",
      role: "Security Engineer",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "From beginner to expert, HackingShiksha provided the perfect learning path. The certificate verification system is revolutionary."
    }
  ];

  const stats = [
    { number: "50K+", label: "Students Enrolled" },
    { number: "200+", label: "Expert Courses" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-20"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 max-w-4xl mx-auto px-4"
        >
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 neon-text"
          >
            HACKING<span className="text-red-500">SHIKSHA</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Master the Art of Cybersecurity in the Digital Age
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/courses" className="cyber-button text-lg px-8 py-4">
              Start Learning
              <ChevronRight className="inline ml-2 h-5 w-5" />
            </Link>
            <button className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors">
              <Play className="h-6 w-6" />
              <span>Watch Demo</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 border border-red-500/30 rotate-45"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-16 h-16 border border-red-500/30 rounded-full"
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
              Why Choose HackingShiksha?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of cybersecurity education with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cyber-card p-6 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <div className="text-red-500 mb-4 glow-effect">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-400">
              Master cybersecurity with our expert-designed curriculum
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="cyber-card rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-red-500/20 to-black flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-red-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                      Advanced
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">4.9</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Ethical Hacking Masterclass
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Learn advanced penetration testing techniques and ethical hacking methodologies
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-500">₹2,999</span>
                    <button className="cyber-button text-sm px-4 py-2">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="cyber-button text-lg px-8 py-4">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-400">
              Hear from our graduates who are now cybersecurity professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cyber-card p-6 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-red-500"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-red-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 via-black to-red-900/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students who are already mastering cybersecurity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="cyber-button text-lg px-8 py-4">
                Get Started Free
              </Link>
              <Link 
                to="/courses" 
                className="border border-red-500 text-white px-8 py-4 rounded hover:bg-red-500/20 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;