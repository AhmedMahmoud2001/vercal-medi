"use client";
import React from 'react';
import { useState } from 'react';
import styles from '../../styles/page.module.css'; // Import the CSS module
import Link from 'next/link';
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { TbBackground } from 'react-icons/tb';
import Image from 'next/image';
import { BsFillHeartPulseFill } from "react-icons/bs";
import Navbar from '../../components/Navbar';
const About: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
     <Navbar/>
      <h1 ><strong>OUR STORY</strong></h1>
      <table> 
         <tr> 
        <th>
      <div  > 
        Welcome to our medical application, designed to enhance patient care through secure medical history storage,
        personalized treatment recommendations, and accurate diagnosis validation. Our platform ensures healthcare providers
          have instant access to comprehensive patient records,  enabling informed decisions. Using advanced algorithms,
            we offer tailored treatment options and validate diagnoses by cross-referencing patient data with an extensive
             medical database. Our integrated features aim to improve patient outcomes and support exceptional medical care. </div></th>
        <th><Image  src="/assets/ab.jpg"   alt='about'   width={400}
        height={300} /></th> </tr>
     </table>
       
      </div>
         
      );
};
export default About;