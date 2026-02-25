import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, mode, setMode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar mode={mode} setMode={setMode} />
        <Box sx={{ p: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
}