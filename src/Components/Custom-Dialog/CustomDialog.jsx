import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

const CustomDialog = (props) => {
    const { handleClose, open, listName, setListName, handleCreate } = props;

    const handleTextChange = (e) => {
        setListName(e.target.value);
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true}>
            <DialogTitle>New list</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="name"
                    label="List name"
                    fullWidth
                    variant="filled"
                    value={listName}
                    onChange={handleTextChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} >Cancel</Button>
                <Button onClick={handleCreate} disabled={listName === "" ? true : false}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog;