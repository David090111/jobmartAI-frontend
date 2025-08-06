import React, { useEffect, useState } from "react";
import API from "../api/index";
import { Link } from "react-router-dom";

const ViewAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 9;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  // Fetch all products
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const res = await API.get("/products");
        setAllProducts(res.data);
        setVisibleProducts(res.data.slice(0, PRODUCTS_PER_PAGE));
        const uniqueCats = [...new Set(res.data.map((p) => p.category))];
        setAllCategories(uniqueCats);
      } catch (err) {
        console.error("Initial fetch failed:", err);
      }
    };

    fetchInitial();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await API.get("/products", {
        params: { search: search.trim(), category },
      });
      setAllProducts(res.data);
      setVisibleProducts(res.data.slice(0, PRODUCTS_PER_PAGE));
      setCurrentPage(1);
    } catch (err) {
      console.error("Filter fetch failed:", err);
    }
  };

  const handleViewMore = () => {
    const nextPage = currentPage + 1;
    const end = nextPage * PRODUCTS_PER_PAGE;
    setVisibleProducts(allProducts.slice(0, end));
    setCurrentPage(nextPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        🛍 Explore All Products
      </h2>

     
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search for product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:w-64"
        />
        <select
          className="p-2 border border-gray-300 rounded w-full sm:w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {allCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>

      
      {visibleProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-3">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-green-600 font-bold text-lg mt-1">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500">📍 {product.address}</p>
                <p className="text-sm text-gray-500">📞 {product.phone}</p>
                <p className="text-sm text-gray-500">✉️ {product.email}</p>
                <p className="text-sm text-gray-500 mt-1 italic">
                  Posted by: {product.owner?.name || "Unknown"}
                </p>
                <Link
                  to={`/products/${product._id}`}
                  className="inline-block mt-3 text-blue-600 hover:underline text-sm"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>

          
          {visibleProducts.length < allProducts.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleViewMore}
                className="bg-gray-100 hover:bg-gray-200 text-green-700 px-6 py-2 rounded shadow"
              >
                👀 View More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewAllProducts;
