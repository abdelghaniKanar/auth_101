import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/auth/register",
        formData
      );
      // alert(data.message);
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";

      if (errorMessage.toLowerCase().includes("email")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: errorMessage,
        }));
      } else {
        alert(errorMessage);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-400">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-900 p-6 rounded-lg shadow-lg w-96 text-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="input bg-gray-700 text-white"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm p-2">{errors.firstName}</p>
        )}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="input bg-gray-700 text-white"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm p-2">{errors.lastName}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input bg-gray-700 text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm p-2">{errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="input bg-gray-700 text-white"
        />
        {errors.password && (
          <p className="text-red-500 text-sm p-2">{errors.password}</p>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="input bg-gray-700 text-white"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm p-2">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800 transition"
        >
          Register
        </button>
        <Link to="/login" className="text-white underline hover:text-black">
          Have an account?
        </Link>
      </form>
    </div>
  );
}
