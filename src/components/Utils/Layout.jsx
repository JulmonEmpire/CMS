import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md"
import { FaUserInjured } from "react-icons/fa"
import { ImUser } from "react-icons/im"
import { useQueryClient } from '@tanstack/react-query';
import { BiLogOut } from "react-icons/bi"
import { ImAidKit } from "react-icons/im"
import { RiHospitalFill } from "react-icons/ri"
import { FaUserMd } from "react-icons/fa"
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase"
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export default function Layout({ children }) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUsers] = useState(null)

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      setUsers(queryClient.getQueryData(["user"]))
    });

    return () => {
      unsubscribe();
    };

  }, [queryClient])

  const logoutHandler = () => {
    signOut(auth).then(() => {
      queryClient.resetQueries();
      localStorage.clear();
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }

  const medicalAidQuery = useQuery(["medicalAid"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "medicalAid"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      medicalAiddata.id = doc.id;
      data.push(medicalAiddata);
    })
    console.log(data);
    return data;
  });

  const hospitalQuery = useQuery(["hospital"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "hospital"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      medicalAiddata.id = doc.id;
      data.push(medicalAiddata);
    })
    console.log(data);
    return data;
  });

  const doctorQuery = useQuery(["doctor"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "doctor"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      medicalAiddata.id = doc.id;
      data.push(medicalAiddata);
    })
    return data;
  });

  return (
    <div className='w-full min-h-screen flex  bg-[#EEEEEE]'>
      <div className='w-60 p-2 pl-2 pt-2 bg-[white] rounded-xl m-2'>
        <h1 className='font-bold text-2xl text-center'><img src='/Logo.png' /></h1>
        <div className='mt-8 flex flex-col justify-between h-[75%]'>
          <ul className='text-lg space-y-6'>
            <NavLink to={"/dashboard"} className={({ isActive }) => isActive ? 'bg-gradient-to-r from-[#6C526F] to-[#AE89A5] text-[#fff] flex items-center space-x-4 h-14 p-4 rounded-xl transition-all duration-500' : 'flex items-center space-x-4 h-14 p-4 rounded-xl text-[#595659] hover:text-[#6C526F] transition-all duration-500 hover:bg-[rgba(0,0,0,0.1)]'}>
              <MdDashboard className='text-2xl' />
              <li> Dashboard</li>
            </NavLink>
            <NavLink to={"/patients"} className={({ isActive }) => isActive || location.pathname.includes("/patients") ? 'bg-gradient-to-r from-[#6C526F] to-[#AE89A5] text-[#fff] flex items-center space-x-4 h-14 p-4 rounded-xl transition-all duration-500' : 'flex items-center space-x-4 h-14 p-4 rounded-xl text-[#595659] hover:text-[#6C526F] transition-all duration-500 hover:bg-[rgba(0,0,0,0.1)]'}>
              <FaUserInjured className='text-2xl' />
              <li> Patients</li>
            </NavLink>
            <NavLink to={"/users"} className={({ isActive }) => isActive || location.pathname.includes("/users") ? 'bg-gradient-to-r from-[#6C526F] to-[#AE89A5] text-[#fff] flex items-center space-x-4 h-14 p-4 rounded-xl transition-all duration-500' : 'flex items-center space-x-4 h-14 p-4 rounded-xl text-[#595659] hover:text-[#6C526F] transition-all duration-500 hover:bg-[rgba(0,0,0,0.1)]'}>
              <ImUser className='text-2xl' />
              <li> Users</li>
            </NavLink>
            <NavLink to={"/medical-aids"} className={({ isActive }) => isActive ? 'bg-gradient-to-r from-[#6C526F] to-[#AE89A5] text-[#fff] flex items-center space-x-4 h-14 p-4 rounded-xl transition-all duration-500' : 'flex items-center space-x-4 h-14 p-4 rounded-xl text-[#595659] hover:text-[#6C526F] transition-all duration-500 hover:bg-[rgba(0,0,0,0.1)]'}>
              <ImAidKit className='text-2xl' />
              <li> Medical Aids</li>
            </NavLink>
            <NavLink to={"/doctors"} className={({ isActive }) => isActive ? 'bg-gradient-to-r from-[#6C526F] to-[#AE89A5] text-[#fff] flex items-center space-x-4 h-14 p-4 rounded-xl transition-all duration-500' : 'flex items-center space-x-4 h-14 p-4 rounded-xl text-[#595659] hover:text-[#6C526F] transition-all duration-500 hover:bg-[rgba(0,0,0,0.1)]'}>
              <FaUserMd className='text-2xl' />
              <li> Doctor</li>
            </NavLink>
            <NavLink to={"/hospitals"} className={({ isActive }) => isActive ? 'bg-gradient-to-r from-[#6C526F] to-[#AE89A5] text-[#fff] flex items-center space-x-4 h-14 p-4 rounded-xl transition-all duration-500' : 'flex items-center space-x-4 h-14 p-4 rounded-xl text-[#595659] hover:text-[#6C526F] transition-all duration-500 hover:bg-[rgba(0,0,0,0.1)]'}>
              <RiHospitalFill className='text-2xl' />
              <li> Hospital</li>
            </NavLink>
          </ul>
          {/* <NavLink to={'/'} onClick={()=> {localStorage.clear();useQuery.removeQueries();}} className="flex items-center space-x-4 h-14 p-4 rounded-xl hover:bg-[#AF91E920] transition-colors">
            <RiLogoutBoxRLine className='text-2xl' />
            <p>Logout</p>
          </NavLink> */}
        </div>
      </div>
      <div className='bg-[#EEEEEE] flex-1 p-2 max-h-[100vh] space-y-[1%]'>
        <div className='h-[8%] w-full rounded-xl bg-white flex justify-between items-center px-8'>
          <h1 className='text-[#595659] text-lg font-bold'>{location.pathname.includes("/patients") ? "Patients" : location.pathname.includes("/dashboard") ? "Dashboard" : location.pathname.includes("/doctors") ? "Doctor" : location.pathname.includes("/hospitals") ? "Hospital" : location.pathname.includes("/medical-aids") ? "Medical Aids" : "Users"}</h1>
          <div className='flex gap-8 items-center'>
            <div className='flex gap-2'>
              <div className='w-[45px] h-[45px] bg-[#AE89A5] rounded-full flex justify-center items-center'>
                <p className='text-xl font-bold text-white'>{user?.firstName[0].toUpperCase()}</p>
              </div>
              <div className='flex flex-col justify-center'>
                <h1 className='text-[16px] font-bold text-[#595659] leading-[18px]'>{user?.firstName && user?.lastName ? user?.firstName + " " + user?.lastName : "Username"}</h1>
                <p className='text-sm text-[#595659] leading-[18px]'>{user?.role || "User Role"}</p>
              </div>
            </div>
            <BiLogOut onClick={logoutHandler} className='text-2xl text-[#595659] cursor-pointer' />
          </div>
        </div>
        <div className='h-[90.2%] bg-white rounded-xl'>
          {!doctorQuery.isLoading && !hospitalQuery.isLoading && !medicalAidQuery.isLoading ? <Outlet /> : <img className='w-[40px] m-auto pt-[20px]' src='/Loading.svg' />}
        </div>
      </div>
    </div>
  )
}