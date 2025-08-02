const { RecruiterUser } = require('../model/rec.js');
const { JobApplication } = require('../database/application.js');
const { jobSeekers } = require('../model/freelancer.js'); // Import the jobSeekers model
const DailyWageJob=require("../model/dailywages")
const DailyWageApplication = require('../model/dailywageApplication');
const Job = require("../database/postjob.model.js"); // Keep this import

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await RecruiterUser.findOne({ email: email.trim(), password: password.trim() });
        // console.log(RecruiterUser.find({}));
        RecruiterUser.find({}).then(users => {
  console.log(users);
});

        if (user) {
            console.log(1);
            res.status(200).json({ userdata: user });
        } else {
            res.status(200).json({ data: null });
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function getJobs(req, res) {
    try {
        const { id } = req.params;
        console.log(id);
        // Step 1: Get all jobs for the recruiter
        const jobs = await Job.find({ recid: id });
        console.log(jobs);
        // Step 2: For each job, get applicants and seeker info
        const jobsWithApplicants = await Promise.all(
            jobs.map(async (jobii) => {
                // Find applications for this job
                const applications = await JobApplication.find({ jobId: jobii.jobId }).lean();
                console.log(applications);

                // Fetch the seeker details for each application
                const applicants = await Promise.all(
                    applications.map(async (app) => {
                        // Directly use seekerId as a string (no need for ObjectId conversion)
                        const seeker = await jobSeekers.findOne({ seekerId: app.seekerId }).lean();
                        console.log(seeker);

                        // Format and return the applicant details
                        return {
                            id: seeker._id,
                            name: seeker.name,
                            email: seeker.email,
                            phone: seeker.phone,
                            location: seeker.location,
                            preferredJobTypes: seeker.preferredJobTypes,
                            skills: seeker.skills,
                            experience: seeker.experience,
                            availability: seeker.availability,
                            resume: seeker.resume,
                            seekerId:seeker.seekerId,
                            status: app.status,
                            appliedAt: app.appliedAt,
                        };
                    })
                );

                // Return job with applicants
                return {
                    ...jobii.toObject(),
                    applicants,
                };
            })
        );

        // Send response
        return res.json({
            message: 'Jobs fetched successfully',
            data: jobsWithApplicants,
        });

    } catch (error) {
        console.error('Error fetching jobs with applicants:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
async function dailywages(req, res) {
    try {
        const jobData = req.body;
        const { id } = req.params;

        jobData.recid = id; // Assign recruiter ID

        console.log("Received jobData:", jobData); // ✅ Log the data before create

        const createdJob = await DailyWageJob.create(jobData);

        console.log('New daily wage job created');
        res.status(201).json({ 
            success: true,
            message: 'Daily wage job created successfully', 
            data: createdJob 
        });

    } catch (error) {
        console.error('Error creating daily wage job:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to create daily wage job', 
            error: error.message 
        });
    }
}

// Get daily wage applications for a recruiter
async function getDailyWageApplications(req, res) {
    try {
        const { recid } = req.params;
        
        // Find all daily wage jobs by this recruiter
        const recruiterJobs = await DailyWageJob.find({ recid }).select('_id');
        const jobIds = recruiterJobs.map(job => job._id);
        
        // Find all applications for these jobs
        const applications = await DailyWageApplication.find({ jobId: { $in: jobIds } })
            .populate('jobId', 'title startDate endDate workingHours location wage')
            .sort({ createdAt: -1 });
        
        // Manually get seeker details for each application
        const formattedApplications = [];
        for (const app of applications) {
            const seekerDetails = await jobSeekers.findOne({ seekerId: app.seekerId });
            formattedApplications.push({
                _id: app._id,
                status: app.status,
                appliedAt: app.createdAt,
                jobDetails: app.jobId,
                seekerDetails: seekerDetails ? {
                    _id: seekerDetails._id,
                    name: seekerDetails.name,
                    email: seekerDetails.email,
                    phone: seekerDetails.phone,
                    location: seekerDetails.location,
                    resume: seekerDetails.resume,
                    skills: seekerDetails.skills
                } : null
            });
        }
        
        res.status(200).json({
            success: true,
            applications: formattedApplications
        });
        
    } catch (error) {
        console.error('Error fetching daily wage applications:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch applications', 
            error: error.message 
        });
    }
}

// Update daily wage application status
async function updateDailyWageApplication(req, res) {
    try {
        const { applicationId } = req.params;
        const { status, jobId, seekerId, recruiterId } = req.body;
        
        const updatedApplication = await DailyWageApplication.findByIdAndUpdate(
            applicationId,
            { status, updatedAt: new Date() },
            { new: true }
        );
        
        if (!updatedApplication) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: `Application ${status} successfully`,
            data: updatedApplication
        });
        
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to update application', 
            error: error.message 
        });
    }
}

    //   jj
module.exports = {
    userLogin,
    getJobs,
    dailywages,
    getDailyWageApplications,
    updateDailyWageApplication
};