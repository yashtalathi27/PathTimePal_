import React, { useState } from 'react';
import { Search, MapPin, Filter, Briefcase, Clock, Bookmark, ChevronDown, Star, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

const FindJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('All Types');
  const [datePosted, setDatePosted] = useState('Any Time');
  const [selectedJob, setSelectedJob] = useState(null);
  
  const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
  const dateFilters = ['Any Time', 'Past 24 hours', 'Past Week', 'Past Month'];
  
  const jobs = [
    {
      id: 1,
      title: 'Barista',
      company: 'Coffee House',
      location: 'Downtown',
      type: 'Part-time',
      salary: '$15-18/hr',
      description: 'We are looking for a friendly and energetic Barista to join our team. Experience with espresso machines preferred but not required. Must have excellent customer service skills and be available to work weekends.',
      requirements: [
        'High school diploma or equivalent',
        'Previous customer service experience',
        'Ability to work in a fast-paced environment',
        'Weekend availability'
      ],
      posted: '2 days ago',
      isSaved: false,
      isFeatured: true
    },
    {
      id: 2,
      title: 'Retail Sales Associate',
      company: 'Fashion Outlet',
      location: 'Westfield Mall',
      type: 'Part-time',
      salary: '$16-20/hr',
      description: 'Fashion Outlet is seeking part-time Sales Associates to join our team. Responsibilities include providing excellent customer service, maintaining store appearance, and meeting sales goals.',
      requirements: [
        'Previous retail experience preferred',
        'Strong communication skills',
        'Ability to stand for extended periods',
        'Flexible availability including evenings and weekends'
      ],
      posted: '1 week ago',
      isSaved: true,
      isFeatured: false
    },
    {
      id: 3,
      title: 'Student Library Assistant',
      company: 'University Library',
      location: 'Campus',
      type: 'Part-time',
      salary: '$14-16/hr',
      description: 'The University Library is seeking student assistants to help with circulation desk duties, shelving books, and assisting patrons with basic research needs.',
      requirements: [
        'Must be a current student',
        'Good organizational skills',
        'Basic computer literacy',
        'Available to work 10-15 hours per week'
      ],
      posted: '3 days ago',
      isSaved: false,
      isFeatured: false
    },
    {
      id: 4,
      title: 'Restaurant Server',
      company: 'City Grill',
      location: 'Downtown',
      type: 'Part-time',
      salary: '$12/hr + tips',
      description: 'City Grill is looking for experienced servers for weekend shifts. We offer competitive pay, flexible scheduling, and a fun work environment.',
      requirements: [
        'Previous serving experience preferred',
        'Knowledge of POS systems',
        'Excellent customer service skills',
        'Must be 18 or older'
      ],
      posted: '1 day ago',
      isSaved: false,
      isFeatured: true
    }
  ];
  
  const handleJobClick = (job) => {
    setSelectedJob(job);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation omitted for brevity - would be the same as in the main dashboard */}
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Find Jobs</h1>
        
        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">What</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Job title or keyword"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Where</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or zip code"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <div className="relative">
                <select
                  id="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="datePosted" className="block text-sm font-medium text-gray-700 mb-1">Date Posted</label>
              <div className="relative">
                <select
                  id="datePosted"
                  value={datePosted}
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
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
          
          <div className="mt-4 flex justify-between">
            <button className="flex items-center text-gray-500 text-sm">
              <Filter size={16} className="mr-1" />
              More Filters
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Search Jobs
            </button>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-medium text-gray-900">Results ({jobs.length})</h2>
                <span className="text-sm text-gray-500">Sort by: Relevance</span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {jobs.map(job => (
                  <div 
                    key={job.id} 
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedJob && selectedJob.id === job.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}
                    onClick={() => handleJobClick(job)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin size={14} className="mr-1" /> {job.location}
                        </div>
                      </div>
                      <div>
                        <button className="text-gray-400 hover:text-indigo-600">
                          <Bookmark size={18} className={job.isSaved ? "fill-current text-indigo-500" : ""} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">{job.type}</span>
                      <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">{job.salary}</span>
                      {job.isFeatured && (
                        <span className="px-2 py-1 bg-yellow-100 text-xs text-yellow-800 rounded">Featured</span>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Posted {job.posted}</div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                <button className="flex items-center text-sm text-gray-500 disabled:opacity-50">
                  <ChevronLeft size={16} className="mr-1" /> Previous
                </button>
                <div className="text-sm">
                  <span className="font-medium">1</span> of <span>5</span>
                </div>
                <button className="flex items-center text-sm text-gray-500">
                  Next <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Job Details */}
          <div className="lg:col-span-2">
            {selectedJob ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                    <p className="text-lg text-gray-600 mt-1">{selectedJob.company}</p>
                    <div className="flex items-center text-gray-500 mt-2">
                      <MapPin size={16} className="mr-1" /> {selectedJob.location}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                      <Bookmark size={20} className={selectedJob.isSaved ? "fill-current text-indigo-500" : ""} />
                    </button>
                    <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                      <Star size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full">{selectedJob.type}</span>
                  <span className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full">{selectedJob.salary}</span>
                  <span className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full">Posted {selectedJob.posted}</span>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Job Description</h3>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Apply Now
                  </button>
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