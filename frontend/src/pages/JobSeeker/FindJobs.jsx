import React, { useState, useEffect } from 'react';
import { Search, MapPin, Bookmark, ChevronDown, Star, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { useAuthstore } from '../../store/useAuthstore';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const FindJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [id, setId] = useState('');
  const [jobType, setJobType] = useState('All Types');
  const [datePosted, setDatePosted] = useState('Any Time');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const loc = useLocation();

  const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
  const dateFilters = ['Any Time', 'Past 24 hours', 'Past Week', 'Past Month'];

  const { authuser ,setAuthuser} = useAuthstore();
  console.log(authuser?.appliedJobs);
  useEffect(() => {
    if (loc.state?.recommendations) {
      setJobs(loc.state.recommendations);
    }
  }, [loc]);

  async function handleApply() {
    const jobid = selectedJob.jobId;
    const providerId = selectedJob.recid;
    const seekerId = authuser.seekerId;
    const status = 'pending';

    try {
      // console.log(11);

      const res = await axios.post('http://localhost:5000/api/jobseekers/apply', {
        jobid,
        providerId,
        seekerId,
        status
      });
      if (res.status === 200) {
  alert('Application submitted!');
  const storedUser = localStorage.getItem('authuser');
      console.log(storedUser);

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.appliedJobs.push(String(jobid));
      console.log(parsedUser);
      localStorage.setItem("authuser", JSON.stringify(parsedUser)); // ✅ Correct usage
      setAuthuser(parsedUser);
      console.log(authuser);
      // ✅ Update both Zustand and localStorage
      // setAuthuser(parsedUser);
      // con'
    } catch (err) {
      console.error('Invalid JSON in authuser:', err);
    }
  }

  const updatedJobs = jobs.map(job =>
    job.jobId === selectedJob.jobId ? { ...job, applied: true } : job
  );

  setJobs(updatedJobs);
  setSelectedJob(prev => ({ ...prev, applied: true }));
}

    } catch (error) {
      alert('Error applying for job.');
    }
  }

  async function fetchRecommendations() {
    try {
      const res = await axios.post('http://localhost:5000/', {
        title: searchTerm,
        city: location,
        salary: 0,
        job: 0
      });
      setJobs(res.data);
    } catch (error) {
      alert('Failed to fetch jobs.');
    }
  }

  const isApplied = selectedJob && authuser?.appliedJobs?.includes(String(selectedJob.jobId));

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Find Jobs</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Job title or keyword" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Where</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="City or zip code" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
              <div className="relative">
                <input type="number" value={id} onChange={e => setId(e.target.value)} placeholder="ID of job" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Posted</label>
              <div className="relative">
                <select value={datePosted} onChange={e => setDatePosted(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none">
                  {dateFilters.map(filter => (
                    <option key={filter} value={filter}>{filter}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button onClick={fetchRecommendations} className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md">Search</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-medium text-gray-900">Results ({jobs.length})</h2>
                <span className="text-sm text-gray-500">Sort by: Relevance</span>
              </div>

              <div className="divide-y divide-gray-100">
                {jobs.map((job, index) => (
                  <div key={index} className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedJob?.jobId === job.jobId ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`} onClick={() => setSelectedJob(job)}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">JobCompany</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin size={14} className="mr-1" /> {job.city}
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-indigo-600">
                        <Bookmark size={18} />
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">jobType</span>
                      <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">{job.salary}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Posted</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedJob ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                    <p className="text-lg text-gray-600 mt-1">selectedJobCompany</p>
                    <div className="flex items-center text-gray-500 mt-2">
                      <MapPin size={16} className="mr-1" /> {selectedJob.city}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500"></button>
                    <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                      <Star size={20} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full">{selectedJob.salary}</span>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Job Description</h3>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Requirements</h3>
                </div>

                    <div className="mt-8 flex justify-center">
        {authuser?.appliedJobs?.includes(String((selectedJob.jobId))) || selectedJob.applied ? (
          <div
            disabled
            className="bg-gray-400 text-white px-6 py-3 rounded-md cursor-not-allowed"
          >
            Applied
          </div>
        ) : (
          <button
            onClick={handleApply}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Apply Now
          </button>
        )}
      </div>


                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Application deadline: April 17, 2025</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center h-full">
                <Briefcase size={64} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Job Selected</h3>
                <p className="text-gray-500 text-center">Click on a job from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindJobsPage;