import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './layout/staff/component/Header';
import Sidebar from './layout/staff/component/Sidebar';
import MainContent from './layout/staff/component/MainContent';
import TableModal from './layout/staff/component/TableModal';
import OrderOnTable from './layout/staff/component/orderOnTable/orderOnTable';

type ContentType = 'home' | '2nd_floor' | 'gdeli' | 'setting';

const App: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<ContentType>('home');

  const handleSidebarClick = (contentType: ContentType) => {
    setSelectedContent(contentType);
  };

  return (
    <Router>
      <div>
        <Header toggleId="header-toggle" />
        <Sidebar onClickContent={handleSidebarClick} />
        
        <Routes>
          <Route path="/" element={<MainContent content={selectedContent} />} />
          <Route path="/orderOnTable/:tableId" element={<OrderOnTable />} />
        </Routes> 

        <TableModal />
      </div>
    </Router>
  );
};

export default App;
