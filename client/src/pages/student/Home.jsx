import React from 'react'
import Hero from '../../component/student/Hero'
import { About } from '../../component/student/About'
import Courses from '../../component/student/Courses'
import Testimonial from '../../component/student/Testimonial'
import CallToAction from '../../component/student/CallToAction'

 const Home = () => {
  return (
    <section className="flex flex-col  ">
      <div>
        <Hero/>
        <About/>
        <Courses/>
        <Testimonial/>
        <CallToAction/>
      </div>
    </section>
  )
}

export default Home