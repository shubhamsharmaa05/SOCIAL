import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { socialLogin } = useAuthStore();

  const handleSocialLogin = (provider, userData = null) => {
    socialLogin(provider, userData);
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy registration logic: redirect to login
    navigate('/login');
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
          <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
          <p className="text-zinc-400 mb-8 text-sm">Join Growth OS and automate your social presence.</p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alex Mercer"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@acmecorp.com"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_15px_rgba(226,175,176,0.3)]"
            >
              Sign Up <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="text-xs uppercase text-zinc-500 font-medium tracking-wider">Or continue with</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full h-[46px] rounded-xl overflow-hidden shadow-sm border border-white/10 hover:border-white/20 transition-all">
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
            <button
              type="button"
              onClick={() => handleSocialLogin('instagram')}
              className="flex items-center justify-center gap-2 w-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 rounded-xl py-3 px-4 transition-all text-sm font-medium text-white shadow-sm h-[46px]"
            >
              <InstagramIcon />
              Instagram
            </button>
          </div>
          
          
          <div className="mt-6 text-center text-sm text-zinc-400">
            Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
