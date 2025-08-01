import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Briefcase, Calendar, Clock, DollarSign, Users, Tag } from 'lucide-react';

const DailyWageJobList = () => {
  const [jobs, setJobs] = useState([]); // Ensure it's always initialized as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log('Fetching daily wage jobs from: http://localhost:5000/api/jobseekers/dailywagesJobs');
        
        const response = await axios.get('http://localhost:5000/api/jobseekers/dailywagesJobs'); // Fixed URL - removed 's' from https
        console.log('Daily wage jobs response:', response.data); // Debug log
        console.log('Full response object:', response); // Additional debug
        
        // Handle different response structures
        let jobsData = [];
        if (Array.isArray(response.data)) {
          jobsData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          // Backend returns { message: '...', data: [...] }
          jobsData = response.data.data;
        } else if (response.data && Array.isArray(response.data.jobs)) {
          jobsData = response.data.jobs;
        }
        
        console.log('Processed jobs data:', jobsData);
        
        setJobs(jobsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching daily wage jobs:', err);
        setError('Failed to fetch daily wage jobs');
        setJobs([]); // Ensure jobs is always an array
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading jobs...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!jobs || !Array.isArray(jobs) || !jobs.length) {
    return <div className="text-gray-500 text-center mt-10">No daily wage jobs found.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Daily Wage Job Listings</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{job.description}</p>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-2"><Briefcase size={16} /> {job.category}</div>
              <div className="flex items-center gap-2"><Calendar size={16} /> {job.startDate} to {job.endDate}</div>
              <div className="flex items-center gap-2"><Clock size={16} /> {job.workingHours}</div>
              <div className="flex items-center gap-2"><MapPin size={16} /> {job.location}</div>
              <div className="flex items-center gap-2"><DollarSign size={16} /> ₹{job.wage} / day</div>
              <div className="flex items-center gap-2"><Users size={16} /> {job.positions} position(s)</div>
              {job.skills && (
                <div className="flex items-center gap-2">
                  <Tag size={16} /> 
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(job.skills) ? job.skills : job.skills.split(',')).map((skill, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                        {typeof skill === 'string' ? skill.trim() : skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyWageJobList;
