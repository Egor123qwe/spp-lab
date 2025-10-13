import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectForm from '../../components/ProjectForm/ProjectForm';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, addProject } = useApp();
  const [showProjectForm, setShowProjectForm] = useState(false);

  const handleCreateProject = () => {
    setShowProjectForm(true);
  };

  const handleProjectSubmit = (projectData) => {
    addProject(projectData);
    setShowProjectForm(false);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="projects-page">
      {showProjectForm && (
        <div className="modal">
          <div className="modal__content">
            <ProjectForm
              onSubmit={handleProjectSubmit}
              onCancel={() => setShowProjectForm(false)}
            />
          </div>
        </div>
      )}

      <ProjectList
        projects={projects}
        onProjectClick={handleProjectClick}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default ProjectsPage;
