"use client";

import React, {  useState } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hook/debounce";

export default function SearchQuery({ setQuery }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = useDebounce((value) => {
        // Call API here
        console.log("Searching for:", value);
        setQuery(value);
    }, 300);

    const onChangeQuery = (e) => {
        const value = e.target.value.trim();
        const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
        setSearchQuery(sanitizedValue);

        // Call debounced API trigger
        handleSearch(sanitizedValue);
    };

    const handleClearQuery = () => {
        setSearchQuery("");
        handleSearch(""); 
        setQuery("");    
    };

    return (
        <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />

            <input
                type="text"
                placeholder="Search Job Name"
                value={searchQuery}
                onChange={onChangeQuery}
                className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-200 pl-9 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 placeholder:text-zinc-600 transition-all"
            />

            {searchQuery && (
                <X
                    onClick={handleClearQuery}
                    size={20}
                    className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-red-500"
                />
            )}
        </div>
    );
}
