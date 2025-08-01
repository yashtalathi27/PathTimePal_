const { Job } = require('../model/job.js');

const getJobsByIds = async ( jobIds = [], language = 'en', page = 1, limit = 100) => {
  try {
    // Ensure jobIds are all strings
    const stringJobIds = jobIds.map(id => id.toString());

    // Fetch jobs with matching jobId.en
    const jobs = await Job.find({ "jobId": { $in: stringJobIds } });

    // Localize fields
    const localizedJobs = jobs.map(job => {
      const jobObj = job.toObject();

      const getLocalizedValue = (field) => {
        if (field && typeof field === 'object' && field[language]) {
          return field[language];
        }
        return field && field.en ? field.en : field;
      };

      return {
        ...jobObj,
        jobId: getLocalizedValue(jobObj.jobId),
        title: getLocalizedValue(jobObj.title),
        description: getLocalizedValue(jobObj.description),
        requirements: getLocalizedValue(jobObj.requirements),
        type: getLocalizedValue(jobObj.type),
        category: getLocalizedValue(jobObj.category),
        salary: jobObj.salary ? {
          amount: getLocalizedValue(jobObj.salary.amount),
          currency: getLocalizedValue(jobObj.salary.currency),
          frequency: getLocalizedValue(jobObj.salary.frequency)
        } : jobObj.salary,
        location: jobObj.location ? {
          city: getLocalizedValue(jobObj.location.city),
          area: getLocalizedValue(jobObj.location.area)
        } : jobObj.location,
        employer: jobObj.employer ? {
          name: getLocalizedValue(jobObj.employer.name),
          contact: getLocalizedValue(jobObj.employer.contact),
          phone: getLocalizedValue(jobObj.employer.phone),
          owner: getLocalizedValue(jobObj.employer.owner)
        } : jobObj.employer,
        slug: getLocalizedValue(jobObj.slug),
        isApplied: getLocalizedValue(jobObj.isApplied),
        tags: getLocalizedValue(jobObj.tags),
        duration: getLocalizedValue(jobObj.duration),
        skills: getLocalizedValue(jobObj.skills),
        vacancies: getLocalizedValue(jobObj.vacancies),
        recid: getLocalizedValue(jobObj.recid)
      };
    });

    return {
      jobs: localizedJobs,
      total: localizedJobs.length,
      page: parseInt(page),
      limit: parseInt(limit),
      language
    }

  } catch (err) {
    console.error("Error fetching jobs by IDs:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getJobsByIds };
