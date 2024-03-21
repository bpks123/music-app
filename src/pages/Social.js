import React,{useEffect, useState} from 'react'
import Cards from '../components/Cards'
import loading from '../photos/loading.gif'

export default function Social() {
  const [getheight,setHeight]=useState(window.innerHeight)
  const [getData,setData]=useState([])
  const [loadingTrue,setLoadingTrue]=useState(true)
  const [dataInfo,setDataInfo]=useState("Loading...")
  useEffect(()=>{
    fetchPost()
  },[])

  async function fetchPost(){
    try{
      let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/post?limit=100',{
        headers:{
          'projectId':'l2uaz7omaxbe'
        }
      })
      if(response.status===200){
        let result=await response.json()
        result=result.data
        console.log(result)
        setData(result)
        setLoadingTrue(false)
        setDataInfo('Latest Data')

      }
      else{
        setDataInfo('Server Error or Network Problem. Try again...')
        setLoadingTrue(false)
      }
     
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
    <div className='global-container' style={{minHeight:getheight+'px'}}>
      {
        loadingTrue?<img
        style={{position:'absolute', width:'150px',left:'45%',top:'40%'}}
        src={loading}/>:<h5 style={{textAlign:'center',paddingTop:'5px'}}>{dataInfo}</h5>
      }
      {/* <img src={loading} className='d-flex justify-content-center align-items-center'/> */}
      <div className='social-content' style={{}}>
        {
          getData?
          getData.map((item)=>{
            return(
              <Cards key={item._id} posts={item}/>
            )
          })
          :''
        }
        
      </div>
    </div>
    </>
    
  )
}
