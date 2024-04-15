import { Box, Button, TextField } from "@mui/material";
import Layout from "./Layout";
import { useState } from "react";
import { useAppDispatch } from "../store/hook";
import { loginUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>({ email: "", password: "" });
  return (
    <Layout>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            placeholder="email"
            sx={{ p: 1 }}
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
          />
          <TextField
            placeholder="password"
            sx={{ p: 1 }}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
          />
          <Box sx={{ alignItems: "end", p: 1 }}>
            <Button
              variant="contained"
              onClick={() =>dispatch(
                loginUser({
                  ...user,
                  onSuccess: () => {
                    navigate("/");
                  },
                })
              )}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
