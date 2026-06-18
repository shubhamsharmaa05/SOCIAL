import { Sparkles, CheckCircle2, RefreshCw } from "lucide-react";

const Recommendations = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Sparkles className="text-[#F50057] w-8 h-8" />
          AI Recommendations
        </h1>
        <p className="text-[#A8A8A8] mt-2">The engine has analyzed your audience and vault. Here are the top picks for today.</p>
      </div>

      <div className="space-y-6">
        {[
          { score: 98, platform: "Instagram", type: "Reel", title: "Behind the scenes of our design process" },
          { score: 92, platform: "LinkedIn", type: "Post", title: "Why AI won't replace designers, but empower them" },
          { score: 85, platform: "X", type: "Thread", title: "10 tools we use daily" }
        ].map((item, i) => (
          <div key={i} className="glass-panel p-6 rounded-xl relative overflow-hidden group border border-[#363636] hover:border-primary/30 transition-colors">
            {i === 0 && (
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
                Top Pick
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-32 h-32 bg-[#121212] rounded-lg shrink-0 border border-[#363636]" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold px-2 py-1 bg-white/10 rounded text-zinc-300">{item.platform}</span>
                  <span className="text-xs font-bold px-2 py-1 bg-white/10 rounded text-zinc-300">{item.type}</span>
                  <span className="text-sm font-bold text-[#F50057] flex items-center gap-1">
                    {item.score}% Match
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                
                <div className="bg-black/50 border border-[#363636] rounded-lg p-3 mt-4">
                  <p className="text-sm text-[#A8A8A8] mb-2 font-medium">AI Generated Caption:</p>
                  <p className="text-sm text-zinc-300 italic">"Ever wondered what goes into creating seamless user experiences? 🎨 Here's a sneak peek into our studio... #Design #UX #Creative"</p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 insta-gradient text-white hover:opacity-90 px-4 py-2 rounded-lg font-medium transition-colors ">
                    <CheckCircle2 className="w-4 h-4" /> Approve & Schedule
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-[#363636]">
                    <RefreshCw className="w-4 h-4" /> Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
