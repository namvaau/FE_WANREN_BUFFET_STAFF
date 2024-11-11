import React from 'react';
import TableList from './TableList'; // Make sure this import points to the correct path

interface MainContentProps {
  content: 'home' | '2nd_floor' | 'gdeli' | 'setting';
}

const MainContent: React.FC<MainContentProps> = ({ content }) => {
  return (
    <main className="main main-content" id='main'>
      {content === 'home' && <TableList />}
      {content === '2nd_floor' && <h1 style={{paddingLeft: '20px'}}>Welcome to Tầng 2</h1>}
      {content === 'gdeli' && <h1>Welcome to G-Deli</h1>}
      {content === 'setting' && <h1>Cài Đặt</h1>}
    </main>
  );
};

export default MainContent;
