import React, { useState } from 'react';

const ProjectForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Название проекта обязательно';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание проекта обязательно';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="project-form">
      <div className="project-form__header">
        <h3>{initialData ? 'Редактировать проект' : 'Создать проект'}</h3>
        {onCancel && (
          <button 
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Отмена
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="project-form__content">
        <div className="form-group">
          <label htmlFor="name">Название проекта *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Введите название проекта"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            placeholder="Введите описание проекта"
            rows="4"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="project-form__actions">
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Сохранить изменения' : 'Создать проект'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
