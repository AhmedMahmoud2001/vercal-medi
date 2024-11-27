"use client";
import React from 'react';
import { useState } from 'react';
import styles from '../../styles/page.module.css'; // Import the CSS module
import Link from 'next/link';
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";
import { GiMedicines } from "react-icons/gi";
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { TbBackground } from 'react-icons/tb';
import Image from 'next/image';

import { BsFillHeartPulseFill } from "react-icons/bs";
import Navbar from '../../components/Navbar';
const Services: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
    <Navbar/>
    <div className={styles.servicesContainer}>
      <button className={styles.servicesb}>     
      <Link href="/telehealth" className={styles.links}><h1> <BsFillTelephoneFill /> TELE-HEALTH</h1></Link>
        <p>Consult with Doctors Anytime
          :Chat and Connect with Ease.</p>
      </button>
      <button className={styles.servicesb}>
      <Link href="/homevisit" className={styles.links}>  <h1> <IoIosHome /> HOME VISIT</h1></Link>
      
        <p>Expert Care, Right at Your Doorstep</p>
      </button>
      <button className={styles.servicesb}>
        <h1> <GiMedicines /> LABORATORY</h1>
        <p>Comprehensive Testing, Clear Results—Your Health Monitored</p>
      </button>
    </div>
    </div>
  );
};

export default Services;