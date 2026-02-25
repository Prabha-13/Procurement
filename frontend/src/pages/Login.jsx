import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("grant_type", "password"); // 🔥 Required for OAuth2
      params.append("username", email);
      params.append("password", password);

      const res = await axios.post(
        "http://127.0.0.1:8000/login",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      const role = res.data.role.toLowerCase();

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/staff", { replace: true });
      }

    } catch (err) {
      console.log(err.response?.data);
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(-45deg,#0f172a,#1e293b,#7c3aed,#06b6d4)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 15s ease infinite",
        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      }}
    >
      <Paper elevation={12} sx={{ p: 5, width: 380, borderRadius: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", fontWeight: 600 }}
        >
          Procurement System
        </Typography>

        <TextField
          label="Email"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          onClick={handleLogin}
          sx={{
            py: 1.2,
            fontWeight: 600,
            letterSpacing: 1
          }}
        >
          {loading ? <CircularProgress size={24} /> : "LOGIN"}
        </Button>
      </Paper>
    </Box>
  );
}