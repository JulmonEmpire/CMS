import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import { CgDetailsMore } from "react-icons/cg"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().nullable(false).required('Title is required').notOneOf(["null"],"Select title from given values"),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  refferingDoctor: Yup.object().nullable(false).required('Referring doctor is required'),
  placesOfService: Yup.object().nullable(false).required('places of service is required'),
  idNumber: Yup.string().required('ID number is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  gender: Yup.string().nullable(false).required('Gender is required').notOneOf(["null"],"Select Gender from given values"),
  age: Yup.string().nullable(false).required('Age is required'),
  physicalAddress: Yup.string().required('Physical address is required'),
  city: Yup.string().required('City is required'),
  province: Yup.string().required('Province is required'),
  postalCode: Yup.string().required('Postal code is required'),
  martialStatus: Yup.string().nullable(false).required('Martial Status is required').notOneOf(["null"],"Select Martial Status from given values"),
  race: Yup.string().nullable(false).required('Race is required').notOneOf(["null"],"Select Race from given values"),
});


export default function PatientDetail() {
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

    let data = {
      ...location.state?.data,
      title: formRef.current.title.value,
      firstName: formRef.current.firstName.value,
      lastName: formRef.current.lastName.value,
      email: formRef.current.email.value,
      refferingDoctor: JSON.parse(formRef.current.refferingDoctor.selectedOptions[0].getAttribute('data-option')),
      placesOfService: JSON.parse(formRef.current.placesOfService.selectedOptions[0].getAttribute('data-option')),
      dateOfBirth: formRef.current.dateOfBirth.value,
      idNumber: formRef.current.idNumber.value,
      gender: formRef.current.gender.value,
      age: formRef.current.age.value,
      physicalAddress: formRef.current.physicalAddress.value,
      city: formRef.current.city.value,
      province: formRef.current.province.value,
      postalCode: formRef.current.postalCode.value,
      cellPhone: formRef.current.cellPhone.value,
      workPhone: formRef.current.workPhone.value,
      martialStatus: formRef.current.martialStatus.value,
      race: formRef.current.race.value,
    }

    try {
      await validationSchema.validate(data,{ abortEarly: false });
      // Form is valid
      navigate("/patients/add-patient/medical-aid", { state: { data: data } })
    } catch (errors) {
      console.error(errors.inner[0]);
      toast.error(errors.inner[0].message+"");
    }
  }

  const [automaticDate, setAutomaticDate] = useState();

  const handleBlur = (e) => {
    if (e.target.value === "" || e.target.value === null || e.target.value === undefined || e.target.value.length !== 6) {
      if (formData?.dateOfBirth) {
        formRef.current.dateOfBirth.type = "text";
      }
      setAutomaticDate(null);
      return
    }

    let year = e.target.value.slice(0, 2);
    const month = e.target.value.slice(2, 4);
    const day = e.target.value.slice(4, 6);
    let currentYear = new Date()
    let newCurrentYear = currentYear.getFullYear().toString().slice(2, 4)
    if (+year < +newCurrentYear && +year >= "00") {
      year = currentYear.getFullYear().toString().slice(0, 2) + year;
    } else {
      year = "19" + year;
    }
    formRef.current.dateOfBirth.type = "date";
    const date = year + '-' + month + '-' + day;
    formRef.current.dateOfBirth.defaultValue = date;
    setAutomaticDate(date);
  }

  const queryClient = useQueryClient();
  const [doctors, setDoctors] = useState();
  const [placesOfService, setPlacesOfService] = useState();
  useEffect(() => {
    setDoctors(queryClient.getQueryData(['doctor']))
    setPlacesOfService(queryClient.getQueryData(['placesOfService']))
  }, [queryClient]);


  return (
    <div className='pt-4 px-4 h-full'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <CgDetailsMore className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>PATIENT’S DETAILS</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <select defaultValue={location.state?.data?.title} name='title' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Title</option>
          <option value={"Mr"}>Mr</option>
          <option value={"Mrs"}>Mrs</option>
          <option value={"Miss"}>Miss</option>
          <option value={"Ms"}>Ms</option>
        </select>
        <div className='flex gap-4'>
          <input defaultValue={formData?.firstName} name='firstName' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='First Name' />
          <input defaultValue={formData?.lastName} name='lastName' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='Last Name' />
        </div>
        <input value={formData?.email} name='email' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Email' type={'email'} />
        <select key={formData?.refferingDoctor?.id} defaultValue={formData?.refferingDoctor?.id} name='refferingDoctor' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Referring Doctor</option>
          {doctors?.map((doctor) => {
            return (
              <option value={doctor.id} data-option={JSON.stringify(doctor)}>{doctor?.firstName}</option>
            )
          })}
        </select>
        <select key={formData?.placesOfService?.id} defaultValue={formData?.placesOfService?.id} name='placesOfService' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Places Of Service</option>
          {placesOfService?.map((place) => {
            return (
              <option value={place.id} data-option={JSON.stringify(place)}>{place?.name}</option>
            )
          })}
        </select>
        <input onBlur={(e) => { handleBlur(e) }} defaultValue={formData?.idNumber} name='idNumber' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='ID Number' type={"number"} />
        <input value={automaticDate || formData?.dateOfBirth} name='dateOfBirth' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Date of Birth' type={formData?.dateOfBirth ? "date" : "text"} onFocus={(e) => { e.target.type = "date"; }} onBlur={(e) => { if (e.target.value === "") { e.target.type = "text" }; }} />
        <input defaultValue={formData?.age} name='age' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Age' type={"number"} />
        <select defaultValue={location.state?.data?.age} name='gender' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Gender</option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
          <option value={"Other"}>Other</option>
        </select>
        <input defaultValue={formData?.physicalAddress} name='physicalAddress' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Physical Address' type={"text"} />
        <div className='flex gap-4'>
          <input defaultValue={formData?.city} name='city' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='City' type={"text"} />
          <input defaultValue={formData?.province} name='province' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Province' type={"text"} />
        </div>
        <input defaultValue={formData?.postalCode} name='postalCode' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Postal Code' type={"text"} />
        <div className='flex gap-4'>
          <input defaultValue={formData?.cellPhone} name='cellPhone' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Cell Phone' type={"number"} />
          <input defaultValue={formData?.workPhone} name='workPhone' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Work Phone' type={"number"} />
        </div>
        <select defaultValue={location.state?.data?.martialStatus} name='martialStatus' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Martial Status</option>
          <option value={"Single"}>Single</option>
          <option value={"Married"}>Married</option>
          <option value={"Separated"}>Separated</option>
          <option value={"Widowed"}>Widowed</option>
          <option value={"Other"}>Other</option>
        </select>
        <select defaultValue={location.state?.data?.race || null} name='race' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Race</option>
          <option value={"African"}>African</option>
          <option value={"Asian"}>Asian</option>
          <option value={"White"}>White</option>
          <option value={"Coloured"}>Coloured</option>
          <option value={"Other"}>Other</option>
        </select>
        <button className='w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Next</button>
      </form>
    </div>
  )
}


