import { useState } from "react";
import { Box, Typography, Tabs, Tab, List, ListItem, ListItemAvatar, ListItemText, Button, Paper, Avatar, Divider, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ErrorIcon from "@mui/icons-material/Error";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const PublishingQueue = () => {
  const [activeTab, setActiveTab] = useState("All");

  const queue = [
    { status: "publishing", title: "Product Launch Teaser", platform: "Instagram", time: "Now", icon: PlayCircleIcon, color: "info.main", bg: "rgba(59, 130, 246, 0.1)" },
    { status: "scheduled", title: "Weekly Newsletter Promo", platform: "LinkedIn", time: "Tomorrow, 9:00 AM", icon: ScheduleIcon, color: "text.secondary", bg: "rgba(255, 255, 255, 0.05)" },
    { status: "published", title: "Customer Success Story", platform: "X", time: "Yesterday, 2:00 PM", icon: CheckCircleIcon, color: "success.main", bg: "rgba(16, 185, 129, 0.1)" },
    { status: "failed", title: "Behind the Scenes Video", platform: "TikTok", time: "Today, 10:00 AM", icon: ErrorIcon, color: "error.main", bg: "rgba(239, 68, 68, 0.1)" },
  ];

  const filteredQueue = queue.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Scheduled") return item.status === "scheduled";
    if (activeTab === "Published") return item.status === "published";
    if (activeTab === "Errors") return item.status === "failed";
    return true;
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ letterSpacing: "-0.02em" }}>
          Publishing Queue
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Monitor the status of all your automated content.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid rgba(255, 255, 255, 0.05)", bgcolor: "background.paper", overflow: "hidden" }}>
        <Box sx={{ borderBottom: 1, borderColor: "rgba(255, 255, 255, 0.05)" }}>
          <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto">
            {['All', 'Scheduled', 'Published', 'Errors'].map((tab) => (
              <Tab key={tab} label={tab} value={tab} sx={{ textTransform: "none", fontWeight: 500, px: 3, py: 2 }} />
            ))}
          </Tabs>
        </Box>

        <List disablePadding>
          {filteredQueue.map((item, i) => (
            <Box key={i}>
              <ListItem
                sx={{
                  px: 2,
                  py: 2,
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.03)" },
                  "&:hover .action-btn": { opacity: 1 },
                  transition: "background-color 0.2s ease",
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: item.bg, color: item.color, borderRadius: 2 }}>
                    <item.icon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{ variant: "body1", fontWeight: 500, color: "text.primary" }}
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Chip label={item.platform} size="small" variant="outlined" sx={{ height: 20, fontSize: "0.65rem", borderColor: "rgba(255,255,255,0.1)", color: "text.secondary", borderRadius: 1 }} />
                      <Typography variant="caption" color="text.secondary">
                        {item.time}
                      </Typography>
                    </Box>
                  }
                />
                <Button
                  className="action-btn"
                  variant="outlined"
                  size="small"
                  sx={{
                    opacity: 0,
                    transition: "opacity 0.2s ease",
                    color: "text.primary",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.2)" },
                  }}
                >
                  {item.status === 'failed' ? 'Retry' : 'View'}
                </Button>
              </ListItem>
              {i < filteredQueue.length - 1 && <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />}
            </Box>
          ))}
          {filteredQueue.length === 0 && (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">No items match this filter.</Typography>
            </Box>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default PublishingQueue;
