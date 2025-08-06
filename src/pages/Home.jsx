import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import API from '../api/index';
import { FaBriefcase, FaShoppingBag, FaLightbulb } from 'react-icons/fa';
import '../Style/home.css';   
import home1 from "../assets/Images/home1.jpg";
import home2 from "../assets/Images/home2.jpg";
import home3 from "../assets/Images/home3.jpg";
import home4 from "../assets/Images/home4.jpg";

import GlowSphere from '../components/GlowSphere';
const Home = () => {
    const [products, setProducts] = useState([]);
    const[jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const productRes = await API.get('/products');
            const jobRes = await API.get('/jobs');
            setProducts(productRes.data);
            setJobs(jobRes.data);
          }catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
},[]
)
    return (
      <div>
        <section className="relative h-[600px] w-full text-white text-center flex flex-col justify-center items-center shadow-xl overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] z-0"></div>

         
          <GlowSphere />

          
          <FaLightbulb className="absolute text-yellow-400 top-8 left-12 text-6xl opacity-80 blur-sm rotate-6 z-20 animate-float" />
          <FaBriefcase className="absolute text-yellow-400 bottom-10 right-[55%] text-5xl opacity-80 blur-sm -rotate-12 z-20 animate-float" />
          <FaShoppingBag className="absolute text-yellow-400 top-10 right-10 text-5xl opacity-80 blur-sm z-20 animate-float" />
        </section>

        {/* Images */}
        <section className="overflow-hidden mx-8 mt-8 bg-gray-200 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
              🌟 Floating Showcase
            </h2>

            <div className="relative w-full overflow-hidden">
              <div className="flex animate-scroll-x gap-6">
                {[home1, home2, home3, home4, home1, home2, home3, home4].map(
                  (img, i) => (
                    <div
                      key={i}
                      className="min-w-[250px] h-[180px] flex-shrink-0 rounded-xl overflow-hidden shadow-md"
                    >
                      <img
                        src={img}
                        alt={`slide-${i}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section className="mx-8 mt-8 py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
              🛍 Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.slice(0, 10).map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 p-4"
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.description?.slice(0, 60)}...
                  </p>
                  <p className="text-green-600 font-bold mt-2">
                    {product.price?.toLocaleString()}$
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
          </div>
          <div className="flex justify-center mt-10">
            <Link
              to="/view-all-products"
              className="bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-300"
            >
              🛍 View All Products
            </Link>
          </div>
        </section>

        <section className="mx-8 mt-8 py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
              💼 Latest Job Postings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.slice(0, 6).map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
                >
                  <h3 className="text-2xl font-bold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {job.company} • {job.location}
                  </p>

                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-semibold">Description:</span>{" "}
                    {job.description}
                  </p>

                  {job.requirements && (
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-semibold">Requirements:</span>{" "}
                      {job.requirements}
                    </p>
                  )}

                  {job.salary && (
                    <p className="text-blue-600 font-semibold mb-2">
                      💰 ${job.salary?.toLocaleString()}
                    </p>
                  )}

                  <p className="text-xs text-gray-400">
                    Posted on {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/job/${job._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Link
              to="/view-all-jobs"
              className="bg-indigo-600 hover:bg-indigo-700 hover:scale-110 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-300"
            >
              💼 View All Jobs
            </Link>
          </div>
        </section>
      </div>
    );};
    export default Home;