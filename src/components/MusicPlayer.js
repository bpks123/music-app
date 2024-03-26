import React, { useEffect, useState } from 'react'
import { useStateProvider} from '../Utils/StateProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function MusicPlayer() {
  const [{selectedSong,istoggle,token,favorites},dispatch]=useStateProvider()
  const navigate=useNavigate()
  const [getWatchlist,setWatchList]=useState(false)
  let artistList=''

  if(selectedSong && selectedSong.artist.length>0 && selectedSong.artist[0].name){
    artistList=selectedSong.artist.map((item)=>item.name).join(' & ')
  }
useEffect(()=>{
  if(selectedSong && token){
    setWatchList(false)
    favorite()
  }
},[selectedSong])
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
    const favoriteCheck=data.filter((obj)=>(
      obj._id===selectedSong._id
    ))
    // console.log(favoriteCheck)
    if(favoriteCheck.length>0){
      setWatchList(true)
    }
    
  }

  const onHandlerwishList= async(songId)=>{
    // axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { songId: songId }, {
    //   headers: {
    //     projectID: 'l2uaz7omaxbe',
    //     Authorization:`Bearer ${token}`
    //   }
    // })//This is method to do favorite the song using Axios
    console.log(songId)
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
    console.log(response)
    setWatchList(true)
    const favoriteSong=[]
    favoriteSong.push(selectedSong)
    dispatch({type:"ADD_FAVORITE",payload:favoriteSong})//Use only to render when we do click to favorite
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
    setWatchList(false)
    const favoriteSong=[]
    favoriteSong.push(selectedSong)
    dispatch({type:"ADD_FAVORITE",payload:favoriteSong})//Use only to render when we do click to favorite

   
  }
  return (
    <>
    {
      (selectedSong) ? (
      <section className={`${istoggle?'music-player-toggle':'music-player'}`}>      
        <img
              src={selectedSong.thumbnail}
              height={"50"}
              width={"50"}
              style={{paddingLeft:'5px'}}
              // className='bannerImg'
            />
            {
              token ? (
                <>
                <div style={{width:'300px'}} className='music-sort'>
                <div className='music-title'>{selectedSong.title}</div>
                <div className='artist'>
                    {artistList}
                </div>
            </div>
            <div>
              <div className='d-flex justify-content-center ' style={{gap:'10px',padding:'10px'}}>
              <div className='music-title music-long'>{selectedSong.title.length<24?selectedSong.title:selectedSong.title.slice(0,24)}</div>
              {token && !getWatchlist && <i className="fa-regular fa-heart favorite-icon music-long" onClick={()=>onHandlerwishList(selectedSong._id)}></i>}
              {token && getWatchlist && <i className="fa-solid fa-heart favorite-icon music-long" style={{color:'red'}} onClick={()=>onHandleRemoveWishlist(selectedSong._id)}></i>}
           
              </div>
            <audio className='music-audio' controls autoPlay src={selectedSong.audio_url} style={{marginLeft:"20px"}}/>
            </div>
            {token && !getWatchlist && <i className="fa-regular fa-heart favorite-icon music-sort" onClick={()=>onHandlerwishList(selectedSong._id)}></i>}
            {token && getWatchlist && <i className="fa-solid fa-heart favorite-icon music-sort" style={{color:'red'}} onClick={()=>onHandleRemoveWishlist(selectedSong._id)}></i>}
            </>
              ):(<>
              <div>Please SignUp First</div>
              <button onClick={()=>navigate('register')}>SignUp here</button>
              </>)
            }

      </section>):('')
    }     
    </>
  )
}
