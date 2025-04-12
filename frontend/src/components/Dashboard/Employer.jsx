import React, { useState, useEffect } from 'react';
import { Bell, Bookmark, Calendar, ChevronDown, Clock, FileText, Home, Mail, MessageSquare, Search, User, Timer, Briefcase, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthstore } from '../../store/useAuthstore';

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerActivity, setTimerActivity] = useState('Candidate Screening');
  const navigate = useNavigate();
  const gotToNewPage=()=>{
    navigate("/jobSeeker/profile");
  }
  const {setAuthuser,connectSocket}=useAuthstore();

  const {id}=useParams();
  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimeSpent(seconds => seconds + 1);
      }, 1000);
    } else if (!isTimerActive && timeSpent !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timeSpent]);
  
  useEffect(() => {
    const user = localStorage.getItem("authuser");
    if (user) {
      setAuthuser(JSON.parse(user));
      connectSocket();
    }
  }, []);
  
  // Format time as HH:MM:SSset
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };
  
  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };
  
  const resetTimer = () => {
    setTimeSpent(0);
    setIsTimerActive(false);
  };

  const activeJobs = [
    { 
      id: 1, 
      position: 'Senior Developer', 
      department: 'Tech',
      location: 'Remote',
      type: 'Full-time',
      applicants: 24,
      posted: 'Apr 1, 2025' 
    },
    { 
      id: 2, 
      position: 'Marketing Specialist', 
      department: 'Marketing',
      location: 'New York',
      type: 'Contract',
      applicants: 18,
      posted: 'Mar 30, 2025' 
    },
    { 
      id: 3, 
      position: 'Customer Service Rep', 
      department: 'Customer Service',
      location: 'Chicago',
      type: 'Part-time',
      applicants: 42,
      posted: 'Mar 28, 2025' 
    }
  ];

  const topCandidates = [
    {
      id: 1,
      name: 'Alex Johnson',
      position: 'Senior Developer',
      experience: '8 years',
      match: '95%',
      status: 'Interview Scheduled'
    },
    {
      id: 2,
      name: 'Maya Rodriguez',
      position: 'Marketing Specialist',
      experience: '5 years',
      match: '88%',
      status: 'Application Review'
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidate: 'Alex Johnson',
      position: 'Senior Developer',
      time: 'Today, 3:00 PM',
      type: 'Video Call'
    },
    {
      id: 2,
      candidate: 'Sarah Williams',
      position: 'Customer Service Rep',
      time: 'Tomorrow, 1:00 PM',
      type: 'Phone Interview'
    }
  ];

  const recruiterActivities = [
    'Candidate Screening',
    'Interview Preparation',
    'Job Posting',
    'Resume Review',
    'Reference Checks',
    'Candidate Communications'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="text-indigo-600 font-bold text-xl">FlexWork</div>
              </div>
              <div className="hidden sm:ml-8 sm:flex space-x-8">
                <a 
                  href="#" 
                  onClick={() => setActiveTab('dashboard')}
                  className={`${activeTab === 'dashboard' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Dashboard
                </a>
                <button
                  onClick={() => {
                    setActiveTab('jobs');
                    navigate('/postjob');
                  }}
                  className={`${activeTab === 'jobs' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Post Job
                </button>
                <a 
                  href="#"
                  onClick={() => {setActiveTab('candidates');
                    navigate(`/candidate/${id}`)}}
                  className={`${activeTab === 'candidates' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Candidates
                </a>
                <button
                  onClick={() => {
                    setActiveTab('message');
                    navigate('/message');
                  }}
                  className={`${activeTab === 'message' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Messages
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell size={20} />
              </button>
              <div className="ml-4 relative flex-shrink-0">
                <div className="flex items-center">
                  <div style={{cursor:'pointer'}} onClick={() => gotToNewPage()} className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    TR
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Tech Recruiter</span>
                  <ChevronDown size={16} className="ml-1 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Recruiter!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your recruitment activities today.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-500">Active Job Postings</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">84</div>
            <div className="text-sm text-gray-500">Total Applicants</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-500">Interviews Scheduled</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-indigo-600">5</div>
            <div className="text-sm text-gray-500">Positions Filled This Month</div>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Job Listings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Active Job Listings</h2>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">View all</a>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{job.position}</div>
                          <div className="text-xs text-gray-500">{job.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{job.department}</div>
                          <div className="text-xs text-gray-500">{job.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {job.applicants}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.posted}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Candidates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Top Candidates</h2>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">View all</a>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {topCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{candidate.name}</h3>
                        <div className="mt-1 text-xs text-gray-500">{candidate.position} • {candidate.experience}</div>
                        <div className="mt-1 text-xs text-gray-500">{candidate.status}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-medium text-green-600">{candidate.match} Match</span>
                        <button className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-md hover:bg-indigo-200">View Profile</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Recruitment Timer - NEW SECTION */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Activity Timer</h2>
              <div className="flex flex-col items-center mb-4">
                <div className="text-3xl font-mono text-gray-800 bg-gray-100 w-full py-4 text-center rounded-md">
                  {formatTime(timeSpent)}
                </div>
                <div className="mt-4 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={timerActivity}
                    onChange={(e) => setTimerActivity(e.target.value)}
                  >
                    {recruiterActivities.map((activity) => (
                      <option key={activity} value={activity}>{activity}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={toggleTimer}
                  className={`flex items-center justify-center p-2 rounded-md ${isTimerActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                >
                  <Clock size={16} className="mr-2" />
                  <span>{isTimerActive ? 'Pause' : 'Start'}</span>
                </button>
                <button 
                  onClick={resetTimer}
                  className="flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  <span>Reset</span>
                </button>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Track your recruitment activities to stay productive and organized.
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                  <FileText size={20} className="text-indigo-600" />
                  <span className="mt-2 text-xs text-gray-600">Post Job</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                  <Search size={20} className="text-indigo-600" />
                  <span className="mt-2 text-xs text-gray-600">Search Candidates</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                  <Calendar size={20} className="text-indigo-600" />
                  <span className="mt-2 text-xs text-gray-600">Schedule Interview</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                  <MessageSquare size={20} className="text-indigo-600" />
                  <span className="mt-2 text-xs text-gray-600">Send Messages</span>
                </button>
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Interviews</h2>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-100 rounded-md p-4">
                    <div className="flex items-start">
                      <Calendar size={16} className="text-indigo-600 mt-1 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{interview.candidate}</h3>
                        <p className="text-xs text-gray-500 mt-1">{interview.position}</p>
                        <p className="text-xs text-gray-500">{interview.time} • {interview.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruitment Goals */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Goals</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Fill 10 positions</span>
                  </div>
                  <span className="text-sm font-medium">5/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Screen 50 candidates</span>
                  </div>
                  <span className="text-sm font-medium">38/50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Update job descriptions</span>
                  </div>
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;