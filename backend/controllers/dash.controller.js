import Job from "../model/jon.model.js";

// getDashboard (MongoDB / Mongoose)
export const getDashboard = async (req, res) => {
    try {
        // Group by job status using MongoDB aggregation
        const rows = await Job.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const stats = {
            total: 0,
            pending: 0,
            running: 0,
            completed: 0,
            failed: 0
        };

        rows.forEach(row => {
            const status = row._id;   // MongoDB uses _id field for group key
            stats[status] = row.count;
            stats.total += row.count;
        });

        res.status(200).json({
            message: "Dashboard fetched successfully.",
            data: stats
        });

    } catch (error) {
        console.error("Error fetching dashboard:", error);
        res.status(500).json({
            message: "An error occurred while getting dashboard."
        });
    }
};
