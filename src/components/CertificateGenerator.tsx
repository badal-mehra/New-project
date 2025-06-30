import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Award, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from '../context/AuthContext';

interface CertificateGeneratorProps {
  onClose: () => void;
  studentName: string;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ onClose, studentName }) => {
  const { user } = useAuth();
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Only show certificates for completed courses
  const availableCertificates = user?.certificates.filter(cert => 
    user.completedCourses.includes(cert.courseId)
  ) || [];

  const generateQRCode = async (certificateData: any) => {
    try {
      const qrData = JSON.stringify({
        id: certificateData.id,
        studentName: certificateData.studentName,
        courseName: certificateData.courseName,
        completionDate: certificateData.completionDate,
        instructor: certificateData.instructor,
        grade: certificateData.grade,
        verificationUrl: `${window.location.origin}/verify-certificate?id=${certificateData.id}`,
        blockchainHash: `0x${Math.random().toString(16).substr(2, 40)}`,
        timestamp: new Date().toISOString()
      });

      const qrUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#ff0040',
          light: '#ffffff'
        }
      });
      setQrCodeUrl(qrUrl);
      return qrUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  };

  const handleSelectCertificate = async (certificate: any) => {
    setIsGenerating(true);
    setSelectedCertificate(certificate);
    await generateQRCode(certificate);
    setIsGenerating(false);
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      setIsGenerating(true);
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#000000',
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${studentName}_${selectedCertificate.courseName}_Certificate.pdf`);
      
      setIsGenerating(false);
      alert('Certificate downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsGenerating(false);
      alert('Error generating certificate. Please try again.');
    }
  };

  if (availableCertificates.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black border border-red-500/30 rounded-lg max-w-md w-full p-6"
        >
          <div className="text-center">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Certificates Available</h3>
            <p className="text-gray-400 mb-6">
              Complete a course to unlock certificate generation
            </p>
            <button
              onClick={onClose}
              className="cyber-button px-6 py-3"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black border border-red-500/30 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-red-500/30 flex items-center justify-between">
          <h2 className="text-2xl font-bold cyber-text">Generate Certificate</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!selectedCertificate ? (
            <div>
              <h3 className="text-xl font-bold mb-4">Select a Certificate to Generate</h3>
              <div className="grid gap-4">
                {availableCertificates.map((certificate) => (
                  <motion.div
                    key={certificate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="cyber-card p-4 rounded-lg cursor-pointer hover:bg-red-500/10 transition-colors"
                    onClick={() => handleSelectCertificate(certificate)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-lg">{certificate.courseName}</h4>
                        <p className="text-gray-400">Instructor: {certificate.instructor}</p>
                        <p className="text-gray-400">Completed: {certificate.completionDate}</p>
                        <p className="text-green-400">Grade: {certificate.grade}</p>
                      </div>
                      <div className="text-right">
                        <Award className="h-8 w-8 text-yellow-400 mb-2" />
                        <button className="cyber-button text-sm px-4 py-2">
                          Generate
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Certificate Preview</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setSelectedCertificate(null);
                      setQrCodeUrl('');
                    }}
                    className="border border-red-500 text-red-400 px-4 py-2 rounded hover:bg-red-500/20 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={downloadCertificate}
                    disabled={isGenerating}
                    className="cyber-button px-6 py-3 flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
                  </button>
                </div>
              </div>

              {/* Certificate Preview */}
              <div
                ref={certificateRef}
                className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-12 rounded-lg border-2 border-red-500/50 relative overflow-hidden mx-auto"
                style={{ width: '800px', height: '600px' }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
                
                {/* Decorative Border Elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-2 border-red-500/30 rotate-45"></div>
                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-red-500/30 rotate-45"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-red-500/30 rotate-45"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-red-500/30 rotate-45"></div>
                
                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <Award className="h-12 w-12 text-red-500 mr-4" />
                    <h1 className="text-4xl font-bold cyber-text">HackingShiksha</h1>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Certificate of Completion</h2>
                  <div className="w-32 h-1 bg-red-500 mx-auto"></div>
                </div>

                {/* Content */}
                <div className="text-center mb-8 relative z-10">
                  <p className="text-lg text-gray-300 mb-4">This is to certify that</p>
                  <h3 className="text-3xl font-bold text-white mb-4 neon-text">{selectedCertificate.studentName}</h3>
                  <p className="text-lg text-gray-300 mb-2">has successfully completed the course</p>
                  <h4 className="text-2xl font-bold text-red-400 mb-4">{selectedCertificate.courseName}</h4>
                  <p className="text-gray-300">with a grade of <span className="font-bold text-green-400">{selectedCertificate.grade}</span></p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end relative z-10">
                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-red-500 mb-2"></div>
                    <p className="text-sm text-gray-400">Instructor</p>
                    <p className="font-semibold">{selectedCertificate.instructor}</p>
                  </div>

                  <div className="text-center">
                    {qrCodeUrl && (
                      <>
                        <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 mx-auto mb-2" />
                        <p className="text-xs text-gray-400">Verify Certificate</p>
                      </>
                    )}
                  </div>

                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-red-500 mb-2"></div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-semibold">{selectedCertificate.completionDate}</p>
                  </div>
                </div>

                {/* Certificate ID */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                  Certificate ID: {selectedCertificate.id}
                </div>
              </div>

              {/* QR Code Info */}
              {qrCodeUrl && (
                <div className="mt-6 p-4 bg-black/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <QrCode className="h-5 w-5 text-red-500 mr-2" />
                    <h4 className="font-semibold">QR Code Verification</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    The QR code contains encrypted verification data including:
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Certificate ID and student details</li>
                    <li>• Course completion information</li>
                    <li>• Blockchain verification hash</li>
                    <li>• Verification URL for online authentication</li>
                    <li>• Timestamp and digital signature</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateGenerator;