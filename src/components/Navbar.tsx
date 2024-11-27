"use client";
import React from 'react';
import { useState } from 'react';
import styles from  '../styles/page.module.css'; // Import the CSS module
import Link from 'next/link';
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { TbBackground } from 'react-icons/tb';
import Image from 'next/image';
import { BsFillHeartPulseFill } from "react-icons/bs";
const Navbar: React.FC = () => {
    const[toggle,setToggle]=useState(false);
  return (
    <div>
      <nav className={styles.navbar}>
<div className={styles.navdiv}>
  <div className={styles.menu} onClick={() => setToggle(prev => !prev)}>
    {toggle ? <MdClose /> : <TiThMenu />}
  </div><h4 className={styles.logo2}> <BsFillHeartPulseFill /> </h4>
  <p className={styles.logo1}>Medicare</p>

  <div className={`${styles.navlink} ${toggle ? styles.show : ''}`}>
  
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
    <Link href="/telehealth">TeleHealth</Link>
    <Link href="/services">Services</Link>
    <Link href="/offers">Offers</Link>
    <Link href="contact">Contact us</Link>
    <button className={styles.b1}>
      <Link href="/login">Login</Link>
    </button>
    <button className={styles.b2}>
      <Link href="/signup">Signup</Link>
    </button>
  </div>
</div>
</nav> <br/> <br/> 
    </div>
  );
};

export default Navbar ;


