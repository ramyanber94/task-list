import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import axios from "axios";


const ItemsList = (props) => {
    const { l, handleSaveClick, handleDeleteItem } = props;
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [checked, setChecked] = useState([0]);
    const [value, setValue] = useState(l.name);

    const handleEditClick = () => {
        setIsReadOnly(prev => !prev)
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleToggle = (value, l) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
            l.isChecked = 1;
            axios.put(`${process.env.REACT_APP_DataBase_URI}updateitem/${l.id}`, l).then((response) => {
                if (response.data.success === true) {
                    console.log(response)
                }
            }).catch((e) => {
                console.log(e);
            })
        } else {
            newChecked.splice(currentIndex, 1);
            l.isChecked = 0;
            axios.put(`${process.env.REACT_APP_DataBase_URI}updateitem/${l.id}`, l).then((response) => {
                if (response.data.success === true) {
                    console.log(response)
                }
            }).catch((e) => {
                console.log(e);
            })
        }
        setChecked(newChecked);
    };

    return (
        <div>
            <ListItem
                key={l.id}
                secondaryAction={
                    <div>
                        {isReadOnly ?
                            <IconButton
                                aria-label="edit item"
                                onClick={handleEditClick}
                                edge="end"
                            >
                                <EditIcon />
                            </IconButton>
                            :
                            <IconButton
                                aria-label="save item"
                                onClick={handleSaveClick(value, setIsReadOnly, l)}
                                edge="end"
                            >
                                <CheckIcon />
                            </IconButton>
                        }
                        <IconButton
                            aria-label="delete item"
                            onClick={handleDeleteItem(l)}
                            edge="end"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                }
                disablePadding
            >
                <ListItemButton role={undefined} dense>
                    <ListItemIcon onClick={handleToggle(value, l)}>
                        <Checkbox
                            edge="start"
                            checked={l.isChecked === 1 ? true : false}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': l.id }}
                        />
                    </ListItemIcon>
                    {isReadOnly ?
                        <ListItemText id={l.id} primary={l.isChecked === 0 ? l.name : <del>{l.name}</del>} />
                        :
                        <TextField id="standard-basic" value={value} onChange={handleChange} variant="standard" sx={{ width: '90%' }} />
                    }

                </ListItemButton>
            </ListItem>
        </div>

    )
}

export default ItemsList;