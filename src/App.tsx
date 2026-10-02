import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeTab } from './components/HomeTab';
import { MenuTab } from './components/MenuTab';
import { SubscriptionTab } from './components/SubscriptionTab';
import { BulkOrdersTab } from './components/BulkOrdersTab';
import { AccountDashboardTab } from './components/AccountDashboardTab';
import { InfoPagesTab } from './components/InfoPagesTab';
import { AdminPortalTab } from './components/AdminPortalTab';
import { AuthModal } from './components/AuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { CartDrawer } from './components/CartDrawer';
import { MealCustomizerModal } from './components/MealCustomizerModal';
import { MakeMySaladModal } from './components/MakeMySaladModal';
import { GoogleSheetsViewerModal } from './components/GoogleSheetsViewerModal';
import { ShareModal } from './components/ShareModal';
import { GlobalClickEffect } from './components/GlobalClickEffect';

const AppContent: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E293B]">
      {/* Global Interactive Organic Click Ripples & Free-Flow Particles */}
      <GlobalClickEffect />

      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Tab Content with Smooth Free-Flow Tab Transition */}
      <main className="flex-1 overflow-x-hidden">
        <div key={currentTab} className="animate-tab-freeflow">
          {currentTab === 'home' && <HomeTab />}
          {currentTab === 'menu' && <MenuTab />}
          {currentTab === 'subscriptions' && <SubscriptionTab />}
          {currentTab === 'bulk-orders' && <BulkOrdersTab />}
          {currentTab === 'account' && <AccountDashboardTab />}
          {currentTab === 'admin' && <AdminPortalTab />}
          {currentTab === 'info' && <InfoPagesTab />}
        </div>
      </main>


      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals & Slide-Overs */}
      <AuthModal />
      <AdminLoginModal />
      <ProfileDrawer />
      <CartDrawer />
      <MealCustomizerModal />
      <MakeMySaladModal />
      <GoogleSheetsViewerModal />
      <ShareModal />
    </div>
  );
};



export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
