import { Box, Button, TextField } from "@mui/material";
import Layout from "./Layout";
import { useState } from "react";
import { useAppDispatch } from "../store/hook";
import { registerUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

interface User{
  email: string
  password: string
}

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [newUser, setNewUser] = useState<User>({ email: "", password: "" });
  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            placeholder="name"
            onChange={(event) =>
              setNewUser({ ...newUser, email: event.target.value })
            }
            sx={{ p: 1 }}
          />
          <TextField
            placeholder="price"
            onChange={(event) =>
              setNewUser({ ...newUser, password: event.target.value })
            }
            sx={{ p: 1 }}
          />
          <Box sx={{ alignItems: "end", p: 1 }}>
            <Button variant="contained" 
            onClick={()=> dispatch(registerUser({...newUser, onSuccess: ()=>{
                navigate("/login")
            }}))}
            >Register</Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Register;
