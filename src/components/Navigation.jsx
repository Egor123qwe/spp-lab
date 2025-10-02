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
            style={{
              margin: '0 10px',
              padding: '5px 10px',
              backgroundColor: currentPage === item.id ? '#007bff' : '#f8f9fa',
              color: currentPage === item.id ? 'white' : 'black',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
