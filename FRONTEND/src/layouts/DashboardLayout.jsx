import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Box } from "@mui/material";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%", bgcolor: "transparent", overflow: "hidden" }}>
      <Sidebar />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", position: "relative", zIndex: 0 }}>
        <Topbar />
        <Box component="main" sx={{ flex: 1, overflowY: "auto", p: { xs: 3, lg: 5 }, position: "relative", zIndex: 10, width: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
