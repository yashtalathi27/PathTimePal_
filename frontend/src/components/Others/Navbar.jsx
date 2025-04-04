import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">PartTime Pal</Link>
          <div className="space-x-4">
            <Link to="/Findjobs" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded">
              Find Jobs
            </Link>
            <Link to="/postjob" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded">
              Post a Job
            </Link>
            <Link to="/auth/login">
              <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded">
                Login
              </button>
            </Link>
            <Link to="/auth/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
