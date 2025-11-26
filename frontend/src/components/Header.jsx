
"use client";
import { useJobs } from "@/context/JobsContext";
import { LayoutGrid, List, Plus } from "lucide-react";
import { useState } from "react";

export default function Header({ setIsCreateModalOpen }) {

    const { setViewMode, viewMode } = useJobs();

    return (
        <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-lg">
                        J
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold tracking-tight text-zinc-100">JobScheduler</h1>
                        <p className="text-[10px] text-zinc-500 font-mono"></p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-800 rounded-md p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-sm transition-all cursor-pointer ${viewMode === 'list' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <List size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-sm transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}>
                            <LayoutGrid size={16} />
                        </button>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 bg-primary hover:opacity-90 transition-all cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        <Plus size={16} />
                        <span>New Job</span>
                    </button>
                </div>
            </div>
        </header>
    )
}