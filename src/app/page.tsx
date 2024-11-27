"use client";
import React, { useEffect, useState } from 'react';
import styles from '../styles/page.module.css'; // Import the CSS module
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";
import { MdElderlyWoman } from "react-icons/md";
import Image from 'next/image';
import { Doctor,Specialty, City, FormData } from '../components/types';
import { /* getCities,getSpecialties, */ getEmergencyServices, searchDoctors } from '../components/apiService'; // Import API service functions

const Home: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [formData, setFormData] = useState<FormData>({ city: '', doctorName: '', specialty: '' });
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);

 
  // Fetch cities and specialties
  useEffect(() => {
    const fetchData = async () => {
      /* const fetchedCities = await getCities();
      const fetchedSpecialties = await getSpecialties(); */
      /* setCities(fetchedCities);
      setSpecialties(fetchedSpecialties); */
    };

    fetchData();
  }, []);

  //  input changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Emergency button click 
  const handleEmergencyClick = async () => {
    const { city } = formData;

    if (!city) {
      alert('Please select a city');
      return;
    }
    const data = await getEmergencyServices(city);
    alert('Help is on the way!');
  };

  // Handle Search button click 
  const handleSearchClick = async () => {
    const { doctorName } = formData;

    if (!doctorName) {
      alert('Please enter a doctor\'s name');
      return;
    }
    const data = await searchDoctors(doctorName); 
    setSearchResults(data);
  };

  return (
    <div className={styles.home}>
      <Navbar />
      <h1>
        <blockquote className={styles.p1}>Better Health Care For a Better Life</blockquote>
      </h1>
      <table className={styles.table1} border={1} cellSpacing={20}>
        <tbody>
          <tr>
            <th><button className={styles.Emerg} type="button" onClick={handleEmergencyClick}>Emergency</button></th>
            <th><label htmlFor="specialty">Select a specialty</label>
              <select id="specialty" name="specialty" value={formData.specialty} onChange={handleChange}>
                <option value="">Select a specialty</option>
                {/* {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.name}>{specialty.name}</option>
                ))} */}
              </select>
            </th>
            <th>
              <label htmlFor="cities">Select a city</label>
              <select id="cities" name="city" value={formData.city} onChange={handleChange}>
                <option value="">Select a city</option>
                {/* {cities.map((city) => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))} */}
              </select>
            </th>
            <th>
              
              
            <button >
            <label htmlFor="cities" ><Link href="/signupfordoctor" className={styles.links}> Sign up for Doctors </Link> </label>
             </button>
           
            </th>
            <th>
              <label htmlFor="searchdoctor">Search doctor name</label>
              <input type="text" id="searchdoctor" name="searchdoctor" />
            </th>
            <th><button className={styles.Emerg} name="button" type="button">Search</button></th>
          
          </tr>
        </tbody>
      </table>

    {/*  DisplayDoctors */} 
      {searchResults.length > 0 && (
        <div>
          <h2>Doctors Found:</h2>
          <ul>
            {searchResults.map(doctor => (
              <li key={doctor.id}>
                <strong>{doctor.name}</strong> <br />
                Gender: {doctor.gender} <br />
                Email: {doctor.email} <br />
                Phone: {doctor.phone} <br />
                Specialty: {doctor.specialty} <br />
               
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* servicessection */}
      <div className={styles.servicesContainer}>
        <button className={styles.servicesb}>
          <h1><BsFillTelephoneFill /> TELE-HEALTH</h1>
          <p>Consult with Doctors Anytime: Chat and Connect with Ease.</p>
        </button>
        <button className={styles.servicesb}>
          <h1><IoIosHome /> HOME VISIT</h1>
          <p>Expert Care, Right at Your Doorstep</p>
        </button>
        <button className={styles.servicesb}>
          <Link href="/elder" className={styles.link}>
            <h1><MdElderlyWoman /> Elder people</h1>
          </Link>
          <p>Expert Care, Right at Your Doorstep</p>
        </button>
      </div>

      {/* imagesection */}
      <div className={styles.blogs}>
        <Image src="/assets/blog1.jpg" alt='offer' width={900} height={800} className={styles.blogss} />
        <Image src="/assets/blog2.jpg" alt='offer' width={900} height={800} className={styles.blogss} />
        <Image src="/assets/blog3.jpg" alt='offer' width={900} height={800} className={styles.blogss} />
        <Image src="/assets/blog3.png" alt='offer' width={900} height={800} className={styles.blogss} />
        <Image src="/assets/blog4.png" alt='offer' width={900} height={800} className={styles.blogss} />
        <Image src="/assets/blog2.png" alt='offer' width={900} height={800} className={styles.blogss} />
      </div>
    </div>
  );
};

export default Home;
