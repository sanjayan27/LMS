import React from 'react'
import { assets } from '../../assets/assets'
import { FaArrowRight } from "react-icons/fa";

 const CallToAction = () => {
  return (
    <section className='flex flex-col capitalize mt-10 md:mt-0 mb-10 items-center font-new gap-3'>
        <h1 className='text-2xl font-custom  text-gray-800' >learn anything, anytime, anywhere</h1>
        <p className='text-center p-3 text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque, nam. Expedita odit ea nihil quo voluptatibus cumque quibusdam quisquam distinctio.</p>
        <div className='flex items-center gap-10'>
            <button className='bg-blue-800 cursor-pointer text-sm text-white capitalize p-2 rounded'>get started</button>

            <button className='flex text-sm cursor-pointer items-center gap-1'>Learn More <FaArrowRight className='text-xs'/></button>
        </div>
    </section>
  )
}

export default CallToAction
