const Job = require("../database/postjob.model.js");

const postjobconn = async (req, res) => {
    try {
console.log(req.body)

        // const { recid } = req.params; // ✅ recruiter ID from URL
        console.log("hi")
        const {
            recruiterId
            ,
            title,
            tags,
            role,
            minSalary,
            maxSalary,
            vacancies,
            jobLevel,
            country,
            city,
            description
            ,
                } = req.body;
        const newJob = new Job({
            recruiterId, // ✅ use recid from URL
            title,
            tags,
            role,
            minSalary,
            maxSalary,
            vacancies,
            jobLevel,
            country,
            city,
            description,

        });

        await newJob.save();
        res.status(201).json({ message: "Job posted successfully", job: newJob });

    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ error: "Failed to post job", details: error.message });
    }
};

module.exports = { postjobconn };
