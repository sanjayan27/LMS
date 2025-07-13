import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import TestimonialCard from './TestimonialCard'

 const Testimonial = () => {
    const {userTestimonials} = useContext(AppContext)

  return (
    <section className='mt-8 w-full min-h-[60vh] flex  flex-col items-center'>
        <header className='flex flex-col items-center gap-2'>
          <h1 className='font-new text-3xl font-bold text-gray-800'>Testimonials</h1>
          <p className='text-center text-md font-new text-gray-600 p-3'> ipsum dolor sit amet consectetur adipisicing elit. Eligendi unde cumque repellat fugit rem odit quidem cum quas exercitationem iure esse dolor consequuntur</p>
        </header>



        <TestimonialCard userData= {userTestimonials}/>
       
        
    </section>
  )
}

export default Testimonial