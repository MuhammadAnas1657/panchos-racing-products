import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { MarqueeTicker } from './components/MarqueeTicker';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { RaceCarSpeedTransition } from './components/RaceCarSpeedTransition';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SprintCarsPage } from './pages/SprintCarsPage';
import { LateModelsPage } from './pages/LateModelsPage';
import { UsedPartsPage } from './pages/UsedPartsPage';
import { ServicesPage } from './pages/ServicesPage';
import { RocketTechPage } from './pages/RocketTechPage';
import { RaceTeamPage } from './pages/RaceTeamPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TrailersPage } from './pages/TrailersPage';
import { ReturnPolicyPage } from './pages/ReturnPolicyPage';
import { WishlistPage } from './pages/WishlistPage';

const MainContent: React.FC = () => {
  const { activePage, carSpeedLaunchKey } = useCart();

  const renderPage = () => {
    switch (activePage) {
      case 'product-detail':
        return <ProductDetailPage />;
      case 'shop':
        return <ShopPage />;
      case 'sprint-cars':
        return <SprintCarsPage />;
      case 'late-models':
        return <LateModelsPage />;
      case 'trailers':
        return <TrailersPage />;
      case 'used-parts':
        return <UsedPartsPage />;
      case 'services':
      case 'trailer-services':
        return <ServicesPage />;
      case 'rocket-tech':
        return <RocketTechPage />;
      case 'race-team':
        return <RaceTeamPage />;
      case 'about-us':
        return <AboutPage />;
      case 'contacts':
        return <ContactPage />;
      case 'refund-policy':
      case 'return-policy':
        return <ReturnPolicyPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-theme-main text-theme-primary transition-colors duration-200">
      <RaceCarSpeedTransition triggerKey={carSpeedLaunchKey} />
      <div>
        <Navbar />
        <MarqueeTicker />
        <main className="w-full">
          {renderPage()}
        </main>
      </div>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
