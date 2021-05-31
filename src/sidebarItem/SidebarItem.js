import React,{useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../Helper';

function SidebarItem({note, index, classes, deleteNote, selectNoteSidebar, noteId,deleteNoteSidebar}) {


    const selectNoteHandler = (note, index) => {
        selectNoteSidebar(note, index);
    }
    const deleteNoteHandler = (note, index) => {

        if(window.confirm(`Are you sure you want to delete ${note.title}`)){
            deleteNoteSidebar(note);
        }
    }
  

    return (
        <div>
        
            <ListItem
                className={classes.ListItem}
                selected = {noteId === note.id}
                alignItems="flex-start">
            <div
                className={classes.textSection}
                onClick={()=>selectNoteHandler(note)}>
                <ListItemText
                        primary={note.title}
                        secondary={removeHTMLTags(note.body.substring(0,30))+"..."}> 
                </ListItemText>
            
            </div>
            <DeleteIcon
                className={classes.deleteIcon}
                onClick={()=>deleteNoteHandler(note, index)}>
            </DeleteIcon>
                
            </ListItem>                  
        </div>
    )
}

export default withStyles(styles)(SidebarItem) ;
