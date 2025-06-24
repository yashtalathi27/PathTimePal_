
const {Job}=require('../model/job.js');
const { JobApplication } = require("../database/application.js");
const { insertJob } = require("../controllers/ml.js");
const { jobSeekers } = require("../model/freelancer.js");

const axios = require("axios");
// const Job = require('../models/job.model'); // Adjust path if different

const postjobconn = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        // const {
        //     jobId,
        //     recid,
        //     title,
        //     tags = [],
            
        //     vacancies,
            
        //     description,
        //     duration,
        //     skills = [],
        //     schedule = {},
        //     employer, // Proper destructuring
        //     location,
        //     preferredTime = {},
        //     requirements = "",
        //     slug,
        //     category,
        //     type
        // } = req.body;

        // // Validate required fields
        // if (!slug || !category || !type || !recid) {
        //     return res.status(400).json({ error: "Slug, category, type, and recruiterId are required" });
        // }

        // if (!employer?.name) {
        //     return res.status(400).json({ error: "Employer name is required" });
        // }

        // if (!req.body.salary?.amount) {
        //     return res.status(400).json({ error: "Salary amount is required" });
        // }

        // Create new job object
        const newJob = new Job(req.body);
        console.log("New Job object created:", newJob);
        

        console.log("New Job to be saved:", newJob);

        await newJob.save();

//  try {
//             const response = await axios.post("http://127.0.0.1:8000/add-job", newJob);
//             console.log("ML service response:", response.data);
//         } catch (error) {
//             console.error("Error calling ML service:", error.message || error);
//         }
        res.status(201).json({ message: "Job posted successfully", job: newJob });

    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ error: "Failed to post job", details: error.message });
    }
};

module.exports = postjobconn;

// 🟢 GET Jobs by Recruiter ID
const getjobs = async (req, res) => {
    try {
        const { id } = req.params;
        const jobs = await Job.find({ recruiterId: id });

        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error retrieving jobs:", error);
        res.status(500).json({ error: "Failed to get jobs", details: error.message });
    }
};

// 🟢 GET Users Who Applied to Recruiter's Jobs
const getusers = async (req, res) => {
    try {
        const { id } = req.params; // recruiterId
        console.log("Fetching applicants for recruiter:", id);

        // Step 1: Get applications for this recruiter
        const applications = await JobApplication.find({ providerId: id });

        // Step 2: Extract seeker IDs
        const seekerIds = applications.map(app => app.seekerId);

        // Step 3: Get full user data for seekers
        const seekers = await jobSeekers.find({ seekerId: { $in: seekerIds } });

        res.status(200).json({ applicants: seekers });
    } catch (error) {
        console.error("Error retrieving applicants:", error);
        res.status(500).json({ error: "Failed to get applicants", details: error.message });
    }
};

module.exports = { postjobconn, getjobs, getusers };
