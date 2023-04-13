import React, { useEffect, useState } from 'react';
import { FaUserInjured } from 'react-icons/fa';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { db, storage } from '../Utils/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useQueryClient } from '@tanstack/react-query';
import NotesRow from './NotesRow';

export default function PatientNotes() {
  const navigate = useNavigate()
  const location = useLocation();
  console.log(location.state)

  const [patient, setPatient] = useState(location.state);
  const [notes, setNotes] = useState(location.state.notes);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setPatient(location.state)
    setNotes(location.state.notes);
  },[location])

  const queryClient = useQueryClient();

  // let urls =  uploadScannedNotes(location.state.data.scannedNotes);
  const uploadScannedNotes = async (file) => {
    setLoading(true);
    let name = file[0].name.split(".")[0]
    let type = file[0].name.split(".")[1]
    try {
      const storageRef = ref(storage, `/notes/${file[0].name}`);
      const uploadTask = await uploadBytes(storageRef, file[0]);
      const url = await getDownloadURL(storageRef);

      const patientRef = doc(db, "patients", location?.state?.id);
      const patientDoc = await getDoc(patientRef);

      if (patientDoc.exists()) {
        const patientData = patientDoc.data();

        let updatedNotes = [{ url, name: name, type: type }];
        if (patientData?.notes !== undefined) {
          updatedNotes = [...patientData?.notes, { url, name: name, type: type }];
        }
        await updateDoc(patientRef, { notes: updatedNotes });
        queryClient.invalidateQueries(['patients']);
        navigate('.', { state: { ...location.state, notes: updatedNotes } });
      } else {
        console.log("Patient not found");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };


  return (
    <div className='pt-6 mb-4 px-4 flex flex-col h-full'>
      <div className='mt-4 flex flex-col gap-2 min-h-[70.1vh]'>
        <div className='flex-1 overflow-auto max-h-[61vh]'>
          <table className='className="table-auto w-full mt-4"'>
            <thead className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] h-16'>
              <tr className='text-white text-left'>
                <td className='p-2'>#</td>
                <th className='p-2'>Name</th>
                <th className='p-2'>Type</th>
                <th className='p-2 w-32'>File</th>
                <th className='p-2 text-center w-32'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                notes?.map((note, index) => {
                  return <NotesRow note={note} pId={patient.id} index={index} />
                })
              }
            </tbody>
          </table>
        </div>
        {!loading ?
          <div>
            <label className='cursor-pointer flex justify-center items-center w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white' type='button' htmlFor="scannedCopies">Add Notes</label>
            <input multiple accept="image/*, application/pdf, .doc, .docx" onChange={(e) => { uploadScannedNotes(e.target.files); e.target.value = null }} className='hidden' type='file' id="scannedCopies" />
          </div> :
          <div>
            <label className='cursor-pointer flex justify-center items-center w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white' type='button' htmlFor="scannedCopies"><img className='w-[30px] m-auto' src='/WhiteLoading.svg' /></label>
          </div>
        }
      </div>
    </div>
  )
}