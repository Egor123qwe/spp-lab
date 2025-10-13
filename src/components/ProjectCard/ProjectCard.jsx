import React from 'react';
import { formatDate } from '../../utils/dateUtils.js';

const ProjectCard = ({ project, onProjectClick }) => {
  const { id, name, description, createdAt, taskCount } = project;

  return (
    <div 
      className="project-card"
      onClick={() => onProjectClick(id)}
    >
      <div className="project-card__header">
        <h3 className="project-card__title">{name}</h3>
        <span className="project-card__task-count">
          {taskCount} задач
        </span>
      </div>
      <p className="project-card__description">{description}</p>
      <div className="project-card__footer">
        <span className="project-card__date">
          Создан: {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
