"use client";
import React from 'react';
import { useState } from 'react';
import styles from '../../styles/page.module.css'; // Import the CSS module
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { TbBackground } from 'react-icons/tb';
import { FaHome } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import Image from 'next/image';
import { BsFillHeartPulseFill } from "react-icons/bs";
import { GoHistory } from "react-icons/go";
import { FaAmbulance } from "react-icons/fa";
import { MdOutlineElderlyWoman } from "react-icons/md";


const Elder = () => {
    const [toggle, setToggle] = useState(false);
  return (
    
    <div>
        <Navbar/>
   

    <div className={styles.servicesContainer}>
      <header className={styles.headerr}>
        <h1>Welcome to Your Health Services</h1>
        <p>Providing accessible healthcare services for elderly individuals.</p>
      
      </header>

      
        <div className={styles.servicee}>
          <h2><IoVideocam /> Remote Consultations</h2>
          <p>Book a video consultation with your healthcare provider from the comfort of your home.</p>
          <Link href="/remote-consultations"className={styles.buttonn}>
            Book a Consultation
          </Link>
        </div>


        <div className={styles.servicee}>
          <h2><FaHome /> Home Visits</h2>
          <p>Schedule a home visit for personalized care and support.</p>
          <Link href="/home-visits"
            className={styles.buttonn}>Schedule a Visit
          </Link>
        </div>
  
        <div className={styles.servicee}>
          <h2><FaAmbulance /> Emergency</h2>
          <p>Rapid Ambulance Dispatch for Urgent Care.</p>
          <Link href="/medication-reminders" className={styles.buttonn}>Emergency
          </Link>
        </div>

        <div className={styles.servicee}>
          <h2><GoHistory /> Medical History Tracking</h2>
          <p>Monitor your health metrics and track your progress over time.</p>
          <Link href="/health-tracking"
           className={styles.buttonn}>Track Your Health
          </Link>
        </div>
     

      
    </div>
  </div>
);
    

};

export default Elder;