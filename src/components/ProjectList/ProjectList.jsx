import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectList = ({ projects, onProjectClick, onCreateProject }) => {
  return (
    <div className="project-list">
      <div className="project-list__header">
        <h2>Проекты</h2>
        <button 
          className="btn btn-primary"
          onClick={onCreateProject}
        >
          Создать проект
        </button>
      </div>
      
      <div className="project-list__grid">
        {projects.length === 0 ? (
          <div className="project-list__empty">
            <h1>Проектов нет</h1>
          </div>
        ) : (
          projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onProjectClick={onProjectClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
