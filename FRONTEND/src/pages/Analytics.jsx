import { BarChart3, TrendingUp, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', views: 4000, engagement: 2400 },
  { name: 'Tue', views: 3000, engagement: 1398 },
  { name: 'Wed', views: 2000, engagement: 9800 },
  { name: 'Thu', views: 2780, engagement: 3908 },
  { name: 'Fri', views: 1890, engagement: 4800 },
  { name: 'Sat', views: 2390, engagement: 3800 },
  { name: 'Sun', views: 3490, engagement: 4300 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <BarChart3 className="text-primary w-8 h-8" />
          Analytics Dashboard
        </h1>
        <p className="text-zinc-400 mt-1">AI-powered insights into your content performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Total Impressions</h3>
          <p className="text-3xl font-bold text-white">124.5K</p>
          <span className="text-emerald-400 text-sm flex items-center mt-2"><TrendingUp className="w-4 h-4 mr-1" /> +12.5% this week</span>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Avg Engagement Rate</h3>
          <p className="text-3xl font-bold text-white">4.8%</p>
          <span className="text-emerald-400 text-sm flex items-center mt-2"><TrendingUp className="w-4 h-4 mr-1" /> +0.4% this week</span>
        </div>
        <div className="glass-card p-6 border border-primary/30 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
          <h3 className="text-sm font-medium text-primary mb-2 flex items-center"><Users className="w-4 h-4 mr-1" /> AI Insight</h3>
          <p className="text-sm text-zinc-300">Your audience is most active on <strong className="text-white">Tuesdays at 2 PM</strong>. Posting videos during this window increases reach by 34%.</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl h-96">
        <h3 className="text-lg font-bold text-white mb-6">Performance Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#ffffff50" tick={{fill: '#ffffff50'}} axisLine={false} tickLine={false} />
            <YAxis stroke="#ffffff50" tick={{fill: '#ffffff50'}} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff10', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#E2AFB0' }}
            />
            <Line type="monotone" dataKey="views" stroke="#E2AFB0" strokeWidth={3} dot={{r: 4, fill: '#0a0a0a', strokeWidth: 2}} activeDot={{r: 6}} />
            <Line type="monotone" dataKey="engagement" stroke="#ffffff50" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
