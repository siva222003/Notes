import React, { useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate()
  const [userData,setUserData] = useState({userName : "",email : "",password : ""});
   //SignUp a User

   const SignUp =  async (userData)=>
   {
     try{
       const {userName,email,password} = userData;
       const data = {name : userName,email,password};
       const result = await fetch('http://localhost:5000/api/v1/auth/createUser',{
         method : "POST",
         headers : {
           "Content-Type" : "application/json"
         },
         body : JSON.stringify(data)
       });
       const response = await result.json();
       localStorage.setItem('token', response.token);
       navigate('/home');
     }catch(err){
       console.log(err.message);
     } 
   }
  const handleSubmit = (e)=>
  {
    e.preventDefault();
      SignUp(userData);
  }
  const onChange = (e)=>
  {
     setUserData({...userData,[e.target.name] : e.target.value}) ;
  }
  const {userName,email,password} = userData;
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="form-group my-3">
    <label htmlFor="userName">Name</label>
    <input type="text" value={userName} className="form-control" id="userName" name="userName" aria-describedby="emailHelp" placeholder="Enter Name" onChange={onChange}/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="email">Email address</label>
    <input type="email" value={email} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group my-3">
    <label htmlFor="password">Password</label>
    <input type="password" value={password} className="form-control" id="password" placeholder="Password" name="password" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  );
}

export default SignUp;
