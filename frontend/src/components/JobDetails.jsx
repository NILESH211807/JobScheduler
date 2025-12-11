"use client";
import { useState } from "react";
import { Activity, Calendar, Copy, FileJson, Hash, RefreshCw, X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";

function JobDetails({ job, setIsModalOpen }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        try {
            const formatted = JSON.stringify(JSON.parse(job?.payload), null, 2);
            navigator.clipboard.writeText(formatted);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Invalid JSON in payload:", err);
            alert("failed to copy");
        }
    };

    if (!job) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-5 duration-200">
                {/* Header */}
                <div className="px-5 py-4 border-b border-zinc-800 flex justify-between items-start bg-zinc-900/50 rounded-t-xl">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold text-zinc-100">{job.task_name}</h2>
                            <StatusBadge status={job.status} />
                        </div>
                        <p className="text-zinc-500 text-sm font-mono flex items-center gap-2">
                            <Hash size={12} /> ID: {job._id}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 -mr-2 -mt-2 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>
                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto space-y-8">
                    {/* Key Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5 flex items-center justify-start gap-4">
                                <label className="text-xs font-medium text-zinc-400 capitalize   flex items-center gap-2">
                                    <Activity size={12} /> Priority
                                </label>
                                <div className="flex">
                                    <PriorityBadge priority={job.priority} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400 capitalize  flex items-center gap-2">
                                    <Calendar size={12} /> Created At
                                </label>
                                <p className="text-zinc-200 text-sm font-medium">{job.createdAt}</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400 capitalize flex items-center gap-2">
                                    <RefreshCw size={12} /> Updated At
                                </label>
                                <p className="text-zinc-200 text-sm font-medium">{job.updatedAt}</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800" />

                    {/* Payload Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-200 flex items-center gap-2">
                                <FileJson size={16} className="text-zinc-400" />
                                Payload Data
                            </label>
                            <button type="button" onClick={handleCopy} className="text-xs flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors">
                                <Copy size={12} /> {isCopied ? "Copied!" : "Copy JSON"}
                            </button>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                            {/* Visual Key-Value View */}
                            <div className="grid grid-cols-1 divide-y divide-zinc-800/50">
                                {Object.entries(job.payload || {}).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex flex-col sm:flex-row sm:items-start p-3 hover:bg-zinc-900/30 transition-colors gap-2 sm:gap-4"
                                    >
                                        <div className="min-w-[120px] max-w-[150px]">
                                            <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800/50">
                                                {key}
                                            </span>
                                        </div>

                                        <div className="flex-1 break-all">
                                            {typeof value === "object" ? (
                                                <pre className="text-xs text-zinc-400 font-mono">
                                                    {JSON.stringify(value)}
                                                </pre>
                                            ) : (
                                                <span
                                                    className={`text-sm font-mono ${typeof value === "boolean"
                                                        ? "text-amber-400"
                                                        : "text-zinc-300"
                                                        }`}
                                                >
                                                    {String(value)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 rounded-b-xl flex justify-end gap-3">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 cursor-pointer text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobDetails;
