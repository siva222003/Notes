import React,  {useContext, useEffect} from 'react'
import { useNavigate} from "react-router-dom";
import AddItem from './AddItem';
import Note from './Note';
function Home(props) {
  const navigate = useNavigate();
  const {prog} = props;
  useEffect(() => {
    const
    token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  },[localStorage.getItem('token')]);
  return (
      <div>
      <AddItem/>
      {prog(40)}
      <Note/>
      {prog(100)}
    </div>
  )
}

export default Home
