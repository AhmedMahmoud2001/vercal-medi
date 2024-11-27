"use client";
import React from 'react';
import { useState } from 'react';
import styles from '../../styles/page.module.css'; // Import the CSS module
import Link from 'next/link';
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { BsFillHeartPulseFill } from "react-icons/bs";
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import { BiSolidOffer } from "react-icons/bi";
const Offers: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <Navbar/>
      <h1 style={{textAlign:'center',fontSize:'40px' }  }><BiSolidOffer />offers</h1>
      <p  style={{textAlign:'center' ,backgroundColor:'pink',fontSize:'25px'}  }>Exciting deals are just around the corner! While we donot  have any offers available at the moment ,
        we are gearing up to bring you the best soon</p>
        <BiSolidOffer /><BiSolidOffer />
        <Image  src="/assets/of.jpg"   alt='offer'   width={1600}
        height={300} />
    </div>
  );
};

export default Offers ;