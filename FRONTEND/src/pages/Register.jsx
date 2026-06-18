import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ChevronLeft, AlertCircle } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';


const Register = () => {
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
        className="absolute top-8 left-8 flex items-center gap-2 text-[#A8A8A8] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-[#363636]"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#121212] flex items-center justify-center border border-[#363636] ">
            <Sparkles className="w-5 h-5 text-[#F50057]" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white drop-shadow-md">
            So<span className="text-[#F50057]">cial</span>
          </span>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-[#363636] ">
          <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
          <p className="text-[#A8A8A8] mb-8 text-sm">Join Social and automate your social presence.</p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}



          <div className="w-full h-[46px] rounded-xl overflow-hidden shadow-sm border border-[#363636] hover:border-white/20 transition-all flex justify-center">
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
                    console.error(err);
                    setError('Failed to authenticate with backend');
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
          
          
          <div className="mt-8 text-center text-sm text-[#A8A8A8]">
            Already have an account? <Link to="/login" className="text-[#F50057] hover:underline font-medium">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
