import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/noteContext';
function NoteItem(props) {
  const {DeleteNote} = useContext(NoteContext);
  const {note,handleUpdate} = props;
  const {title,description,tag} = note;
  const handleDelete = () =>
  {
    DeleteNote(note._id);
  }
   return (
    <div className='container my-3'>
      <div className="card">
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <h6 className="card-subtitle mb-2 text-muted">{tag}</h6>
    <div>
    <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
    <button className='btn btn-success  mx-2' onClick={()=> {handleUpdate(note)}} >Edit</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default NoteItem
