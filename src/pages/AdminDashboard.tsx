import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  BarChart3,
  Shield,
  Award,
  Calendar,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not admin
  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  const [courses, setCourses] = useState([
    {
      id: '1',
      title: "Complete Ethical Hacking Bootcamp",
      description: "Master ethical hacking from basics to advanced penetration testing techniques",
      instructor: "Dr. Sarah Chen",
      duration: "40 hours",
      students: 15420,
      rating: 4.9,
      price: 2999,
      originalPrice: 4999,
      level: "intermediate",
      category: "ethical-hacking",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFree: false,
      isActive: true,
      totalLessons: 45,
      totalQuizzes: 12,
      totalLabs: 8,
      revenue: 45000000
    },
    {
      id: '2',
      title: "Cybersecurity Fundamentals",
      description: "Learn the basics of cybersecurity and protect digital assets",
      instructor: "Mike Rodriguez",
      duration: "25 hours",
      students: 8930,
      rating: 4.7,
      price: 0,
      originalPrice: 1999,
      level: "beginner",
      category: "cybersecurity",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFree: true,
      isActive: true,
      totalLessons: 30,
      totalQuizzes: 8,
      totalLabs: 5,
      revenue: 0
    }
  ]);

  const [users] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'demo@hackingshiksha.com',
      joinDate: '2024-01-15',
      enrolledCourses: 2,
      completedCourses: 1,
      totalSpent: 2999,
      lastActive: '2024-02-01'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      joinDate: '2024-01-20',
      enrolledCourses: 3,
      completedCourses: 2,
      totalSpent: 7998,
      lastActive: '2024-02-02'
    }
  ]);

  const stats = [
    { icon: <Users className="h-6 w-6" />, label: 'Total Users', value: '24,567', change: '+12%', color: 'text-blue-400' },
    { icon: <BookOpen className="h-6 w-6" />, label: 'Total Courses', value: courses.length.toString(), change: '+5%', color: 'text-green-400' },
    { icon: <DollarSign className="h-6 w-6" />, label: 'Revenue', value: '₹45.2L', change: '+18%', color: 'text-yellow-400' },
    { icon: <TrendingUp className="h-6 w-6" />, label: 'Growth', value: '23%', change: '+3%', color: 'text-red-400' }
  ];

  const handleAddCourse = (courseData: any) => {
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      students: 0,
      rating: 0,
      revenue: 0,
      isActive: true
    };
    setCourses([...courses, newCourse]);
    setShowAddCourse(false);
  };

  const handleEditCourse = (courseData: any) => {
    setCourses(courses.map(course => 
      course.id === courseData.id ? { ...course, ...courseData } : course
    ));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const toggleCourseStatus = (courseId: string) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, isActive: !course.isActive } : course
    ));
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-16 min-h-screen bg-black">
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-red-900/20 via-black to-red-900/20 border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold cyber-text">Admin Dashboard</h1>
                <p className="text-gray-400">Manage HackingShiksha Platform</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-semibold text-red-400">Administrator</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-black/50 backdrop-blur-md border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'courses', label: 'Courses' },
              { id: 'users', label: 'Users' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'settings', label: 'Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="cyber-card p-6 rounded-lg"
                >
                  <div className={`${stat.color} mb-2 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                  <div className="text-green-400 text-xs mt-1">{stat.change}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="cyber-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Recent Enrollments</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded">
                      <div>
                        <p className="font-semibold">Student {i}</p>
                        <p className="text-sm text-gray-400">Enrolled in Course {i}</p>
                      </div>
                      <span className="text-green-400 text-sm">₹2,999</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cyber-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Top Performing Courses</h3>
                <div className="space-y-3">
                  {courses.slice(0, 3).map(course => (
                    <div key={course.id} className="flex items-center justify-between p-3 bg-black/30 rounded">
                      <div>
                        <p className="font-semibold">{course.title}</p>
                        <p className="text-sm text-gray-400">{course.students} students</p>
                      </div>
                      <span className="text-yellow-400 text-sm">₹{(course.revenue / 100000).toFixed(1)}L</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold cyber-text">Course Management</h2>
              <button
                onClick={() => setShowAddCourse(true)}
                className="cyber-button px-6 py-3 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Course</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                />
              </div>
              <button className="cyber-button px-6 py-3 flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>

            {/* Courses Table */}
            <div className="cyber-card rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-red-500/20">
                    <tr>
                      <th className="px-6 py-4 text-left">Course</th>
                      <th className="px-6 py-4 text-left">Instructor</th>
                      <th className="px-6 py-4 text-left">Students</th>
                      <th className="px-6 py-4 text-left">Price</th>
                      <th className="px-6 py-4 text-left">Revenue</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map(course => (
                      <tr key={course.id} className="border-t border-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img src={course.image} alt={course.title} className="w-12 h-12 rounded object-cover" />
                            <div>
                              <p className="font-semibold">{course.title}</p>
                              <p className="text-sm text-gray-400">{course.level}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{course.instructor}</td>
                        <td className="px-6 py-4">{course.students.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          {course.isFree ? (
                            <span className="text-green-400">FREE</span>
                          ) : (
                            <span>₹{course.price.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">₹{(course.revenue / 100000).toFixed(1)}L</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            course.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {course.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingCourse(course)}
                              className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => toggleCourseStatus(course.id)}
                              className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold cyber-text">User Management</h2>
            
            <div className="cyber-card rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-red-500/20">
                    <tr>
                      <th className="px-6 py-4 text-left">User</th>
                      <th className="px-6 py-4 text-left">Join Date</th>
                      <th className="px-6 py-4 text-left">Courses</th>
                      <th className="px-6 py-4 text-left">Completed</th>
                      <th className="px-6 py-4 text-left">Total Spent</th>
                      <th className="px-6 py-4 text-left">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-t border-gray-700">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">{user.joinDate}</td>
                        <td className="px-6 py-4">{user.enrolledCourses}</td>
                        <td className="px-6 py-4">{user.completedCourses}</td>
                        <td className="px-6 py-4">₹{user.totalSpent.toLocaleString()}</td>
                        <td className="px-6 py-4">{user.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold cyber-text">Analytics & Reports</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="cyber-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Revenue Analytics</h3>
                <div className="h-64 bg-black/30 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-gray-400" />
                </div>
              </div>
              
              <div className="cyber-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">User Growth</h3>
                <div className="h-64 bg-black/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-gray-400" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Course Modal */}
      {(showAddCourse || editingCourse) && (
        <CourseModal
          course={editingCourse}
          onSave={editingCourse ? handleEditCourse : handleAddCourse}
          onClose={() => {
            setShowAddCourse(false);
            setEditingCourse(null);
          }}
        />
      )}
    </div>
  );
};

// Course Modal Component
const CourseModal: React.FC<{
  course?: any;
  onSave: (course: any) => void;
  onClose: () => void;
}> = ({ course, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    instructor: course?.instructor || '',
    duration: course?.duration || '',
    price: course?.price || 0,
    originalPrice: course?.originalPrice || 0,
    level: course?.level || 'beginner',
    category: course?.category || 'cybersecurity',
    image: course?.image || '',
    isFree: course?.isFree || false,
    totalLessons: course?.totalLessons || 0,
    totalQuizzes: course?.totalQuizzes || 0,
    totalLabs: course?.totalLabs || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...course, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black border border-red-500/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-red-500/30 flex items-center justify-between">
          <h2 className="text-2xl font-bold cyber-text">
            {course ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Instructor</label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                placeholder="e.g., 40 hours"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              >
                <option value="cybersecurity">Cybersecurity</option>
                <option value="ethical-hacking">Ethical Hacking</option>
                <option value="penetration-testing">Penetration Testing</option>
                <option value="network-security">Network Security</option>
                <option value="malware-analysis">Malware Analysis</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Original Price (₹)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                min="0"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Total Lessons</label>
              <input
                type="number"
                value={formData.totalLessons}
                onChange={(e) => setFormData({ ...formData, totalLessons: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Total Quizzes</label>
              <input
                type="number"
                value={formData.totalQuizzes}
                onChange={(e) => setFormData({ ...formData, totalQuizzes: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Total Labs</label>
              <input
                type="number"
                value={formData.totalLabs}
                onChange={(e) => setFormData({ ...formData, totalLabs: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFree"
              checked={formData.isFree}
              onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
              className="w-4 h-4 text-red-500 bg-black border-red-500 rounded focus:ring-red-500"
            />
            <label htmlFor="isFree" className="text-sm text-gray-300">
              This is a free course
            </label>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="cyber-button px-6 py-3 flex-1"
            >
              {course ? 'Update Course' : 'Create Course'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-red-500 text-red-400 px-6 py-3 rounded hover:bg-red-500/20 transition-colors flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;