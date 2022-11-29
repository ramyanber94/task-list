import { createTheme, InputLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import AddIcon from '@mui/icons-material/Add';
import Input from "@mui/material/Input";
import { Stack } from "@mui/system";
import ItemsList from "./ItemsList";
import List from "@mui/material/List";

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
    const { open, listDetails, value, setValue, handleKeyPress, list } = props;
    const classes = useStyles();

    const handleChange = (e) => {
        setValue(e.target.value);
    }



    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open
            })}
        >
            <div style={{ height: '20px' }} />
            <h1>{listDetails.name}</h1>
            <Stack direction={"row"}>
                <InputLabel><AddIcon /></InputLabel>
                <Input placeholder="Add Item" value={value} onChange={handleChange} inputProps={ariaLabel} fullWidth onKeyPress={handleKeyPress(listDetails)} />
            </Stack>
            <List>
                {list.map((l, i) => (
                    <ItemsList l={l} i={i} />
                ))}
            </List>
        </main>
    )
}

export default TaskItems;