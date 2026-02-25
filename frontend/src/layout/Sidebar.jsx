import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Typography
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const adminMenu = [
    { label: "Dashboard", path: "/admin" },
    { label: "Vendors", path: "/admin/vendors" },
    { label: "Requisitions", path: "/admin/requisitions" },
    { label: "Purchase Orders", path: "/admin/orders" }
  ];

  const staffMenu = [
    { label: "Create Requisition", path: "/staff" },
    { label: "My Requisitions", path: "/staff/my-requisitions" }
  ];

  const menuItems = role === "admin" ? adminMenu : staffMenu;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          background: "linear-gradient(180deg,#0f172a,#1e293b)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }
      }}
    >
      <Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">
            {role === "admin" ? "Admin Panel" : "Staff Panel"}
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />
        <ListItemButton onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}