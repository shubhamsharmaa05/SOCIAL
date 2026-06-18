import { Share2, Check, Plus, Loader2 } from "lucide-react";
import { useState } from "react";

const Accounts = () => {
  const [platforms, setPlatforms] = useState([
    { id: 'instagram', name: "Instagram", connected: false, account: null },
    { id: 'linkedin', name: "LinkedIn", connected: true, account: "Acme Corporation" },
    { id: 'twitter', name: "X (Twitter)", connected: true, account: "@acme_hq" },
    { id: 'tiktok', name: "TikTok", connected: false, account: null },
    { id: 'youtube', name: "YouTube", connected: false, account: null },
    { id: 'facebook', name: "Facebook", connected: false, account: null },
  ]);
  const [connectingId, setConnectingId] = useState(null);

  const handleConnect = (platformId) => {
    if (platformId === 'instagram') {
      setConnectingId(platformId);
      // Simulate Instagram access request OAuth flow
      setTimeout(() => {
        setPlatforms(prev => prev.map(p => 
          p.id === platformId ? { ...p, connected: true, account: "@my_insta_page" } : p
        ));
        setConnectingId(null);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Share2 className="text-[#F50057] w-8 h-8" />
          Connected Accounts
        </h1>
        <p className="text-[#A8A8A8] mt-1">Manage all your social media connections in one place. Support for multiple emails.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform, i) => (
          <div key={i} className={`glass-card p-6 border ${platform.connected ? 'border-primary/20 bg-primary/5' : 'border-[#363636]'}`}>
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
            
            <p className="text-sm text-[#A8A8A8] mb-6">
              {platform.connected ? `Posting as ${platform.account}` : "Connect your account to enable auto-publishing."}
            </p>
            
            <button 
              onClick={() => !platform.connected && handleConnect(platform.id)}
              disabled={connectingId === platform.id}
              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              platform.connected 
                ? 'bg-white/5 hover:bg-white/10 text-white border border-[#363636]' 
                : 'insta-gradient text-white hover:opacity-90  disabled:opacity-70 disabled:cursor-not-allowed'
            }`}>
              {connectingId === platform.id ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Requesting Access...</>
              ) : platform.connected ? (
                'Manage Connection'
              ) : (
                <><Plus className="w-4 h-4" /> Connect Account</>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
