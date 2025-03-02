// import React from "react";

// const Dashboard = () => {
//   return (
//     <div
//       id="dashboard"
//       className="flex items-center justify-center h-screen bg-blue-400"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Welcome a new platform soon
//       </h2>
//     </div>
//   );
// };

// export default Dashboard;

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-blue-400"
      id="dashboard"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Welcome to the new platform
      </h2>
      <button
        onClick={handleLogout}
        className="bg-black text-white py-2 px-4 rounded mt-4 hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
