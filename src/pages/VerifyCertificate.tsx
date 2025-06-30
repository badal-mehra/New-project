import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, CheckCircle, XCircle, Award, Calendar, User, Download, QrCode, Eye } from 'lucide-react';

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock verification result
    if (certificateId.toLowerCase().includes('cert') || certificateId.startsWith('{')) {
      let certificateData;
      
      // Check if it's QR code data (JSON format)
      try {
        if (certificateId.startsWith('{')) {
          certificateData = JSON.parse(certificateId);
        } else {
          // Regular certificate ID
          certificateData = {
            id: certificateId,
            studentName: 'John Doe',
            courseName: 'Ethical Hacking Fundamentals',
            instructor: 'Dr. Sarah Chen',
            completionDate: '2024-01-15',
            grade: 'A+',
            issueDate: '2024-01-16',
            verificationUrl: `${window.location.origin}/verify-certificate?id=${certificateId}`,
            blockchainHash: `0x${Math.random().toString(16).substr(2, 40)}`,
            timestamp: new Date().toISOString()
          };
        }
        
        setVerificationResult({
          isValid: true,
          certificate: {
            ...certificateData,
            certificateImage: generateCertificateImage(
              certificateData.studentName, 
              certificateData.courseName, 
              certificateData.instructor, 
              certificateData.completionDate, 
              certificateData.grade,
              certificateData.id
            )
          }
        });
      } catch (error) {
        setVerificationResult({
          isValid: false,
          error: 'Invalid QR code data format'
        });
      }
    } else {
      setVerificationResult({
        isValid: false,
        error: 'Certificate not found or invalid ID format'
      });
    }
    
    setIsLoading(false);
  };

  const generateCertificateImage = (studentName: string, courseName: string, instructor: string, date: string, grade: string, certId: string) => {
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#000000;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
          </linearGradient>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ff0040" stroke-width="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        
        <!-- Background -->
        <rect width="800" height="600" fill="url(#bg)"/>
        <rect width="800" height="600" fill="url(#grid)" opacity="0.1"/>
        
        <!-- Border -->
        <rect x="20" y="20" width="760" height="560" fill="none" stroke="#ff0040" stroke-width="3"/>
        <rect x="40" y="40" width="720" height="520" fill="none" stroke="#ff0040" stroke-width="1" opacity="0.5"/>
        
        <!-- Header -->
        <text x="400" y="100" text-anchor="middle" fill="#ff0040" font-family="Arial, sans-serif" font-size="36" font-weight="bold">HackingShiksha</text>
        <text x="400" y="140" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24">Certificate of Completion</text>
        <line x1="300" y1="160" x2="500" y2="160" stroke="#ff0040" stroke-width="2"/>
        
        <!-- Content -->
        <text x="400" y="220" text-anchor="middle" fill="#cccccc" font-family="Arial, sans-serif" font-size="18">This is to certify that</text>
        <text x="400" y="270" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="32" font-weight="bold">${studentName}</text>
        <text x="400" y="320" text-anchor="middle" fill="#cccccc" font-family="Arial, sans-serif" font-size="18">has successfully completed the course</text>
        <text x="400" y="370" text-anchor="middle" fill="#ff0040" font-family="Arial, sans-serif" font-size="24" font-weight="bold">${courseName}</text>
        <text x="400" y="410" text-anchor="middle" fill="#cccccc" font-family="Arial, sans-serif" font-size="16">with a grade of</text>
        <text x="400" y="440" text-anchor="middle" fill="#00ff00" font-family="Arial, sans-serif" font-size="20" font-weight="bold">${grade}</text>
        
        <!-- Footer -->
        <text x="150" y="520" text-anchor="middle" fill="#cccccc" font-family="Arial, sans-serif" font-size="14">Instructor</text>
        <text x="150" y="540" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="16" font-weight="bold">${instructor}</text>
        <line x1="100" y1="510" x2="200" y2="510" stroke="#ff0040" stroke-width="1"/>
        
        <text x="650" y="520" text-anchor="middle" fill="#cccccc" font-family="Arial, sans-serif" font-size="14">Date</text>
        <text x="650" y="540" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="16" font-weight="bold">${date}</text>
        <line x1="600" y1="510" x2="700" y2="510" stroke="#ff0040" stroke-width="1"/>
        
        <!-- Certificate ID -->
        <text x="400" y="580" text-anchor="middle" fill="#666666" font-family="Arial, sans-serif" font-size="10">Certificate ID: ${certId}</text>
        
        <!-- Decorative elements -->
        <rect x="60" y="60" width="30" height="30" fill="none" stroke="#ff0040" stroke-width="2" transform="rotate(45 75 75)" opacity="0.5"/>
        <rect x="710" y="60" width="30" height="30" fill="none" stroke="#ff0040" stroke-width="2" transform="rotate(45 725 75)" opacity="0.5"/>
        <rect x="60" y="510" width="30" height="30" fill="none" stroke="#ff0040" stroke-width="2" transform="rotate(45 75 525)" opacity="0.5"/>
        <rect x="710" y="510" width="30" height="30" fill="none" stroke="#ff0040" stroke-width="2" transform="rotate(45 725 525)" opacity="0.5"/>
      </svg>
    `)}`;
  };

  const downloadCertificateImage = () => {
    if (verificationResult?.certificate?.certificateImage) {
      const link = document.createElement('a');
      link.href = verificationResult.certificate.certificateImage;
      link.download = `${verificationResult.certificate.studentName}_Certificate.svg`;
      link.click();
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
              <Shield className="h-10 w-10 text-red-500 glow-effect" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 cyber-text">
              Verify Certificate
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Authenticate HackingShiksha certificates using our blockchain-powered verification system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cyber-card p-8 rounded-lg"
          >
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Certificate ID or QR Code Data
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white text-lg"
                    placeholder="Enter certificate ID (e.g., CERT001) or paste QR code data"
                    required
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-400">
                    You can scan the QR code from a certificate and paste the data here, or enter the certificate ID directly.
                  </p>
                  <p className="text-xs text-blue-400">
                    Try: CERT001 or any text containing "cert"
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full cyber-button py-4 text-lg relative overflow-hidden"
              >
                {isLoading && <div className="loading-bar absolute top-0 left-0 right-0"></div>}
                <span className={isLoading ? 'opacity-50' : ''}>
                  {isLoading ? 'Verifying...' : 'Verify Certificate'}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Verification Result */}
          {verificationResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              {verificationResult.isValid ? (
                <div className="cyber-card p-8 rounded-lg border-green-500/50">
                  <div className="text-center mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-2">
                      Certificate Verified ✓
                    </h3>
                    <p className="text-gray-400">
                      This certificate is authentic and valid
                    </p>
                  </div>

                  {/* Certificate Image */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold mb-4 text-center">Certificate Preview</h4>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <img
                        src={verificationResult.certificate.certificateImage}
                        alt="Certificate"
                        className="w-full max-w-2xl mx-auto rounded-lg border border-red-500/30"
                      />
                      <div className="text-center mt-4 space-x-4">
                        <button 
                          onClick={downloadCertificateImage}
                          className="cyber-button px-6 py-2 text-sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Certificate
                        </button>
                        <button className="border border-red-500 text-red-400 px-6 py-2 rounded text-sm hover:bg-red-500/20 transition-colors">
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Size
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-gray-400">Student Name</p>
                          <p className="font-semibold">{verificationResult.certificate.studentName}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-gray-400">Course</p>
                          <p className="font-semibold">{verificationResult.certificate.courseName}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-gray-400">Instructor</p>
                          <p className="font-semibold">{verificationResult.certificate.instructor}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-gray-400">Completion Date</p>
                          <p className="font-semibold">{verificationResult.certificate.completionDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-gray-400">Grade</p>
                          <p className="font-semibold text-green-400">{verificationResult.certificate.grade}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-gray-400">Certificate ID</p>
                          <p className="font-semibold">{verificationResult.certificate.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-black/30 rounded-lg">
                    <div className="flex items-center mb-2">
                      <QrCode className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-sm font-semibold">Blockchain Verification</p>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">
                      This certificate is secured with blockchain technology for tamper-proof verification.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-400">Blockchain Hash:</p>
                        <p className="font-mono text-xs text-green-400 break-all">
                          {verificationResult.certificate.blockchainHash}
                        </p>
                      </div>
                      {verificationResult.certificate.timestamp && (
                        <div>
                          <p className="text-sm text-gray-400">Verification Timestamp:</p>
                          <p className="text-xs text-gray-300">
                            {new Date(verificationResult.certificate.timestamp).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cyber-card p-8 rounded-lg border-red-500/50 text-center">
                  <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-red-400 mb-2">
                    Certificate Not Found
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {verificationResult.error}
                  </p>
                  <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg">
                    <p className="text-yellow-400 text-sm">
                      <strong>Tip:</strong> Make sure you've entered the correct certificate ID or QR code data. 
                      Certificate IDs typically start with "CERT\" followed by numbers.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 cyber-text">
              How Certificate Verification Works
            </h2>
            <p className="text-xl text-gray-400">
              Our blockchain-powered system ensures certificate authenticity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Scan QR Code or Enter ID',
                description: 'Use the QR code scanner or manually enter the certificate ID. QR codes contain encrypted verification data including blockchain hashes.'
              },
              {
                step: '02',
                title: 'Blockchain Verification',
                description: 'Our system queries the blockchain for certificate authenticity and validates the encrypted data against our secure database.'
              },
              {
                step: '03',
                title: 'Instant Results',
                description: 'Get immediate verification results with detailed certificate information, preview, and blockchain confirmation status.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="cyber-card p-6 rounded-lg text-center"
              >
                <div className="text-4xl font-bold text-red-500 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyCertificate;