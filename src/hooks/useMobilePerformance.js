import { useState, useEffect, useMemo } from 'react';

/**
 * Hook to detect mobile devices and performance preferences
 * Used to optimize animations and heavy computations on mobile
 */
const useMobilePerformance = () => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    // Check if user prefers reduced motion
    const reduceMotion = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    // Detect mobile based on screen width
    const isMobile = windowWidth <= 768;
    const isTablet = windowWidth > 768 && windowWidth <= 1024;

    // Estimate if device is low-end based on various factors
    const isLowEnd = useMemo(() => {
        if (typeof navigator === 'undefined') return false;

        // Check hardware concurrency (CPU cores)
        const cores = navigator.hardwareConcurrency || 4;

        // Check device memory (if available)
        const memory = navigator.deviceMemory || 4;

        // Check connection type
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const slowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';

        return cores <= 2 || memory <= 2 || slowConnection;
    }, []);

    // Update window width on resize (debounced)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 150); // Debounce resize events
        };

        window.addEventListener('resize', handleResize);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Calculate performance tier
    const performanceTier = useMemo(() => {
        if (reduceMotion) return 'minimal';
        if (isLowEnd || isMobile) return 'low';
        if (isTablet) return 'medium';
        return 'high';
    }, [reduceMotion, isLowEnd, isMobile, isTablet]);

    return {
        isMobile,
        isTablet,
        isLowEnd,
        reduceMotion,
        performanceTier,
        windowWidth,
    };
};

export default useMobilePerformance;
