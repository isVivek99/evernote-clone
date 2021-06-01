import React from 'react';
import {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles'
import styles from "./styles";
import  useDebounce  from '../Helper';
import db, {timestamp} from '../firebase/firebaseConfig';




function Editor(props) {

    const { classes, selectedNote,} = props;

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    
    useEffect( ()=>{
        async function update(){
            await setText(selectedNote.body);
            await setTitle(selectedNote.title);
            await setId(selectedNote.id);
        }
        update();
    },[selectedNote, title,])

   const updateBodyDebounce = useDebounce(text, 1500);

   useEffect(()=>{
       console.log("updateBodyDebounce:",updateBodyDebounce);
       console.log("titleInuE2_E:",title);
       console.log("id:",id);
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

    const updateBody = async (val)=>{
        await setText(val);
    }
    const updateTitle = async (val) => {
        await setTitle(val);
    }
    
    return (
        <div className={classes.editorContainer}>
            <BorderColorIcon className ={classes.editIcon}></BorderColorIcon>
              <input type="text"
              className={classes.titleInput}
              placeholder="Note title..."
              value={title? title:""}
              onChange={e=>{updateTitle(e.target.value)}}
              />  
            <ReactQuill
                theme="snow"
                value={text || ''}
                onChange={updateBody}
            >
            </ReactQuill>
        </div>
    )
}

export default withStyles(styles)(Editor);
