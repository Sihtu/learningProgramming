import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { GetMenu } from "../types/types";
import { useAppDispatch, useAppSelector } from "../store/hook";

import { NewMenu } from "../store/slice/menuSlice";
import { useState } from "react";
import { openSnackBar } from "../store/slice/AppSnackBarSlice";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  newMenuObject: GetMenu;
  setNewMenu: React.Dispatch<React.SetStateAction<GetMenu>>;
}
const DialogMenu = ({ setOpen, open, newMenuObject, setNewMenu }: Props) => {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.menu);
  const { item } = useAppSelector((state) => state.menu);
  const handleOnClick = () => {
    {
      dispatch(
        NewMenu({ ...newMenuObject, onSuccess: () => {
            dispatch(openSnackBar({type: "success", message: "Menu was created successfully"}))
        } })
      );
    }
  };
  return (
    <Box>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Add New Menu</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder="menu"
              onChange={(event) =>
                setNewMenu({ ...newMenuObject, name: event.target.value })
              }
              sx={{ p: 1 }}
            />
            <TextField
              placeholder="price"
              onChange={(event) =>
                setNewMenu({
                  ...newMenuObject,
                  price: Number(event.target.value),
                })
              }
              sx={{ p: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleOnClick()}>
            {isLoading ? <CircularProgress /> : "Create"}
          </Button>
          
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DialogMenu;
