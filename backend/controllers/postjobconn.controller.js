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
        const applications = await JobApplication.find({ providerId: id ,status:"accepted"});

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
// 🟢 GET All Jobs
const getAllJobs = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            search, 
            location, 
            type, 
            category,
            minSalary,
            maxSalary 
        } = req.query;

        let query = {};

        // Build search query
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { 'employer.name': { $regex: search, $options: 'i' } }
            ];
        }

        if (location) {
            query.$or = [
                { 'location.city': { $regex: location, $options: 'i' } },
                { 'location.area': { $regex: location, $options: 'i' } }
            ];
        }

        if (type && type !== 'All Types') {
            query.type = type;
        }

        if (category && category !== 'All Categories') {
            query.category = category;
        }

        if (minSalary || maxSalary) {
            query['salary.amount'] = {};
            if (minSalary) query['salary.amount'].$gte = parseInt(minSalary);
            if (maxSalary) query['salary.amount'].$lte = parseInt(maxSalary);
        }

        const jobs = await Job.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Job.countDocuments(query);

        res.status(200).json({
            jobs,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error("Error getting all jobs:", error);
        res.status(500).json({ error: "Failed to get jobs", details: error.message });
    }
};


module.exports = { postjobconn, getjobs, getusers, getAllJobs };

