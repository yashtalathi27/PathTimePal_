import React, { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, Calendar, MapPin, Building, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthstore } from '../../store/useAuthstore';
import axios from 'axios';

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const { authuser } = useAuthstore();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Fetch user applications
  useEffect(() => {
    const fetchApplications = async () => {
      if (authuser?.seekerId) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/jobseekers/applications/${authuser.seekerId}`);
          console.log('Applications response:', response.data);
          setApplications(response.data.applications || []);
        } catch (error) {
          console.error('Error fetching applications:', error);
          setApplications([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [authuser?.seekerId]);

  // Filter applications based on status
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-600" />;
      case 'pending':
      default:
        return <Clock size={16} className="text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      case 'pending':
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/jobSeeker/dashboard')}
              className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
              <p className="text-gray-600 mt-2">Track the status of your job applications</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
            <div className="text-sm text-gray-500">Total Applications</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter(app => app.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === 'accepted').length}
            </div>
            <div className="text-sm text-gray-500">Accepted</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-red-600">
              {applications.filter(app => app.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-500">Rejected</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-100">
            <nav className="flex space-x-8 px-6 py-4">
              {[
                { key: 'all', label: 'All Applications', count: applications.length },
                { key: 'pending', label: 'Pending', count: applications.filter(app => app.status === 'pending').length },
                { key: 'accepted', label: 'Accepted', count: applications.filter(app => app.status === 'accepted').length },
                { key: 'rejected', label: 'Rejected', count: applications.filter(app => app.status === 'rejected').length }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Applications List */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading applications...</p>
              </div>
            ) : filteredApplications.length > 0 ? (
              <div className="space-y-4">
                {filteredApplications.map((app, index) => (
                  <div key={app._id || index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {app.jobDetails?.title || 'Job Title'}
                          </h3>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)} text-white`}>
                            {app.status || 'Pending'}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Building size={16} className="mr-2" />
                            <span>{app.jobDetails?.employer?.name || 'Company Name'}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2" />
                            <span>{app.jobDetails?.location?.city || app.jobDetails?.city || 'Location not specified'}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2" />
                            <span>Applied on {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : 'Date not available'}</span>
                          </div>
                        </div>
                        
                        {app.jobDetails?.description && (
                          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                            {app.jobDetails.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center ml-4">
                        {getStatusIcon(app.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {filter === 'all' ? 'No Applications Yet' : `No ${filter} Applications`}
                </h3>
                <p className="text-gray-500 mb-4">
                  {filter === 'all' 
                    ? 'Start applying to jobs to see your applications here.'
                    : `You don't have any ${filter} applications yet.`
                  }
                </p>
                {filter === 'all' && (
                  <button
                    onClick={() => navigate('/jobSeeker/findjobs')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Find Jobs
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationsPage;
