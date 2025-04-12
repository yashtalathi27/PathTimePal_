// accept.js
import application from "../database/application.js";

export const accept = async (req, res) => {
    console.log("Received request body:", req.body); // Debugging Line

    const { jobId, seekerId, status } = req.body;

    try {
        const resp2 = await application.updateOne(
            { jobId: jobId, seekerId: seekerId },
            { $set: { status: status } }
        );

        res.status(201).json({ message: "Status updated successfully" });

    } catch (err) {
        console.error("Error in accept:", err);
        res.status(500).json({ message: err.message });
    }
};
