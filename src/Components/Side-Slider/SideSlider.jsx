import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { Button, createTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TaskLists from "./TasksList";

const drawerWidth = 240;

const useStyles = makeStyles(() => {
    const theme = createTheme();
    return ({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            zIndex: 1000,

        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(1, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: "flex-end"
        },
        button: {

            width: '60%',
            height: '8%',

        }
    })
})

const SideSlider = (props) => {
    const { open, handleDialogOpen, lists, handleClick } = props;
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <div className={classes.drawerHeader}></div>
            <Button sx={{
                borderRadius: '34%',
                margin: '10%'
            }}
                className={classes.button}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleDialogOpen}
            >
                New List
            </Button>
            <TaskLists lists={lists} handleClick={handleClick} />
        </Drawer>
    )
}

export default SideSlider;