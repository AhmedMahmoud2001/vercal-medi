// pages/medical-history.tsx
"use client";
import React, { useState } from 'react';
import { fetchMedicalHistory } from '../../components/apiService';

const MedicalHistory = () => {
  const [userId, setUserId] = useState('');
  const [history, setHistory] = useState<any[]>([]);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await fetchMedicalHistory(Number(userId));
    setHistory(data);
  };

  return (
    <div>
      <h1>View Medical History</h1>
      <form onSubmit={handleFetch}>
        <input type="number" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} required />
        <button type="submit">Fetch History</button>
      </form>
      {history.length > 0 && (
        <div>
          <h2>Medical History:</h2>
          <ul>
            {history.map((record) => (
              <li key={record.record_id}>
                Diagnosis: {record.diagnosis} <br />
                Prescription: {record.prescription} <br />
                Date: {record.consultation_date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
