import React from 'react';

const Navigation = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'projects', label: 'Проекты' },
    { id: 'profile', label: 'Профиль' }
  ];

  return (
    <nav>
      <h2>TaskManager</h2>
      <div>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={currentPage === item.id ? 'active' : ''}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;