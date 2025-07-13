import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBoxField = ({ data }) => {
  const [input, setInput] = useState(data ? data : "");
  const navigate = useNavigate();

  const handleNavigate = (e ) => {
    e.preventDefault();

    navigate(`/courses/${input}`);
    setInput("")
  };

  return (
    <form
      onSubmit={(e)=>handleNavigate(e)}
      className="
            bg-white  rounded md:h-12 h-10 max-w-xl w-full flex justify-between shadow-2lg "
    >
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="w-10 md:w-12 px-3"
      />
      <input
        type="text "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="search courses"
        className="outline-none capitalize  text-gray-500/80 "
      />
      <button className=" bg-green-700 rounded text-white md:px-6 px-4 md:py-2 py-2">
        Search
      </button>
    </form>
  );
};

export default SearchBoxField;
