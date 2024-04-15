import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { ReactNode } from "react";
import AppSnackBar from "./AppSnackBar";

interface Props {
  children?: ReactNode;
}
const Layout = ({ children }: Props) => {
  const key = localStorage.getItem("key")
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex" }}>
        {key && <SideBar />}
        <Box sx={{ p: 2 }}>{children}</Box>
      </Box>
      <AppSnackBar/>
    </Box>
  );
};

export default Layout;
