import React, { useState } from 'react'
import { FaUserInjured, FaUserPlus } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md';
import { NavLink, Outlet, useLocation } from 'react-router-dom'

export default function PatientInformation() {
  const location = useLocation();
  return (
    <div className='w-[100%] !max-h-[100%] h-full rounded-xl overflow-auto'>
      <ul className='flex items-center h-12 pt-2'>
        <NavLink end to={"/patients-information"} state={location.state} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='px-4 py-2 font-bold flex items-center justify-center gap-[5px]'>Patients Information</li>
        </NavLink>
        <NavLink end to={"/patients-information/medical-aid"} state={location.state} className={({ isActive }) => isActive || location.pathname.includes("/patients/add-patient") ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='px-4 py-2 font-bold flex items-center justify-center gap-[5px]'>Medical Aid Information</li>
        </NavLink>
        <NavLink end to={"/patients-information/contact"} state={location.state} className={({ isActive }) => isActive || location.pathname.includes("/patients/add-patient") ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='px-4 py-2 font-bold flex items-center justify-center gap-[5px]'>Contact Information</li>
        </NavLink>
        <NavLink end to={"/patients-information/notes"} state={location.state} className={({ isActive }) => isActive || location.pathname.includes("/patients/add-patient") ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='px-4 py-2 font-bold flex items-center justify-center gap-[5px]'>Patient Notes</li>
        </NavLink>
      </ul>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}
