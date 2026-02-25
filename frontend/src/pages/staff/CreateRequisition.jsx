import { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Stack
} from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";

const CreateRequisition = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createRequisition = async () => {
    await axios.post(
      "http://127.0.0.1:8000/requisitions/",
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    setTitle("");
    setDescription("");
    alert("Requisition Created (Draft)");
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Create Requisition
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 500 }}>
        <Stack spacing={3}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={createRequisition}
          >
            Create
          </Button>
        </Stack>
      </Paper>
    </DashboardLayout>
  );
};

export default CreateRequisition;