import React, { useState, useEffect } from 'react';
import { Bell, Bookmark, Calendar, ChevronDown, Clock, FileText, Home, Mail, MessageSquare, Search, Star, User, Timer, Briefcase, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerActivity, setTimerActivity] = useState('Job Search');
  const navigate=useNavigate();
  const gotToNewPage=()=>{
    navigate("/jobSeeker/profile");
  }
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
  
  // Format time as HH:MM:SS
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

  const applications = [
    { 
      id: 1, 
      company: 'Local Cafe', 
      position: 'Barista', 
      location: 'Downtown',
      type: 'Part-time',
      status: 'Interview',
      statusColor: 'bg-yellow-500',
      date: 'Apr 1, 2025' 
    },
    { 
      id: 2, 
      company: 'Retail Store', 
      position: 'Sales Associate', 
      location: 'Westfield Mall',
      type: 'Part-time',
      status: 'Applied',
      statusColor: 'bg-blue-500',
      date: 'Mar 30, 2025' 
    },
    { 
      id: 3, 
      company: 'University Library', 
      position: 'Student Assistant', 
      location: 'Campus',
      type: 'Part-time',
      status: 'Rejected',
      statusColor: 'bg-red-500',
      date: 'Mar 28, 2025' 
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Administrative Assistant',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      salary: '$18-22/hr',
      match: '95%'
    },
    {
      id: 2,
      title: 'Customer Service Rep',
      company: 'Service Plus',
      location: 'Downtown',
      salary: '$16-20/hr',
      match: '88%'
    }
  ];

  const upcoming = [
    {
      id: 1,
      title: 'Interview with Local Cafe',
      time: 'Today, 3:00 PM',
      type: 'Video Call'
    },
    {
      id: 2,
      title: 'Complete Skills Assessment',
      time: 'Tomorrow, 5:00 PM',
      type: 'Online Test'
    }
  ];

  const jobSearchActivities = [
    'Job Search',
    'Resume Writing',
    'Application Forms',
    'Cover Letters',
    'Interview Prep',
    'Networking'
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
        navigate('/findjobs');
      }}
      className={`${activeTab === 'jobs' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
    >
      Find Jobs
    </button>
                <a 
                  href="#"
                  onClick={() => setActiveTab('applications')}
                  className={`${activeTab === 'applications' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Applications
                </a>
                <button
                
                onClick={() => {
                  setActiveTab('jobs');
                  navigate('/message');
                }}
                className={`${activeTab === 'message' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Message
              </button>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell size={20} />
              </button>
              <div className="ml-4 relative flex-shrink-0">
                <div className="flex items-center">
                  <div style={{cursor:'pointer'} }className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium" onClick={() => gotToNewPage()}>
                    JS
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Jamie Smith</span>
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
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Jamie!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your job search today.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">7</div>
            <div className="text-sm text-gray-500">Active Applications</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-500">Upcoming Interviews</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">15</div>
            <div className="text-sm text-gray-500">Saved Jobs</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-indigo-600">24</div>
            <div className="text-sm text-gray-500">Applications This Month</div>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">View all</a>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{app.company}</div>
                          <div className="text-xs text-gray-500">{app.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{app.position}</div>
                          <div className="text-xs text-gray-500">{app.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.statusColor} text-white`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Job Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Recommended For You</h2>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">View all</a>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recommendations.map((job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
                        <div className="mt-1 text-xs text-gray-500">{job.company} • {job.location}</div>
                        <div className="mt-1 text-xs text-gray-500">{job.salary}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-medium text-green-600">{job.match} Match</span>
                        <button className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-md hover:bg-indigo-200">Apply Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Job Search Timer - NEW SECTION */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Job Search Timer</h2>
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
                    {jobSearchActivities.map((activity) => (
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
                Track your job search activities to stay productive and organized.
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                  <FileText size={20} className="text-indigo-600" />
                  <span className="mt-2 text-xs text-gray-600">Edit Resume</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                  <Search size={20} className="text-indigo-600" />
                  <span className="mt-2 text-xs text-gray-600">Job Search</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                  <Bookmark size={20} className="text-indigo-600" />
                  <span className="mt-2 text-xs text-gray-600">Saved Jobs</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                  <User size={20} className="text-indigo-600" />
                  <span className="mt-2 text-xs text-gray-600">Profile</span>
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming</h2>
              <div className="space-y-4">
                {upcoming.map((event) => (
                  <div key={event.id} className="border border-gray-100 rounded-md p-4">
                    <div className="flex items-start">
                      <Calendar size={16} className="text-indigo-600 mt-1 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                        <p className="text-xs text-gray-500">{event.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Goals - NEW SECTION */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Goals</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Submit 5 applications</span>
                  </div>
                  <span className="text-sm font-medium">3/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Network with 3 people</span>
                  </div>
                  <span className="text-sm font-medium">1/3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Update LinkedIn profile</span>
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

export default JobSeekerDashboard;