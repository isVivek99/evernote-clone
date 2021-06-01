import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import { useState } from "react";
import SidebarItem from "../sidebarItem/SidebarItem";

function Sidebar(props) {
  const {
    classes,
    notes,
    selectedNoteIndex,
    selectNote,
    noteId,
    newNote,
    deleteNote,
  } = props;

  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState("");

  const newNoteBtnClick = () => {
    setAddingNote(!addingNote);
    setTitle("");
    console.log("new Note Btn clicked");
  };

  const updateTitle = (value) => {
    setTitle(value);
  };

  const newNoteSubmitHandler = () => {
    if (title.trim().length < 1) {
      alert(`Title does not accept blank values..`);
      setTitle("");
    } else {
      console.log(title);
      newNote(title);
      setTitle("");
    }
  };
  const selectNoteSidebar = (note, index) => {
    selectNote(note, index);
  };
  const deleteNoteSidebar = (note) => {
    deleteNote(note);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim().length < 1) {
      alert(`Title does not accept blank values..`);
      setTitle("");
    } else {
      console.log("in submit");
      console.log(title);
      newNote(title);
      setTitle("");
    }
  };

  const notesArray = notes.map((note, index) => {
    return (
      <div key={note.id}>
        <SidebarItem
          note={note}
          noteId={noteId}
          index={index}
          selectedNoteIndex={selectedNoteIndex}
          selectNoteSidebar={selectNoteSidebar}
          deleteNoteSidebar={deleteNoteSidebar}
        ></SidebarItem>
        <Divider></Divider>
      </div>
    );
  });

  return (
    <div className={classes.sidebarContainer}>
      <Button className={classes.newNoteBtn} onClick={newNoteBtnClick}>
        {addingNote ? "cancel" : "newnote"}
      </Button>
      {addingNote ? (
        <div>
          <form action="" type="submit" onSubmit={(e) => onSubmitHandler(e)}>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              value={title}
              onChange={(e) => updateTitle(e.target.value)}
            />
            <Button
              className={classes.newNoteSubmitBtn}
              onClick={newNoteSubmitHandler}
            >
              SUBMIT
            </Button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <List>{notesArray}</List>
    </div>
  );
}

export default withStyles(styles)(Sidebar);
