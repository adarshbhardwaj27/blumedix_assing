import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateProductDialog = ({
  showCreateProductDialog,
  setshowCreateProductDialog,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [responseMessage, setResponseMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Product created successfully!");
        setshowCreateProductDialog(false);
      } else {
        alert("Failed to create product.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = (e) => {
    if (e.target.id === "overlay") {
      setshowCreateProductDialog(false);
    }
  };

  if (!showCreateProductDialog) return null;

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create New Product
        </h2>

        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-xl"
          onClick={() => setshowCreateProductDialog(false)}
        >
          &times;
        </button>

        {responseMessage && (
          <p className="text-center text-green-600 mb-4">{responseMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Title */}
          <div>
            <label className="block font-semibold">Product Title</label>
            <input
              type="text"
              {...register("title", { required: "Product title is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold">Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold">Category</label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold">Image URL</label>
            <input
              type="text"
              {...register("image", { required: "Image URL is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border p-2 rounded"
              rows="3"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white p-2 rounded font-semibold hover:bg-gray-500"
              onClick={() => setshowCreateProductDialog(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductDialog;
