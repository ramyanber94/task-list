import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ItemsList = (props) => {
    const { l, i } = props;
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [value, setValue] = useState(l.name);

    const handleEditClick = () => {
        setIsReadOnly(prev => !prev)
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (

        <ListItem key={i}>
            <ListItemButton>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={'text'}
                    fullWidth
                    value={value}
                    inputProps={
                        { readOnly: isReadOnly }
                    }
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleEditClick}
                                edge="end"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="toggle password visibility"
                                // onClick={handleClickShowPassword}
                                edge="end"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </ListItemButton>
        </ListItem>

    )
}

export default ItemsList;