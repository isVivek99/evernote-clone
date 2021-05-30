import React from 'react';
import {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles'
import styles from "./styles";
import  debounce  from '../Helper';


function Editor(props) {

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');

    const { classes } = props;
    

    const updateBody = async (val)=>{
        console.log(val);
        await setText(val);
        update();
    }
    const update = debounce(()=>{
        console.log("updating...");
    }, 3000);

    return (
        <div className={classes.editorContainer}>
            Hello from the editor!
            <ReactQuill
                value={text}
                onChange={updateBody}
            >
            </ReactQuill>
        </div>
    )
}

export default withStyles(styles)(Editor);
