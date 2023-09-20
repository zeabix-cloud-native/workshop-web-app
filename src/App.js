import './App.css';
import { MsalProvider } from '@azure/msal-react';
import { PageLayout } from './components/PageLayout';
import { ProfilePage } from './pages/ProfilePage';
import { ProductPage } from './pages/ProductPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { SummaryProfilePage } from './pages/SummaryProfilePage';
import { ProductWithStockPage } from './pages/ProductWithStockPage';
import { ListProfilePage } from './pages/ListProfilePage';

function App({instance}) {
  return (
    <MsalProvider instance={instance}>
      <div className="App">
        <Router>
        <PageLayout>
            <Routes>
              <Route path='/' element={<WelcomePage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/profiles-lite" element={<SummaryProfilePage />} />
              <Route path="/register" element={<CreateAccountPage />} />
              <Route path='/product-with-stock' element={<ProductWithStockPage id='8d3c59f8-371b-4753-8333-db714922203f' /> } />
              <Route path='/admin' element={<ListProfilePage />} />
            </Routes>
        </PageLayout>
        </Router>
      </div>
    </MsalProvider>
  );
}

export default App;
