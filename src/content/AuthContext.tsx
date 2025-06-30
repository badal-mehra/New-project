import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  avatar?: string;
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: Certificate[];
  courseProgress: { [courseId: string]: number };
  completedLessons: { [courseId: string]: string[] };
  quizScores: { [quizId: string]: number };
  isAdmin?: boolean;
  joinDate: string;
}

interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  studentName: string;
  completionDate: string;
  instructor: string;
  grade: string;
  qrCode: string;
  isDownloadable: boolean;
  verificationData: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  sendVerificationCode: (email: string) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  completeCourse: (courseId: string) => void;
  updateUser: (userData: Partial<User>) => void;
  enrollInCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  submitQuizScore: (quizId: string, score: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>('');

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Admin login
    if (email === 'adminbadal@hackingshiksha.com' && password === 'admin@password@hackingshiksha') {
      setUser({
        id: 'admin-001',
        name: 'Admin',
        email: email,
        isEmailVerified: true,
        isAdmin: true,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        enrolledCourses: [],
        completedCourses: [],
        courseProgress: {},
        completedLessons: {},
        quizScores: {},
        certificates: [],
        joinDate: '2024-01-01'
      });
      return true;
    }
    
    // Demo user login
    if (email === 'demo@hackingshiksha.com' && password === 'demo123') {
      setUser({
        id: '1',
        name: 'John Doe',
        email: email,
        isEmailVerified: true,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        enrolledCourses: ['1', '2'],
        completedCourses: ['1'],
        courseProgress: { '1': 100, '2': 45 },
        completedLessons: { '1': ['1-1', '1-2', '1-3'], '2': ['2-1'] },
        quizScores: { 'quiz-1-1': 95, 'quiz-2-1': 87 },
        joinDate: '2024-01-15',
        certificates: [{
          id: 'CERT001',
          courseId: '1',
          courseName: 'Ethical Hacking Fundamentals',
          studentName: 'John Doe',
          completionDate: '2024-01-15',
          instructor: 'Dr. Sarah Chen',
          grade: 'A+',
          qrCode: '',
          isDownloadable: true,
          verificationData: {
            id: 'CERT001',
            studentName: 'John Doe',
            courseName: 'Ethical Hacking Fundamentals',
            completionDate: '2024-01-15',
            instructor: 'Dr. Sarah Chen',
            grade: 'A+',
            verificationUrl: `${window.location.origin}/verify-certificate?id=CERT001`
          }
        }]
      });
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user with empty progress
    setUser({
      id: Date.now().toString(),
      name,
      email,
      isEmailVerified: false,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      enrolledCourses: [],
      completedCourses: [],
      courseProgress: {},
      completedLessons: {},
      quizScores: {},
      certificates: [],
      joinDate: new Date().toISOString().split('T')[0]
    });
    return true;
  };

  const sendVerificationCode = async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    
    // In real implementation, send email here
    console.log('Verification code sent:', code);
    alert(`Verification code sent to ${email}: ${code}`);
    
    return true;
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (code === verificationCode) {
      if (user) {
        setUser({ ...user, isEmailVerified: true });
      }
      return true;
    }
    return false;
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real implementation, send password reset email
    console.log('Password reset email sent to:', email);
    return true;
  };

  const completeCourse = (courseId: string) => {
    if (user && !user.completedCourses.includes(courseId)) {
      const updatedUser = {
        ...user,
        completedCourses: [...user.completedCourses, courseId],
        courseProgress: { ...user.courseProgress, [courseId]: 100 }
      };
      setUser(updatedUser);
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (user && !user.enrolledCourses.includes(courseId)) {
      const updatedUser = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId],
        courseProgress: { ...user.courseProgress, [courseId]: 0 }
      };
      setUser(updatedUser);
    }
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    if (user) {
      setUser({
        ...user,
        courseProgress: { ...user.courseProgress, [courseId]: progress }
      });
    }
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    if (user) {
      const currentLessons = user.completedLessons[courseId] || [];
      if (!currentLessons.includes(lessonId)) {
        setUser({
          ...user,
          completedLessons: {
            ...user.completedLessons,
            [courseId]: [...currentLessons, lessonId]
          }
        });
      }
    }
  };

  const submitQuizScore = (quizId: string, score: number) => {
    if (user) {
      setUser({
        ...user,
        quizScores: { ...user.quizScores, [quizId]: score }
      });
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const logout = () => {
    setUser(null);
    setVerificationCode('');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    sendVerificationCode,
    verifyEmail,
    resetPassword,
    completeCourse,
    updateUser,
    enrollInCourse,
    updateCourseProgress,
    completeLesson,
    submitQuizScore
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};