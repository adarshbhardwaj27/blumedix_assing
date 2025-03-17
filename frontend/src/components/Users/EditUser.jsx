import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setValue("username", data.username);
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("city", data.address?.city || "");
        setValue("street", data.address?.street || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          address: {
            city: formData.city,
            street: formData.street,
          },
        }),
      });

      if (response.ok) {
        alert("User updated successfully!");
        navigate("/users");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Edit User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Phone</label>
            <input
              type="text"
              {...register("phone", { required: "Phone is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">City</label>
            <input
              type="text"
              {...register("city")}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Street</label>
            <input
              type="text"
              {...register("street")}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white p-2 rounded font-semibold hover:bg-gray-500"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
