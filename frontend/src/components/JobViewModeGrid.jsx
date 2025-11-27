import { RefreshCw } from "lucide-react";
import { PriorityBadge } from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { dateFormat } from "@/utils/helper";

export const GridView = ({ filteredJobs, onRunJob, getJobDetails }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map(job => (
                <div key={job.id} className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                            <RefreshCw size={18} />
                        </div>
                        <StatusBadge status={job.status} />
                    </div>
                    <h3 className="font-medium text-zinc-200 mb-1">{job?.task_name?.length > 30 ? job.task_name.slice(0, 20) + '...' : job.task_name}</h3>
                    <p className="text-xs text-zinc-500 mb-4">updated_at: {dateFormat(job.updated_at)}</p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
                        <PriorityBadge priority={job.priority} />
                        <div className="flex gap-2">
                            <button
                                onClick={() => getJobDetails(job)}
                                disabled={job.status === 'running'}
                                className="text-xs font-medium px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-950 hover:bg-zinc-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors">
                                View
                            </button>
                            <button
                                onClick={() => onRunJob(job.id)}
                                disabled={job.status === 'running' || job.status === 'completed'}
                                className="text-xs font-medium px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-950 hover:bg-zinc-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
                            >
                                {job.status === 'Running' ? 'Running...' : 'Run Task'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};
