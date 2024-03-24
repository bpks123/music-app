import React, { useState } from 'react'
import './Cards.css'
import noNameImage from '../photos/no-name.jpg'
import { useStateProvider } from '../Utils/StateProvider'
import { useNavigate } from 'react-router-dom'

export default function Cards({posts}) {
  
    const navigate=useNavigate()
    const [{token,istoggle},dispatch]=useStateProvider()
    const [getTitle,setTitle]=useState(posts.content.slice(0,50))
    const [isLike,setIsLike]=useState(false)
    const [getlikeCount,setLikeCount]=useState(posts.likeCount)
    const [getCommentCount,setCommentCount]=useState(posts.commentCount)
    const [getIsComment,setIsComment]=useState(false)
    const [getDate,setDate]=useState('')
    const [getComment,setComment]=useState('')
    const [isCommented,setIsCommented]=useState(false)
    const [getCommentContent,setCommentContent]=useState('')
    const onClickLike=async(id)=>{
      if(token){
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
      else{
        alert('Please Login to Like post!')
        navigate('/login')
      }
      
    }
    async function onHandleClickComment(id){
      try{
        let response=await fetch(`https://academics.newtonschool.co/api/v1/quora/post/${id}/comments`,{
          method:'GET',
          headers:{
          projectId:'l2uaz7omaxbe',
          Authorization: `Bearer ${token}`
        },
        body:null
        })
        console.log(response)
        if(response.status==200){
          setIsCommented(true)
          setCommentContent(getComment)
          setCommentCount(getCommentCount+1)
        }
        if(response.status==400){
          alert("Something went wrong. Try again later!")
        }
      }catch(error){
        alert(error.message)
      }
    }
  const onClickComment=()=>{
    if(token){
      setIsComment(!getIsComment)
      let date=new Date()
      date=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
      setDate(date)
      // console.log(date)
    }
    else{
      alert('Please login to comment!')
      navigate('/login')
    }
    
  }  
  const onClickAddComment=async(id)=>{
    if(!getComment){
      alert('Please add comment')
    }
    else{
      
      setComment('')
      onHandleClickComment(id)

    }
  }

  return (
    <div className={`${istoggle?'card-container-toggle':'card-container'}`}>
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
            <div><span onClick={onClickComment} className='like-comment'>Comments:</span> {getCommentCount}</div>
        </div>
      </div>
      {
        getIsComment 
        && 
        <div className='card-comment'>
        <h5>Comments :-</h5>
        <div className='d-flex p-1 card-comment-input' >
          <input type='text' value={getComment} onChange={(e)=>setComment(e.target.value)} className='form-control' placeholder='Post your Comments..'></input>
          <i onClick={()=>onClickAddComment(posts._id)} className="fa-solid fa-circle-chevron-right" style={{color:'black'}}></i>
        </div>
        {
          isCommented 
          && 
          <div className='card-comments-content'>
          <div>{getCommentContent}</div>
          <div className='card-comment-date'>{getDate}</div>          
        </div>
        }
        
      </div>
      }
      
    </div>
  )
}
