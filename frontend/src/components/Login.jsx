import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
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
        "http://127.0.0.1:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", data.token); // Store token
      // alert(data.message);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";

      if (errorMessage.toLowerCase().includes("email")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: errorMessage,
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
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input  bg-gray-600 text-white"
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

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800 transition"
        >
          Login
        </button>

        <Link to="/register" className="text-white underline hover:text-black">
          register!
        </Link>
      </form>
    </div>
  );
}
