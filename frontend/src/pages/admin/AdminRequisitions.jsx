import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Box
} from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";

export default function AdminRequisitions() {

  const [requisitions, setRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequisitions();
  }, []);

  const fetchRequisitions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://127.0.0.1:8000/requisitions/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRequisitions(res.data);

    } catch (err) {
      console.log("Error:", err.response?.data);
      alert("Failed to load requisitions");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SIMPLE APPROVE (NO UUID)
  const approve = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/requisitions/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      fetchRequisitions();

    } catch (err) {
      console.log("Approve error:", err.response?.data);
      alert(err.response?.data?.detail || "Approval failed");
    }
  };

  const reject = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/requisitions/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      fetchRequisitions();

    } catch (err) {
      console.log("Reject error:", err.response?.data);
      alert("Reject failed");
    }
  };

  return (
    <DashboardLayout>

      <Typography variant="h4" gutterBottom>
        Requisition Approvals
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && requisitions.length === 0 && (
        <Typography>No Requisitions Found</Typography>
      )}

      {!loading &&
        requisitions.map((req) => (
          <Paper key={req.id} sx={{ p: 3, mb: 3 }}>

            <Typography variant="h6">
              {req.title}
            </Typography>

            <Typography sx={{ mb: 2 }}>
              {req.description}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">

              <Chip
                label={req.status.toUpperCase()}
                color={
                  req.status === "approved"
                    ? "success"
                    : req.status === "rejected"
                    ? "error"
                    : req.status === "pending"
                    ? "warning"
                    : "default"
                }
              />

              {req.status === "pending" && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => approve(req.id)}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => reject(req.id)}
                  >
                    Reject
                  </Button>
                </>
              )}

            </Stack>
          </Paper>
        ))}

    </DashboardLayout>
  );
}