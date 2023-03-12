import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { MdDashboard } from "react-icons/md"
import {FaUserInjured} from "react-icons/fa"
import {ImUser} from "react-icons/im"
import { useQueryClient } from '@tanstack/react-query'

export default function Layout({children}) {
  const useQuery=useQueryClient();
  const location=useLocation();
  return (
    <div className='w-full min-h-screen flex  bg-[#EEEEEE]'>
      <div className='w-60 p-2 pl-2 pt-2 bg-[white] rounded-xl m-2'>
        <h1 className='font-bold text-2xl text-center'><img src='/Logo.png'/></h1>
        <div className='mt-8 flex flex-col justify-between h-[75%]'>
          <ul className='text-lg space-y-6'>
            <NavLink to={"/home/dashboard"} className={({ match,isActive }) => isActive ? 'bg-gradient-to-r from-[#6C526F] to-[#AE89A5] text-[#fff] flex items-center space-x-4 h-14 p-4 rounded-xl transition-all duration-500' : 'flex items-center space-x-4 h-14 p-4 rounded-xl text-[#595659] hover:text-[#6C526F] transition-all duration-500 hover:bg-[rgba(0,0,0,0.1)]'}>
              <MdDashboard className='text-2xl' />
              <li> Dashboard</li>
            </NavLink>
            <NavLink to={"/home/patients"}  className={({ isActive }) => isActive || location.pathname.includes("/home/patients") ?  'bg-gradient-to-r from-[#6C526F] to-[#AE89A5] text-[#fff] flex items-center space-x-4 h-14 p-4 rounded-xl transition-all duration-500' : 'flex items-center space-x-4 h-14 p-4 rounded-xl text-[#595659] hover:text-[#6C526F] transition-all duration-500 hover:bg-[rgba(0,0,0,0.1)]'}>
              <FaUserInjured className='text-2xl' />
              <li> Patients</li>
            </NavLink>
            <NavLink to={"/home/users"} className={({ isActive }) => isActive || location.pathname.includes("/home/users") ? 'bg-gradient-to-r from-[#6C526F] to-[#AE89A5] text-[#fff] flex items-center space-x-4 h-14 p-4 rounded-xl transition-all duration-500' : 'flex items-center space-x-4 h-14 p-4 rounded-xl text-[#595659] hover:text-[#6C526F] transition-all duration-500 hover:bg-[rgba(0,0,0,0.1)]'}>
              <ImUser className='text-2xl' />
              <li> Users</li>
            </NavLink>
          </ul>
          {/* <NavLink to={'/'} onClick={()=> {localStorage.clear();useQuery.removeQueries();}} className="flex items-center space-x-4 h-14 p-4 rounded-xl hover:bg-[#AF91E920] transition-colors">
            <RiLogoutBoxRLine className='text-2xl' />
            <p>Logout</p>
          </NavLink> */}
        </div>
      </div>
      <div className='bg-[#EEEEEE] flex-1 p-2 max-h-[100vh]'>
        {children}
      </div>
    </div>
  )
}