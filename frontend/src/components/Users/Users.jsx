import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to load users.");
        setLoading(false);
      });
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId)); // Update UI
      } else {
        console.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const capitalize = (word) =>
    word ? word.charAt(0).toUpperCase() + word.slice(1) : "";

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-10">
          Users List
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transform transition-all hover:scale-105 hover:shadow-2xl h-full"
            >
              {/* Avatar */}
              <div className="w-20 h-20 bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold rounded-full">
                {user.username.charAt(0).toUpperCase()}
              </div>

              {/* User Info */}
              <div className="flex flex-col items-center flex-grow justify-between w-full">
                <h2 className="text-lg font-semibold text-gray-900 mt-4">
                  {capitalize(user.username)}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-blue-500">
                  City: {capitalize(user.city) || "N/A"}
                </p>

                {/* Buttons */}
                <div className="mt-6 w-full">
                  <button
                    className="w-full px-5 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-700 transition-all"
                    onClick={() => navigate(`/user/${user._id}`)}
                  >
                    View Profile
                  </button>
                  <button
                    type="button"
                    className="w-full mt-2 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition-all"
                    onClick={() => navigate(`/edit-user/${user._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition-all"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
