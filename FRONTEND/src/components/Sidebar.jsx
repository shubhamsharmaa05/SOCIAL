import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ShareIcon from "@mui/icons-material/Share";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 260;

const navItems = [
  { name: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  { name: "Content Pipeline", icon: FolderOpenIcon, path: "/vault" },
  { name: "AI Recommendations", icon: AutoAwesomeIcon, path: "/recommendations" },
  { name: "Calendar", icon: CalendarTodayIcon, path: "/calendar" },
  { name: "Publishing Queue", icon: FormatListNumberedIcon, path: "/queue" },
  { name: "Connected Accounts", icon: ShareIcon, path: "/accounts" },
  { name: "Analytics", icon: BarChartIcon, path: "/analytics" },
];

const Sidebar = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#000000",
          borderRight: "1px solid #363636",
        },
      }}
    >
      <Box sx={{ height: 64, display: "flex", alignItems: "center", px: 3, borderBottom: "1px solid #363636" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              backgroundColor: "#121212",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #363636",
              boxShadow: "none",
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 16, color: "primary.main" }} />
          </Box>
          <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ letterSpacing: "-0.02em" }}>
            So<Box component="span" sx={{ color: "primary.main" }}>cial</Box>
          </Typography>
        </Link>
      </Box>

      <Box sx={{ overflow: "auto", flex: 1, py: 2 }}>
        <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ px: 3, textTransform: "uppercase", letterSpacing: 1, mb: 1, display: "block" }}>
          Menu
        </Typography>
        <List sx={{ px: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  "&.active": {
                    backgroundColor: "#262626",
                    color: "primary.main",
                    "& .MuiListItemIcon-root": { color: "primary.main" },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 4,
                      height: 20,
                      backgroundColor: "primary.main",
                      borderRadius: "0 4px 4px 0",
                    }
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                  <item.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ borderColor: "#363636" }} />
      {user && (
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5, borderBottom: "1px solid #363636" }}>
          <img src={user.picture || `https://ui-avatars.com/api/?name=${user.full_name}&background=random`} alt={user.full_name} className="w-10 h-10 rounded-full" />
          <Box>
            <Typography variant="body2" fontWeight="bold" color="text.primary">
              {user.full_name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", maxWidth: 170, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.email}
            </Typography>
          </Box>
        </Box>
      )}
      <Box sx={{ p: 2 }}>
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton component={NavLink} to="/settings" sx={{ borderRadius: 2, py: 1, "&.active": { backgroundColor: "#262626", color: "primary.main", "& .MuiListItemIcon-root": { color: "primary.main" } } }}>
              <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, py: 1, color: "text.secondary", "&:hover": { color: "error.main", backgroundColor: "rgba(239, 68, 68, 0.1)", "& .MuiListItemIcon-root": { color: "error.main" } } }}>
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Log out" primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
