// components/types.ts

// TYPES OF DATA
export interface Doctor {
  id: number;
  name: string;
  address: string;
  contact_info: string;
  experience_years: number;
  email: string;
  availability_hours: string;
  specialty: string;
  gender : string;
  phone: number
}

export interface City {
  id: number;
  name: string;
}

export interface Specialty {
  id: number;
  name: string;
}

export interface FormData {
  city: string;
  specialty: string;
  doctorName: string;
}
 