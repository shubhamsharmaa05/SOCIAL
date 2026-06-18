import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Zap, BarChart3, LayoutDashboard } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Landing = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const logout = useAuthStore(state => state.logout);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      {/* Background glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Navbar */}
      <nav className="h-20 flex items-center justify-between px-8 max-w-7xl mx-auto z-10 relative">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(255,107,107,0.3)]">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white drop-shadow-md">
            So<span className="text-primary">cial</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Customers</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button onClick={logout} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Log out</button>
              <Link to="/dashboard" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Log in</Link>
              <Link to="/register" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-8">
          <Sparkles className="w-3 h-3" />
          <span>The next generation of Social Media Management</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Your AI-Powered <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">Social Command Center</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Stop scheduling. Start growing. Let AI analyze, categorize, and autonomously publish your best content at the perfect time.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-[0_0_20px_rgba(255,107,107,0.4)] flex items-center gap-2 w-full sm:w-auto justify-center">
            Enter Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all w-full sm:w-auto">
            View Demo
          </button>
        </div>
        
        {/* Mock UI Preview */}
        <div className="mt-20 glass-panel p-2 md:p-4 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mx-auto relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
           <div className="bg-[#050505] rounded-xl border border-white/5 h-96 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
             <LayoutDashboard className="w-24 h-24 text-white/5" />
           </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">A premium suite of tools designed to replace your entire social media stack.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Autonomous Publishing", desc: "Set it and forget it. Our AI learns when your audience is active and publishes automatically." },
            { icon: Sparkles, title: "AI Content Engine", desc: "Upload raw assets and let the system generate perfect hooks, captions, and hashtags." },
            { icon: BarChart3, title: "Deep Analytics", desc: "Stop guessing. Get actionable insights and performance predictions before you even post." }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-zinc-500 text-sm">
        <p>&copy; 2026 Social. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
