const express=require('express');
// import express from 'express';
const cors = require('cors');
const bodyParser = require('body-parser');
const route=require('./routes/route')
const app=express();
const {connectDB}=require('./connection/db')    
connectDB();
const seekerRoute=require('./routes/seeker')

// ✅ Fix: Proper CORS Configuration
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow common methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Fix: Explicitly Handle Preflight Requests
app.options("*", cors());

app.use('/',route);
app.use('/api/jobseekers',seekerRoute)

app.listen(5000,()=>{
    console.log('Node.js server running on http://localhost:5000');
});
