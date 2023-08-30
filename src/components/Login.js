import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate()
    const [loginData,setData] = useState({email : "",password : ""});
     //Login a User
     const userLogin = async (userData)=>
     {
       try{
         const result = await fetch('http://localhost:5000/api/v1/auth/userLogin',{
           method : "POST",
           headers : {
             "Content-Type" : "application/json"
           },
           body : JSON.stringify(userData) 
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
         e.preventDefault()
         userLogin(loginData)
    }
    const onChange = (e)=>
    {
        setData({...loginData,[e.target.name] : e.target.value});
    }
    const {email,password} = loginData;
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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
  )
}

export default Login
