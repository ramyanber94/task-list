import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const TaskLists = (props) => {
    const { lists, handleClick } = props;

    return (
        <List>
            {
                lists.map((l, i) => (
                    <ListItem key={i} >
                        <ListItemButton onClick={handleClick(l)} sx={{ backgroundColor: 'rgb(241,243,244)', borderRadius: '20%', width: '100%' }}>
                            <ListItemText primary={l.name} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    )
}

export default TaskLists;