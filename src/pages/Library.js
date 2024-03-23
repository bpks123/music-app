import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../Utils/StateProvider';
import MusicCard from '../components/MusicCard'
import MusicPlayer from '../components/MusicPlayer';
import './Library.css'
export default function Library() {
  const [{token,selectedSong,favorites},dispatch]=useStateProvider()
  const [getData,setData]=useState([])
  const [getHeight,setHeight]=useState(window.innerHeight)
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
  // console.log(data)
  setData(data)
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
  return (
    <>
      <div className='music-box' style={{backgroundColor:'rgb(146, 144, 144)',minHeight:getHeight+'px'}}>
        
          <div className='library-container' >
          {
            getData.map((obj,index)=>{
              return (<div key={index}>
                
                <MusicCard
                key={index}
                title={obj.title}
                thumbnail={obj.thumbnail}
                // artist={obj.artist}
                id={index}
                song={obj}
              />
              <i className="fa-solid fa-trash"                 
              onClick={()=>onHandleRemoveWishlist(obj._id)}></i>
              
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
