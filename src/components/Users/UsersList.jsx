import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Utils/firebase';
import UserTableRow from './UserTableRow';


export default function UsersList() {

  const [userData,setUserData]=useState()
  const queryClient=useQueryClient()
  useEffect(()=>{
    setUserData(queryClient.getQueryData(['user']));
  },[queryClient])
  
  const userQuery = useQuery(["users"], async () => {
    let data = [];
    const u=queryClient.getQueryData(['user'])
    console.log(u)
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      let usersdata = doc.data()
      if (usersdata?.uid !== u?.uid) {
        data.push(usersdata);
      }
    })
    return data;
  });


  return (
    <div>
      {userQuery.isLoading ? <img className='w-[50px] m-auto mt-10' src='/Loading.svg' /> :
        <table className="table-auto w-full mt-4">
          <thead className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] h-16'>
            <tr className='text-white text-left'>
              <th className='p-2'>#</th>
              <th className='p-2'>First Name</th>
              <th className='p-2'>Last Name</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Location</th>
              <th className='p-2 w-36'>Role</th>
              <th className='p-2 w-28'>Status</th>
              <th className='p-2 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userQuery?.data?.map((user, index) => {
              console.log(user?.uid,userData?.uid);
              if (user?.uid === userData?.uid) {
                return
              };
              return (
                <UserTableRow key={user.uid} user={user} index={index} />
              )
            })}
          </tbody>
        </table>
      }
    </div>
  )
}
