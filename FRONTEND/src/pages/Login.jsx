import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { useAuthStore } from '../store/authStore';
import { Sparkles, AlertCircle, ChevronLeft } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);


const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { socialLogin } = useAuthStore();

  const handleSocialLogin = (provider, userData = null) => {
    socialLogin(provider, userData);
    navigate('/dashboard');
  };



  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 selection:bg-primary/30 relative">
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(226,175,176,0.3)]">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white drop-shadow-md">
            Growth <span className="text-primary">OS</span>
          </span>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-zinc-400 mb-8 text-sm">Sign in to access your command center.</p>
          
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}



          <div className="w-full h-[46px] rounded-xl overflow-hidden shadow-sm border border-white/10 hover:border-white/20 transition-all flex justify-center">
            <GoogleOAuthProvider clientId="511601982868-f0v2mrflkbgn96e4lo167fhann6l5i5t.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  console.log("Google Login Success:", credentialResponse);
                  try {
                    const decoded = jwtDecode(credentialResponse.credential);
                    const profileData = {
                      email: decoded.email,
                      google_id: decoded.sub,
                      full_name: decoded.name,
                      picture: decoded.picture
                    };
                    const user = await authService.googleLogin(profileData);
                    handleSocialLogin('google', user);
                  } catch (err) {
                    console.error("Backend auth error:", err);
                    const detail = err.response?.data?.detail || err.response?.data?.message || err.message || 'Unknown error';
                    setError(`Backend auth failed: ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`);
                  }
                }}
                onError={() => {
                  console.log('Login Failed');
                  setError('Google Login Failed');
                }}
                theme="filled_black"
                shape="rectangular"
                width="100%"
              />
            </GoogleOAuthProvider>
          </div>
          
          <div className="mt-8 text-center text-sm text-zinc-400 space-y-2">
            <p>
              Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
