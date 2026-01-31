export const waterQualityTrends = [
    { time: '08:00', pH: 7.2, Turbidity: 1.5, COD: 45 },
    { time: '09:00', pH: 7.1, Turbidity: 1.8, COD: 48 },
    { time: '10:00', pH: 7.3, Turbidity: 2.1, COD: 52 },
    { time: '11:00', pH: 7.4, Turbidity: 1.9, COD: 50 },
    { time: '12:00', pH: 7.2, Turbidity: 1.6, COD: 47 },
    { time: '13:00', pH: 7.0, Turbidity: 1.4, COD: 44 },
    { time: '14:00', pH: 6.9, Turbidity: 2.5, COD: 60 }, // Spike
];

export const liveParameters = [
    { label: 'pH Level', value: 7.2, unit: '', min: 0, max: 14, thresholds: { warning: 8.5, critical: 9.5 } },
    { label: 'Turbidity', value: 2.1, unit: 'NTU', min: 0, max: 10, thresholds: { warning: 4, critical: 6 } },
    { label: 'DO (Dissolved O2)', value: 6.5, unit: 'mg/L', min: 0, max: 10, thresholds: { warning: 4, critical: 2 } },
    { label: 'COD', value: 48, unit: 'mg/L', min: 0, max: 200, thresholds: { warning: 100, critical: 150 } },
    { label: 'BOD', value: 12, unit: 'mg/L', min: 0, max: 50, thresholds: { warning: 30, critical: 40 } },
    { label: 'Temp', value: 28, unit: '°C', min: 0, max: 50, thresholds: { warning: 35, critical: 40 } },
];


// Alerts Data
export const recentAlerts = [
    {
        id: 1,
        type: 'warning',
        title: 'Turbidity Approaching Threshold',
        message: 'Station A3 showing increased turbidity levels. Monitor closely.',
        time: '5 min ago',
        station: 'Station A3'
    },
    {
        id: 2,
        type: 'success',
        title: 'Maintenance Complete',
        message: 'Scheduled maintenance on Pump Unit B2 completed successfully.',
        time: '1 hour ago',
        station: 'Pump B2'
    },
    {
        id: 3,
        type: 'info',
        title: 'New Compliance Report',
        message: 'Monthly water quality report generated and ready for review.',
        time: '3 hours ago',
        station: 'All Stations'
    },
    {
        id: 4,
        type: 'danger',
        title: 'pH Level Alert',
        message: 'pH level at Station C1 exceeded warning threshold. Immediate action required.',
        time: 'Yesterday',
        station: 'Station C1'
    }
];

// Upcoming Features Data
export const upcomingFeatures = [
    {
        id: 1,
        title: 'AI-Powered Anomaly Detection',
        description: 'Machine learning algorithms that automatically detect unusual patterns in water quality data and predict potential issues before they occur.',
        icon: 'brain',
        status: 'In Development',
        progress: 75,
        eta: 'Q2 2026',
        tags: ['AI', 'Machine Learning', 'Predictive']
    },
    {
        id: 2,
        title: 'Mobile App Integration',
        description: 'Native iOS and Android apps for field technicians to receive real-time alerts, view dashboards, and submit reports from anywhere.',
        icon: 'smartphone',
        status: 'Planning',
        progress: 30,
        eta: 'Q3 2026',
        tags: ['Mobile', 'iOS', 'Android']
    },
    {
        id: 3,
        title: 'Advanced Reporting Suite',
        description: 'Automated compliance report generation with customizable templates, scheduled exports, and regulatory format support.',
        icon: 'fileText',
        status: 'In Development',
        progress: 60,
        eta: 'Q2 2026',
        tags: ['Reports', 'Compliance', 'Automation']
    },
    {
        id: 4,
        title: 'IoT Sensor Integration',
        description: 'Seamless integration with third-party IoT sensors and devices for expanded monitoring capabilities and data collection.',
        icon: 'cpu',
        status: 'Research',
        progress: 15,
        eta: 'Q4 2026',
        tags: ['IoT', 'Sensors', 'Hardware']
    },
    {
        id: 5,
        title: 'Multi-Site Dashboard',
        description: 'Unified dashboard to monitor and compare multiple treatment facilities from a single interface with aggregated analytics.',
        icon: 'building',
        status: 'Planning',
        progress: 40,
        eta: 'Q3 2026',
        tags: ['Enterprise', 'Multi-site', 'Scalability']
    },
    {
        id: 6,
        title: 'Voice Assistant',
        description: 'Voice-controlled interface for hands-free operation and quick data queries using natural language processing.',
        icon: 'mic',
        status: 'Research',
        progress: 10,
        eta: 'Q1 2027',
        tags: ['Voice', 'AI', 'Accessibility']
    }
];

