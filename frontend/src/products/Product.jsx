import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Product = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`) // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (!product)
    return (
      <p className="text-center text-lg text-red-500 mt-10">
        Product not found.
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          &larr; Back to Products
        </button>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            className="w-48 h-48 object-contain rounded-lg shadow-md"
          />

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Category:</span>
                <span className="text-gray-700">{product.category}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Price:</span>
                <span className="text-green-600 font-bold text-lg">
                  ${product.price}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Rating:</span>
                <span className="text-gray-700">
                  {product.rating?.rate} ⭐ ({product.rating?.count} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
