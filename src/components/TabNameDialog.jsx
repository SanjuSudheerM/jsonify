import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { TabNameChangeContext } from "../contexts/tabNameChangeContext";

export function TabNameDialog({ open, setOpen }: props) {
  const { tabName, setTabName } = useContext(TabNameChangeContext);
  const [name, setName] = useState(tabName?.name);
  const handleClose = () => {
    setOpen(false);
    setTabName({ name, id: tabName?.id });
  };

  const getTabName = (e) => {
    setName(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Tab Name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update Tab name, which helps you to easily categorize the items
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Tab Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => getTabName(e)}
          value={name}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
