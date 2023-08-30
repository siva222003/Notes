import React from 'react'
import { useState , useContext} from 'react'
import NoteContext from '../context/noteContext';
function AddItem() {
  const {AddNote} = useContext(NoteContext);
  const [newNote , setNewNote] = useState({title : "" , description : "" , tag : ""});
  const handleSubmit = (e)=>
  {
    e.preventDefault();
    AddNote(newNote);
  }
  const onChange = (e)=>
  {
      setNewNote({...newNote,  [e.target.name] : e.target.value });
  }
  return (
    <div className='container'>
      <form action=""  onSubmit={handleSubmit}>
      <div className="mb-3">
  <label htmlFor="title" className="form-label" >Title</label>
  <input onChange={onChange}  type="text" className="form-control" id="title" name='title' placeholder="Title"/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label" >Description</label>
  <textarea onChange={onChange} className="form-control" id="description" name='description' rows="3" placeholder='Description'></textarea>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input  onChange={onChange} type="text" className="form-control" id="tag" name='tag' placeholder="tag"/>
</div>
<button className='btn btn-primary' type='submit'>Add Note</button>
 
      </form>
      </div>
  )
}

export default AddItem