import React,{useEffect, useState} from 'react'
import Cards from '../components/Cards'
import loading from '../photos/loading.gif'
import { useStateProvider } from '../Utils/StateProvider'

export default function Social() {
  const [{istoggle}]=useStateProvider()
  const [getheight,setHeight]=useState(window.innerHeight)
  const [getData,setData]=useState([])
  const [loadingTrue,setLoadingTrue]=useState(true)
  const [dataInfo,setDataInfo]=useState("Loading...")
  const [getpage,setPage]=useState(0)
  useEffect(()=>{
    fetchPost()
  },[])

  async function fetchPost(){
    try{
      let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/post',{
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
        setPage(0)

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
  
  async function nextBtn(){
    let nextPage = getpage + 1; // Increase the page number for next page
        try{
        let response=await fetch(`https://academics.newtonschool.co/api/v1/quora/post?limit=10&page=${nextPage}`,{
          headers:{
            'projectId':'l2uaz7omaxbe'
          }
        })
        if(response.status===200){
          let result=await response.json()
          result=result.data
          console.log(result);
          setData(result);
          setLoadingTrue(false);
          setPage(nextPage)
          setDataInfo("Latest Data");    
          // console.log(nextPage)

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
  async function prevBtn(){
    let prevPage = getpage - 1; // Decrease the page number for previous page
        if(prevPage===0){
            fetchPost()
        }
        else{
          try{
            let response=await fetch(`https://academics.newtonschool.co/api/v1/quora/post?limit=10&page=${prevPage}`,{
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
              setPage(prevPage)
              setDataInfo('Latest Data')
          console.log(prevPage)
    
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
         
   
  }
const OnClickNext=()=>{
    if(getpage<5){
      nextBtn()
    }
    
}
const OnClickPrev=()=>{
  if(getpage>0){
    prevBtn()
  }
}

  return (
    <>
    <div className={`${istoggle?'toggle-mode':'global-container'}`} style={{minHeight:getheight+'px'}}>
      {
        loadingTrue?<img
        style={{position:'absolute', width:'150px',left:'45%',top:'40%'}}
        src={loading}/>:<h5 style={{textAlign:'center',paddingTop:'5px'}}>{dataInfo}</h5>
      }
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
      {
        !loadingTrue
          &&
          <div className='prev-next-button'>
            {
            <button onClick={OnClickPrev} className='btn btn-primary d-flex' disabled={getpage>0?false:true}><i className="fa-solid fa-arrow-left"></i>&nbsp;Prev</button>              
            }
            <button onClick={OnClickNext} className='btn btn-primary d-flex' disabled={getpage<4>0?false:true}>Next&nbsp;<i className="fa-solid fa-arrow-right"></i></button>
          </div>
      }
      
    </div>
    </>
    
  )
}
