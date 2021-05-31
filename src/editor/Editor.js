import React from 'react';
import {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles'
import styles from "./styles";
import  useDebounce  from '../Helper';
import db, {timestamp} from '../firebase/firebaseConfig';



function Editor(props) {

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');

    const { classes, selectedNote,} = props;
    
    useEffect( ()=>{
        console.log("selectedNote:",selectedNote);
        setText(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);
        console.log("titleInEditor:",title);
    },[selectedNote, title])

   const updateBodyDebounce = useDebounce(text, 1500);

   useEffect(()=>{
       console.log("updateBodyDebounce:",updateBodyDebounce);
       console.log("titleInEditor:",title);
        if(updateBodyDebounce){
            db.collection("notes")
            .doc(selectedNote.id)
            .update({
                title:title,
                body:text,
                createdAt:timestamp,
            })
        }
   },[updateBodyDebounce])

    const updateBody = (val)=>{
        setText(val);
    }
    
    
    return (
        <div className={classes.editorContainer}>
            <ReactQuill
                value={text || ''}
                onChange={updateBody}
            >
            </ReactQuill>
        </div>
    )
}

export default withStyles(styles)(Editor);
