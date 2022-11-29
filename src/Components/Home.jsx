import { useState, useEffect } from "react";
import CustomAppBar from "./Custom-App-Bar/CustomAppBar";
import SideSlider from "./Side-Slider/SideSlider";
import TaskItems from "./Task-Items/TaskItems";
import { makeStyles } from "@mui/styles";
import CustomDialog from "./Custom-Dialog/CustomDialog";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const useStyles = makeStyles(() => {
    return ({
        root: {
            display: "flex"
        },
    })
})

function Home() {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [listName, setListName] = useState('');
    const [lists, setLists] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listDetails, setListDetails] = useState({});
    const [itemValue, setItemValue] = useState('');
    const [itemsList, setItemsList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DataBase_URI}getlists`).then((response) => {
            if (response.status === 200) {
                setLists(response.data)
            }
        })
    }, [fetch])

    const toggleDrawer = () => {
        setDrawerOpen(prev => !!!prev);
    };
    const handleDialogOpen = () => {
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleCreateList = () => {
        setLoading(true);
        const data = {
            'name': listName
        }
        axios.post(`${process.env.REACT_APP_DataBase_URI}addlist`, data).then((response) => {
            if (response.data.success === true) {
                setFetch(prev => !prev);
                setLoading(false);
                setDialogOpen(false);
            } else {
                setLoading(false);
                setDialogOpen(false);
            }
        })
    }
    const handleItemValueSubmit = (listDetail) => (e) => {
        if (e.key === "Enter") {
            const data = {
                name: itemValue,
                list_id: listDetail.id
            }
            axios.post(`${process.env.REACT_APP_DataBase_URI}additem`, data).then((response) => {
                if (response.data.success === true) {
                    axios.get(`${process.env.REACT_APP_DataBase_URI}getitems/${listDetail.id}`).then((response) => {
                        setItemsList(response.data);
                        setItemValue('');
                    })
                } else {
                    setItemValue('');
                }

            })
        }
    }
    const handleListClick = (l) => (e) => {
        setListDetails(l)
        axios.get(`${process.env.REACT_APP_DataBase_URI}getitems/${l.id}`).then((response) => {
            setItemsList(response.data);
        })
    }

    return (
        <div className={classes.root}>
            <CustomAppBar
                handleToggleDrawer={toggleDrawer}
                open={drawerOpen}
            />
            <SideSlider
                open={drawerOpen}
                handleDialogOpen={handleDialogOpen}
                lists={lists}
                setListDetails={setListDetails}
                handleClick={handleListClick}
            />
            {loading &&
                <Box sx={{ display: 'flex', position: 'absolute', top: '50%', bottom: '30%' }}>
                    <CircularProgress />
                </Box>
            }
            <TaskItems
                open={drawerOpen}
                listDetails={listDetails}
                value={itemValue}
                setValue={setItemValue}
                handleKeyPress={handleItemValueSubmit}
                list={itemsList}
            />
            <CustomDialog
                open={dialogOpen}
                handleClose={handleDialogClose}
                listName={listName}
                setListName={setListName}
                handleCreate={handleCreateList}
            />
        </div>
    )
}

export default Home;