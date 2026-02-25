import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Grid,
  Box,
  Divider
} from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const res = await axios.get("http://127.0.0.1:8000/vendors/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setVendors(res.data);
  };

  const createVendor = async () => {
    await axios.post(
      "http://127.0.0.1:8000/vendors/",
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    setForm({ name: "", email: "", phone: "", company: "" });
    fetchVendors();
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Vendors Management
      </Typography>

      {/* Create Vendor Card */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 5,
          mb: 5,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Name"
              fullWidth
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Phone"
              fullWidth
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Company"
              fullWidth
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={createVendor}
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                background:
                  "linear-gradient(90deg,#7c3aed,#2563eb)"
              }}
            >
              CREATE VENDOR
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Vendors List */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 5,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Vendor List
        </Typography>

        {vendors.length === 0 ? (
          <Typography color="text.secondary">
            No vendors available
          </Typography>
        ) : (
          vendors.map((vendor) => (
            <Box key={vendor.id} sx={{ mb: 2 }}>
              <Stack direction="row" spacing={4}>
                <Typography sx={{ flex: 1 }}>
                  <strong>{vendor.name}</strong>
                </Typography>
                <Typography sx={{ flex: 1 }}>
                  {vendor.company}
                </Typography>
                <Typography sx={{ flex: 1 }}>
                  {vendor.email}
                </Typography>
                <Typography sx={{ flex: 1 }}>
                  {vendor.phone}
                </Typography>
              </Stack>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))
        )}
      </Paper>
    </DashboardLayout>
  );
};

export default Vendors;