import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../Utils/StateProvider';
import MusicPlayer from '../components/MusicPlayer';
import './Library.css'
export default function Library() {
  const [{token,istoggle,selectedSong,favorites},dispatch]=useStateProvider()
  const [getData,setData]=useState([])
  const [getHeight,setHeight]=useState(window.innerHeight)
  const [message,setMessage]=useState(false)
  // console.log(favorites)
  useEffect(()=>{
    favorite();
  },[])
  // useEffect(()=>{
  //   favorite()
  // },[favorites])
async function favorite(){
  let response=await fetch('https://academics.newtonschool.co/api/v1/music/favorites/like',{
    headers:{
      projectId:'l2uaz7omaxbe',
      Authorization: `Bearer ${token}`
    }
  })
  response=await response.json()
  const data=response.data.songs
  console.log(data)
  setData(data)
  if(data.length>0){
    setMessage(true)
  }
  else{
  setMessage(false)
  }
}
const onHandleRemoveWishlist= async(songId)=>{
  let response =await fetch('https://academics.newtonschool.co/api/v1/music/favorites/like',{
    method:'PATCH',
    headers: {
      projectID: 'l2uaz7omaxbe',
      Authorization: `Bearer ${token}`,//we give this to understand backend I am loggedin.
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ songId: songId })
    
  })
  response=await response.json()
  const favoriteSong=[]
  favoriteSong.push(selectedSong)
  dispatch({type:"ADD_FAVORITE",payload:favoriteSong})//Use only to render when we do click to favorite
}

const show=(song)=>{

  dispatch({type:'SET_SELECTED_SONG',payload:song})
  console.log(song)
  
}
  return (
    <>
      <div className={`${istoggle?'toggle-mode':'music-box '}`} style={{minHeight:getHeight+'px'}}>
          {
            message?<h2 style={{textAlign:'center',paddingTop:'10px'}}>Your favorites songs</h2>
            :
            <h2 style={{textAlign:'center',paddingTop:'10px'}}>Please choose your favorite song to save</h2>
          }
          
          <div className='library-container' >
          {
            getData.map((obj,index)=>{
              return (<div key={index} className='library-card'>
                <img src={obj.thumbnail} onClick={()=>show(obj)}/>
                <div>{obj.title}</div>
                <i className="fa-solid fa-trash"                 
              onClick={()=>onHandleRemoveWishlist(obj._id)}></i>
                {/* <MusicCard
                key={index}
                title={obj.title}
                thumbnail={obj.thumbnail}
                // artist={obj.artist}
                id={index}
                song={obj}
              />
              <i className="fa-solid fa-trash"                 
              onClick={()=>onHandleRemoveWishlist(obj._id)}></i>
               */}
              </div>
                
              
              )
              
              
            })
          }
        </div>
      </div>
      <MusicPlayer/>
    </>
  )
}
