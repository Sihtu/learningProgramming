import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const key = localStorage.getItem("key")
  const navigate = useNavigate()
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {key && <Button color="inherit"
            onClick={() => {
              localStorage.removeItem("key");
              navigate("/login")
            }}>logout</Button>}

            {!key && <Button variant = "contained"
            >Register</Button>}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default TopBar;
