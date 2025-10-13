import React from 'react';
import { formatDate } from '../../utils/dateUtils.js';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { id, title, description, assignee, status, createdAt } = task;

  const getStatusLabel = (status) => {
    const statusLabels = {
      todo: 'К выполнению',
      in_progress: 'В работе',
      done: 'Выполнено'
    };
    return statusLabels[status] || status;
  };

  const getStatusClass = (status) => {
    return `task-card__status task-card__status--${status}`;
  };

  return (
    <div className="task-card">
      <div className="task-card__header">
        <h4 className="task-card__title">{title}</h4>
        <div className="task-card__actions">
          <button 
            className="btn btn-sm btn-secondary"
            onClick={() => onEdit(id)}
          >
            Редактировать
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(id)}
          >
            Удалить
          </button>
        </div>
      </div>
      
      <p className="task-card__description">{description}</p>
      
      <div className="task-card__info">
        <div className="task-card__assignee">
          <strong>Исполнитель:</strong> {assignee}
        </div>
        <div className="task-card__meta">
          <span className={getStatusClass(status)}>
            {getStatusLabel(status)}
          </span>
          <span className="task-card__date">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
