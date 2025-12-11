import { faker } from '@faker-js/faker';
import Job from '../model/jon.model.js';

const createJobSeed = async () => {
    try {

        const jobs = [];
        for (let i = 0; i < 22; i++) {
            const taskName = faker.commerce.productName();

            const priority = faker.helpers.arrayElement(["low", "medium", "high"]);

            // JSON payload
            const payload = {
                action: faker.hacker.verb(),
                description: faker.hacker.phrase(),
                name: faker.person.fullName(),
                email: faker.internet.email(),
                jobId: faker.string.uuid(),
                createdBy: faker.internet.username()
            };

            const job = {
                task_name: taskName,
                priority,
                payload,
                status: "pending",
            };

            jobs.push(job);
        }

        // console.log(jobs);
        await Job.insertMany(jobs);


        console.log("✅ Seeded jobs successfully.");
    } catch (error) {
        console.error("❌ Error seeding jobs:", error);
    }
};
export default createJobSeed;