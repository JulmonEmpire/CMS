import React, { useEffect, useState } from 'react'
import { MdManageAccounts } from 'react-icons/md'
import { FaUserPlus } from 'react-icons/fa'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query';

export default function Users() {
  const queryClient = useQueryClient();
  const [user,setUser]=useState()
  useEffect(()=>{
    setUser(queryClient.getQueryData(['user']));
  },[]);
  const navigate=useNavigate()

  if(user?.role === "Super Admin"){
    navigate("/dashboard");
  }

  return (
    <div className='w-[100%] h-[100%] bg-[white] rounded-xl'>
      <ul className='flex items-center h-12 pt-2'>
        <NavLink end to={"/users"} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='px-6 py-2 font-bold flex items-center justify-center gap-[5px]'>Manage Users</li>
        </NavLink>
        <NavLink end to={"/users/add-users"} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='px-6 py-2 font-bold flex items-center justify-center gap-[5px]'>Add User</li>
        </NavLink>
      </ul>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}
