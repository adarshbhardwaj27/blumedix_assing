import React, { useState } from "react";
import { set, useForm } from "react-hook-form";

const CreateDialog = ({ showCreateDialog, setshowCreateDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [responseMessage, setResponseMessage] = useState("");

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("User created successfully!");
        setshowCreateDialog(false);
      } else {
        alert("Failed to create user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Close the dialog when clicking outside the form
  const handleClose = (e) => {
    if (e.target.id === "overlay") {
      setshowCreateDialog(false);
    }
  };

  if (!showCreateDialog) return null; // Don't render if dialog is closed

  return (
    <div
      id="overlay"
      className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-center mb-4">Create New User</h2>

        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-xl"
          onClick={() => setshowCreateDialog(false)}
        >
          &times;
        </button>

        {responseMessage && (
          <p className="text-center text-green-600 mb-4">{responseMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
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

          {/* Email */}
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block font-semibold">City</label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Street */}
          <div>
            <label className="block font-semibold">Street</label>
            <input
              type="text"
              {...register("street")}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Phone */}
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

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white p-2 rounded font-semibold hover:bg-gray-500"
              onClick={() => setshowCreateDialog(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDialog;
