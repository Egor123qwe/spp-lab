import React, { useState } from 'react';
import { TASK_STATUS } from '../../utils/taskFilter.js';

const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    assignee: initialData?.assignee || '',
    status: initialData?.status || TASK_STATUS.TODO
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
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название задачи обязательно';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание задачи обязательно';
    }
    
    if (!formData.assignee.trim()) {
      newErrors.assignee = 'Исполнитель обязателен';
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
    <div className="task-form">
      <div className="task-form__header">
        <h3>{initialData ? 'Редактировать задачу' : 'Создать задачу'}</h3>
        {onCancel && (
          <button 
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Отмена
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="task-form__content">
        <div className="form-group">
          <label htmlFor="title">Название задачи *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="Введите название задачи"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            placeholder="Введите описание задачи"
            rows="3"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="assignee">Исполнитель *</label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            className={errors.assignee ? 'error' : ''}
            placeholder="Введите имя исполнителя"
          />
          {errors.assignee && <span className="error-message">{errors.assignee}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="status">Статус</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value={TASK_STATUS.TODO}>К выполнению</option>
            <option value={TASK_STATUS.IN_PROGRESS}>В работе</option>
            <option value={TASK_STATUS.DONE}>Выполнено</option>
          </select>
        </div>

        <div className="task-form__actions">
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Сохранить изменения' : 'Создать задачу'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
