import { User, Mail, Shield, Key, Camera } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">User Profile</h1>
        <p className="text-zinc-400 mt-1">Manage your personal information and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="glass-panel p-6 rounded-xl flex flex-col items-center text-center space-y-4">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-zinc-800 border-2 border-primary/50 overflow-hidden flex items-center justify-center relative shadow-[0_0_20px_rgba(226,175,176,0.2)]">
               <User className="w-12 h-12 text-zinc-500" />
               <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera className="w-6 h-6 text-white mb-1" />
                 <span className="text-xs font-medium text-white">Change</span>
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Alex Mercer</h2>
            <p className="text-sm text-primary font-medium mt-1">Pro Creator</p>
          </div>
          <p className="text-sm text-zinc-400 px-4">
            Digital marketer and content creator building brands in the tech space.
          </p>
        </div>

        {/* Right Column: Details & Forms */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
              <User className="w-5 h-5 text-primary" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">First Name</label>
                <input type="text" defaultValue="Alex" className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Last Name</label>
                <input type="text" defaultValue="Mercer" className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <input type="email" defaultValue="alex@acmecorp.com" className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
              <Shield className="w-5 h-5 text-primary" /> Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/50 border border-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-zinc-400" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Password</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Update</button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/50 border border-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-zinc-400" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Add an extra layer of security</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Enable</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
