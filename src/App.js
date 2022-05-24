import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    dateofbirth: "",
    fileupload: "",
  };

  const [inputValues, setInputValues] = useState(initialValues);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessages(validate(inputValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(errorMessages);
    if (Object.keys(errorMessages).length === 0 && isSubmit) {
      console.log(inputValues);
    }
  }, [errorMessages, isSubmit, inputValues]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "That is not a valid email !";
    } else if (!regex.test(values.email)) {
      errors.email = "That is not a valid email !";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (!values.dateofbirth) {
      errors.dateofbirth = "Date of Birth is required!";
    }
    if (!values.fileupload) {
      errors.fileupload = "Please upload your file!";
    }
    return errors;
  };

  return (
    <div className="app">
      {Object.keys(errorMessages).length === 0 && isSubmit ? (
        <div className="Message success">Form uploaded successfully </div>
      ) : (
        <pre>{JSON.stringify(inputValues, undefined, 2)}</pre>
      )}
      <form onSubmit={handleSubmit}>
        <h1>Form Test Interview</h1>
        <div className=" form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={inputValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{errorMessages.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{errorMessages.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={inputValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{errorMessages.password}</p>
          <div className="field">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateofbirth"
              placeholder="Date of Birth"
              value={inputValues.dateofbirth}
              onChange={handleChange}
            />
          </div>
          <p>{errorMessages.dateofbirth}</p>
          <div className="field">
            <label>File Upload</label>
            <input
              type="file"
              name="fileupload"
              placeholder="File Upload"
              value={inputValues.fileupload}
              onChange={handleChange}
            />
          </div>
          <p>{errorMessages.fileupload}</p>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
