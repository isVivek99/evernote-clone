
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import { useState } from 'react';
import SidebarItem from '../sidebarItem/SidebarItem';

function Sidebar(props) {

    const { classes, notes, selectednoteIndex } = props;

    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState('');


    const newNoteBtnClick = () => {
        setAddingNote(!addingNote);
        setTitle('');
        console.log("new Note Btn clicked");
    }

    const updateTitle = (value) => {
        setTitle(value);
    }

    const newNote = () => {
        console.log(title);
        setTitle('');
    }
    const selectNote = () => {
        console.log("selevt note");
    }
    const deleteNote = () =>{
        console.log("delete note");
    }

    return (
        <div className={classes.sidebarContainer}>
            <Button
                className={classes.newNoteBtn}
                onClick={newNoteBtnClick}
            >
                {addingNote?"cancel":"newnote"}
            </Button>
            {
                addingNote?(
                    <div>
                        <input type="text"
                            className={classes.newNoteInput}
                            placeholder="Enter note title"
                            value = {title}
                            onChange={(e)=>updateTitle(e.target.value)}
                        />
                        <Button
                        className={classes.newNoteSubmitBtn}
                        onClick={newNote}
                        >
                            SUBMIT
                        </Button>
                    </div>
                ):<div></div>
                
            }
            <List>
            {
                notes.map((note,index)=>{
                    return(
                        <div key={index}>
                            <SidebarItem
                                note={note}
                                index={index}
                                selectednoteIndex={selectednoteIndex}
                                selectNote={selectNote}
                                deleteNote = {deleteNote}
                            >
                            </SidebarItem>
                            <Divider></Divider>
                        </div>
                    )
                })
            }
            </List>
        
        </div>
    )
}

export default withStyles(styles)(Sidebar) ;