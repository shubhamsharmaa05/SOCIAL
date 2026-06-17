import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        zIndex: 20,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", height: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: 400 }}>
          <IconButton
            onClick={() => navigate(-1)}
            size="small"
            sx={{
              color: "text.secondary",
              border: "1px solid transparent",
              "&:hover": { borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          
          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#111",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.1)",
              px: 2,
              py: 0.5,
              "&:focus-within": {
                borderColor: "primary.main",
                boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.5)",
              },
            }}
          >
            <SearchIcon sx={{ color: "text.secondary", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search content, campaigns..."
              sx={{ color: "text.primary", width: "100%", fontSize: "0.875rem" }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ color: "text.secondary", "&:hover": { color: "text.primary", backgroundColor: "rgba(255,255,255,0.05)" } }}>
            <Badge
              variant="dot"
              color="primary"
              sx={{ "& .MuiBadge-badge": { boxShadow: "0 0 8px rgba(99, 102, 241, 0.8)" } }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, pl: 2, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
            <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", alignItems: "flex-end" }}>
              <Typography variant="body2" fontWeight={500} color="text.primary">
                Acme Corp
              </Typography>
              <Typography variant="caption" fontWeight={600} color="primary.main" sx={{ letterSpacing: 1, textTransform: "uppercase", fontSize: "0.65rem" }}>
                Pro Workspace
              </Typography>
            </Box>
            
            <IconButton
              component={Link}
              to="/profile"
              sx={{
                p: 0,
                border: "1px solid rgba(255,255,255,0.1)",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <Avatar sx={{ width: 36, height: 36, bgcolor: "grey.800" }}>
                <PersonIcon sx={{ color: "text.secondary" }} />
              </Avatar>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
