import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

const menuItem = [
  { id: 1, name: "menu", to: "/menu", icon: <LocalDiningIcon /> },
  { id: 2, name: "menuCatagory", to: "/menuCatagory", icon: <MenuBookIcon /> },
];
const SideBar = () => {
  return (
    <Box sx={{ bgcolor: "yellow", height: "100vh", width: 260 }}>
      <List>
        {menuItem.map((item) => (
          <Link key={item.id} to={item.to} style={{textDecoration: "none"}}>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        <Link to={"/setting"} style={{textDecoration: "none"}}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Setting"} />
          </ListItemButton>
        </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default SideBar;
