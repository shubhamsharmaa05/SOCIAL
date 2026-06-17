import { Box, Typography, Button, Grid, Card, CardContent, Stack } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CallMadeIcon from "@mui/icons-material/CallMade";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ letterSpacing: "-0.02em" }}>
            Command Center
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Welcome back. Your AI is analyzing 42 new assets.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AutoAwesomeIcon />}
          sx={{
            py: 1.25,
            px: 2.5,
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
            borderRadius: 2,
          }}
        >
          Generate Plan
        </Button>
      </Box>

      <Grid container spacing={3}>
        {[
          { label: "Total Reach", value: "2.4M", trend: "+14.5%", icon: TrendingUpIcon },
          { label: "Assets in Vault", value: "1,248", trend: "+12", icon: CalendarTodayIcon },
          { label: "AI Confidence Avg", value: "94%", trend: "+2%", icon: AutoAwesomeIcon },
        ].map((stat, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", p: 1 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
                  <Box sx={{ p: 1, bgcolor: "rgba(255,255,255,0.05)", borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)" }}>
                    <stat.icon sx={{ color: "primary.main", fontSize: 20 }} />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", bgcolor: "success.main", color: "success.main", bgcolor: "rgba(16, 185, 129, 0.1)", px: 1.5, py: 0.5, borderRadius: 5 }}>
                    <CallMadeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    <Typography variant="caption" fontWeight="bold">
                      {stat.trend}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h3" fontWeight="bold" color="text.primary" sx={{ mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" fontWeight={500} color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <AutoAwesomeIcon sx={{ color: "primary.main", fontSize: 20 }} />
              Top Recommendation
            </Typography>
            <Box sx={{ bgcolor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, p: 2, display: "flex", gap: 2 }}>
              <Box sx={{ width: 96, height: 128, bgcolor: "grey.800", borderRadius: 1, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", flexShrink: 0 }}>
                <Box sx={{ width: "100%", height: "100%", background: "linear-gradient(to bottom right, #3f3f46, #18181b)" }} />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                <Box>
                  <Typography variant="caption" fontWeight="bold" color="primary.main" sx={{ textTransform: "uppercase", letterSpacing: 1, mb: 0.5, display: "block" }}>
                    Instagram Reel
                  </Typography>
                  <Typography variant="body1" fontWeight={500} color="text.primary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    "5 ways AI will change your daily routine in 2026"
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    The AI analyzed your audience and suggests this reel has a 96% chance of outperforming your average reach today.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
                  <Button variant="outlined" size="small" sx={{ color: "text.primary", borderColor: "rgba(255,255,255,0.1)", "&:hover": { bgcolor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" } }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="primary" size="small" sx={{ boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)" }}>
                    Approve
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 2 }}>
              Upcoming Schedule
            </Typography>
            <Stack spacing={1.5}>
              {[1, 2, 3].map((i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1.5, borderRadius: 2, border: "1px solid transparent", "&:hover": { bgcolor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }, transition: "all 0.2s" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main", boxShadow: "0 0 5px rgba(99, 102, 241, 0.8)" }} />
                    <Typography variant="body2" color="text.primary">
                      Product Launch Teaser
                    </Typography>
                  </Box>
                  <Typography variant="caption" fontWeight={500} color="text.secondary">
                    Today, 2:00 PM
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
