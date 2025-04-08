// import axios from 'axios';
const axios = require('axios');

async function connectML(req, res) {
    const { title, city, salary, job } = req.body;

    const dataToSend = {};
    if (title) dataToSend.title = title;
    if (city) dataToSend.city = city;
    if (salary) dataToSend.salary = salary;
    if (job) dataToSend.job = job;

    try {
        console.log("Sending data to FastAPI service:", dataToSend);
        const response = await axios.post('http://127.0.0.1:8000/recommends', dataToSend);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error calling FastAPI service:", error.message || error);
        res.status(500).json({ message: "Error fetching recommendations." });
    }
}

async function insertJob(req,res,data){
    const a=data;
    console.log(a);
    
   
}

module.exports = { connectML,insertJob };