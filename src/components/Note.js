import { useContext, useEffect } from "react";
import { useRef ,useState} from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../context/noteContext";

function Note() {
  const [editNote,setEditNote] = useState({title : "",description : "",tag : ""});
  const modalBut = useRef(null);
  const closeBut = useRef(null);
  const context = useContext(NoteContext);
  const { notes, fetchAllNotes ,UpdateNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      fetchAllNotes();
    }
  }, []);
  const handleUpdate = (note) => {
    // console.log(modalBut.current)
    modalBut.current.click();
    setEditNote(note);
  };
  const handleSubmit = (e)=>
  {
    e.preventDefault();
    closeBut.current.click();
    UpdateNote(editNote);  
  }
  const onChange = (e)=>{
      setEditNote({...editNote,[e.target.name] : e.target.value})
  }
  const {title , description ,tag} = editNote;
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
        ref={modalBut}
      >
        Launch demo modal
      </button>

      
      <div

        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Notes
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className='container'>
      <form action=""  onSubmit={handleSubmit}>
      <div className="mb-3">
  <label htmlFor="title" className="form-label" >Title</label>
  <input onChange={onChange} value={title} type="text" className="form-control" id="title" name='title' placeholder="Title"/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label" >Description</label>
  <textarea value={description} onChange={onChange} className="form-control" id="description" name='description' rows="3" placeholder='Description'></textarea>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input value={tag} onChange={onChange} type="text" className="form-control" id="tag" name='tag' placeholder="tag"/ >
</div>
<div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeBut}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
 
      </form>
      </div>
            </div>
          
          </div>
        </div>
      </div>



      <h1 className="text-center">Your Notes</h1>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} handleUpdate={handleUpdate}/>;
      })}
    </div>
  );
}

export default Note;
