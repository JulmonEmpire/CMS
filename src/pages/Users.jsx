import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Users() {
  return (
    <div className='w-[100%] h-[100%] bg-[white] rounded-xl '>
      <ul className='flex items-center h-12 pt-2'>
        <NavLink end to={"/home/users"} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)]"}>
          <li className='w-48 text-center px-6 py-2 font-bold'>Manage Users</li>
        </NavLink>
        <NavLink end to={"/home/users/add-users"} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)]"}>
          <li className='w-48 text-center px-6 py-2 font-bold'>Add User</li>
        </NavLink>
      </ul>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}
