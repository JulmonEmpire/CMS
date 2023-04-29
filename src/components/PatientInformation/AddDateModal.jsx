import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { db, storage } from '../Utils/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { uid } from 'uid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function AddDateModal({ hideAddModal }) {
  const location = useLocation()
  const formRef = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const noteRef = useRef()

  const [notes, setNotes] = useState([]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      setLoading(true);
      const patientRef = doc(db, "patients", location.state.id);

      let datesOfConsultaion = [{ ...data }];
      if (location.state?.datesOfConsultaion !== undefined && location.state?.datesOfConsultaion?.length > 0) {
        datesOfConsultaion = [...location.state?.datesOfConsultaion, { ...data }];
      }
      await updateDoc(patientRef, { datesOfConsultaion: datesOfConsultaion });

      const notesArray = await Promise.all(notes?.map(async (file, index) => {
        let id = uid();
        let name = file.name.split(".")[0]
        let type = file.name.split(".")[1]
        const storageRef = ref(storage, `/notes/${file.name}`);
        const uploadTask = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        const patientRef = doc(db, "patients", location.state.id);
        const patientDoc = await getDoc(patientRef);

        if (patientDoc.exists()) {
          const patientData = patientDoc.data();

          var updatedNotes = [{ id: id, url, name: name, type: type, dateOfConsultation: data.date, dateOfConsultationId: data.id }];
          if (patientData?.notes !== undefined && patientData?.notes?.length > 0) {
            updatedNotes = [...patientData?.notes, { id: id, url, name: name, type: type, dateOfConsultation: data.date, dateOfConsultationId: data.id }];
          }
          await updateDoc(patientRef, { notes: updatedNotes });
          queryClient.invalidateQueries(['patients']);
          return { id: id, url, name: name, type: type, dateOfConsultation: data.date, dateOfConsultationId: data.id }
        }
      }));
      return [datesOfConsultaion, notesArray]

    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["patients"])
      toast.success("Date added successfully");
      hideAddModal();
      setLoading(false);
      if(location?.state?.notes !== undefined){
        navigate('.', { state: { ...location.state, datesOfConsultaion: res[0], notes: [...location?.state?.notes,...res[1]] } });
      }else{
        navigate('.', { state: { ...location.state, datesOfConsultaion: res[0], notes: [...res[1]] } });
      }
    },
    onError: (error) => {
      console.log(error)
      toast.error("Error adding date");
    }
  })

  const formHandler = async (e) => {
    e.preventDefault();
    let d = new Date(formRef.current.date.value)
    d = d.getTime();

    let nowTime = new Date();
    nowTime = nowTime.getTime();
    let data = {
      id: uid(),
      date: d,
      createdAt: nowTime
    }
    mutation.mutate(data);
  }

  return (
    <div onClick={() => hideAddModal()} className='absolute top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.25)] backdrop-blur-[4px] flex justify-center items-center'>
      <div onClick={(e) => { e.stopPropagation(); }} className='bg-white w-[600px] h-[400px] rounded-lg p-2 divide-y-2'>
        <div className='flex justify-between items-center'>
          <h1 className='py-4 px-2 text-xl font-bold text-[#595659]'>Add date of consultation</h1>
          <ImCross onClick={hideAddModal} className='mr-4 text-2xl cursor-pointer' />
        </div>
        <form onSubmit={formHandler} ref={formRef} className='px-2 flex flex-col gap-4 pt-4 justify-center h-[80%]'>
          <div className='w-full h-full overflow-auto'>
            <input required className='w-[100%] p-2 text-[#595659] border-[rgba(0,0,0,0.1)] border-2' type={'datetime-local'} name='date' placeholder='Type Date'></input>
            <div>
              <label className='cursor-pointer h-12 ml-2 flex items-center rounded-sm' type='button' htmlFor="scannedCopies">Add Notes</label>
              <input multiple accept="image/*, application/pdf, .doc, .docx" onChange={(e) => { setNotes((prev) => [...prev, e.target.files[0]]); }} className='hidden' type='file' id="scannedCopies" />
            </div>

            {notes?.map((file, index) => {
              return (
                <div className='flex gap-[6px]'>
                  <p className='font-[500]'>{index + 1 + ". "}</p>
                  <p>{file.name}</p>
                </div>
              )
            })}
          </div>
          <button disabled={loading ? true : false} className='w-28 h-10 self-center rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-lg text-white transition-colors duration-300' type='submit'>{loading ? <img className='w-[30px] m-auto' src='/WhiteLoading.svg' /> : "Submit"}</button>
        </form>
      </div>
    </div>
  )
}


// <div>
// <label className='cursor-pointer flex justify-center items-center w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white' type='button' htmlFor="scannedCopies"><img className='w-[30px] m-auto' src='/WhiteLoading.svg' /></label>
// </div>