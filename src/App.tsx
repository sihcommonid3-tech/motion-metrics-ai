import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeScreen from "./components/screens/HomeScreen";
import RecordScreen from "./components/screens/RecordScreen";
import DashboardScreen from "./components/screens/DashboardScreen";
import LeaderboardScreen from "./components/screens/LeaderboardScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  const renderScreen = () => {
    switch (currentView) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentView} />;
      case 'record':
        return <RecordScreen onNavigate={setCurrentView} />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onNavigate={setCurrentView} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Layout currentView={currentView} onNavigate={setCurrentView}>
          {renderScreen()}
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
