import { ArrowUpRight, Loader2, MoreHorizontal, Play, RefreshCw, View } from "lucide-react";
import EmptyState from "./EmptyState";
import { PriorityBadge } from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { dateFormat } from "@/utils/helper";

export default function ListView({ filteredJobs, onRunJob, getJobDetails }) {

    return (
        <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/30">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                <div className="col-span-5 pl-2">Job Details</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Updated At</div>
                <div className="col-span-1 text-right pr-2">Actions</div>
            </div>

            <div className="divide-y divide-zinc-800">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div key={job.id} className="group p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-zinc-900/50 transition-colors">
                            <div className="col-span-5 flex items-start gap-3">
                                <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                                    <RefreshCw size={16} />
                                </div>
                                <div>
                                    <div className="font-medium text-zinc-200 text-sm group-hover:text-white transition-colors">{job?.task_name?.length > 50 ? job?.task_name?.slice(0, 30) + "..." : job?.task_name}</div>
                                    <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                                        <span className="font-mono text-[10px] bg-zinc-800 px-1 rounded text-zinc-400">ID-{job.id}</span>
                                        <span>• Created {dateFormat(job.created_at)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 mt-3 md:mt-0">
                                <StatusBadge status={job.status} />
                            </div>

                            <div className="col-span-2 mt-2 md:mt-0">
                                <PriorityBadge priority={job.priority} />
                            </div>

                            <div className="col-span-2 min-md:-ml-7 mt-2 md:mt-0 text-sm text-zinc-400 font-mono text-xs">
                                {dateFormat(job.updatedAt)}
                            </div>

                            <div className="col-span-1 mt-3 md:mt-0 flex justify-end">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => onRunJob(job.id)}
                                        disabled={job.status === 'running' || job.status === 'completed'}
                                        className={`
                              h-8 w-8 flex items-center justify-center rounded-md border transition-all
                              ${job.status === 'running'
                                                ? 'bg-zinc-800 border-zinc-800 text-zinc-500 cursor-not-allowed'
                                                : 'bg-zinc-950 border-zinc-800 cursor-pointer text-zinc-400 hover:text-zinc-100 hover:border-zinc-600'
                                            }
                            `}
                                    >
                                        {job.status === 'running' ?
                                            <Loader2 size={14} className="animate-spin" /> :
                                            <Play size={14} />}
                                    </button>
                                    <button onClick={() => getJobDetails(job)} className="h-8 w-8 flex items-center justify-center rounded-md border transition-all bg-zinc-950 border-zinc-800 cursor-pointer text-zinc-400">
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    )
}