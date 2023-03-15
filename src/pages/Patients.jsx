import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { MdManageAccounts } from "react-icons/md"
import { FaUserPlus } from 'react-icons/fa'

export default function Patients() {
  const location=useLocation();
  return (
    <div className='w-[100%] !max-h-[100%] bg-[white] rounded-xl overflow-auto'>
      <ul className='flex items-center h-12 pt-2'>
        <NavLink end to={"/home/patients"} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='w-56 px-6 py-2 font-bold flex items-center justify-center gap-[5px]'><MdManageAccounts className='text-2xl' />Manage Patients</li>
        </NavLink>
        <NavLink end to={"/home/patients/add-patient"} className={({ isActive }) => isActive ||location.pathname.includes("/home/patients/add-patient") ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='w-56 px-6 py-2 font-bold flex items-center justify-center gap-[5px]'><FaUserPlus className='text-2xl' />Add Patient</li>
        </NavLink>
      </ul>
      <div className="p-4 pt-0">
        <Outlet />
      </div>
    </div>
  )
}
