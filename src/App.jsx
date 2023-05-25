import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "./components/Utils/Layout";
import AddPatient from "./components/Patients/AddPatient";
import PatientsList from "./components/Patients/PatientsList";
import Protected from "./components/Utils/Protected";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Users from "./pages/Users";
import UsersList from "./components/Users/UsersList";
import AddUser from "./components/Users/AddUser";
import PatientDetail from "./components/Patients/PatientDetail";
import MedicalAid from "./components/Patients/MedicalAid";
import PatientContact from "./components/Patients/PatientContact";
import { ToastContainer } from "react-toastify";
import EditUser from "./components/Users/EditUser";
import Hospital from "./pages/PlacesOfService";
import Doctor from "./pages/Doctors";
import PlacesOfService from "./pages/PlacesOfService";
import Doctors from "./pages/Doctors";
import MedicalAids from "./pages/MedicalAids";
import MedicalAidList from "./components/MedicalAid/MedicalAidList";
import AddMedicalAid from "./components/MedicalAid/AddMedicalAid";
import DoctorList from "./components/Doctor/DoctorList";
import AddDoctor from "./components/Doctor/AddDoctor";
import PlacesOfServiceList from "./components/PlacesOfService/PlacesOfServiceList";
import AddPlacesOfService from "./components/PlacesOfService/AddPlacesOfService";
import PatientInformation from "./components/Patients/PatientInformation";
import PatientContactInformation from "./components/PatientInformation/PatientContactInformation";
import MedicalAidInformation from "./components/PatientInformation/MedicalAidInformation";
import PatientDetailInformation from "./components/PatientInformation/PatientDetailInformation";
import PatientNotes from "./components/PatientInformation/PatientNotes";
import EditMedicalAid from "./components/MedicalAid/EditMedicalAid";
import EditPlacesOfService from "./components/PlacesOfService/EditPlacesOfService";
import EditDoctor from "./components/Doctor/EditDoctor";
import EditPatientDetail from "./components/Patients/EditPatientDetail";
import EditPatientMedicalAid from "./components/Patients/EditPatientMedicalAid";
import EditPatientContact from "./components/Patients/EditPatientContact";
import DatesOfConsultaion from "./components/PatientInformation/DatesOfConsultaion";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function App() {

  const queryClient = useQueryClient();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  // useEffect(() => {
  //   setUser(queryClient.getQueryData(['user']));
  // }, [])

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/" element={<Protected />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="patients">
              <Route element={<Patients />}>
                <Route index element={<PatientsList />}></Route>
                <Route path="add-patient" element={<AddPatient />}>
                  <Route index element={<PatientDetail />}></Route>
                  <Route path="medical-aid" element={<MedicalAid />}></Route>
                  <Route path="contact" element={<PatientContact />}></Route>
                </Route>
              </Route>
              <Route path="edit" element={<EditPatientDetail />}></Route>
              <Route path="edit-medical-aid" element={<EditPatientMedicalAid />}></Route>
              <Route path="edit-contact" element={<EditPatientContact />}></Route>
            </Route>
            <Route path="patients-information" element={<PatientInformation></PatientInformation>}>
              <Route index element={<PatientDetailInformation></PatientDetailInformation>}></Route>
              <Route path="medical-aid" element={<MedicalAidInformation></MedicalAidInformation>}></Route>
              <Route path="contact" element={<PatientContactInformation></PatientContactInformation>}></Route>
              <Route path="notes" element={<PatientNotes></PatientNotes>}></Route>
              <Route path="date-of-consultation" element={<DatesOfConsultaion></DatesOfConsultaion>}></Route>
            </Route>
            {user?.role === "Super User" &&
              <Route path="users" element={<Users />}>
                <Route index element={<UsersList />}></Route>
                <Route end path="add-users" element={<AddUser />}></Route>
                <Route end path="edit-user" element={<EditUser />}></Route>
              </Route>
            }
            <Route path="medical-aids" >
              <Route element={<MedicalAids />}>
                <Route index element={<MedicalAidList />}></Route>
                <Route end path="add" element={<AddMedicalAid />}></Route>
              </Route>
              <Route end path="edit" element={<EditMedicalAid />}></Route>
            </Route>
            <Route path="places-of-service" >
              <Route element={<PlacesOfService />}>
                <Route index element={<PlacesOfServiceList />}></Route>
                <Route end path="add" element={<AddPlacesOfService />}></Route>
              </Route>
              <Route end path="edit" element={<EditPlacesOfService />}></Route>
            </Route>
            <Route path="doctors">
              <Route element={<Doctors />}>
                <Route index element={<DoctorList />}></Route>
                <Route end path="add" element={<AddDoctor />}></Route>
              </Route>
              <Route end path="edit" element={<EditDoctor />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
