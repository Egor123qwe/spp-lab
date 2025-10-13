import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Главная' },
    { path: '/projects', label: 'Проекты' },
    { path: '/profile', label: 'Профиль' }
  ];

  return (
    <nav>
      <Link to="/" className="nav-logo">
        <h2>SPP lab</h2>
      </Link>
      <div>
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;