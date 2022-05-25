import React, { useEffect, useState } from "react";
import axios from 'axios'
import Note from "./componentes/Note";


const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3001/api/notes').then(res => {
      setNotes(res.data)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))//enviamos nueva nota al estado del componente
    setNewNote('')//Limpiamos el input
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'All'}
        </button>
      </div>
      <div>
        <ul>
          {notesToShow.map(note => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} on onChange={handleNoteChange}></input>
          <button type="submit">save</button>
        </form>
      </div>
    </div>
  )
}

export default App