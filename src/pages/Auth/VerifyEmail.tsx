import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/UI/Button';

const VerifyEmail: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [isResending, setIsResending] = useState(false);
  const [searchParams] = useSearchParams();
  const { user, verifyEmail } = useAuth();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleVerification(token);
    }
  }, [token]);

  const handleVerification = async (verificationToken: string) => {
    try {
      await verifyEmail(verificationToken);
      setVerificationStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setVerificationStatus('error');
    }
  };

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    setIsResending(true);
    try {
      // Mock API call to resend verification email
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would call your API here
      alert('Verification email sent! Please check your inbox.');
    } catch (error) {
      alert('Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to access this page.
            </p>
            <Button>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {verificationStatus === 'pending' && (
            <div className="text-center">
              <Mail className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verify Your Email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a verification link to <strong>{user.email}</strong>. 
                Please check your inbox and click the link to verify your account.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={handleResendVerification}
                  isLoading={isResending}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend Verification Email
                </Button>
                
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or try resending.
                </p>
              </div>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Email Verified!
              </h2>
              <p className="text-gray-600 mb-6">
                Your email has been successfully verified. You can now access all features of your account.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Redirecting you to the homepage in a few seconds...
              </p>
              <Button>
                <Link to="/">Continue to Homepage</Link>
              </Button>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="text-center">
              <XCircle className="mx-auto h-12 w-12 text-red-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-6">
                The verification link is invalid or has expired. Please try requesting a new one.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={handleResendVerification}
                  isLoading={isResending}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Send New Verification Email
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;