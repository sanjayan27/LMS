import React, { useContext, useState } from 'react'
import {assets} from "../../assets/assets"
import {data, useNavigate} from "react-router-dom"
import SearchBoxField from './SearchBoxField'
import { AppContext } from '../../context/AppContext'


 const SearchCourse = ({data}) => {
  

    

  return (
    <header className=" capitalize gap-5 md:gap-0 flex md:flex-row flex-col items-center justify-between w-full  md:grid-cols-2 ">
        <section className="flex flex-col gap-3 md:ms-20">
          <p className=" bg-orange-600 text-white px-3 text-xs rounded-4xl w-fit py-1 transform rotate-z-350 ">
            our course
          </p>
          <h1 className="text-xl lg:text-4xl md:text-3xl font-new font-bold">explore our course</h1>
        </section>
        <section className="md:me-20">
            <SearchBoxField />
        </section>
      </header>
  )
}

export default SearchCourse