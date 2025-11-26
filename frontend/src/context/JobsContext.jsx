"use client";
import React, { createContext, useContext, useState } from "react";

// create context
export const JobsContext = createContext();

// create provider
export const JobsProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    const [staticJobs, setStaticJobs] = useState({
        total: 0,
        pending: 0,
        running: 0,
        completed: 0,
        failed: 0
    });


    const values = {
        jobs,
        setJobs,
        loading,
        setLoading,
        staticJobs,
        setStaticJobs,
        viewMode,
        setViewMode
    };

    return (
        <JobsContext.Provider value={values}>
            {children}
        </JobsContext.Provider>
    );
};

export const useJobs = () => useContext(JobsContext);