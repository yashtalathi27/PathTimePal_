const {jobSeekers}=require('../model/freelancer')
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const {JobApplication}=require('../database/application');
// const {jobSeekers}=require('../model/freelancer');

async function createjobSeeker(req, res) {
    try {
        console.log(req.body);
        const { email } = req.body;
        let user = await jobSeekers.findOne({ email });

        if (user) {
            const updateFields = {
                seekerId: req.body.seekerId || "DEFAULT_SEEKER_ID",
                name: req.body.name || "Unknown",
                phone: req.body.phone || "0000000000",
                location: req.body.location || { city: "Unknown", state: "Unknown" },
                preferredJobTypes: req.body.preferredJobTypes || [],
                skills: req.body.skills || [],
                experience: req.body.experience || "No experience",
                availability: req.body.availability || { days: [], timeSlots: [] },
                appliedJobs: req.body.appliedJobs || [],
                resume: req.body.resume || "No resume uploaded",
                isEmployed: req.body.isEmployed !== undefined ? req.body.isEmployed : false,
            };

            user = await jobSeekers.findOneAndUpdate(
                { email },
                { $set: updateFields },
                { new: true }
            );

            console.log("User updated successfully", user);
            return res.status(200).json({ message: "User updated successfully", data: user, success: true });
        } else {
            return res.status(404).json({ message: "User does not exist, please register", success: false });
        }

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function googleLoginJobSeeker(req,res) {
    try {
        const {email2}=req.body;
        console.log(email2);
        
        const user=await jobSeekers.findOne({email:email2});
        if(user){
            res.status(200).json({message:"User already exists",data:user});
        }else{
            res.status(200).json({message:"User does not exist please register",data:null});
        }

    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}

async function signinJobSeeker(req,res) {
    try {
        const {name,email,password}=req.body;   
        console.log(req.body);

        // const user=await jobSeekers.create({name,email,password});
        const user=await jobSeekers.create({name,email,password});
        console.log(user);
        if(user){
            console.log("User created successfully");
            res.status(200).json({message:"User created successfully",data:user});
        }else{
            console.log("User already exists");
            res.status(200).json({message:"User already exists",data:user});
        }

    } catch (error) {
        console.log(error);
        
    }
}

async function userLogin(req,res) {
    try {
        const {email,password}=req.body;
        console.log(email,password);
        
        const user=await jobSeekers.findOne({email,password});
        if(user){
            console.log(1);
            res.status(200).json({userdata:user});
        }else{
            res.status(200).json({data:null});
        }

    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
        const user = await jobSeekers.findOne({
            seekerId:id
        });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json({ user, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}

async function updateUserByID(req,res){
    try {
        const { id } = req.params;
        const { name, email, phone, location, preferredJobTypes, skills, experience, availability, appliedJobs, resume } = req.body;
        console.log(id);
        console.log(req.body);
        const user = await jobSeekers.findOneAndUpdate({seekerId:id}, {
            name,
            email,
            phone,
            location,
            preferredJobTypes,
            skills,
            experience,
            availability,
            appliedJobs,
            resume
        }, { new: true });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

async function handleapply(req,res){

    try {
        const { id ,jobid, providerId ,status } = req.body;
        console.log(id, jobid, providerId, status);
        const application= await JobApplication.create({
            seekerId: id,
            jobId: jobid,
            providerId: providerId,
            // status: status
        })
        console.log(application);
        
        if(application){
            const updated=await jobSeekers.findOneAndUpdate({_id:id},{$push:{appliedJobs:jobid}});
            console.log(updated);
        }


    } catch (error) {
        
    }
}

module.exports={
    createjobSeeker,
    googleLoginJobSeeker,
    signinJobSeeker,
    userLogin,
    getUserById,
    updateUserByID,
    handleapply
}