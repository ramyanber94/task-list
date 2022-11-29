import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const TaskLists = (props) => {
    const { l, i, handleClick, selectedIndex } = props;

    return (
        <ListItem key={l.id} >
            <ListItemButton selected={selectedIndex === i} onClick={handleClick(l, i)} sx={{ backgroundColor: 'rgb(241,243,244)', borderRadius: '20%', width: '100%' }}>
                <ListItemText primary={l.name} />
            </ListItemButton>
        </ListItem>
    )
}

export default TaskLists;