

import Note from './componentes/Note'
import { useState,useEffect } from 'react'
//import axios from 'axios'
import notaService from './servicies/note'
import Notificacion from './componentes/Notificacion'
import Footer from './componentes/Footer'

const App = ()=>{
  const [notes, setNotes] = useState([])
  const [newNote,setNewNote] = useState("add new note")
  const [showAll, setShowAll] = useState(true)
  const [errorMsj, setErrorMsj] = useState(null)

  useEffect(()=>{
    console.log("effect")
    notaService
      .getAll('http://localhost:3001/notes')
      .then(valorNota=>{
        console.log('promesa resuelta')
        setNotes(valorNota)
      })
  },[])
  console.log("render", notes.length,' notas')

  const addNote = (event)=>{
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random()<0.5,
    }
    notaService.create(noteObject)
    .then(valorNota=>{
      console.log(valorNota);
      setNotes(notes.concat(valorNota))
      setNewNote('')
    })
  }
  const handleNoteChange = (event)=>{
    setNewNote(event.target.value)
  }

  const alternarImportacia = (id)=>{
    console.log("la importancia de la nota con id ",id, " fue alternada")
    const note = notes.find((n)=> n.id===id)
    const notaCambiada = {...note, important:!note.important} 
    console.log(notaCambiada)
    notaService.update(id,notaCambiada).then(valorNota=>{
      console.log("estoy actalizando nota")
      setNotes(notes.map(nota=> nota.id !==id? nota:valorNota))
    }).catch(()=>{
      setErrorMsj(`la nota: ${note.content} fue eliminada del servidor`)
      setTimeout(() => {
        setErrorMsj(null)
      },5000);
      setNotes(notes.filter(nota=>nota.id !==id))
    })      
  }
  

  console.log("estoy en el arreglo a mostrar de notas")
  const noteToShow = showAll? notes: notes.filter((nota)=>nota.important ===true)

  return(
    <div>
      <h1>Notas</h1>
      <Notificacion msj ={errorMsj}/>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show: {showAll?'importantes':'todas'}
        </button>

      </div>
      <ul>
        {noteToShow.map(note=><Note key={note.id} note={note} alternarImportacia={()=>{
          alternarImportacia(note.id)
        }}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App
