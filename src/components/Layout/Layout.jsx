import React from 'react';
import Navigation from '../Navigation/Navigation.jsx';

const Layout = ({ children, currentPage, onPageChange }) => {
  return (
    <div>
      <Navigation 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
      />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
