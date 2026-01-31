import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ children, content, position = 'top', delay = 300 }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [timeoutId, setTimeoutId] = React.useState(null);

    const showTooltip = () => {
        const id = setTimeout(() => setIsVisible(true), delay);
        setTimeoutId(id);
    };

    const hideTooltip = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsVisible(false);
    };

    const positions = {
        top: {
            tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
            arrow: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900',
            initial: { opacity: 0, y: 5, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
        },
        bottom: {
            tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2',
            arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900',
            initial: { opacity: 0, y: -5, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
        },
        left: {
            tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2',
            arrow: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900',
            initial: { opacity: 0, x: 5, scale: 0.95 },
            animate: { opacity: 1, x: 0, scale: 1 },
        },
        right: {
            tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2',
            arrow: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900',
            initial: { opacity: 0, x: -5, scale: 0.95 },
            animate: { opacity: 1, x: 0, scale: 1 },
        },
    };

    const pos = positions[position];

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={`absolute z-[200] ${pos.tooltip}`}
                        initial={pos.initial}
                        animate={pos.animate}
                        exit={pos.initial}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                        <div
                            className="px-3 py-2 rounded-lg text-sm whitespace-nowrap max-w-xs"
                            style={{
                                background: 'linear-gradient(135deg, rgba(15, 20, 35, 0.98), rgba(8, 12, 22, 0.98))',
                                border: '1px solid rgba(0, 242, 255, 0.2)',
                                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 242, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {typeof content === 'string' ? (
                                <span className="text-gray-200">{content}</span>
                            ) : (
                                content
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Rich Data Tooltip - for displaying detailed information
export const DataTooltip = ({
    label,
    value,
    unit,
    trend,
    status,
    description,
    children
}) => {
    const content = (
        <div className="space-y-2 min-w-[180px]">
            <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">{label}</span>
                {status && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${status === 'good' ? 'bg-green-500/20 text-green-400' :
                            status === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                                'bg-red-500/20 text-red-400'
                        }`}>
                        {status.toUpperCase()}
                    </span>
                )}
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-sm text-gray-400">{unit}</span>
                {trend && (
                    <span className={`text-xs ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>
            {description && (
                <p className="text-xs text-gray-500 leading-relaxed border-t border-white/5 pt-2">
                    {description}
                </p>
            )}
        </div>
    );

    return <Tooltip content={content}>{children}</Tooltip>;
};

// Chart Tooltip - for chart data points
export const ChartTooltip = ({ data, children }) => {
    const content = (
        <div className="space-y-1 min-w-[140px]">
            <div className="text-xs text-cyan-400 font-mono border-b border-white/10 pb-1 mb-1">
                {data.time || data.label}
            </div>
            {data.values?.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-xs font-mono text-white">{item.value}</span>
                </div>
            ))}
        </div>
    );

    return <Tooltip content={content}>{children}</Tooltip>;
};

export default Tooltip;
