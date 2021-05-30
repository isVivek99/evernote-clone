import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../Helper';

function SidebarItem({notes, index, selectNoteIndex, classes}) {




    return (
        <div key={index}>
            <ListItem>
                SidebarItem  
            </ListItem>                
        </div>
    )
}

export default SidebarItem
