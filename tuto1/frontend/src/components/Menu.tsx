import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";

import { GetMenu } from "../types/types";
import { NewMenu } from "../store/slice/menuSlice";
import DialogMenu from "./Dialog";

const Menu = () => {
  const [newMenuObject, setNewMenu] = useState<GetMenu>({ name: "", price: 0 });
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Layout>
      <Box>
        <DialogMenu setOpen={setOpen} open={open} newMenuObject={newMenuObject} setNewMenu = {setNewMenu}/>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Menu
        </Button>
      </Box>
    </Layout>
  );
};

export default Menu;
