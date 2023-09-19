import './App.css';
import { MsalProvider } from '@azure/msal-react';
import { NavigationBar } from './components/NavigationBar';
import { PageLayout } from './components/PageLayout';
import { ProfileCard } from './components/ProfileCard';
import { ProfilePage } from './pages/ProfilePage';
import { ProductPage } from './pages/ProductPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { SummaryProfilePage } from './pages/SummaryProfilePage';

function App({instance}) {
  return (
    <MsalProvider instance={instance}>
      <div className="App">
        <Router>
        <PageLayout>
            <Routes>
              <Route path='/' element={<WelcomePage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/profiles" element={<ProfilePage />} />
              <Route path="/profiles-lite" element={<SummaryProfilePage />} />
              <Route path="/register" element={<CreateAccountPage />} />
            </Routes>
        </PageLayout>
        </Router>
      </div>
    </MsalProvider>
  );
}

export default App;
