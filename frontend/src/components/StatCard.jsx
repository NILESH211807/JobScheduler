
const StatCard = ({ label, value, icon: Icon, trend, trendUp, animate, active, alert, iconColor }) => (
    <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all group">
        <div className="flex justify-between items-start mb-2">
            <p className="text-zinc-500 text-xs font-medium">{label}</p>
            <Icon
                size={30}
                className={`${animate ? 'animate-spin' : ''} ${iconColor}`}
            />
        </div>
        <div className="flex items-end gap-2">
            <h3 className="text-2xl font-semibold text-zinc-100 tracking-tight">{value}</h3>
            {trend && (
                <span className={`text-xs mb-1 ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                    {trend}
                </span>
            )}
        </div>
    </div>
);

export default StatCard;