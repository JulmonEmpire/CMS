import React, { useEffect, useRef, useState } from 'react'
import { AiFillMedicineBox } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MedicalAid() {
  const formRef = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  console.log("2", location.state)

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
      medicalAidName: formRef.current.medicalAidName.value,
      medicalAidNo: formRef.current.medicalAidNo.value,
      dependentCode: formRef.current.dependentCode.value,
      effectiveDate: formRef.current.effectiveDate.value,
      mainMember: formRef.current.mainMember.value,
      birthDate: formRef.current.birthDate.value,
      idNo: formRef.current.idNo.value,
      relationShipToPatient: formRef.current.relationShipToPatient.value,
    }
    console.log(data)
    navigate("/home/patients/add-patient/contact", { state: { data: data } })
  }

  const backNavigationHandler = () => {
    let data = {
      ...location.state.data,
      medicalAidName: formRef.current.medicalAidName.value,
      medicalAidNo: formRef.current.medicalAidNo.value,
      dependentCode: formRef.current.dependentCode.value,
      effectiveDate: formRef.current.effectiveDate.value,
      mainMember: formRef.current.mainMember.value,
      birthDate: formRef.current.birthDate.value,
      idNo: formRef.current.idNo.value,
      relationShipToPatient: formRef.current.relationShipToPatient.value,
    }
    navigate("/home/patients/add-patient", { state: { data: data} })
  }

  return (
    <div className='pt-4 px-4 h-[87vh]'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <AiFillMedicineBox className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>MEDICAL AID DETAILS</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <input defaultValue={formData?.medicalAidName} name="medicalAidName" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Medical Aid Name' />
        <input defaultValue={formData?.medicalAidNo} name="medicalAidNo" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Medical Aid No' type={"number"} />
        <input defaultValue={formData?.dependentCode} name="dependentCode" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Dependent code' type={"number"} />
        <input defaultValue={formData?.effectiveDate} name="effectiveDate" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Effective Date' type={"text"} onFocus={(e) => { e.target.type = "date"; }} onBlur={(e) => { if (e.target.value === "") { e.target.type = "text" }; }} />
        <input defaultValue={formData?.mainMember} name="mainMember" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Main Member' />
        <input defaultValue={formData?.birthDate} name="birthDate" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Birth Date' type={"text"} onFocus={(e) => { e.target.type = "date"; }} onBlur={(e) => { if (e.target.value === "") { e.target.type = "text" }; }} />
        <input defaultValue={formData?.idNo} name="idNo" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='ID No' />
        <select defaultValue={location.state?.data?.relationShipToPatient} name="relationShipToPatient" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={null}>Relationship to Patient</option>
          <option value={"Self"}>Self</option>
          <option value={"Spouse"}>Spouse</option>
          <option value={"Parent/Guardian"}>Parent/Guardian</option>
          <option value={"Child"}>Child</option>
          <option value={"Other"}>Other</option>
        </select>
        <div className='flex gap-4 mt-2'>
          <button onClick={() => { backNavigationHandler() }} className='w-32 h-12 border-2 border-[#AE89A5] text-xl text-[#AE89A5] hover:bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:text-white'>Back</button>
          <button className='w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Next</button>
        </div>
      </form>
    </div>
  )
}
