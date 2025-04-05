import React, { useState } from "react";
import Navbar from "../../components/Others/Navbar";
import { useRecuiterstore } from "../../store/useRecuiterstore";

const PostJobPage = () => {
  const { postjob, recuiterid } = useRecuiterstore(); // Ensure `recuiterid` is available

  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    role: "",
    minSalary: "",
    maxSalary: "",
    vacancies: "",
    jobLevel: "",
    country: "",
    city: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("page")

    e.preventDefault();

    const jobData = {
      ...formData,
      recuiterid, // Ensure this field is sent
      tags: formData.tags.split(",").map(tag => tag.trim()), // Convert tags to array
    };

    try {
      console.log(jobData)
      await postjob(jobData);
      console.log("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-5">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Post a Job</h2>
        <p className="text-gray-600 mb-6">Find the best talent for your company</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Add job title, role vacancies etc"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Job keyword, tags etc"
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Job Role"
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Salary</label>
              <input
                type="number"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleChange}
                placeholder="Minimum Salary"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-purple-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Salary</label>
              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleChange}
                placeholder="Maximum Salary"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-purple-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vacancies</label>
              <input
                type="number"
                name="vacancies"
                value={formData.vacancies}
                onChange={handleChange}
                placeholder="Number of vacancies"
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Level</label>
              <select
                name="jobLevel"
                value={formData.jobLevel}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
                required
              >
                <option value="">Select Level</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add your description..."
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-purple-300"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
            onClick={handleSubmit}
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
