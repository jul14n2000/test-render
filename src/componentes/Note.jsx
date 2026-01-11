const Note = ({note,alternarImportacia}) =>{
  const label = note.important? 'hacerla no importante':'hacerla importante'
  return(
    <li className="note">{note.content}
    <button onClick={alternarImportacia}>{label}</button>
    </li>
  )
}
export default Note