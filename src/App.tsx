import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './layout/staff/component/Header';
import Sidebar from './layout/staff/component/Sidebar';
import MainContent from './layout/staff/component/MainContent';
import TableModal from './layout/staff/component/TableModal';
import OrderOnTable from './layout/staff/component/orderOnTable/orderOnTable';
import Checkout1 from './layout/staff/component/checkout/Checkout1';
import Checkout2 from './layout/staff/component/checkout/Checkout2';
import Checkout3 from './layout/staff/component/checkout/Checkout3';
import CheckoutLayout from './layout/staff/component/checkout/CheckoutLayout';

type ContentType = 'home' | '2nd_floor' | 'gdeli' | 'setting';

const App: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<ContentType>('home');

  const handleSidebarClick = (contentType: ContentType) => {
    setSelectedContent(contentType);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<><Header toggleId="header-toggle" /><Sidebar onClickContent={handleSidebarClick} /><MainContent content={selectedContent} /></>} />
          <Route path="/orderOnTable/:tableId" element={<OrderOnTable />} />

          <Route path="/checkout/order/:orderId" element={<CheckoutLayout />}>
            <Route path="step1" element={<Checkout1 />} />
            <Route path="step2" element={<Checkout2 />} />
            <Route path="step3" element={<Checkout3 />} />
          </Route>
        </Routes>
        <TableModal />
      </div>
    </Router>
  );
};

export default App;
