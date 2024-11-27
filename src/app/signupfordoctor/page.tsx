"use client";

import React, { useState } from "react";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosPhonePortrait } from "react-icons/io";
import styles from "../../styles/page.module.css";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";

const SignUpfordoctor: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    city: "",
    specialty: "",
  });
  const [files, setFiles] = useState({
    license: null as File | null,
    id: null as File | null,
  });
  const [answers, setAnswers] = useState({ q1: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 7) {
      setError("Password must be at least 7 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!files.license || !files.id) {
      setError("Both license and ID files are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value as string);
      });
      data.append("license", files.license);
      data.append("id", files.id);

      const response = await fetch("http://localhost:5000/signupfordoctor", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An unexpected error occurred.");
      }

      setSuccess("Sign up successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.containerss}>
      <Navbar />
      <h1 style={{ textAlign: "center", fontSize: "60px" }}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.forms} encType="multipart/form-data">
        {/* Input Box */}
        <div className={styles.inputGroups}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <div className={styles.inputgroup}>
            <IoMail />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <br />
            <IoIosPhonePortrait />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <br />
            <RiLockPasswordFill />
            <input
              type="password"
              name="password"
              placeholder="Password (min 7 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <br />
            <RiLockPasswordFill />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <br />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className={styles.inputs}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="specialty"
            placeholder="Specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <br />
          <button type="submit" className={styles.buttonlss} disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </form>
      <br />
      <div className={styles.containerd}>
        <h1>Doctor Verification</h1>
        <div className={styles.questionSection}>
          <p>Are you a licensed doctor?</p>
          <label>
            <input
              type="radio"
              name="q1"
              value="correct"
              onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="q1"
              value="incorrect"
              onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
            />
            No
          </label>
          <p>Upload your medical license:</p>
          <input
            type="file"
            name="license"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf"
            required
            className={styles.fileInput}
          />
          <p>Upload your ID:</p>
          <input
            type="file"
            name="id"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf"
            required
            className={styles.fileInput}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpfordoctor;
