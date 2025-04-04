import React from "react";
import Navbar from "../../components/Others/Navbar";

const PostJobPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-5 ">

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow ">
        <h2 className="text-2xl font-semibold mb-2">Post a job</h2>
        <p className="text-gray-600 mb-6">
          Find the best talent for your company
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Add job title, role vacancies etc"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                placeholder="Job keyword, tags etc"
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Role
              </label>
              <select className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300">
                <option value="">Select...</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Min Salary
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Minimum Salary"
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-purple-300"
                />
                <span className="text-gray-600">INR</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Salary
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Maximum Salary"
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-purple-300"
                />
                <span className="text-gray-600">INR</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vacancies
              </label>
              <select className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300">
                <option value="">Select...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Level
              </label>
              <select className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300">
                <option value="">Select...</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300">
                <option value="">Select...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300">
                <option value="">Select...</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              rows="4"
              placeholder="Add your description..."
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
