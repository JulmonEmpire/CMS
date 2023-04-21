import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import { NavLink, Outlet } from 'react-router-dom'

export default function PlacesOfService() {
  console.log(location.pathname);
  return (
    <div className='w-[100%] !max-h-[100%] bg-[white] rounded-xl overflow-auto'>
      {location.pathname !== "/doctors/edit" &&
        <ul className='flex items-center h-12 pt-2'>
          <NavLink end to={"/places-of-service"} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
            <li className='px-6 py-2 font-bold flex items-center justify-center gap-[5px]'>Manage Places Of Service</li>
          </NavLink>
          <NavLink end to={"/places-of-service/add"} className={({ isActive }) => isActive || location.pathname.includes("/patients/add-patient") ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
            <li className='px-6 py-2 font-bold flex items-center justify-center gap-[5px]'>Add Places Of Service</li>
          </NavLink>
        </ul>
      }
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}
