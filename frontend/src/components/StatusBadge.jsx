export default function StatusBadge({ status }) {
    // Shadcn-like status indicators
    const config = {
        completed: { color: 'text-emerald-400', bg: 'bg-emerald-400', label: 'Done' },
        running: { color: 'text-blue-400', bg: 'bg-blue-400', label: 'Running' },
        pending: { color: 'text-zinc-400', bg: 'bg-zinc-400', label: 'Waiting' },
        failed: { color: 'text-red-400', bg: 'bg-red-400', label: 'Failed' }
    };

    const style = config[status] || config.pending;

    return (
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
                {status === 'running' && (
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.bg}`}></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${style.bg}`}></span>
            </span>
            <span className={`text-sm font-medium ${style.color} capitalize`}>
                {status}
            </span>
        </div>
    );
}