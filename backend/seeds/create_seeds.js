import { pool } from "../connection/db.js";
import { faker } from '@faker-js/faker';

const createJobSeed = async () => {
    try {
        for (let i = 0; i < 20; i++) {
            const taskName = faker.commerce.productName();

            const priority = faker.helpers.arrayElement(["low", "medium", "high"]);

            // JSON payload
            const payload = {
                action: faker.hacker.verb(),
                description: faker.hacker.phrase(),
                user: {
                    name: faker.person.fullName(),
                    email: faker.internet.email()
                },
                meta: {
                    jobId: faker.string.uuid(),
                    createdBy: faker.internet.username()
                }
            };

            const sql = `INSERT INTO jobs (task_name, priority, status, payload) VALUES (?, ?, ?, ?)`;
            const values = [taskName, priority, "running", JSON.stringify(payload)];

            await pool.query(sql, values);
        }

        console.log("✅ Seeded 100 jobs successfully.");
    } catch (error) {
        console.error("❌ Error seeding jobs:", error);
    }
};
export default createJobSeed;