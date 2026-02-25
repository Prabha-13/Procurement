import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Chip,
  Button,
  Stack
} from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";

export default function MyRequisitions({ mode, setMode }) {
  const [requisitions, setRequisitions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/requisitions/my",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setRequisitions(res.data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const submitRequisition = async (id) => {
  try {
    await axios.put(
      `http://127.0.0.1:8000/requisitions/${id}/submit`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    alert("Submitted Successfully");
    fetchData();
  } catch (err) {
    console.log("Submit failed", err);
    alert("Submit failed");
  }
};

  return (
    <DashboardLayout mode={mode} setMode={setMode}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        My Requisitions
      </Typography>

      {requisitions.length === 0 && (
        <Typography>No Requisitions Found</Typography>
      )}

      {requisitions.map((req) => (
        <Paper key={req.id} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">{req.title}</Typography>
          <Typography sx={{ mb: 2 }}>
            {req.description}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Chip
              label={req.status}
              color={
                req.status === "approved"
                  ? "success"
                  : req.status === "pending"
                  ? "warning"
                  : req.status === "draft"
                  ? "default"
                  : "error"
              }
            />

            {req.status === "draft" && (
              <Button
                variant="contained"
                onClick={() => submitRequisition(req.id)}
              >
                Submit
              </Button>
            )}
          </Stack>
        </Paper>
      ))}
    </DashboardLayout>
  );
}