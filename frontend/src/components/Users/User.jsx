import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const capitalize = (word) =>
    word ? word.charAt(0).toUpperCase() + word.slice(1) : "";

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setError("User not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          &larr; Back to Users
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          {capitalize(user.username)}
        </h1>
        <p className="text-lg text-gray-600 text-center">{user.email}</p>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">Username:</span>
            <span className="text-gray-700">{user.username}</span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">City:</span>
            <span className="text-gray-700">
              {user.city ? capitalize(user.address.city) : "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">Street:</span>
            <span className="text-gray-700">{user?.street || "N/A"}</span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">Phone:</span>
            <span className="text-gray-700">{user.phone || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
