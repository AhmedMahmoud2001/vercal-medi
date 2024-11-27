"use client";
import React, { useState } from 'react';
import styles from '../../styles/page.module.css';
import { login } from '../../components/apiService';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import { MdOutlineLogin } from "react-icons/md";

const Login: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  // State for handling form submission status
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (password.length < 7) {
      setError("Password must be at least 7 characters long.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
        // Preparing login data
        const loginData = {
          email,
          password,
        };
  
        // Call login API
        const result = await login(loginData);
       // setSuccess("Logged in successfully!");
        
        // Perform redirect or further actions here
        console.log("Login successful:", result);
  
        setTimeout(() => {
          window.location.href = '/health-tracking'; // Adjust redirection based on your flow
        }, 2000);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsSubmitting(false);
      }
    };
  
  return (
    <div>
      <Navbar />
      <div className={styles.containerlss}>
        <Image src="/assets/ls.png" alt="ls" width={435} height={450} className={styles.imgls} />
        <h1 className={styles.titlels}><MdOutlineLogin /> Login</h1>

        <form onSubmit={handleSubmit} className={styles.containerls}>

          {/* Email Address */}
          <div className={styles.inputs}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div><br/>

          {/* Password */}
          <div className={styles.inputs}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" Password-min 7 character"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {/* Forget Password Link */}
          <div className={styles.forgetPassword}>
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          {/* Display error or success messages */}
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button type="submit" className={styles.buttonls} disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;