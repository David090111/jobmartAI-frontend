import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/index";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        {product.name}
      </h2>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-[400px] h-auto rounded mb-4"
        />
      )}
      <p className="text-gray-700 mb-2">
        <strong>Price:</strong> ${product.price}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {product.description}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Email:</strong> {product.email}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Phone:</strong> {product.phone}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Address:</strong> {product.address}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Posted by: {product.owner?.name}
      </p>
    </div>
  );
};

export default ProductDetails;