// Parameter-specific trend data for Live Monitor
export const parameterTrends = {
    pH: [
        { time: '08:00', value: 7.2 },
        { time: '08:30', value: 7.1 },
        { time: '09:00', value: 7.3 },
        { time: '09:30', value: 7.2 },
        { time: '10:00', value: 7.4 },
        { time: '10:30', value: 7.3 },
        { time: '11:00', value: 7.2 },
        { time: '11:30', value: 7.1 },
        { time: '12:00', value: 7.0 },
        { time: '12:30', value: 7.2 },
    ],
    Turbidity: [
        { time: '08:00', value: 1.5 },
        { time: '08:30', value: 1.6 },
        { time: '09:00', value: 1.8 },
        { time: '09:30', value: 2.0 },
        { time: '10:00', value: 2.1 },
        { time: '10:30', value: 2.3 },
        { time: '11:00', value: 1.9 },
        { time: '11:30', value: 1.7 },
        { time: '12:00', value: 1.6 },
        { time: '12:30', value: 2.5 },
    ],
    DO: [
        { time: '08:00', value: 6.8 },
        { time: '08:30', value: 6.5 },
        { time: '09:00', value: 6.3 },
        { time: '09:30', value: 6.5 },
        { time: '10:00', value: 6.7 },
        { time: '10:30', value: 6.4 },
        { time: '11:00', value: 6.2 },
        { time: '11:30', value: 6.5 },
        { time: '12:00', value: 6.8 },
        { time: '12:30', value: 6.6 },
    ],
    COD: [
        { time: '08:00', value: 45 },
        { time: '08:30', value: 47 },
        { time: '09:00', value: 48 },
        { time: '09:30', value: 50 },
        { time: '10:00', value: 52 },
        { time: '10:30', value: 51 },
        { time: '11:00', value: 49 },
        { time: '11:30', value: 47 },
        { time: '12:00', value: 46 },
        { time: '12:30', value: 60 },
    ],
    BOD: [
        { time: '08:00', value: 10 },
        { time: '08:30', value: 11 },
        { time: '09:00', value: 12 },
        { time: '09:30', value: 11 },
        { time: '10:00', value: 13 },
        { time: '10:30', value: 12 },
        { time: '11:00', value: 11 },
        { time: '11:30', value: 12 },
        { time: '12:00', value: 10 },
        { time: '12:30', value: 14 },
    ],
    Temp: [
        { time: '08:00', value: 24 },
        { time: '08:30', value: 25 },
        { time: '09:00', value: 26 },
        { time: '09:30', value: 27 },
        { time: '10:00', value: 28 },
        { time: '10:30', value: 28 },
        { time: '11:00', value: 29 },
        { time: '11:30', value: 28 },
        { time: '12:00', value: 27 },
        { time: '12:30', value: 28 },
    ],
};

// Team Members Data
export const teamMembers = [
    {
        id: 1,
        name: 'Dr. Priya Sharma',
        initials: 'PS',
        role: 'Chief Water Quality Officer',
        department: 'Operations',
        status: 'online',
        expertise: ['Water Treatment', 'Quality Control', 'Compliance', 'Research'],
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        initials: 'RK',
        role: 'Senior Data Analyst',
        department: 'Analytics',
        status: 'online',
        expertise: ['Data Science', 'Machine Learning', 'Python', 'Visualization'],
    },
    {
        id: 3,
        name: 'Amit Patel',
        initials: 'AP',
        role: 'IoT Systems Engineer',
        department: 'Engineering',
        status: 'busy',
        expertise: ['IoT', 'Embedded Systems', 'Sensors', 'Hardware'],
    },
    {
        id: 4,
        name: 'Sneha Reddy',
        initials: 'SR',
        role: 'Environmental Specialist',
        department: 'Environment',
        status: 'online',
        expertise: ['Environmental Science', 'Sustainability', 'Regulations'],
    },
    {
        id: 5,
        name: 'Vikram Singh',
        initials: 'VS',
        role: 'Field Operations Manager',
        department: 'Operations',
        status: 'away',
        expertise: ['Field Operations', 'Team Management', 'Logistics'],
    },
    {
        id: 6,
        name: 'Ananya Desai',
        initials: 'AD',
        role: 'UI/UX Designer',
        department: 'Design',
        status: 'online',
        expertise: ['UI Design', 'UX Research', 'Prototyping', 'Figma'],
    },
];
