import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme
} from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";

const StatCard = ({ title, value }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg,#1e293b,#0f172a)"
            : "linear-gradient(135deg,#ffffff,#f1f5f9)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 15px 35px rgba(0,0,0,0.4)"
              : "0 15px 35px rgba(0,0,0,0.15)"
        }
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ opacity: 0.7 }}
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          mt: 1,
          fontWeight: "bold",
          background: "linear-gradient(45deg,#8b5cf6,#06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default function AdminDashboard({ mode, setMode }) {
  return (
    <DashboardLayout mode={mode} setMode={setMode}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 600 }}
      >
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard title="Total Vendors" value="24" />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Total Requisitions" value="12" />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Approved Requests" value="8" />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Purchase Orders" value="5" />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}