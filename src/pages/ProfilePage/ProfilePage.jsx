import React, { useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'Иван Иванов',
    email: 'ivan.ivanov@example.com',
    role: 'Менеджер проектов'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...user });
  };

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...user });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <h1>Профиль пользователя</h1>
        {!isEditing && (
          <button 
            className="btn btn-primary"
            onClick={handleEdit}
          >
            Редактировать
          </button>
        )}
      </div>

      <div className="profile-page__content">
        {isEditing ? (
          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Роль</label>
              <input
                type="text"
                id="role"
                name="role"
                value={editData.role}
                onChange={handleChange}
              />
            </div>

            <div className="profile-form__actions">
              <button 
                className="btn btn-primary"
                onClick={handleSave}
              >
                Сохранить
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">          
            <div className="profile-info__details">
              <h2>{user.name}</h2>
              <h3><span>Email:</span> {user.email}</h3>
              <h3><span>Роль:</span> {user.role}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
