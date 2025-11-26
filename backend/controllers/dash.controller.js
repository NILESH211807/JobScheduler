import { pool } from "../connection/db.js";

// getDashboard
export const getDashboard = async (req, res) => {
    try {

        const [rows] = await pool.query(`SELECT status, COUNT(*) AS count FROM jobs GROUP BY status`);

        const stats = {
            total: 0,
            pending: 0,
            running: 0,
            completed: 0,
            failed: 0
        };

        rows.forEach(row => {
            stats[row.status] = row.count;
            stats.total += row.count;
        });

        res.status(200).json({
            message: "Dashboard fetched successfully.",
            data: stats
        });

    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({
            message: "An error occurred while getting dashboard."
        });
    }
};
