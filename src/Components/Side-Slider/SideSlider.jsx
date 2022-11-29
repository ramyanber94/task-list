import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { Button, createTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TaskLists from "./TasksList";
import List from "@mui/material/List";

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
    const { open, handleDialogOpen, lists, handleClick, selectedIndex } = props;
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
                margin: '10%',
                height: '7%'
            }}
                className={classes.button}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleDialogOpen}
            >
                New List
            </Button>
            <List>
                {
                    lists.map((l, i) => (
                        <TaskLists l={l} i={i} key={l.id} handleClick={handleClick} selectedIndex={selectedIndex} />
                    ))
                }
            </List>
        </Drawer>
    )
}

export default SideSlider;