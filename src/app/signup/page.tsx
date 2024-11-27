
"use client";

import React, { useState } from 'react';
import { IoMail } from "react-icons/io5";
import styles from '../../styles/page.module.css'; // Ensure this path is correct
import Navbar from '../../components/Navbar';
import { signup } from '../../components/apiService';
import { RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { MdEmail } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
const SignUp: React.FC = () => {
  // State variables for form inputs
  const [fullName, setFullName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [city, setCity] = useState<string>("");

  // State for handling form submission status
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (password.length < 7) {
      setError("Password must be at least 7 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Additional validations can be added here (e.g., email format, phone number format)

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
        const userData = {
          fullName,
          gender,
          email,
          phoneNumber,
          password,
          dateOfBirth,
          city,
        };
  
        const result = await signup(userData);
        setSuccess("Sign up successful! Redirecting to login...");
  
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsSubmitting(false);
      }
    };
  

  return (
    <div className={styles.containerss}>
      <Navbar />

      <h1 style={{textAlign:'center',fontSize:'60px' }  }> Sign Up </h1>
      <form onSubmit={handleSubmit} className={styles.forms}>
        {/* Full Name */}
        <div className={styles.inputGroups}>
          
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="  Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className={styles.input}
          />  
          

       

        {/* Email Address */}
        <div className={styles.inputgroup}>
          
        <div className={styles.logols}> <IoMail /><input
            type="email"
            id="email"
            name="email"
            placeholder="  Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />    <br/>

        {/* Phone Number */} 
        <IoIosPhonePortrait /><input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="  Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className={styles.input}
          />
        <br/>

        {/* Password */}
         <RiLockPasswordFill />   
          <input
            type="password"
            id="password"
            name="password"
            placeholder="  Password-min 7 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          /> <br/>
        {/* Confirm Password */}
        <RiLockPasswordFill /><input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="  Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div></div><br/>

        {/* Date of Birth */}
        <div className={styles.inputGroup}>
          
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            className={styles.input}
          />
       
        {/* City */}        
          <input
            type="text"
            id="city"
            name="city"
            placeholder="  City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={styles.input}
          />
        </div><br/>
         {/* Gender */}
       
          
         <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className={styles.inputs}
          >
            <option value="">  Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div><br/>

        {/* Error Message */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Success Message */}
        {success && <p className={styles.success}>{success}</p>}

        {/* Submit Button */}
        <button type="submit" className={styles.buttonlss} disabled={isSubmitting}>
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;