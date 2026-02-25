import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

// ADMIN
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRequisitions from "./pages/admin/AdminRequisitions";
import Vendors from "./pages/admin/Vendors";
import PurchaseOrders from "./pages/admin/PurchaseOrders";

// STAFF
import CreateRequisition from "./pages/staff/CreateRequisition";
import MyRequisitions from "./pages/staff/MyRequisitions";

// 🔐 Protected Route
function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;
  if (role !== roleRequired) return <Navigate to="/" replace />;

  return children;
}

export default function App({ mode, setMode }) {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard mode={mode} setMode={setMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/requisitions"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminRequisitions mode={mode} setMode={setMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vendors"
          element={
            <ProtectedRoute roleRequired="admin">
              <Vendors mode={mode} setMode={setMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute roleRequired="admin">
              <PurchaseOrders mode={mode} setMode={setMode} />
            </ProtectedRoute>
          }
        />

        {/* ================= STAFF ROUTES ================= */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute roleRequired="staff">
              <CreateRequisition mode={mode} setMode={setMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/my-requisitions"
          element={
            <ProtectedRoute roleRequired="staff">
              <MyRequisitions mode={mode} setMode={setMode} />
            </ProtectedRoute>
          }
        />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}