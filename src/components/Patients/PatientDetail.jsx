import React, { useEffect, useRef, useState } from 'react'
import { CgDetailsMore } from "react-icons/cg"
import { useLocation, useNavigate } from 'react-router-dom';

export default function PatientDetail() {
  const formRef = useRef();
  const navigate = useNavigate();
  const location=useLocation();
  const [formData,setFormData]=useState({});
  console.log("1",location.state)

  useEffect(() => {
    if (location.state && location.state.data) {
      setFormData(location.state.data); // Retrieve data when returning to this route
    }
  }, [location]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    let data={
      ...location.state?.data,
      firstName:formRef.current.firstName.value,
      lastName:formRef.current.lastName.value,
      refferingDoctor:formRef.current.refferingDoctor.value,
      hospital:formRef.current.hospital.value,
      dateOfBirth:formRef.current.dateOfBirth.value,
      idNumber:formRef.current.idNumber.value,
      gender:formRef.current.gender.value,
      physicalAddress:formRef.current.physicalAddress.value,
      city:formRef.current.city.value,
      province:formRef.current.province.value,
      postalCode:formRef.current.postalCode.value,
      homePhone:formRef.current.homePhone.value,
      cellPhone:formRef.current.cellPhone.value,
      workPhone:formRef.current.workPhone.value,
      employementStatus:formRef.current.employementStatus.value,
      employee_school:formRef.current.employee_school.value,
      martialStatus:formRef.current.martialStatus.value,
      race:formRef.current.race.value,
    }
    navigate("/home/patients/add-patient/medical-aid",{state:{data:data}})
  }

  return (
    <div className='pt-4 px-4 h-full'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <CgDetailsMore className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>PATIENT’S DETAILS</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <div className='flex gap-4'>
          <input defaultValue={formData?.firstName} name='firstName' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='First Name' />
          <input defaultValue={formData?.lastName} name='lastName' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='Last Name' />
        </div>
        <input defaultValue={formData?.refferingDoctor} name='refferingDoctor' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Referring Doctor' />
        <input defaultValue={formData?.hospital} name='hospital' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Hospital' />
        <input defaultValue={formData?.dateOfBirth} name='dateOfBirth' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Date of Birth' type={"text"} onFocus={(e) => { e.target.type = "date"; }} onBlur={(e) => { if (e.target.value === "") { e.target.type = "text" }; }} />
        <input defaultValue={formData?.idNumber} name='idNumber' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='ID Number' type={"number"} />
        <select defaultValue={location.state?.data?.gender} name='gender' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Gender</option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
        </select>
        <input defaultValue={formData?.physicalAddress} name='physicalAddress' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Physical Address' type={"text"} />
        <div className='flex gap-4'>
          <input defaultValue={formData?.city} name='city' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='City' type={"text"} />
          <input defaultValue={formData?.province} name='province' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Province' type={"text"} />
        </div>
        <input defaultValue={formData?.postalCode} name='postalCode' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Postal Code' type={"text"} />
        <div className='flex gap-4'>
          <input defaultValue={formData?.homePhone} name='homePhone' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Home Phone' type={"number"} />
          <input defaultValue={formData?.cellPhone} name='cellPhone' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Cell Phone' type={"number"} />
          <input defaultValue={formData?.workPhone} name='workPhone' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Work Phone' type={"number"} />
        </div>
        <input defaultValue={formData?.employementStatus} name='employementStatus' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Employment Status' type={"text"} />
        <input defaultValue={formData?.employee_school} name='employee_school' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Employer/School' type={"text"} />
        <input defaultValue={formData?.martialStatus} name='martialStatus' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Marital Status' type={"text"} />
        <input defaultValue={formData?.race} name='race' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Race' type={"text"} />
        <button className='w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Next</button>
      </form>
    </div>
  )
}
