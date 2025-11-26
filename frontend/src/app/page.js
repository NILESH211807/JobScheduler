import { JobsProvider } from "@/context/JobsContext";
import Dashboard from "@/pages/Dashboard";

export default function page() {
    return (
        <JobsProvider>
            <Dashboard />
        </JobsProvider>
    );
}