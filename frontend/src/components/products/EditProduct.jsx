import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setValue("title", data.title);
          setValue("price", data.price);
          setValue("category", data.category);
          setValue("image", data.image);
          setValue("description", data.description);
          setLoading(false);
        } else {
          setErrorMessage("Product not found");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setErrorMessage("Error loading product data");
        setLoading(false);
      });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        navigate(`/product/${id}`);
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (errorMessage)
    return <p className="text-center text-red-500 mt-10">{errorMessage}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          &larr; Back to Products
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Title */}
          <div>
            <label className="block font-semibold">Product Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
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
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
