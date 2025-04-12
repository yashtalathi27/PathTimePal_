import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobApplicationsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // list or detail
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch recruiter's jobs on component mount
  useEffect(() => {
    const fetchRecruiterJobs = async () => {
      try {
        setLoading(true);
        // Get the recruiter ID from local storage or context
        const recruiterId = localStorage.getItem("recruiterId") || "current-recruiter-id";
        
        // Fetch all jobs posted by this recruiter
        const response = await axios.get(`http://localhost:5000/api/recruiters/${recruiterId}/jobs`);
        
        if (response.status === 200) {
          setRecruiterJobs(response.data);
          // Automatically select the first job if available
          if (response.data.length > 0) {
            setSelectedJobId(response.data[0].jobId);
            fetchApplicationsForJob(response.data[0].jobId);
          }
        }
      } catch (error) {
        console.error("Error fetching recruiter jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterJobs();
  }, []);

  // Fetch applications for a specific job
  const fetchApplicationsForJob = async (jobId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}/applications`);
      
      if (response.status === 200) {
        setApplications(response.data);
      }
    } catch (error) {
      console.error(`Error fetching applications for job ${jobId}:`, error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle job selection
  const handleJobChange = (jobId) => {
    setSelectedJobId(jobId);
    fetchApplicationsForJob(jobId);
    setViewMode("list");
    setSelectedApplication(null);
  };

  // View application details
  const viewApplicationDetail = (application) => {
    setSelectedApplication(application);
    setViewMode("detail");
  };

  // Return to applications list
  const backToList = () => {
    setViewMode("list");
    setSelectedApplication(null);
  };

  // Handle application status update
  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/applications/${applicationId}`, {
        status: newStatus
      });
      
      if (response.status === 200) {
        // Update the status in the local state
        if (viewMode === "detail") {
          setSelectedApplication({
            ...selectedApplication,
            status: newStatus
          });
        }
        
        // Refresh the application list
        fetchApplicationsForJob(selectedJobId);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  // Handle candidate contact via email
  const contactCandidate = (email, jobTitle) => {
    window.location.href = `mailto:${email}?subject=Regarding your application for ${jobTitle}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Applications</h1>
        
        {loading && recruiterJobs.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your jobs...</p>
          </div>
        ) : recruiterJobs.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
            <button
              onClick={() => navigate("/post-job")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post a Job
            </button>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Job selection tabs */}
            <div className="border-b overflow-x-auto">
              <div className="flex">
                {recruiterJobs.map((job) => (
                  <button
                    key={job.jobId}
                    onClick={() => handleJobChange(job.jobId)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                      selectedJobId === job.jobId
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-500"
                    }`}
                  >
                    {job.title}
                    {job.applicationCount > 0 && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        {job.applicationCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {viewMode === "list" ? (
              <div>
                {/* Applications list view */}
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-600">No applications have been received for this job yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Candidate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applied Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Experience
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((application) => (
                          <tr key={application._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  {application.candidate.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {application.candidate.name}
                                  </div>
                                  <div className="text-sm text-gray-500">{application.candidate.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(application.applyDate).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(application.applyDate).toLocaleTimeString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                  application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' : 
                                  application.status === 'shortlisted' ? 'bg-green-100 text-green-800' : 
                                  application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800'}`}
                              >
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {application.candidate.experience || "Not specified"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => viewApplicationDetail(application)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => contactCandidate(application.candidate.email, application.jobTitle)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Contact
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* Application detail view */}
                {selectedApplication && (
                  <div className="p-6">
                    <button 
                      onClick={backToList}
                      className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      Back to Applications
                    </button>
                    
                    <div className="flex flex-col md:flex-row md:space-x-6">
                      <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-center mb-4">
                            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-xl font-bold text-blue-700">
                                {selectedApplication.candidate.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold mt-2">
                              {selectedApplication.candidate.name}
                            </h3>
                            <p className="text-gray-600">{selectedApplication.candidate.title || "Job Seeker"}</p>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-xs uppercase text-gray-500 font-semibold">Email</h4>
                              <p className="text-sm">{selectedApplication.candidate.email}</p>
                            </div>
                            {selectedApplication.candidate.phone && (
                              <div>
                                <h4 className="text-xs uppercase text-gray-500 font-semibold">Phone</h4>
                                <p className="text-sm">{selectedApplication.candidate.phone}</p>
                              </div>
                            )}
                            {selectedApplication.candidate.location && (
                              <div>
                                <h4 className="text-xs uppercase text-gray-500 font-semibold">Location</h4>
                                <p className="text-sm">{selectedApplication.candidate.location}</p>
                              </div>
                            )}
                            <div>
                              <h4 className="text-xs uppercase text-gray-500 font-semibold">Applied On</h4>
                              <p className="text-sm">
                                {new Date(selectedApplication.applyDate).toLocaleDateString()} at {new Date(selectedApplication.applyDate).toLocaleTimeString()}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs uppercase text-gray-500 font-semibold">Status</h4>
                              <p className="text-sm">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${selectedApplication.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                    selectedApplication.status === 'reviewed' ? 'bg-blue-100 text-blue-800' : 
                                    selectedApplication.status === 'shortlisted' ? 'bg-green-100 text-green-800' : 
                                    selectedApplication.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                    'bg-gray-100 text-gray-800'}`}
                                >
                                  {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                                </span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-6 space-y-2">
                            <button 
                              onClick={() => contactCandidate(selectedApplication.candidate.email, selectedApplication.jobTitle)}
                              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                              Contact Candidate
                            </button>
                            {selectedApplication.candidate.resume && (
                              <a 
                                href={selectedApplication.candidate.resume} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full block text-center bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                              >
                                View Resume
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="bg-white rounded-lg divide-y divide-gray-200">
                          <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">Application for {selectedApplication.jobTitle}</h3>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {selectedApplication.candidate.skills && selectedApplication.candidate.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            {selectedApplication.coverLetter && (
                              <div className="mb-6">
                                <h4 className="text-sm font-semibold mb-2">Cover Letter</h4>
                                <div className="text-sm bg-gray-50 p-3 rounded">
                                  {selectedApplication.coverLetter}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {selectedApplication.candidate.experience && (
                            <div className="p-4">
                              <h4 className="text-sm font-semibold mb-2">Experience</h4>
                              <p className="text-sm">{selectedApplication.candidate.experience}</p>
                            </div>
                          )}
                          
                          {selectedApplication.candidate.education && (
                            <div className="p-4">
                              <h4 className="text-sm font-semibold mb-2">Education</h4>
                              <p className="text-sm">{selectedApplication.candidate.education}</p>
                            </div>
                          )}
                          
                          <div className="p-4">
                            <h4 className="text-sm font-semibold mb-2">Update Application Status</h4>
                            <div className="flex flex-wrap gap-2">
                              <button 
                                onClick={() => updateApplicationStatus(selectedApplication._id, "reviewed")}
                                className={`px-3 py-1 rounded text-sm ${
                                  selectedApplication.status === "reviewed" 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                }`}
                              >
                                Reviewed
                              </button>
                              <button 
                                onClick={() => updateApplicationStatus(selectedApplication._id, "shortlisted")}
                                className={`px-3 py-1 rounded text-sm ${
                                  selectedApplication.status === "shortlisted" 
                                    ? "bg-green-600 text-white" 
                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                                }`}
                              >
                                Shortlisted
                              </button>
                              <button 
                                onClick={() => updateApplicationStatus(selectedApplication._id, "rejected")}
                                className={`px-3 py-1 rounded text-sm ${
                                  selectedApplication.status === "rejected" 
                                    ? "bg-red-600 text-white" 
                                    : "bg-red-100 text-red-800 hover:bg-red-200"
                                }`}
                              >
                                Rejected
                              </button>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="text-sm font-semibold mb-2">Add Notes</h4>
                            <textarea
                              className="w-full border rounded p-2 text-sm"
                              rows="3"
                              placeholder="Add private notes about this candidate..."
                            ></textarea>
                            <button className="mt-2 bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300">
                              Save Notes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsPage;