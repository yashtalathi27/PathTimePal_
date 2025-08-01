import React, { useState } from 'react';
import { useAuthstore } from '../../store/useAuthstore';
import axios from 'axios';

const DailyWageJobForm = () => {
  const { authuser } = useAuthstore();

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    startDate: '',
    endDate: '',
    wage: '',
    workingHours: '',
    location: '',
    positions: 1,
    skills: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);

    if (diff > 6 || diff < 0) {
      alert('Job duration must be between 1 and 7 days.');
      return;
    }

    try {
      const payload = {
        ...form,
        skills: form.skills.split(',').map(skill => skill.trim()),
      };
      console.log(payload);
      const response = await axios.post(`http://localhost:5000/api/rec/dailywages/${authuser.recid}`, payload);

      alert('Job posted successfully!');
      console.log(response.data);

      setForm({
        title: '',
        category: '',
        description: '',
        startDate: '',
        endDate: '',
        wage: '',
        workingHours: '',
        location: '',
        positions: 1,
        skills: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to post job.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Post a Daily Wage Job</h2>

      <input
        type="text"
        name="title"
        placeholder="Job Title"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.title}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="Delivery">Delivery</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Tutoring">Tutoring</option>
        <option value="Helper">Helper</option>
      </select>

      <textarea
        name="description"
        placeholder="Job Description"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.description}
        onChange={handleChange}
        required
      />

      <div className="flex gap-4">
        <input
          type="date"
          name="startDate"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="number"
        name="wage"
        placeholder="Daily Wage (₹)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.wage}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="workingHours"
        placeholder="Working Hours (e.g., 9 AM - 5 PM)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.workingHours}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.location}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="positions"
        min={1}
        placeholder="Number of Positions"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.positions}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="skills"
        placeholder="Skills (comma separated)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.skills}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Post Job
      </button>
    </form>
  );
};

export default DailyWageJobForm;
