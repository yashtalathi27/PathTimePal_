const Job = require("../database/postjob.model.js");
const {insertJob}=require('../controllers/ml.js')
const axios = require('axios');


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
        console.log("new one: ",newJob) ;
        
        await newJob.save();
        try {
            const response = await axios.post('http://127.0.0.1:8000/add-job', newJob);
            console.log(response);
            // res.json(response);
        } catch (error) {
            console.error("Error calling FastAPI service:", error.message || error);
            // res.status(500).json({ message: "Error fetching recommendations." });
        }
        // console.log();
        
        res.status(201).json({ message: "Job posted successfully", job: newJob });

    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ error: "Failed to post job", details: error.message });
    }
};

module.exports = { postjobconn };
