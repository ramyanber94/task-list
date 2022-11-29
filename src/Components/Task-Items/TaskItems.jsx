import { useState } from "react";
import { createTheme, IconButton, InputLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import AddIcon from '@mui/icons-material/Add';
import Input from "@mui/material/Input";
import { Stack } from "@mui/system";
import ItemsList from "./ItemsList";
import List from "@mui/material/List";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;
const ariaLabel = { 'aria-label': 'description' };

const useStyles = makeStyles(() => {
    const theme = createTheme();
    return ({
        hide: {
            display: "none"
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginLeft: -drawerWidth
        },
        contentShift: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        }
    })
})

const TaskItems = (props) => {
    const { open, listDetails, value, setValue, handleKeyPress, list, handleSaveClick, handleDeleteItem, handleDeleteList, lists } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const opens = Boolean(anchorEl);
    const classes = useStyles();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open
            })}
        >
            <div style={{ height: '20px' }} />
            {lists.length === 0 ?
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ height: '80px' }} />
                    <h3 style={{ textAlign: 'center' }}>Your List is Empty</h3>
                    <img src="https://ssl.gstatic.com/assistant/shoppinglist/checklist.png" alt="empty list" style={{ height: '33%' }} />
                </div>
                :
                <>
                    <Stack direction={"row"}>
                        <h1>{listDetails.name}</h1>
                        <IconButton size="small" onClick={handleClick} sx={{ position: 'relative', left: '91%' }}>
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={opens}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleDeleteList(listDetails, setAnchorEl)}>Delete list</MenuItem>
                        </Menu>
                    </Stack>
                    <Stack direction={"row"}>
                        <InputLabel><AddIcon /></InputLabel>
                        <Input placeholder="Add Item" value={value} onChange={handleChange} inputProps={ariaLabel} fullWidth onKeyPress={handleKeyPress(listDetails)} />
                    </Stack>
                    {list.length === 0 ?
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <div style={{ height: '50px' }} />
                            <img src="https://ssl.gstatic.com/assistant/shoppinglist/cat_in_the_box.png" alt="empty items" style={{ height: '150px' }} />
                            <h3>Your Item list is empty</h3>
                        </div>
                        :
                        <List>
                            {list.map((l, i) => (
                                <ItemsList key={l.id} l={l} i={i} handleSaveClick={handleSaveClick} handleDeleteItem={handleDeleteItem} />
                            ))}
                        </List>
                    }
                </>
            }
        </main>
    )
}

export default TaskItems;