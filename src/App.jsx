import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const LiveMonitor = lazy(() => import("./pages/LiveMonitor"));
const MapView = lazy(() => import("./pages/MapView"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Alerts = lazy(() => import("./pages/Alerts"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const OperatorMode = lazy(() => import("./pages/OperatorMode"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
            <LoadingSpinner message="Loading page..." />
          </div>
        }
      >
        <Routes>
          {/* Login page - standalone without layout */}
          <Route path="/login" element={<Login />} />

          {/* Main app routes with layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitoring" element={<LiveMonitor />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/operator" element={<OperatorMode />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
