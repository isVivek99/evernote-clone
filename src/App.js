import React from 'react';
import {useState, useEffect} from 'react';
import db from './firebase/firebaseConfig';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';

const App = () =>{

    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        const unsub = db.collection("notes")
            .onSnapshot((snap)=>{
                setNotes(
                    snap.docs.map(doc=>{
                        const data = doc.data();
                        data.id = doc.id;
                        return data;
                    })
                )
            
            });

            return()=>{
                unsub();
            }
       
    },[])

    useEffect(()=>{
        console.log(notes);
    },[notes])
    
    
    return(
        <div className="app-container">
            <Sidebar notes={notes} selectedNoteIndex={selectedNoteIndex} />
            <Editor/>
        </div>
    );

}

export default App;