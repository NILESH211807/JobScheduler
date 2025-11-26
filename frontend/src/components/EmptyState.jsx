import { Search } from "lucide-react";

export default function EmptyState() {
    return (
        <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                <Search size={20} className="text-zinc-600" />
            </div>
            <h3 className="text-zinc-200 font-medium mb-1">No jobs found</h3>
            <p className="text-zinc-500 text-sm max-w-xs">
                No jobs match your current filter criteria. Try adjusting your filters or search query.
            </p>
        </div>
    );
}