// pages/home-visits.tsx
"use client";
import React, { useState } from 'react';
import { scheduleHomeVisit } from '../../components/apiService';

const HomeVisits = () => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [address, setAddress] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { patient_id: Number(patientId), doctor_id: Number(doctorId), address, visit_date: visitDate, status };
    const response = await scheduleHomeVisit(data);
    setMessage(response.message);
  };

  return (
    <div>
      <h1>Schedule a Home Visit</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Patient ID" value={patientId} onChange={e => setPatientId(e.target.value)} required />
        <input type="number" placeholder="Doctor ID" value={doctorId} onChange={e => setDoctorId(e.target.value)} required />
        <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <input type="datetime-local" value={visitDate} onChange={e => setVisitDate(e.target.value)} required />
        <button type="submit">Schedule Visit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HomeVisits;
