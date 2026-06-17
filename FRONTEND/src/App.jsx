import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import DashboardLayout from "./layouts/DashboardLayout";

// Page Imports
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ContentVault from "./pages/ContentVault";
import AIRecommendations from "./pages/Recommendations";
import CalendarPage from "./pages/CalendarPage";
import PublishingQueue from "./pages/PublishingQueue";
import ConnectedAccounts from "./pages/Accounts";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vault" element={<ContentVault />} />
          <Route path="/recommendations" element={<AIRecommendations />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/queue" element={<PublishingQueue />} />
          <Route path="/accounts" element={<ConnectedAccounts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
