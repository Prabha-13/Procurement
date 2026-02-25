import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Button,
  Stack,
  Chip,
  Box
} from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";

const cardStyle = {
  p: 3,
  borderRadius: 4,
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
  }
};

const Requisitions = () => {
  const [requisitions, setRequisitions] = useState([]);

  useEffect(() => {
    fetchRequisitions();
  }, []);

  const fetchRequisitions = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/requisitions/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log("Requisitions:", res.data);
      setRequisitions(res.data);

    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const approve = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/requisitions/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      fetchRequisitions();
    } catch (err) {
      console.error("Approve Error:", err);
    }
  };

  const reject = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/requisitions/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      fetchRequisitions();
    } catch (err) {
      console.error("Reject Error:", err);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Requisition Approvals
        </Typography>

        {requisitions.length === 0 ? (
          <Typography>No Requisitions Found</Typography>
        ) : (
          requisitions.map((req) => (
            <Paper key={req.id} sx={{ ...cardStyle, mb: 3 }}>
              <Typography variant="h6">{req.title}</Typography>
              <Typography sx={{ mb: 2 }}>{req.description}</Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={req.status}
                  color={
                    req.status === "approved"
                      ? "success"
                      : req.status === "rejected"
                      ? "error"
                      : "warning"
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
          ))
        )}
      </Box>
    </DashboardLayout>
  );
};

export default Requisitions;