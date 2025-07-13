import React from "react";
import HeroImage from "../../assets/images/HeroImage.png";
import { FaPlay } from "react-icons/fa";
const Hero = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-full mb-15">
      <div className="flex mt-10 md:mt-0 justify-center">
        <div className=" ms-15 gap-2 flex  flex-col justify-center  md:items-start   capitalize text-3xl w-fit md:text-5xl text-black font-bold  ">
          <p className="border  bg-orange-200 text-orange-600 px-3 text-xs rounded-4xl w-fit py-1 transform rotate-z-350 mb-4">
            eLearning Platform{" "}
          </p>
          <h1 className=" font-bold">Smart learning</h1>
          <h1 className="">deeper & more</h1>
          <h1 className="text-orange-500">-amazing</h1>
          <div className="mt-3">
            <p className="text-sm font-semibold ">
              Streamline your learning experience with our all-in-one LMS
              platform — manage courses, track progress, and boost engagement.
              Perfect for schools, colleges, and training institution
            </p>
            <div className="flex gap-5 mt-3">
              <button className="text-sm capitalize  p-3 rounded-2xl bg-green-700 text-white font-semibold cursor-pointer">
                explore courses
              </button>
              <button className="text-sm capitalize   font-semibold cursor-pointer flex justify-center items-center gap-2">
               <div className="rounded-2xl bg-orange-500  text-white p-2 " >
                 <FaPlay />
               </div>
                <p>how it work</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img src={HeroImage} alt="Hero" className="max-w-full h-auto" />
      </div>
    </section>
  );
};

export default Hero;
