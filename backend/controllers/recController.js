const { RecruiterUser } = require('../model/rec');
const { JobApplication } = require('../database/application');
const { jobSeekers } = require('../model/freelancer'); // Import the jobSeekers model
const Job = require("../database/postjob.model.js"); // Keep this import

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await RecruiterUser.findOne({ email: email, password: password });
        console.log(user);

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

        // Step 1: Get all jobs for the recruiter
        const jobs = await Job.find({ recid: id });

        // Step 2: For each job, get applicants and seeker info
        const jobsWithApplicants = await Promise.all(
            jobs.map(async (jobii) => {
                // Find applications for this job
                const applications = await JobApplication.find({ jobId: jobii.jobId }).lean();

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




module.exports = {
    userLogin,
    getJobs
};
