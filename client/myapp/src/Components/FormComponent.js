import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
    age: 0, 
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:8080/getCountry');
        const data = await response.json();
        setCountries(data.data);
      } catch (error) {
        window.alert('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, [formData]);

  const handleCountryChange = async (event) => {
    const selectedCountry = event.target.value;
    setFormData({ ...formData, country: selectedCountry, state: '', city: '' });

    try {
      const response = await fetch(`http://localhost:8080/getState/${selectedCountry}`);
      const data = await response.json();
      setStates(data.data);
    } catch (error) {
      window.alert('Error fetching states:', error);
    }
  };

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    setFormData({ ...formData, state: selectedState, city: '' });
    try {
      const response = await fetch(`http://localhost:8080/getCity/${selectedState}`);
      const data = await response.json();
      setCities(data.data);
    } catch (error) {
      window.alert('Error fetching cities:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event) => {
    const dateOfBirth = event.target.value;
    const selectedDate = new Date(dateOfBirth);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setFormData({ ...formData, dateOfBirth: formattedDate });

    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      setFormData({ ...formData, dateOfBirth: formattedDate, age }); 
  };
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    const dateOfBirth = formData.dateOfBirth;
    if (!dateOfBirth) {
      window.alert('Please select a valid date of birth.');
      return;
    }

    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const minValidDate = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());

    if (birthDate >= minValidDate) {
      window.alert('You must be older than 14 years.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user.');
      }

      const data = await response.json();
      window.alert('User created successfully:', data)
    } catch (error) {
      window.alert('Error creating user:', error.message);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
         <label htmlFor="firstName">First Name</label>
         <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          pattern="[A-Z a-z_]+"
          required
        />
        <span>Must accept alphabets only</span>
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          pattern="[A-Z a-z_]+"
          required
        />
        <span>Must accept alphabet only</span>
      </div>

      <div>
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <span>Must accept valid email format</span>
      </div>
      <div>
        
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleCountryChange}
          required
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="state">State</label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          required
        >
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state._id} value={state._id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="city">City</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city._id} value={city._id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div>
         <label>Gender</label>
         <label>
           <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleInputChange}
            required
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleInputChange}
            required
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={formData.gender === 'Other'}
            onChange={handleInputChange}
            required
          />
          Other
        </label>
      </div>

      <div>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleDateChange}
        />
        <span>Must be older than 14 years</span>
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          type="text"
          id="age"
          name="age"
          value={formData.age}
          readOnly
        />
      </div>

      <button type="submit">Submit</button>
      <br/>
      <ul>
          <Link className="displayButton" to="/display">
            Display
          </Link>
      </ul>
    </form>
  );
};

export default FormComponent;
