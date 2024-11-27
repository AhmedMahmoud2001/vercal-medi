// pages/emergency-form.tsx
"use client";
import React, { useState } from 'react';
import { reportEmergency } from '../../components/apiService';

const EmergencyForm = () => {
  const [patientId, setPatientId] = useState('');
  const [location, setLocation] = useState('');
  const [requestTime, setRequestTime] = useState('');
  const [status, setStatus] = useState('requested');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setError(''); // Clear previous errors

    const data = { 
      patient_id: Number(patientId), 
      request_time: requestTime, 
      location, 
      status 
    };

    try {
      const response = await reportEmergency(data);
      setMessage(response.message); // Show success message
    } catch (err) {
      setError('Error reporting emergency. Please try again.'); // Show error message
    }
  };

  return (
    <div>
      <h1>Emergency Request</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          placeholder="Patient ID" 
          value={patientId} 
          onChange={e => setPatientId(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Location" 
          value={location} 
          onChange={e => setLocation(e.target.value)} 
          required 
        />
        <input 
          type="datetime-local" 
          value={requestTime} 
          onChange={e => setRequestTime(e.target.value)} 
          required 
        />
        <button type="submit">Submit Emergency</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EmergencyForm;
