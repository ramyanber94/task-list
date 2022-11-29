import { useState, useEffect } from "react";
import CustomAppBar from "./Custom-App-Bar/CustomAppBar";
import SideSlider from "./Side-Slider/SideSlider";
import TaskItems from "./Task-Items/TaskItems";
import { makeStyles } from "@mui/styles";
import CustomDialog from "./Custom-Dialog/CustomDialog";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles(() => {
    return ({
        root: {
            display: "flex"
        },
    })
})

function Home() {
    const [drawerOpen, setDrawerOpen] = useState(isMobile ? false : true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [listName, setListName] = useState('');
    const [lists, setLists] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listDetails, setListDetails] = useState({});
    const [itemValue, setItemValue] = useState('');
    const [itemsList, setItemsList] = useState([]);
    const [selectedList, setSelectedList] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DataBase_URI}getlists`).then((response) => {
            if (response.status === 200) {
                setLists(response.data)
            }
        }).catch((e) => {
            console.log(e);
            setLists([]);
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
        }).catch((e) => {
            console.log(e);
            setLoading(false);
            setDialogOpen(false);
        })
    }
    const handleItemValueSubmit = (listDetail) => (e) => {
        if (e.key === "Enter") {
            const data = {
                name: itemValue,
                list_id: listDetail.id,
                isChecked: 0
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
            }).catch((e) => {
                console.log(e);
                setItemValue('');
            })
        }
    }
    const handleListClick = (l, i) => (e) => {
        setListDetails(l);
        setSelectedList(i);
        axios.get(`${process.env.REACT_APP_DataBase_URI}getitems/${l.id}`).then((response) => {
            setItemsList(response.data);
        }).catch((e) => {
            console.log(e);
            setItemsList([]);
        })
    }

    useEffect(() => {
        if (lists.length !== 0) {
            setListDetails(lists[0]);
            axios.get(`${process.env.REACT_APP_DataBase_URI}getitems/${lists[0].id}`).then((response) => {
                setItemsList(response.data);
            }).catch((e) => {
                console.log(e);
                setItemsList([]);
            })
        }

    }, [lists])

    const handleSaveClick = (value, setIsReadOnly, l) => (e) => {
        setIsReadOnly(prev => !prev);
        const newItem = { ...l };
        newItem.name = value
        axios.put(`${process.env.REACT_APP_DataBase_URI}updateitem/${l.id}`, newItem).then((response) => {
            if (response.data.success === true) {
                const updatedList = itemsList.map((list) => {
                    if (l.id === list.id) {
                        list.name = value;
                    }
                    return list;
                });
                setItemsList(updatedList);
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleDeleteItem = (item) => (e) => {
        axios.delete(`${process.env.REACT_APP_DataBase_URI}delteitem/${item.id}`).then((response) => {
            if (response.data.success === true) {
                const newList = itemsList.filter((i) => i.id !== item.id);
                setItemsList(newList);
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleDeleteList = (l, setAnchorEl) => (e) => {
        axios.delete(`${process.env.REACT_APP_DataBase_URI}deletelist/${l.id}`).then((response) => {
            if (response.data.success === true) {
                const newList = lists.filter((i) => i.id !== l.id);
                setLists(newList);
                setAnchorEl(null);
            }

        }).catch((e) => {
            console.log(e);
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
                selectedIndex={selectedList}
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
                lists={lists}
                handleSaveClick={handleSaveClick}
                handleDeleteItem={handleDeleteItem}
                handleDeleteList={handleDeleteList}
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