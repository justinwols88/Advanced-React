import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { useAuth } from '@/hooks/useAuth';

const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome in your Tech advantage with Justin's Tech Store</h1>
          <p className="text-gray-600">Sign in to access your account and start shopping</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white shadow-sm">
            <button
              onClick={() => setShowLogin(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                showLogin
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                !showLogin
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {showLogin ? (
            <Login onSuccess={() => navigate('/')} />
          ) : (
            <Register onSuccess={() => setShowLogin(true)} />
          )}
        </div>

        {showLogin ? (
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => setShowLogin(false)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign up here
            </button>
          </p>
        ) : (
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => setShowLogin(true)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Login here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
