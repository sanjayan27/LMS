import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../assets/favicon.png";
import {assets} from "../../assets/assets.js";
import {UserButton, useUser } from '@clerk/clerk-react'
 const Navbar = () => {
    const {user} = useUser()
  return (
    <nav className='flex flex-row items-center justify-between border-b border-gray-500 md:px-7
     px-3 py-3'>
        <Link
        className=" cursor-pointer flex items-center space-x-3 "
        to={ "/"}
      >
        <img src={Logo} alt="Logo" className="h-10 w-10" />
        <span className="font-bold text-xl text-gray-800">StudPlat</span>
      </Link>
      <div className='flex items-center text-gray-500 gap-3'>
        <h1>Hi! {user ? user.fullName : 'Developers'}</h1>
        {
            user ? <UserButton />: <img src={assets.profile_img_1} alt="" className='max-w-8' />
        }
      </div>
    </nav>
  )
}


export  default Navbar