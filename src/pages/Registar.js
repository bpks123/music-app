import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registar() {
  const navigate=useNavigate()
  const [getData,setData]=useState({
    name:'',
    email:'',
    password:'',
    appType:'music',
  })
  const onChangeHandler=(event)=>{
    setData({...getData,[event.target.name]:event.target.value})
    // console.log(getData)
  }
  const onSubmitHandler= async(e)=>{
      e.preventDefault();
      if(getData.email.endsWith('@gmail.com')){
        try{
          let response=await fetch('https://academics.newtonschool.co/api/v1/user/signup',{
          method:'POST',
          headers:{
            projectId:'l2uaz7omaxbe',
            "Content-Type":"application/json"
          },
          body:JSON.stringify({...getData})
        })
        if(response.status===403){
          alert("Users already exits!!! Please Login to continue...")
        }
        if(response.status===400){
          alert("Invalid input data. Please provide a valid email")
        }
        if(response.status===201){
          let result=await response.json()
          console.log(result)
          console.log(result.data)
          alert('Sing up succefully')
          setTimeout(()=>{
          navigate("/login")
        },2000)
        }
          
        }
        catch(error){
          alert("Register Failed!! Try again...")
        }
      }else{
        alert("Please Enter valid Email")
      }
      
    }
  return (
    <>
    <div className='register-container'>
      <div className='row'>
        <div className='col-4'>

        </div>
        <div className='col-4'>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" required value={getData.name} onChange={onChangeHandler} className="form-control" name="name" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" required value={getData.email} onChange={onChangeHandler} className="form-control" name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input type="password" required value={getData.password} onChange={onChangeHandler} className="form-control" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Registar</button>
        </form>
        </div>
        <div className='col-4'>
        </div>
      </div>
      
    </div>
    </>
  )
}
