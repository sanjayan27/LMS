import React from "react";

export const About = () => {
  return (
    <section className="h-full  grid place-items-center w-full">
      <div >
        <p className=" text-white bg-green-700 px-3 text-xs rounded-4xl w-fit py-1 transform rotate-z-350 capitalize mb-4">
         about us        </p>
      </div>
      <div className="w-[80vw] capitalize md:w-[70vw] font-custom font-new text-center">
        <p className="text-gray-600  text-2xl">
          <span className="text-black">
            we are passionate about empowering learners{" "}
          </span>
          worldwide with high-quality, accessible & engaging education. our
          mission offering a diverse range of courses.
        </p>
      </div>
      <ul className="grid w-[70vw] grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <li className="flex justify-center gap-2  p-5">
          <h2 className="text-5xl font-bold">25+</h2>
          
            <p className="text-md ">Years of eLearning Education Experience</p>
          
        </li>
       <li className="flex justify-center gap-2  p-5">
          <h2 className="text-5xl font-bold">56k</h2>
          
            <p className="text-md ">Students Enrolled in LMSZONE Courses</p>
          
        </li>
        <li className="flex justify-center gap-2  p-5">
          <h2 className="text-5xl font-bold">170+</h2>
          
            <p className="text-md ">Experieced Teacher's Service</p>
          
        </li>
      </ul>
      <div className="h-[1.5px] bg-gray-400 mt-4 w-[50vw]"></div>
    </section>
  );
};
