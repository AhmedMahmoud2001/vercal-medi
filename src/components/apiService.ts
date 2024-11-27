

/* export const getCities = async () => {
    const response = await fetch('http://localhost:5000/cities');
    return response.json();
};

export const getSpecialties = async () => {
    const response = await fetch('http://localhost:5000/specialties');
    return response.json();
}; */

export const getEmergencyServices = async (city: string) => {
    const response = await fetch(`http://localhost:5000/emergency?city=${city}`);
    return response.json();
};

export const searchDoctors = async (doctorName: string) => {
    const response = await fetch(`http://localhost:5000/search-doctors?doctorName=${doctorName}`);
    return response.json();
};

export const bookConsultation = async (consultationData: any) => {
  try {
    const response = await fetch('http://localhost:5000/consultations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultationData),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Error booking consultation.' };
  }
};

export const scheduleHomeVisit = async (visitData:any) => {
  const response = await fetch('http://localhost:5000/home-visits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(visitData)
  });
  return response.json();
};
// components/apiService.ts
export const reportEmergency = async (emergencyData: any) => {
  try {
    const response = await fetch('http://localhost:5000/emergencies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emergencyData),
    });

    if (!response.ok) {
      throw new Error('Failed to report emergency');
    }

    return await response.json(); // Return the response data
  } catch (error) {
    console.error('Error reporting emergency:', error);
    throw error;
  }
};
export const fetchMedicalHistory = async (user_id: number) => {
  const response = await fetch(`http://localhost:5000/medical-history?user_id=${user_id}`);
  return response.json();
};

export const signupDoctor = async (doctorData: any) => {
  try {
    const response = await fetch('http://localhost:5000/signupfordoctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to sign up the doctor.');
    }

    return await response.json(); // Return the response data
  } catch (error) {
    console.error('Error during doctor signup:', error);
    throw error;
  }
};


// apiService.ts

export const signup = async (userData: any) => {
  try {
    const response = await fetch('http://localhost:5000/signup', { // Adjust the URL based on your server's address
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    return await response.json(); // Return the response data
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};
export const login = async (loginData: any) => {
  try {
    const response = await fetch('http://localhost:5000/login', { // Adjust the URL based on your server's address
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    return await response.json(); // Return the response data
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};