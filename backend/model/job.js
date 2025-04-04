const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan");
const body_parser=require("body-parser");
let schema=mongoose.Schema;
const job=new schema({
    jobId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String },
    salary: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      frequency: { type: String, required: true }
    },
    type: { type: String, required: true },
    category: { type: String },
    preferredTime: {
      start: { type: String },
      end: { type: String }
    },
    location: {
      city: { type: String, required: true },
      area: { type: String }
    },
    employer: {
      name: { type: String, required: true },
      contact: { type: String },
      phone: { type: String },
      owner: { type: String }
    },
    slug: { type: String, unique: true },
    isApplied: { type: Boolean, default: false },
    tags: { type: [String] },
    duration: { type: String },
    schedule: {
      shifts: [
        {
          start: { type: String },
          end: { type: String }
        }
      ],
      days: { type: [String] }
    },
    skills: { type: [String] },
    vacancies: { type: Number, default: 1 }
})
const jobs=mongoose.model("jobs",job);
module.exports=jobs;