import { Settings as SettingsIcon, Shield, Bell, Zap } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <SettingsIcon className="text-primary w-8 h-8" />
          Settings
        </h1>
        <p className="text-zinc-400 mt-1">Configure your workspace and AI preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-2">
          {['General', 'Brand Voice', 'Autonomous Mode', 'Notifications', 'Billing'].map((tab, i) => (
            <button key={i} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${i === 2 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 glass-panel p-6 rounded-xl">
          <div className="mb-6 pb-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Autonomous Mode
              </h2>
              <p className="text-sm text-zinc-400 mt-1">Allow AI to schedule and publish automatically without approval.</p>
            </div>
            <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer border border-white/10">
              <div className="w-5 h-5 bg-zinc-500 rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Posting Limits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Max posts per day</label>
                <select className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-primary">
                  <option>1 post</option>
                  <option>3 posts</option>
                  <option>5 posts</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Min confidence score</label>
                <select className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-primary">
                  <option>80%</option>
                  <option>90%</option>
                  <option>95%</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <strong className="text-white">Safety Warning:</strong> Enabling Autonomous Mode gives the AI full control over publishing. Ensure your Brand Voice guidelines are accurately configured before enabling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
