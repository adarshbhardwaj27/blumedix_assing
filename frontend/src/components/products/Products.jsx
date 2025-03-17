import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        console.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-10">
          Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transform transition-all hover:scale-105 hover:shadow-2xl h-full 
              w-full sm:w-80 md:w-96 lg:w-[300px]" // Increased width
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-40 h-40 object-contain mb-4"
              />

              {/* Product Info */}
              <div className="flex flex-col flex-grow justify-between w-full">
                <h2 className="text-lg font-semibold text-gray-900 mt-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-lg font-medium">
                  ${product.price ? product.price.toFixed(2) : "N/A"}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex gap-2">
                  <button
                    className="w-full px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="w-full px-5 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-all"
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full px-5 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition-all"
                    onClick={() => handleDelete(product._id)}
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

export default Products;
