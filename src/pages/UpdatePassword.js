import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useStateProvider} from '../Utils/StateProvider'

export default function UpdatePassword() {
    const [{token,istoggle,userName,userEmail},dispatch]=useStateProvider();
    const navigate=useNavigate()
    const [getHeight,setHeight]=useState(window.innerHeight)

    const [getData,setData]=useState({
        name:userName?userName:'',
        email:userEmail?userEmail:'',
        passwordCurrent:'',
        password:'',
        appType:'music',
      })

    async function updatePassord(){
        try{
            let response =await fetch('https://academics.newtonschool.co/api/v1/user/updateMyPassword',{
                method:'PATCH',
                headers: {
                    projectID: 'l2uaz7omaxbe',
                    Authorization: `Bearer ${token}`,//we give this to understand backend I am loggedin.
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...getData})
            })
            if(response.status==200){
            let result=await response.json()
                console.log(result)
                console.log("changed")
                sessionStorage.setItem('token', result.token)
                dispatch({type:'SET_TOKEN',payload:result.token})
                navigate("/")
                alert("Password update Successfully!")
            }
            else{
                console.log('error')
            }
        }
        catch(error){
            alert(error)
        }
        
    }  
    const onChangeHandler=(event)=>{
        setData({...getData,[event.target.name]:event.target.value})
        // console.log(getData)
    }  
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        console.log(getData)
        updatePassord()
    }
  return (
    <>
      <div className={`${istoggle?'register-container-toggle':'register-container'} `} style={{minHeight:getHeight+'px'}}>
        <div className='row'>
            <div className='col-4'>

            </div>
            <div className='col-4'>
                <h3>Update Password:</h3>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3">
                        <input type="text" className="form-control" value={getData.name} name="name" disabled aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <input type="email" disabled value={getData.email} className="form-control" name="email" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordCurrent" className="form-label">Current password:</label>
                        <input type="password" onChange={onChangeHandler} className="form-control" name="passwordCurrent" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password:</label>
                        <input type="password" onChange={onChangeHandler} className="form-control" name="password" aria-describedby="emailHelp"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>

                </form>
            </div>
        </div>
      </div>
    </>
  )
}
