import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Utils/firebase';


export default function UserTableRow({ user, index }) {
  const navigate = useNavigate();
  const [showContextMenu, setContextMenu] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = () => {
    setContextMenu(false);
  }

  const blockMutation = useMutation({
    mutationFn: async () => {
      const docRef = doc(db, "users", user.uid);
      return updateDoc(docRef, { isBlocked: true })
        .then(() => {
          console.log("Document updated successfully");
        })
        .catch((error) => {
          console.log(`Error updating document: ${error}`);
        });
    },
    onSuccess: () => {
      toast.success("User Blocked");
      queryClient.invalidateQueries(['users'])
    },
    onError: () => {
      toast.error("Error Blocking user");
    }
  });

  const blockHandler = (e) => {
    blockMutation.mutate()
  }

  const unblockMutation = useMutation({
    mutationFn: async () => {
      const docRef = doc(db, "users", user.uid);
      return updateDoc(docRef, { isBlocked: false })
        .then(() => {
          console.log("Document updated successfully");
        })
        .catch((error) => {
          console.log(`Error updating document: ${error}`);
        });
    },
    onSuccess: () => {
      toast.success("User unblocked");
      queryClient.invalidateQueries(['users'])
    },
    onError: () => {
      toast.error("Error unblocking user");
    }
  });

  const unblockHandler = (e) => {
    unblockMutation.mutate()
  }

  return (
    <tr key={user.uid} style={index % 2 !== 0 ? { backgroundColor: "#EEEEEE" } : {}} className="h-12">
      <td className='p-2 font-[500]'>{index+1}</td>
      <td className='p-2'>{user?.firstName}</td>
      <td className='p-2'>{user?.lastName}</td>
      <td className='p-2'>{user?.email}</td>
      <td className='p-2'>{user?.location}</td>
      <td className='p-2'>{user?.role}</td>
      <td className='p-2'>{user?.isBlocked ? "Blocked" : "Active"}</td>
      <td className='p-2 flex justify-center relative'>
        <div onClick={(e) => { setContextMenu(!showContextMenu); e.stopPropagation(); }} className='relative flex flex-col gap-[5px] w-[40px] h-[40px] hover:bg-[rgba(0,0,0,0.05)] rounded-full justify-center items-center cursor-pointer'>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
        </div>
        <ul style={showContextMenu === true ? { transform: "scale(1)", opacity: "1" } : { transform: "scale(0)", opacity: "0" }} className='transition-all absolute z-10 right-[10%] top-[50px] bg-[white] shadow-md flex flex-col divide-y-2'>
          <li onClick={(e) => { navigate("/users/edit-user",{state:{user}}) }} className='py-2 px-6 flex-1 flex justify-center select-none items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors'>Edit</li>
          {user.isBlocked ?
            <li onClick={(e) => { unblockHandler(); }} className='py-2 px-6 flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors select-none cursor-pointer'>Unblock</li>
            :
            <li onClick={(e) => { blockHandler(); }} className='py-2 px-6 flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors select-none cursor-pointer'>Block</li>
          }
        </ul>
      </td>
    </tr>
  )
}