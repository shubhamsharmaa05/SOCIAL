import { Share2, Check, Plus } from "lucide-react";

const Accounts = () => {
  const platforms = [
    { name: "Instagram", connected: true, account: "@acmecorp" },
    { name: "LinkedIn", connected: true, account: "Acme Corporation" },
    { name: "X (Twitter)", connected: true, account: "@acme_hq" },
    { name: "TikTok", connected: false, account: null },
    { name: "YouTube", connected: false, account: null },
    { name: "Facebook", connected: false, account: null },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Share2 className="text-primary w-8 h-8" />
          Connected Accounts
        </h1>
        <p className="text-zinc-400 mt-1">Manage all your social media connections in one place. Support for multiple emails.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform, i) => (
          <div key={i} className={`glass-card p-6 border ${platform.connected ? 'border-primary/20 bg-primary/5' : 'border-white/5'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">{platform.name}</h3>
              {platform.connected ? (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  <Check className="w-3 h-3" /> Connected
                </span>
              ) : (
                <span className="text-xs font-medium text-zinc-500 bg-white/5 px-2 py-1 rounded-full">
                  Not Connected
                </span>
              )}
            </div>
            
            <p className="text-sm text-zinc-400 mb-6">
              {platform.connected ? `Posting as ${platform.account}` : "Connect your account to enable auto-publishing."}
            </p>
            
            <button className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              platform.connected 
                ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                : 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_10px_rgba(226,175,176,0.2)]'
            }`}>
              {platform.connected ? 'Manage Connection' : <><Plus className="w-4 h-4" /> Connect Account</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
