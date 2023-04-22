import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import { MdContactEmergency } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from '../Utils/firebase';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  emergencyFirstName: Yup.string().nullable(true).required('First Name is required'),
  emergencylastName: Yup.string().required('Last Name is required'),
  emergencyrelationShipToPatient: Yup.string().required('Relationship to Patient is required'),
  emergencyWorkPhone: Yup.string().required('Work Phone: is required'),
  emergencyCellPhone: Yup.string().nullable(false).required('Cell Phone is required'),
});
export default function EditPatientContact() {

  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (location.state && location.state.data) {
      setFormData(location.state.data);
    }
  }, [location]);

  const addPatientMutation = useMutation({
    mutationFn: async (data) => {
      const randomNum = Math.floor(Math.random() * 90) + 10;
      let userId = data.idNumber.slice(0, 6);
      userId = userId + randomNum
      const result = await setDoc(doc(db, "patients", userId), data);
      return result;
    },
    onSuccess: () => {
      toast.success("Patient Added");
      queryClient.invalidateQueries(['patients']);
      navigate("/patients");
    },
    onError: (error) => {
      toast.error("Error adding Patient");
      console.log(error)
    }
  })

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      ...location.state.data,
      emergencyFirstName: formRef.current.emergencyFirstName.value,
      emergencylastName: formRef.current.emergencylastName.value,
      emergencyrelationShipToPatient: formRef.current.emergencyrelationShipToPatient.value,
      emergencyWorkPhone: formRef.current.emergencyWorkPhone.value,
      emergencyCellPhone: formRef.current.emergencyCellPhone.value,
    };

    try {
      await validationSchema.validate(data, { abortEarly: false });
      // Form is valid
      addPatientMutation.mutate(data);
    } catch (errors) {
      console.error(errors.inner[0]);
      toast.error(errors.inner[0].message + "");
    }
  }

  const backNavigationHandler = () => {
    let data = {
      ...location.state.data,
      emergencyFirstName: formRef.current.emergencyFirstName.value,
      emergencylastName: formRef.current.emergencylastName.value,
      emergencyrelationShipToPatient: formRef.current.emergencyrelationShipToPatient.value,
      emergencyWorkPhone: formRef.current.emergencyWorkPhone.value,
      emergencyCellPhone: formRef.current.emergencyCellPhone.value,
    }
    navigate("/patients/edit-medical-aid", { state: { data: data } })
  }


  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const patientRef = doc(db, "patients", location.state.data.id);
      const result = updateDoc(patientRef, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
      toast.success("Patient updated successfully");
      navigate('/patients');
    },
    onError: () => {
      console.log(error);
      toast.error("Error applying changes");
    }
  })

  const updatePatientHandler = async () => {
    const data = {
      ...location.state.data,
      emergencyFirstName: formRef.current.emergencyFirstName.value,
      emergencylastName: formRef.current.emergencylastName.value,
      emergencyrelationShipToPatient: formRef.current.emergencyrelationShipToPatient.value,
      emergencyWorkPhone: formRef.current.emergencyWorkPhone.value,
      emergencyCellPhone: formRef.current.emergencyCellPhone.value,
    };


    try {
      await validationSchema.validate(data, { abortEarly: false });
      // Form is valid
      updateMutation.mutate(data);
    } catch (errors) {
      console.error(errors);
      toast.error(errors.inner[0].message + "");
    }
  }

  return (
    <div className='pt-4 px-4 h-[87vh]'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <MdContactEmergency className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>EDIT NEXT OF KIN</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <div className='flex gap-4'>
          <input defaultValue={formData.emergencyFirstName} name="emergencyFirstName" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='First Name' />
          <input defaultValue={formData.emergencylastName} name="emergencylastName" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='Last Name' />
        </div>
        <input defaultValue={formData.emergencyrelationShipToPatient} name="emergencyrelationShipToPatient" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Relationship to Patient' type={"text"} />
        <input defaultValue={formData.emergencyWorkPhone} name="emergencyWorkPhone" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Work Phone' type={"number"} />
        <input defaultValue={formData.emergencyCellPhone} name="emergencyCellPhone" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Cell Phone' type={"number"} />
        <div className='flex gap-4 mt-2'>
          <button onClick={(e) => { backNavigationHandler(); e.stopPropagation() }} type="button" className='w-32 h-12 border-2 border-[#AE89A5] text-xl text-[#AE89A5] hover:bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:text-white'>Back</button>
          {updateMutation.isLoading ?
            <button type='button' className='w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'><img className='m-auto w-[30px]' src='/WhiteLoading.svg' /></button>
            :
            <button onClick={updatePatientHandler} type='button' className='w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Update</button>
          }
        </div>
      </form>
    </div>
  )
}