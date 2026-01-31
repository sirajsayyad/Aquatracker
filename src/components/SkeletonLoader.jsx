import React from 'react';
import { motion } from 'framer-motion';

// Base Skeleton with shimmer animation
const SkeletonBase = ({ className = '', style = {} }) => (
    <motion.div
        className={`relative overflow-hidden bg-white/5 rounded-xl ${className}`}
        style={style}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
        <motion.div
            className="absolute inset-0"
            style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
    </motion.div>
);

// Card Skeleton - for dashboard cards
export const CardSkeleton = () => (
    <div className="holo-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
            <SkeletonBase className="h-4 w-24" />
            <SkeletonBase className="h-8 w-8 rounded-lg" />
        </div>
        <SkeletonBase className="h-10 w-32" />
        <SkeletonBase className="h-4 w-40" />
        <div className="flex gap-2">
            <SkeletonBase className="h-6 w-16 rounded-full" />
            <SkeletonBase className="h-6 w-20 rounded-full" />
        </div>
    </div>
);

// Chart Skeleton - for analytics charts
export const ChartSkeleton = () => (
    <div className="holo-panel p-6">
        <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
                <SkeletonBase className="h-5 w-40" />
                <SkeletonBase className="h-3 w-28" />
            </div>
            <div className="flex gap-2">
                <SkeletonBase className="h-8 w-12 rounded-lg" />
                <SkeletonBase className="h-8 w-12 rounded-lg" />
                <SkeletonBase className="h-8 w-12 rounded-lg" />
            </div>
        </div>
        <div className="h-[300px] flex items-end gap-2 pt-4">
            {[...Array(12)].map((_, i) => (
                <SkeletonBase
                    key={i}
                    className="flex-1 rounded-t-lg"
                    style={{ height: `${Math.random() * 50 + 30}%` }}
                />
            ))}
        </div>
    </div>
);

// Gauge Skeleton - for telemetry gauges
export const GaugeSkeleton = () => (
    <div className="holo-panel p-4 flex flex-col items-center gap-3">
        <SkeletonBase className="w-20 h-20 rounded-full" />
        <SkeletonBase className="h-4 w-16" />
        <SkeletonBase className="h-3 w-12" />
    </div>
);

// Table Skeleton - for data tables
export const TableSkeleton = ({ rows = 5 }) => (
    <div className="holo-panel overflow-hidden">
        <div className="flex gap-4 p-4 border-b border-white/5">
            <SkeletonBase className="h-4 w-24" />
            <SkeletonBase className="h-4 w-32" />
            <SkeletonBase className="h-4 w-20" />
            <SkeletonBase className="h-4 w-28" />
        </div>
        {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border-b border-white/5">
                <SkeletonBase className="h-4 w-24" />
                <SkeletonBase className="h-4 w-32" />
                <SkeletonBase className="h-4 w-20" />
                <SkeletonBase className="h-4 w-28" />
            </div>
        ))}
    </div>
);

// List Skeleton - for alert/notification lists
export const ListSkeleton = ({ items = 4 }) => (
    <div className="space-y-3">
        {[...Array(items)].map((_, i) => (
            <div key={i} className="holo-panel p-4 flex items-center gap-4">
                <SkeletonBase className="w-10 h-10 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                    <SkeletonBase className="h-4 w-3/4" />
                    <SkeletonBase className="h-3 w-1/2" />
                </div>
                <SkeletonBase className="w-6 h-6 rounded-lg flex-shrink-0" />
            </div>
        ))}
    </div>
);

// Dashboard Skeleton - full dashboard loading state
export const DashboardSkeleton = () => (
    <div className="space-y-6">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
                <CardSkeleton />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <CardSkeleton />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <CardSkeleton />
            </div>
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
                <GaugeSkeleton key={i} />
            ))}
        </div>

        {/* Chart */}
        <ChartSkeleton />
    </div>
);

export default SkeletonBase;
