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
  // const jobs=
  // Fetch recruiter's jobs on component mount
  useEffect(() => {
    const fetchRecruiterJobs = async () => {
      try {
        setLoading(true);
        // Get the recruiter ID from local storage or context
        const recruiterId = localStorage.getItem("recid");

        // Fetch all jobs posted by this recruiter
        const response = await axios.get(
          `http://localhost:5000/api/rec/jobs/${recruiterId}`
        );
        console.log(response);

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
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$100,000 - $130,000",
      postedDate: "March 15, 2025",
      applicants: [
        {
          id: 101,
          name: "Alex Johnson",
          email: "alex@example.com",
          status: "pending",
        },
        {
          id: 102,
          name: "Jamie Smith",
          email: "jamie@example.com",
          status: "pending",
        },
        {
          id: 103,
          name: "Taylor Wilson",
          email: "taylor@example.com",
          status: "pending",
        },
      ],
    },
    {
      id: 2,
      title: "Backend Engineer",
      location: "Remote",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      postedDate: "March 20, 2025",
      applicants: [
        {
          id: 104,
          name: "Morgan Lee",
          email: "morgan@example.com",
          status: "pending",
        },
        {
          id: 105,
          name: "Casey Brown",
          email: "casey@example.com",
          status: "pending",
        },
      ],
    },
    {
      id: 3,
      title: "UX Designer",
      location: "New York, NY",
      type: "Contract",
      salary: "$90/hour",
      postedDate: "March 25, 2025",
      applicants: [
        {
          id: 106,
          name: "Jordan Parker",
          email: "jordan@example.com",
          status: "pending",
        },
        {
          id: 107,
          name: "Riley Davis",
          email: "riley@example.com",
          status: "pending",
        },
        {
          id: 108,
          name: "Quinn Miller",
          email: "quinn@example.com",
          status: "pending",
        },
        {
          id: 109,
          name: "Avery Thomas",
          email: "avery@example.com",
          status: "pending",
        },
      ],
    },
  ]);

  // Handle status update (accept/reject)
  const handleStatusUpdate = (jobId, applicantId, newStatus) => {
    setJobs(
      jobs.map((job) => {
        if (job.id === jobId) {
          const updatedApplicants = job.applicants.map((applicant) => {
            if (applicant.id === applicantId) {
              return { ...applicant, status: newStatus };
            }
            return applicant;
          });
          return { ...job, applicants: updatedApplicants };
        }
        return job;
      })
    );
  };

  // Get status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Posted Jobs</h1>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Job Header */}
            <div className="bg-blue-50 p-4 border-b">
              <h2 className="text-xl font-semibold text-blue-800">
                {job.title}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">{job.location}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{job.type}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{job.salary}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Posted on: {job.postedDate}
              </div>
            </div>

            {/* Applicants Section */}
            <div className="p-4">
              <h3 className="font-medium text-gray-700 mb-3">
                Applicants ({job.applicants.length})
              </h3>

              {job.applicants.length === 0 ? (
                <p className="text-gray-500 italic">No applications yet</p>
              ) : (
                <div className="divide-y divide-gray-200">
                  {job.applicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="py-3 flex flex-wrap justify-between items-center"
                    >
                      <div className="mb-2 md:mb-0">
                        <div className="font-medium">{applicant.name}</div>
                        <div className="text-sm text-gray-500">
                          {applicant.email}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                            applicant.status
                          )}`}
                        >
                          {applicant.status.charAt(0).toUpperCase() +
                            applicant.status.slice(1)}
                        </span>

                        {applicant.status === "pending" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  job.id,
                                  applicant.id,
                                  "accepted"
                                )
                              }
                              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  job.id,
                                  applicant.id,
                                  "rejected"
                                )
                              }
                              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  // Fetch applications for a specific job
};
export default JobApplicationsPage;