import React from 'react';
import {useState, useEffect} from 'react';
import db, {timestamp} from './firebase/firebaseConfig';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';

var noteIndexobj = localStorage.setItem("noteIndex",0);
const App = () =>{

    

    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [noteId, setNoteId] = useState("");
    


    useEffect(()=>{    
        console.log("reorder");
        const unsub = db.collection("notes").orderBy("index", "desc")
            .onSnapshot((snap)=>{
                const notesdb =  snap.docs.map(doc=>{return({...doc.data(),id : doc.id,});})
                setNotes(notesdb);
           ;
            return()=>{
                unsub();
            }
        })
       
    },[])
    
    
    const selectNote = (note, index) => {
        if(note.id){
            setSelectedNote(note);
            setSelectedNoteIndex(index);
            setNoteId(note.id);
        }
    }

 const newNote = async (title,notes) => {
    console.log("update note:",title);

    await db.collection("notes")
    .add({
        title:title,
        body:"",
        updatedAt:timestamp,
        index:localStorage.getItem("noteIndex"),
    })
    localStorage.setItem("noteIndex",parseInt(localStorage.getItem("noteIndex"))+1);
    console.log(localStorage.getItem("noteIndex"));
}

 const deleteNote = async (note) => {
        console.log("inside delete note");
        await setSelectedNote(null);
        db.collection("notes").doc(note.id).delete()
        .catch(error=>console.log(error.message))
        
 }

    return(
        <div className="app-container">
            <Sidebar newNote={newNote} notes={notes} selectedNoteIndex={selectedNoteIndex} noteId={noteId} selectNote={selectNote} deleteNote={deleteNote} />
            {
                selectedNote?
                <Editor selectedNote={selectedNote} 
                notes={notes}  />
                : <div></div>
            }
        </div>
    );

}

export default App;