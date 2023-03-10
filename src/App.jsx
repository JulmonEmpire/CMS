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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Protected />}>
          <Route path="dashboard" element={<Layout><Dashboard /></Layout>}></Route>
          <Route path="patients" element={<Layout><Patients /></Layout>}>
            <Route index element={<PatientsList />}></Route>
            <Route end path="add-patient" element={<AddPatient />}></Route>
          </Route>
          <Route path="users" element={<Layout><Users /></Layout>}>
            <Route index element={<UsersList />}></Route>
            <Route end path="add-users" element={<AddUser />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
