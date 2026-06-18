import { Box, Typography, Button, Grid, Card, CardContent, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CallMadeIcon from "@mui/icons-material/CallMade";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const Dashboard = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Command Center
          </h1>
          <p className="text-gray-400 mt-1">
            Welcome back. Your AI is analyzing 42 new assets.
          </p>
        </div>
        <Button
          variant="contained"
          className="bg-indigo-600 hover:bg-indigo-500 text-white  transition-all hover: rounded-xl py-2.5 px-5"
          startIcon={<AutoAwesomeIcon />}
        >
          Generate Plan
        </Button>
      </motion.div>

      <Grid container spacing={3}>
        {[
          { label: "Total Reach", value: "2.4M", trend: "+14.5%", icon: TrendingUpIcon, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
          { label: "Assets in Vault", value: "1,248", trend: "+12", icon: CalendarTodayIcon, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
          { label: "AI Confidence Avg", value: "94%", trend: "+2%", icon: AutoAwesomeIcon, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
        ].map((stat, i) => (
          <Grid item xs={12} md={4} key={i}>
            <motion.div variants={itemVariants} className="h-full">
              <div className="h-full rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${stat.bg} ${stat.border}`}>
                      <stat.icon className={`${stat.color}`} style={{ fontSize: 22 }} />
                    </div>
                    <div className="flex items-center bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <CallMadeIcon style={{ fontSize: 14, marginRight: 4 }} />
                      <span className="text-xs font-bold">{stat.trend}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</h3>
                    <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} className="mt-2">
        <Grid item xs={12} lg={6}>
          <motion.div variants={itemVariants} className="h-full">
            <div className="rounded-2xl border border-white/5 bg-[#121212]/80 backdrop-blur-xl p-6 h-full flex flex-col">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AutoAwesomeIcon className="text-indigo-400" style={{ fontSize: 22 }} />
                Top Recommendation
              </h2>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex gap-4 flex-1 transition-all hover:bg-white/10 group">
                <div className="w-24 h-32 rounded-lg border border-white/10 overflow-hidden shrink-0 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mix-blend-overlay group-hover:scale-110 transition-transform duration-500" />
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 block">
                      Instagram Reel
                    </span>
                    <h3 className="text-base font-semibold text-white line-clamp-2">
                      "5 ways AI will change your daily routine in 2026"
                    </h3>
                    <p className="text-sm text-gray-400 mt-1.5 line-clamp-2">
                      The AI analyzed your audience and suggests this reel has a 96% chance of outperforming your average reach today.
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button className="px-4 py-1.5 text-sm font-medium text-white border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                      Edit
                    </button>
                    <button className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg  hover:bg-indigo-500 transition-all">
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <motion.div variants={itemVariants} className="h-full">
            <div className="rounded-2xl border border-white/5 bg-[#121212]/80 backdrop-blur-xl p-6 h-full flex flex-col">
              <h2 className="text-lg font-bold text-white mb-4">
                Upcoming Schedule
              </h2>
              <div className="flex flex-col gap-2.5 flex-1 justify-center">
                {[
                  { title: "Product Launch Teaser", time: "Today, 2:00 PM", color: "bg-indigo-500", shadow: "shadow-indigo-500/50" },
                  { title: "Weekly Insights Carousel", time: "Tomorrow, 10:00 AM", color: "bg-purple-500", shadow: "shadow-purple-500/50" },
                  { title: "Community Q&A Prompt", time: "Friday, 4:00 PM", color: "bg-emerald-500", shadow: "shadow-emerald-500/50" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-transparent hover:bg-white/5 hover:border-white/10 transition-all group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color}  ${item.shadow} group-hover:scale-125 transition-transform`} />
                      <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-400">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Dashboard;
