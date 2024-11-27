"use client";

import useUser from "../hooks/useUser";
import Image from "next/image";
import React from 'react';
import { useState } from 'react';
import styles from '../../styles/page.module.css';

import { useRouter } from "next/navigation";
import { useEffect} from "react";
import { v4 as uuid } from "uuid";


import { IoMail } from "react-icons/io5";

import Navbar from '../../components/Navbar';
const Meet = () => { 
  const { fullName, setFullName } = useUser();
  const [roomID, setRoomID] = useState("");
  const router = useRouter();

  useEffect(() => {
    setFullName("");
  }, []);

  return ( 
    <div>
  <Navbar />
    <div className={styles.conmet}>
    <section className={styles["form-conmet"]}>
     
      <h1 className={styles.titleconmet}>Have a smooth meeting</h1>
      <h2 className={styles.subtitleconmet}>with team members</h2>
      <p className={styles.descriptionconmet}>
      
      </p>
      <div className={styles["input-groupconmet"]}>
        <input
          type="text"
          id="name"
          onChange={(e) => setFullName(e.target.value)}
          className={styles.input}
          placeholder="Enter your name"
        />
      </div>
      {fullName && fullName.length >= 3 && (
        <>
          <div className={styles["input-groupconmet"]}>
            <input
              type="text"
              id="roomid"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              className={styles.input}
              placeholder="  Enter room ID to join a meeting  "
            />
          </div>
          <button
            className={`${styles.button} ${styles["join-buttonconmet"]}`}
            onClick={() => router.push(`/room/${roomID}`)}
            disabled={!roomID}
          >
            Join
          </button>
          <button
            className={`${styles.button} ${styles["create-buttonconmet"]}`}
            onClick={() => router.push(`/room/${uuid()}`)}
          >
            Or create a new meeting
          </button>
        </>
      )}
    </section>
  </div></div>
  
  );
}
   export default Meet;