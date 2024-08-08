// src/RegistrationForm.js
import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    gender: "",
    address: "",
    IdData: "",
    VehicleRegistration: {
      RegistrationNumber: "",
      Year: "",
      Color: "",
      Mam: "",
    },
    AgreementAndConscent: {
      TnCAgreement: String,
      DataPrivacyConsent: String,
      HealthAndSafty: String,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Handle form submission, e.g., send data to the backend
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth: </label>
          <input
            type="date"
            name="name"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email ID:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <h1>Identification Document</h1>
          <div className="form-group">
            <label>Driving Lisence Number : </label>
            <input
              type="text"
              name="name"
              value={formData.IdData}
              onChange={handleChange}
              required
            />
            <label>Expiry </label>
            <input
              type="text"
              name="name"
              value={formData.IdData}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Aadhar card Number : </label>
            <input
              type="text"
              name="name"
              value={formData.IdData}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <h1>Vehicle Details</h1>
          <div className="form-group">
            <label>Registration Number : </label>
            <input
              type="text"
              name="name"
              value={formData.VehicleRegistration.RegistrationNumber}
              onChange={handleChange}
              required
            />
            <label>Make and Model </label>
            <input
              type="text"
              name="name"
              value={formData.VehicleRegistration.Mam}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              name="name"
              value={formData.VehicleRegistration.Year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Colour</label>
            <input
              type="text"
              name="name"
              value={formData.VehicleRegistration.Color}
              onChange={handleChange}
              required
            />
          </div>
          <h1>Insurance</h1>
          <div className="form-group">
            <label>PolicyNumber :</label>
            <input
              type="number"
              name="name"
              value={formData.VehicleRegistration.Color}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Expiry</label>
            <input
              type="date"
              name="name"
              value={formData.VehicleRegistration.Color}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <h1>Agreement And Conscent </h1>
          <div className="form-group">
            <label>Terms and Condition</label>
            <input
              type="checkbox"
              name="name"
              value={formData.AgreementAndConscent.TnCAgreement}
              onChange={handleChange}
              required
            />
            <label>Data and Privacy</label>
            <input
              type="checkbox"
              name="name"
              value={formData.AgreementAndConscent.DataPrivacyConsent}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Health And Safety</label>
            <input
              type="checkbox"
              name="name"
              value={formData.AgreementAndConscent.HealthAndSafty}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
