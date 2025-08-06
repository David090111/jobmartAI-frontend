import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/index";

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchMyProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await API.get("/products/my-products", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">
        🛍 My Products
      </h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't posted any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow p-4">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                {product.description?.slice(0, 60)}...
              </p>
              <p className="text-green-600 font-bold mt-1">
                {product.price.toLocaleString()}$
              </p>
              <h4 className="text-sm font-semibold text-gray-800">
                {product.phone}
              </h4>
              <h4 className="text-sm font-semibold text-gray-800">
                {product.email}
              </h4>
              <h4 className="text-sm font-semibold text-gray-800">
                {product.address}
              </h4>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/edit-product/${product._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
