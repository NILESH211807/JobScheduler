export const PriorityBadge = ({ priority }) => {
    const styles = {
        high: "bg-red-500/10 text-red-400 border-red-500/20",
        medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        low: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    };

    return (
        <span className={`
       inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border
       ${styles[priority] || styles.Low}
    `}>
            {priority}
        </span>
    );
}