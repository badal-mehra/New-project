import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  Award,
  BookOpen,
  FileText,
  Code,
  ArrowLeft,
  Lock,
  Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, updateCourseProgress, completeLesson, submitQuizScore, completeCourse } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [labCompleted, setLabCompleted] = useState<{ [key: string]: boolean }>({});

  // Mock course data - in real app, fetch from API
  const courseData = {
    '1': {
      id: '1',
      title: "Complete Ethical Hacking Bootcamp",
      description: "Master ethical hacking from basics to advanced penetration testing techniques",
      instructor: "Dr. Sarah Chen",
      duration: "40 hours",
      students: 15420,
      rating: 4.9,
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      modules: [
        {
          id: 'module-1',
          title: 'Introduction to Ethical Hacking',
          lessons: [
            { id: '1-1', title: 'What is Ethical Hacking?', duration: '15 min', type: 'video' },
            { id: '1-2', title: 'Legal and Ethical Considerations', duration: '20 min', type: 'video' },
            { id: '1-3', title: 'Setting Up Your Lab Environment', duration: '30 min', type: 'lab' },
            { id: '1-4', title: 'Module 1 Quiz', duration: '10 min', type: 'quiz' }
          ]
        },
        {
          id: 'module-2',
          title: 'Reconnaissance and Information Gathering',
          lessons: [
            { id: '2-1', title: 'Passive Information Gathering', duration: '25 min', type: 'video' },
            { id: '2-2', title: 'Active Information Gathering', duration: '30 min', type: 'video' },
            { id: '2-3', title: 'OSINT Techniques', duration: '45 min', type: 'lab' },
            { id: '2-4', title: 'Reconnaissance Quiz', duration: '15 min', type: 'quiz' }
          ]
        },
        {
          id: 'module-3',
          title: 'Vulnerability Assessment',
          lessons: [
            { id: '3-1', title: 'Vulnerability Scanning Basics', duration: '20 min', type: 'video' },
            { id: '3-2', title: 'Using Nmap for Network Discovery', duration: '35 min', type: 'video' },
            { id: '3-3', title: 'Vulnerability Assessment Lab', duration: '60 min', type: 'lab' },
            { id: '3-4', title: 'Assessment Quiz', duration: '12 min', type: 'quiz' }
          ]
        }
      ]
    },
    '2': {
      id: '2',
      title: "Cybersecurity Fundamentals",
      description: "Learn the basics of cybersecurity and protect digital assets",
      instructor: "Mike Rodriguez",
      duration: "25 hours",
      students: 8930,
      rating: 4.7,
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800",
      modules: [
        {
          id: 'module-1',
          title: 'Cybersecurity Basics',
          lessons: [
            { id: '2-1-1', title: 'Introduction to Cybersecurity', duration: '18 min', type: 'video' },
            { id: '2-1-2', title: 'Common Threats and Attacks', duration: '22 min', type: 'video' },
            { id: '2-1-3', title: 'Security Fundamentals Lab', duration: '40 min', type: 'lab' },
            { id: '2-1-4', title: 'Basics Quiz', duration: '8 min', type: 'quiz' }
          ]
        }
      ]
    }
  };

  const course = courseData[courseId as keyof typeof courseData];
  const isEnrolled = user?.enrolledCourses.includes(courseId || '');
  const isCompleted = user?.completedCourses.includes(courseId || '');
  const courseProgress = user?.courseProgress[courseId || ''] || 0;
  const completedLessons = user?.completedLessons[courseId || ''] || [];

  useEffect(() => {
    if (!course) {
      navigate('/courses');
    }
  }, [course, navigate]);

  if (!course) {
    return <div>Course not found</div>;
  }

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      completeLesson(courseId!, lessonId);
      const newProgress = Math.round(((completedCount + 1) / totalLessons) * 100);
      updateCourseProgress(courseId!, newProgress);
      
      if (newProgress === 100) {
        completeCourse(courseId!);
        alert('Congratulations! You have completed the course!');
      }
    }
  };

  const handleQuizSubmit = (quizId: string) => {
    const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
    submitQuizScore(quizId, score);
    setQuizSubmitted(true);
    handleLessonComplete(quizId);
    alert(`Quiz completed! Your score: ${score}%`);
  };

  const handleLabComplete = (labId: string) => {
    setLabCompleted({ ...labCompleted, [labId]: true });
    handleLessonComplete(labId);
    alert('Lab completed successfully!');
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'quiz': return <FileText className="h-4 w-4" />;
      case 'lab': return <Code className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const renderLessonContent = () => {
    if (!selectedLesson) return null;

    switch (selectedLesson.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <p className="text-gray-400">Video: {selectedLesson.title}</p>
                <p className="text-sm text-gray-500">Duration: {selectedLesson.duration}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedLesson(null)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Course</span>
              </button>
              <button
                onClick={() => handleLessonComplete(selectedLesson.id)}
                className="cyber-button px-6 py-2"
                disabled={completedLessons.includes(selectedLesson.id)}
              >
                {completedLessons.includes(selectedLesson.id) ? 'Completed' : 'Mark as Complete'}
              </button>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="cyber-card p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{selectedLesson.title}</h3>
              {!quizSubmitted ? (
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold mb-3">1. What is the primary goal of ethical hacking?</p>
                    <div className="space-y-2">
                      {['To cause damage to systems', 'To identify and fix security vulnerabilities', 'To steal sensitive data', 'To disrupt business operations'].map((option, idx) => (
                        <label key={idx} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="q1"
                            value={option}
                            onChange={(e) => setQuizAnswers({ ...quizAnswers, q1: e.target.value })}
                            className="text-red-500"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-3">2. Which of the following is NOT a phase of penetration testing?</p>
                    <div className="space-y-2">
                      {['Reconnaissance', 'Exploitation', 'Data destruction', 'Reporting'].map((option, idx) => (
                        <label key={idx} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="q2"
                            value={option}
                            onChange={(e) => setQuizAnswers({ ...quizAnswers, q2: e.target.value })}
                            className="text-red-500"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleQuizSubmit(selectedLesson.id)}
                    className="cyber-button px-6 py-2"
                    disabled={Object.keys(quizAnswers).length < 2}
                  >
                    Submit Quiz
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-green-400 font-semibold">Quiz Completed!</p>
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="cyber-button px-6 py-2 mt-4"
                  >
                    Back to Course
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'lab':
        return (
          <div className="space-y-6">
            <div className="cyber-card p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{selectedLesson.title}</h3>
              {!labCompleted[selectedLesson.id] ? (
                <div className="space-y-4">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Lab Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                      <li>Set up your virtual machine environment</li>
                      <li>Download the required tools and scripts</li>
                      <li>Follow the step-by-step guide</li>
                      <li>Complete the practical exercises</li>
                      <li>Document your findings</li>
                    </ol>
                  </div>
                  
                  <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg">
                    <p className="text-yellow-400 font-semibold mb-2">⚠️ Important:</p>
                    <p className="text-sm">Only perform these activities in your designated lab environment. Never test on systems you don't own or have explicit permission to test.</p>
                  </div>

                  <div className="flex space-x-4">
                    <button className="cyber-button px-6 py-2 flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download Lab Files</span>
                    </button>
                    <button
                      onClick={() => handleLabComplete(selectedLesson.id)}
                      className="border border-red-500 text-red-400 px-6 py-2 rounded hover:bg-red-500/20 transition-colors"
                    >
                      Mark Lab as Complete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-green-400 font-semibold">Lab Completed!</p>
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="cyber-button px-6 py-2 mt-4"
                  >
                    Back to Course
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (selectedLesson) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {renderLessonContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Course Header */}
      <section className="py-12 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Courses</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-4xl font-bold mb-4 cyber-text">{course.title}</h1>
                <p className="text-xl text-gray-300 mb-6">{course.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <p className="text-gray-400">
                  Instructor: <span className="text-white font-semibold">{course.instructor}</span>
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="cyber-card p-6 rounded-lg sticky top-24"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                {isEnrolled && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-red-400">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {completedCount} of {totalLessons} lessons completed
                    </p>
                  </div>
                )}

                {isCompleted && (
                  <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-lg mb-4">
                    <div className="flex items-center space-x-2 text-green-400">
                      <Award className="h-5 w-5" />
                      <span className="font-semibold">Course Completed!</span>
                    </div>
                    <p className="text-sm text-green-300 mt-1">
                      You can now download your certificate
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="text-center">
                    <span className="text-sm text-gray-400">Course includes:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                    <div className="text-center">
                      <div className="font-bold text-white">{totalLessons}</div>
                      <div>Lessons</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white">
                        {course.modules.reduce((total, module) => 
                          total + module.lessons.filter(lesson => lesson.type === 'quiz').length, 0
                        )}
                      </div>
                      <div>Quizzes</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white">
                        {course.modules.reduce((total, module) => 
                          total + module.lessons.filter(lesson => lesson.type === 'lab').length, 0
                        )}
                      </div>
                      <div>Labs</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-b border-gray-700 mb-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'curriculum', label: 'Curriculum' },
              { id: 'instructor', label: 'Instructor' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">What you'll learn</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Master ethical hacking fundamentals',
                    'Learn penetration testing methodologies',
                    'Understand vulnerability assessment',
                    'Practice with real-world scenarios',
                    'Use industry-standard tools',
                    'Develop security mindset'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Basic understanding of computer networks</li>
                  <li>• Familiarity with Linux command line</li>
                  <li>• Access to a computer with virtualization support</li>
                  <li>• Willingness to learn and practice ethical hacking</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'curriculum' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="cyber-card p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">
                    Module {moduleIndex + 1}: {module.title}
                  </h3>
                  <div className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          isEnrolled 
                            ? 'hover:bg-gray-800/50 cursor-pointer' 
                            : 'bg-gray-800/30'
                        }`}
                        onClick={() => isEnrolled && setSelectedLesson(lesson)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded ${
                            completedLessons.includes(lesson.id) 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-700 text-gray-400'
                          }`}>
                            {completedLessons.includes(lesson.id) ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              getLessonIcon(lesson.type)
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">{lesson.title}</p>
                            <p className="text-sm text-gray-400 capitalize">{lesson.type} • {lesson.duration}</p>
                          </div>
                        </div>
                        {!isEnrolled && (
                          <Lock className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'instructor' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-card p-8 rounded-lg"
            >
              <div className="flex items-start space-x-6">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt={course.instructor}
                  className="w-24 h-24 rounded-full border-2 border-red-500"
                />
                <div>
                  <h3 className="text-2xl font-bold mb-2">{course.instructor}</h3>
                  <p className="text-red-400 mb-4">Cybersecurity Expert & Ethical Hacker</p>
                  <p className="text-gray-300 mb-4">
                    Dr. Sarah Chen is a renowned cybersecurity expert with over 15 years of experience 
                    in ethical hacking and penetration testing. She has worked with Fortune 500 companies 
                    and government agencies to secure their digital infrastructure.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Experience:</span>
                      <span className="ml-2 font-semibold">15+ years</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Students:</span>
                      <span className="ml-2 font-semibold">50,000+</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Courses:</span>
                      <span className="ml-2 font-semibold">12</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Rating:</span>
                      <span className="ml-2 font-semibold">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;