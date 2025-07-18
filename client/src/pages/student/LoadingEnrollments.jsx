import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const LoadingEnrollments = () => {
    const {path} = useParams()
    const navigate = useNavigate()
  
    
    useEffect(()=>{
        if(path){
            
        }
    },[])
  return (
   <div className='min-h-[70vh] flex items-center justify-center'>
        <div className='w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin'>

        </div>
    </div>
)
}
