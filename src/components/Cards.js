import React, { useState } from 'react'
import './Cards.css'
import noNameImage from '../photos/no-name.jpg'
export default function Cards({posts}) {

    const [getTitle,setTitle]=useState(posts.content.slice(0,50))
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
            <div><span className='like-comment'>Likes:</span> {posts.likeCount}</div>
            <div><span className='like-comment'>Comments:</span> {posts.commentCount}</div>
        </div>
      </div>
    </div>
  )
}
