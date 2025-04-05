const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Corrected typo
  title: { type: String, required: true },
  tags: { type: [String], required: true },
  role: { type: String, required: true },
  minSalary: { type: Number, required: true },
  maxSalary: { type: Number, required: true },
  vacancies: { type: Number, required: true },
  jobLevel: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

