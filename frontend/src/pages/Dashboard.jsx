"use client";
import React, { useState, useEffect, useCallback, Activity } from 'react';
import {
    Activity as ActivityIcon,
    BadgeCheck,
    Loader,
    Clock2
} from 'lucide-react';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import JobForm from '@/components/JobForm';
import { fetchData } from '@/utils/fetch';
import { toast } from 'sonner';
import { useJobs } from '@/context/JobsContext';
import LoadingSpinner from '@/components/Loader';
import ListView from '@/components/ListView';
import { GridView } from '@/components/JobViewModeGrid';
import FilterSelect from '@/components/FilterSelect';
import PaginationTool from '@/components/PaginationTool';
import SearchQuery from '@/components/SearchQuery';
import JobDetails from '@/components/JobDetails';


export default function Dashboard() {

    const { staticJobs, setStaticJobs, viewMode } = useJobs();
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [runningJobIds, setRunningJobIds] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState("");
    const [selectedJob, setSelectedJob] = useState({
        id: null,
        task_name: "",
        status: "",
        priority: "",
        created_at: "",
        updated_at: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // fetch stats data
    const fetchStatsData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetchData('/api/dash');
            if (response?.message === "Dashboard fetched successfully.") {
                setStaticJobs(response.data);
            } else {
                const errorMessage = response?.message || "Something went wrong!";
                toast.error(errorMessage)
            }
        } catch (error) {
            const errorMessage = error?.message || "Something went wrong!";
            toast(errorMessage, {
                description: "An error occurred while fetching data. Please try again later.",
            })
        } finally {
            setIsLoading(false);
        }
    }, [setStaticJobs]);

    // fetch jobs data
    const fetchJobs = useCallback(async (page = 1, limit = 10) => {
        setLoadingMore(true);

        let queryUrl = `/api/jobs?page=${page}&limit=${limit}`;

        // query 
        if (query) queryUrl += `&query=${query}`;
        // status filter
        if (statusFilter !== 'all') queryUrl += `&status=${statusFilter}`;
        // priority filter
        if (priorityFilter !== 'all') queryUrl += `&priority=${priorityFilter}`;

        try {
            const response = await fetchData(queryUrl);
            if (response?.message === "Jobs fetched successfully") {
                setJobs(response.data);
                setTotalPages(response.totalPages);
            } else {
                const errorMessage = response?.message || "Something went wrong!";
                toast.error(errorMessage)
            }
        } catch (error) {
            const errorMessage = error?.message || "Something went wrong!";
            toast(errorMessage, {
                description: "An error occurred while fetching data. Please try again later.",
            })
        } finally {
            setLoadingMore(false);
        }
    }, [page, limit, query, statusFilter, priorityFilter]);



    useEffect(() => {
        fetchJobs();
    }, [query, statusFilter, priorityFilter]);


    // handle job stats 
    useEffect(() => {
        fetchStatsData();
    }, []);

    // Action Handlers
    const handleRunJob = async (id) => {
        if (!id) {
            toast.error("Job id is required");
            return;
        }

        setRunningJobIds(prev => [...prev, id]);
        setStaticJobs(prev => ({
            ...prev, running: prev.running + 1, pending: prev.pending - 1
        }));

        try {
            const response = await fetchData(`/api/jobs/run-job/${id}`, {
                method: 'POST',
            });

            if (response?.message === "Job is running") {
                setJobs(prev => prev.map(job =>
                    job.id === id ? { ...job, status: 'running' } : job
                ));
            } else {
                toast.error(response.message || "Something went wrong!");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        }
    };

    // Poll the server every 2seconds
    useEffect(() => {
        const handlePolling = async () => {
            try {
                const response = await fetchData(`/api/jobs/${runningJobIds[0]}`);
                if (response?.message === "Job fetched successfully") {
                    if (response.data.status === 'completed') {
                        setRunningJobIds(prev => prev.filter(id => id !== runningJobIds[0]));
                        setJobs(prev => prev.map(job =>
                            job.id === runningJobIds[0] ? { ...job, status: 'completed' } : job
                        ));
                        setStaticJobs(prev => ({ ...prev, running: prev.running - 1, completed: prev.completed + 1 }));
                    }
                } else {
                    toast.error(response.message || "Something went wrong!");
                }
            } catch (error) {
                toast.error(error.message || "Something went wrong! while running job");
            }
        }

        let interval;

        if (runningJobIds.length > 0) {
            interval = setInterval(handlePolling, 3000);
        }
        return () => clearInterval(interval);
    }, [runningJobIds]);


    // getJobDetails
    const getJobDetails = useCallback((data) => {
        setSelectedJob(data);
        setIsModalOpen(true);
    }, [setSelectedJob, setIsModalOpen])

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800">
            <Header setIsCreateModalOpen={setIsCreateModalOpen} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        label="Total Workflows"
                        value={staticJobs?.total}
                        icon={ActivityIcon}
                    />
                    <StatCard
                        label="Completed"
                        value={staticJobs?.completed}
                        icon={BadgeCheck}
                        iconColor="text-emerald-500"
                    />
                    <StatCard
                        label="Active Running"
                        value={staticJobs?.running}
                        icon={Loader}
                        animate={true}
                        active={true}
                        iconColor="text-blue-400"
                    />
                    <StatCard
                        label="Pending Workflows"
                        value={staticJobs?.pending}
                        icon={Clock2}
                        alert={true}
                        iconColor="text-yellow-500"
                    />
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <SearchQuery query={query} setQuery={setQuery} />
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <FilterSelect
                            value={statusFilter}
                            onChange={setStatusFilter}
                            options={['all', 'completed', 'running', 'pending']}
                            label="Status"
                        />
                        <FilterSelect
                            value={priorityFilter}
                            onChange={setPriorityFilter}
                            options={['all', 'high', 'medium', 'low']}
                            label="Priority"
                        />
                    </div>
                </div>

                {
                    loadingMore ? (
                        <div className='w-full min-h-[300px] text-center max-h-screen flex items-center flex-col'>
                            <div
                                className="w-14 h-14 mt-16 border-4 border-dashed rounded-full animate-spin border-primary mx-auto"
                            ></div>
                            <h2 className="text-zinc-300 font-semibold text-xl mb-3 dark:text-white mt-4">Loading...</h2>
                            <p className="text-zinc-600 text-sm dark:text-zinc-400">
                                Please wait while we fetch your data.
                            </p>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'list' ? (
                                <ListView
                                    getJobDetails={getJobDetails}
                                    filteredJobs={jobs} onRunJob={handleRunJob} />
                            ) : (
                                <GridView getJobDetails={getJobDetails} filteredJobs={jobs} onRunJob={handleRunJob} />
                            )}
                        </>
                    )
                }

                {!loadingMore && (
                    <PaginationTool
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                        handlePagination={fetchJobs}
                    />
                )}

            </main>

            {/*  Modal */}
            <Activity mode={isCreateModalOpen ? "visible" : "hidden"}>
                <JobForm setJobs={setJobs}
                    setIsCreateModalOpen={setIsCreateModalOpen} />
            </Activity>


            {/* job details modal */}
            <Activity mode={isModalOpen ? "visible" : "hidden"}>
                <JobDetails
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    job={selectedJob}
                />
            </Activity>
        </div>
    );
}