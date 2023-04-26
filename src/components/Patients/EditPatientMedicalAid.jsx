import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillMedicineBox } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { db } from '../Utils/firebase';

const validationSchema = Yup.object().shape({
  medicalAidName: Yup.object().nullable(true).required('MedicalAid is required').notOneOf(["null"]),
  memberShipNumber: Yup.string().required('Membership number is required'),
  dependentCode: Yup.string().required('Dependent Code is required'),
  mainMember: Yup.string().required('Main member is required'),
  idNo: Yup.string().nullable(false).required('ID No is required'),
  relationShipToPatient: Yup.string().nullable(true).required('Relationship to patient is required').notOneOf(["null"]),
});

export default function EditPatientMedicalAid() {
  const formRef = useRef();
  const navigate = useNavigate();

  const location = useLocation();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (location.state && location.state.data) {
      setFormData(location.state.data);
    }
  }, [location]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      ...location.state.data,
      medicalAidName: JSON.parse(formRef.current.medicalAidName.selectedOptions[0].getAttribute('data-option')),
      memberShipNumber: formRef.current.memberShipNumber.value,
      dependentCode: formRef.current.dependentCode.value,
      mainMember: formRef.current.mainMember.value,
      idNo: formRef.current.idNo.value,
      relationShipToPatient: formRef.current.relationShipToPatient.value,
    }

    try {
      await validationSchema.validate(data, { abortEarly: false });
      // Form is valid
      navigate("/patients/edit-contact", { state: { data: data } })
    } catch (errors) {
      console.error(errors.inner[0]);
      // toast.error(errors.inner[0].path+" is required");
      toast.error(errors.inner[0].message + "");
    }
  }

  const backNavigationHandler = () => {
    let data = {
      ...location.state.data,
      medicalAidName: formRef.current.medicalAidName.value,
      memberShipNumber: formRef.current.memberShipNumber.value,
      dependentCode: formRef.current.dependentCode.value,
      mainMember: formRef.current.mainMember.value,
      idNo: formRef.current.idNo.value,
      relationShipToPatient: formRef.current.relationShipToPatient.value,
    }

    navigate("/patients/edit", { state: { data: data } })
  }

  const queryClient = useQueryClient();
  const [medicalAid, setMedicalAid] = useState();
  useEffect(() => {
    setMedicalAid(queryClient.getQueryData(['medicalAid']))
  }, [queryClient]);

  const updateMutation=useMutation({
    mutationFn:async(data)=>{
      const patientRef = doc(db, "patients", location.state.data.id);
      const result=updateDoc(patientRef,data)
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
      medicalAidName: JSON.parse(formRef.current.medicalAidName.selectedOptions[0].getAttribute('data-option')),
      memberShipNumber: formRef.current.memberShipNumber.value,
      dependentCode: formRef.current.dependentCode.value,
      mainMember: formRef.current.mainMember.value,
      idNo: formRef.current.idNo.value,
      relationShipToPatient: formRef.current.relationShipToPatient.value,
    }

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
          <AiFillMedicineBox className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>EDIT MEDICAL AID DETAILS</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <select key={formData?.medicalAidName?.id} defaultValue={formData?.medicalAidName?.id} name="medicalAidName" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Medical Aid Name</option>
          {medicalAid?.map((ma) => {
            return (
              <option value={ma.id} data-option={JSON.stringify(ma)}>{ma?.name}</option>
            )
          })}
        </select>
        <input defaultValue={formData?.memberShipNumber} name="memberShipNumber" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Membership Number' type={"number"} />
        <input defaultValue={formData?.dependentCode} name="dependentCode" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Dependent code' type={"number"} />
        <input defaultValue={formData?.mainMember} name="mainMember" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Main Member' />
        <input defaultValue={formData?.idNo} name="idNo" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='ID No' />
        <select defaultValue={location.state?.data?.relationShipToPatient} name="relationShipToPatient" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Relationship to Patient</option>
          <option value={"Self"}>Self</option>
          <option value={"Spouse"}>Spouse</option>
          <option value={"Parent/Guardian"}>Parent/Guardian</option>
          <option value={"Child"}>Child</option>
          <option value={"Other"}>Other</option>
        </select>
        <div className='flex gap-4 mt-2'>
          <button onClick={() => { backNavigationHandler() }} className='w-32 h-12 border-2 border-[#AE89A5] text-xl text-[#AE89A5] hover:bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:text-white'>Back</button>
          <button className='w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Next</button>
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
