import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { db } from '../components/Utils/firebase';

export default function Dashboard() {

  const medicalAidQuery = useQuery(["medicalAid"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "medicalAid"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      console.log(doc.id);
      medicalAiddata.id = doc.id;
      data.push(medicalAiddata);
    })
    console.log(data);
    return data;
  });

  const hospitalQuery = useQuery(["hospital"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "hospital"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      medicalAiddata.id=doc.id;
      data.push(medicalAiddata);
    })
    return data;
  });

  const doctorQuery = useQuery(["doctor"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "doctor"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      medicalAiddata.id=doc.id;
      data.push(medicalAiddata);
    })
    return data;
  });

  return (
    <div>Dashboard</div>
  )
}
