import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { ChevronDown } from "lucide-react";

const FilterSelect = ({ value, onChange, options, label }) => (
    <div className="relative">
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="capitalize min-w-[120px] bg-zinc-900/50 border border-zinc-800 text-zinc-200">
                <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent className="appearance-none bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-md text-sm hover:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 cursor-pointer ">
                <SelectGroup>
                    {options.map(opt => (
                        <SelectItem className='capitalize' key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
);

export default FilterSelect;