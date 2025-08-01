// import axios from 'axios';
const axios = require('axios');
const {getJobsByIds}= require('../newml/ml');

async function connectML(req, res) {
    const { title, city, salary, job ,lang} = req.body;

    const dataToSend = {};
    if (title) dataToSend.title = title;
    if (city) dataToSend.city = city;
    if (salary) dataToSend.salary = salary;
    if (job) dataToSend.job = job;

    try {
        console.log("Sending data to FastAPI service:", dataToSend);
        const response = await axios.post('http://127.0.0.1:8000/recommends', dataToSend);

        if (!Array.isArray(response.data)) {
            return res.status(500).json({ message: "Invalid response from ML service." });
        }

        const jobIds = response.data.map(job => job.jobId);
        const jobs = await getJobsByIds(jobIds, lang);

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for the recommended IDs." });
        }

        res.json(jobs);
    } catch (error) {
        console.error("Error calling FastAPI service:", error.message || error);
        res.status(500).json({ message: "Error fetching recommendations." });
    }
}


module.exports = { connectML };