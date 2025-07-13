import React from "react";
import { assets } from "../../assets/assets";

const TestimonialCard = ({ userData }) => {
  return (
    <section className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-3">
      {userData.slice(0, 3).map((val, i) => (
        <section key={i} className="rounded-xl w-[300px] bg-slate-200  sm:w-[300px] lg:w-[300px]">
          <div className="flex gap-3 items-center  rounded-xl p-2">
            <img src={val.image} alt={val.name} className="w-13"/>
            <div className="font-new">
              <h1>{val.name}</h1>
              <p className="text-xs">{val.role}</p>
            </div>

          </div>
          <div className="p-3 flex flex-col gap-3 bg-orange-50  "> 
              <div className="flex gap-[0.5x]">
                {
                [...Array(5)].map((_,i)=>(
                  <img src={
                    i < val.rating ? assets.star : assets.star_blank
                  } alt="" className="w-4" key={i}/>
                ))
              }
              </div>
              <p>
                {val.feedback}
              </p>
              <button className="flex flex-start text-xs text-blue-600 underline"> 
                Read More
              </button>
          </div>
        </section>
      ))}
    </section>
  );
};
export default TestimonialCard;
