import React, { useEffect, useState } from "react";
import axios from "axios";

const JobApplicationsPage = () => {
  const [loading, setLoading] = useState(true);
  const [recruiterJobs, setRecruiterJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const recruiterId = localStorage.getItem("recid");
  
        const response = await axios.get(
          `http://localhost:5000/api/rec/jobs/${recruiterId}`
        );
  
        // console.log("API returned:", response.data);
        // const response1= await axios.get(
        //   `http://localhost:5000/api/rec/jobs/${}`
        // );
        const jobs = response.data?.data || []; // ✅ proper extraction
        console.log(response);
        setRecruiterJobs(jobs);
      } catch (error) {
        console.error("Error fetching recruiter jobs:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, []);
  

  const handleStatusUpdate = (jobId, applicantId, newStatus) => {
    setRecruiterJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.jobId === jobId && job.applicants) {
          const updatedApplicants = job.applicants.map((applicant) =>
            applicant.id === applicantId
              ? { ...applicant, status: newStatus }
              : applicant
          );
          return { ...job, applicants: updatedApplicants };
        }
        return job;
      })
    );
  };

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

      {loading ? (
        <p>Loading jobs...</p>
      ) : recruiterJobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="space-y-6">
          {Array.isArray(recruiterJobs) &&
            recruiterJobs.map((job) => (
              <div
                key={job.jobId}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                {/* Job Header */}
                <div className="bg-blue-50 p-4 border-b">
                  <h2 className="text-xl font-semibold text-blue-800">
                    {job.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>
                      ₹{job.salary?.amount} {job.salary?.currency}/
                      {job.salary?.frequency}
                    </span>
                    <span>•</span>
                    <span>
                      {job.location?.area}, {job.location?.city}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Employer: {job.employer?.name} ({job.employer?.owner})
                  </div>
                </div>

                {/* Applicants Section */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-700 mb-3">
                    Applicants ({job.applicants?.length || 0})
                  </h3>

                  {!job.applicants || job.applicants.length === 0 ? (
                    <p className="text-gray-500 italic">
                      No applications yet
                    </p>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {job.applicants.map((applicant) => (
                        <div
                          // key={applicant.id}
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
                                      job.jobId,
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
                                      job.jobId,
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
      )}
    </div>
  );
};

export default JobApplicationsPage;
