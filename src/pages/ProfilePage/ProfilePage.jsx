import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const ProfilePage = () => {
  const { currentUser, updateUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...currentUser });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...currentUser });
  };

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...currentUser });
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
              <h2>{currentUser.name}</h2>
              <h3><span>Email:</span> {currentUser.email}</h3>
              <h3><span>Роль:</span> {currentUser.role}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
