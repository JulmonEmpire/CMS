import React, { useState } from 'react'
import { GrDownload } from "react-icons/gr"
import { db } from '../Utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";
const storage = getStorage();

export default function NotesRow({ note, index,pId }) {
  const [showContextMenu, setContextMenu] = useState();

  const deleteNote = async () => {
    try {
      // Delete file from Firebase Storage
      const storageRef = ref(storage, note.url);
      await deleteObject(storageRef);
  
      // Remove note from patient's notes array in Firestore
      const patientRef = doc(db, "patients", pId);
      const patientDoc = await getDoc(patientRef);
  
      if (patientDoc.exists()) {
        const patientData = patientDoc.data();
        const updatedNotes = patientData.notes.filter(n => n.url !== note.url);
  
        await updateDoc(patientRef, { notes: updatedNotes });
        console.log("Note deleted successfully");
      } else {
        console.log("Patient not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr key={note?.id} style={index % 2 !== 0 ? { backgroundColor: "#EEEEEE" } : {}} className="h-12 w-full">
      <td className='p-2 font-[500]'>{index + 1}</td>
      <td className='p-2 font-[500]'>{note.name}</td>
      <td className='p-2 font-[500]'>{note.type}</td>
      <td className='p-2'><a href={note.url}>{<GrDownload />}</a></td>
      <td className='p-2 flex justify-center relative'>
        <div onClick={(e) => { setContextMenu(!showContextMenu); e.stopPropagation(); }} className='relative flex flex-col gap-[5px] w-[40px] h-[40px] hover:bg-[rgba(0,0,0,0.05)] rounded-full justify-center items-center cursor-pointer'>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
        </div>
        <ul style={showContextMenu === true ? { transform: "scale(1)", opacity: "1" } : { transform: "scale(0)", opacity: "0" }} className='transition-all absolute z-10 right-[10%] top-[50px] bg-[white] shadow-md flex flex-col divide-y-2'>
          <li onClick={(e) => { deleteNote() }} className='py-2 px-6 flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors select-none cursor-pointer'>Delete</li>
        </ul>
      </td>
    </tr>
  )
}
