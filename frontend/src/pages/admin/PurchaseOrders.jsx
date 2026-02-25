import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Box,
  Chip,
  Stack
} from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";

const statusColor = (status) => {
  switch (status) {
    case "created":
      return "warning";
    default:
      return "default";
  }
};

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/purchase-orders/all",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    setOrders(res.data);
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Purchase Orders
      </Typography>

      <Paper sx={{ p: 4 }}>
        {orders.length === 0 ? (
          <Typography>No Purchase Orders Available</Typography>
        ) : (
          orders.map((order) => (
            <Box key={order.id} sx={{ mb: 3 }}>
              <Typography>
                Requisition ID: {String(order.requisition_id).slice(0, 8)}...
              </Typography>
              <Typography>
                Vendor ID: {String(order.vendor_id).slice(0, 8)}...
              </Typography>
              <Typography>
                Created: {new Date(order.created_at).toLocaleString()}
              </Typography>

              <Chip
                label={order.status.toUpperCase()}
                color={statusColor(order.status)}
              />
            </Box>
          ))
        )}
      </Paper>
    </DashboardLayout>
  );
};

export default PurchaseOrders;