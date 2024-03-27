import React, { useState } from "react";
import cancel from '../components/images/cancel.jpg';
import black_x from "../components/images/black_x.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const CreateUser = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    date: '',
    month: '',
    year: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        date: formData.date,
        month: formData.month,
        year: formData.year
      });
      console.log(response.data);
      navigate('/signin');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="logo-box">
      <div className="cross">
        <a href="/public">
          <img height="10px" width="10px" src={cancel} alt="cancel" />
        </a>
      </div>
      <div className="nav_1">
        <div>
          <img
            height="60px"
            width="60px"
            className="x-mark"
            src={black_x}
            alt="x-mark"
          />
        </div>
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit} className="forms_fields">
          <input
            className="box_1"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Name"
            maxLength="50"
          />
          <input
            className="box_1"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="box_1"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            maxLength="20"
          />
          <div className="emil">Use Email Instead</div>
          <div className="dob">Date of Birth</div>
          <div className="smal">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</div>
          <div className="all_boxes">
            <div className="box_A month"></div>
            <div className="box_A date">
              <label>Date</label>
              <select value={formData.date} onChange={handleChange} name="date" className="select">
                {/* Generate options for dates from 01 to 30 */}
                {Array.from({ length: 30 }, (_, index) => {
                  const day = index + 1;
                  const formattedDay = day < 10 ? `0${day}` : `${day}`; // Add leading zero if day is less than 10
                  return (
                    <option key={formattedDay} value={formattedDay}>{formattedDay}</option>
                  );
                })}
              </select>
            </div>
            <label>Month</label>
            <div className="month">
              <select value={formData.month} onChange={handleChange} name="month" className="select">
                {/* Generate options for months from January to December */}
                {Array.from({ length: 12 }, (_, index) => {
                  const monthIndex = index + 1;
                  const monthName = new Date(0, monthIndex - 1).toLocaleString('default', { month: 'long' });
                  return (
                    <option key={monthIndex} value={monthIndex}>{monthName}</option>
                  );
                })}
              </select>
            </div>
            <div className="box_A year">
              <label>Year</label>
              <select name="year" value={formData.year} onChange={handleChange} className="select">
                {/* Generate options for years from 1980 to current year */}
                {Array.from({ length: currentYear - 1980 + 1 }, (_, index) => {
                  const year = 1980 + index;
                  return (
                    <option key={year} value={year}>{year}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <button className="Nex" type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
