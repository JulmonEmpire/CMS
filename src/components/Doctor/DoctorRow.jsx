import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../Utils/firebase';
import { useQueryClient } from '@tanstack/react-query';

export default function DoctorRow({ doctor, index }) {
  const navigate = useNavigate()
  const [showContextMenu, setContextMenu] = useState(false);
  const queryClient = useQueryClient();
  const [loading,setLoading]=useState();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = () => {
    setContextMenu(false);
  }

  async function deleteDoctor() {
    setLoading(true);

    try {
      const doctorRef = doc(collection(db, 'doctor'), doctor.id);
      await deleteDoc(doctorRef);
      queryClient.invalidateQueries(["doctor"])
      toast.success(`Doctor deleted successfully`);
    } catch (error) {
      toast.error('Error deleting doctor');
    }
    handleClickOutside()
    setLoading(false);
  }

  return (
    <tr key={doctor?.id} style={index % 2 !== 0 ? { backgroundColor: "#EEEEEE" } : {}} className="h-12">
      <td className='p-2 font-[500]'>{index + 1}</td>
      <td className='p-2'>{doctor?.lastName}</td>
      <td className='p-2'>{doctor?.firstName}</td>
      <td className='p-2'>{doctor?.email}</td>
      <td className='p-2'>{doctor?.practiceNumber}</td>
      <td className='p-2 '>{doctor?.contactNumber}</td>
      <td className='p-2 flex justify-center relative'>
        <div onClick={(e) => { setContextMenu(!showContextMenu); e.stopPropagation(); }} className='relative flex flex-col gap-[5px] w-[40px] h-[40px] hover:bg-[rgba(0,0,0,0.05)] rounded-full justify-center items-center cursor-pointer'>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
        </div>
        <ul style={showContextMenu === true ? { transform: "scale(1)", opacity: "1" } : { transform: "scale(0)", opacity: "0" }} className='transition-all absolute z-10 right-[10%] top-[50px] bg-[white] shadow-md flex flex-col divide-y-2'>
          <li onClick={(e) => { navigate("/doctors/edit", { state: doctor }) }} className='py-2 px-6 flex-1 flex justify-center select-none items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors'>Edit</li>
          {!loading
            ?
            <li onClick={(e) => { deleteDoctor();e.stopPropagation() }} className='py-2 px-6 flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors select-none cursor-pointer'>Delete</li>
            :
            <li className='py-2 px-6 flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors select-none cursor-pointer'><img className='w-[25px] m-auto' src='/Loading.svg'/></li>
          }
        </ul>
      </td>
    </tr>
  )
}