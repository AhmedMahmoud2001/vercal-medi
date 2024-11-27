"use client";
import React from 'react';
import styles from  '../styles/page.module.css'; // Import the CSS module
import Link from 'next/link';
const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
     Copyrights 2024   <p className={styles.footer}>Medicare</p>
    </div>
  );
};

export default Footer ;