import React, { useState } from 'react'
import './Cards.css'
import noNameImage from '../photos/no-name.jpg'
import { useStateProvider } from '../Utils/StateProvider'
export default function Cards({posts}) {
    const [{token},dispatch]=useStateProvider()
    const [getTitle,setTitle]=useState(posts.content.slice(0,50))
    const [isLike,setIsLike]=useState(false)
    const [getlikeCount,setLikeCount]=useState(posts.likeCount)

    const onClickLike=async(id)=>{
      try{
        let response=await fetch(`https://academics.newtonschool.co/api/v1/quora/like/${id}`,{
          method:'POST',
          headers:{
          projectId:'l2uaz7omaxbe',
          Authorization: `Bearer ${token}`
        },
        body:null
        })
        console.log(response)
        if(response.status==201){
            setIsLike(true)
            setLikeCount(getlikeCount+1)
        }
        if(response.status==400){
          alert("You have already liked the post!")
        }
      }catch(error){
        alert(error.message)
      }
    }
  return (
    <div className='card-container'>
      <div className='card-profile'>
        {
            posts.author.profileImage?<img src={posts.author.profileImage}/>:<img src={noNameImage}/>
        }
        <div className='card-profile-info'>
            <h4>{getTitle}</h4>

            <div>By : {posts.author?posts.author.name:'No Name'}</div>
        </div>
      </div>
      <div className='card-content'>
        
        <div>{posts.content}</div>
        {posts.images?<img className='card-image' src={posts.images}/>:''}
      </div>
      <div className='card-channel'>
        <div className='card-channel-info'>
            {
                posts.channel?<img src={posts.channel.image}/>:<img src={noNameImage}/>
            }
            <div>Channel: {posts.channel?posts.channel.name:'No Name'}</div>
        </div>
        <div className='card-channel-info'>
            <div><span onClick={()=>onClickLike(posts._id)} className='like-comment'>{isLike?'UnLike':'Like'}</span> {getlikeCount}</div>
            <div><span className='like-comment'>Comments:</span> {posts.commentCount}</div>
        </div>
      </div>
    </div>
  )
}
