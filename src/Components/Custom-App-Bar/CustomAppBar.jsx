import React from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme } from "@mui/material";

const useStyles = makeStyles(() => {
    const theme = createTheme();
    return ({
        root: {
            display: "flex"
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            // marginLeft: drawerWidth,
            // width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: theme.spacing(2)
        }
    })
});

const CustomAppBar = (props) => {
    const { open, handleToggleDrawer } = props;
    const classes = useStyles();

    return (

        <AppBar
            position="fixed"
            color="inherit"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleToggleDrawer}
                    edge="start"
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Shopping List
                </Typography>
            </Toolbar>
        </AppBar>

    );
}

export default CustomAppBar;
