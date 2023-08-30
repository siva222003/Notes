import React ,{useState} from 'react'
import NoteContext from './noteContext'

function NoteState(props) {


  const [progress,setProgress] = useState(0);
  const [notes,setNotes] = useState([]);
  //Get Every Note
  const fetchAllNotes = async ()=>
  {
    try{
       setProgress(20)
      const result = await fetch('http://localhost:5000/api/v1/notes/getAllNotes',{
        method : "GET",
        headers : {
          auth :  localStorage.getItem('token') 
        }
        });
        setProgress(60)
      const response = await result.json();
      setProgress(100)
      setNotes(response);
    }catch(err){
      console.log(err.message);
    }
  }
  //Add a Note
  const AddNote = async (note)=>
  {
       try{
        const {title , description , tag} = note;
        const data = {title , description , tag} ; 
        const result = await fetch('http://localhost:5000/api/v1/notes/addNewNote',{
         method : "POST",
         headers :{
           "Content-Type" : "application/json",
           auth :  localStorage.getItem('token')
         },
         body: JSON.stringify(data)
        })
        const response = await result.json();
         setNotes([...notes,response]);
       }catch(err){
        console.log(err.message);
       }  
  }
  //Delete a Note
  const DeleteNote = async (id)=>
  {
       try{
        setNotes(notes.filter((e)=>
        {
            if(e._id!==id) return e;
        }))
        const result = await fetch(`http://localhost:5000/api/v1/notes/deleteNote/${id}`,{
         method : "DELETE",
         headers :{
           "Content-Type" : "application/json",
           auth :  localStorage.getItem('token')
         }
        })    
       }catch(err){
        console.log(err.message);
       }  
  }
  //Update a Note
  const UpdateNote = async (note)=>
  {
    try{
      const id = note._id;
    setNotes(notes.map((e)=>
    {
        if(e._id===id)
        return note
        else
        return e
    }))
      const result = await fetch(`http://localhost:5000/api/v1/notes/updateNote/${id}`,{
        method : "PUT",
        headers :{
          "Content-Type" : "application/json",
          auth : localStorage.getItem('token')
        },
        body : JSON.stringify(note)
       })    
    }catch(err){
      console.log(err.message);
    }
  }
  return (
   <NoteContext.Provider value={{notes,fetchAllNotes,AddNote,DeleteNote,UpdateNote}}>
    {props.children}
   </NoteContext.Provider>
  )
}

export default NoteState
