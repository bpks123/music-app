import React, {useState}from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useStateProvider} from '../Utils/StateProvider'
export default function Login() {
  const [{token,userName},dispatch]=useStateProvider();
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
    try{
      let response= await fetch("https://academics.newtonschool.co/api/v1/user/login",{
        method:'POST',
        headers:{
          projectId:'l2uaz7omaxbe',
          "Content-Type":"application/json"
        },
        body:JSON.stringify({...getData})
      })
      console.log(response)
      if(response.status===200){
        let result=await response.json()
        console.log(result)
        // console.log(result.token)
        const usertoken=result.token
        const accountName=result.data.name
        const accountEmail=result.data.email
        console.log(token)
        console.log(userName)
        dispatch({type:'SET_TOKEN',payload:usertoken})
        dispatch({type:'SET_NAME',payload:accountName})
        dispatch({type:'SET_EMAIL',payload:accountEmail})
        navigate("/")
        alert('Sing in succefully')
        sessionStorage.setItem('token', usertoken)
        sessionStorage.setItem('userName',accountName)
        sessionStorage.setItem('userEmail',accountEmail)
      }
      else{
        let result= await response.json()
        const message=result.message
        alert(message)
      }
    }
    catch(error){
      alert(error)
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
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" required value={getData.email} onChange={onChangeHandler} className="form-control" name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input type="password" required value={getData.password} onChange={onChangeHandler} className="form-control" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div>Don't have an account?</div>
        <button type="submit" className="btn btn-primary"><Link to="/register">Register</Link></button>
        </div>

        
      </div>
      
    </div>
    </>

  )
}
