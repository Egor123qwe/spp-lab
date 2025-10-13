import React, { useState } from 'react';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import TaskForm from '../../components/TaskForm/TaskForm';
import { generateId } from '../../utils/idGenerator.js';
import { getCurrentDate } from '../../utils/dateUtils.js';
import { TASK_STATUS } from '../../utils/taskFilter.js';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleCreateProject = () => {
    setShowProjectForm(true);
  };

  const handleProjectSubmit = (projectData) => {
    const newProject = {
      id: generateId(),
      ...projectData,
      createdAt: getCurrentDate(),
      taskCount: 0
    };
    
    setProjects(prev => [...prev, newProject]);
    setShowProjectForm(false);
  };

  const handleProjectClick = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleTaskSubmit = (taskData) => {
    const newTask = {
      id: generateId(),
      ...taskData,
      projectId: selectedProject.id,
      createdAt: getCurrentDate()
    };
    
    setTasks(prev => [...prev, newTask]);
    
    // Обновляем количество задач в проекте
    setProjects(prev => prev.map(p => 
      p.id === selectedProject.id 
        ? { ...p, taskCount: p.taskCount + 1 }
        : p
    ));
    
    setShowTaskForm(false);
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskEditSubmit = (taskData) => {
    setTasks(prev => prev.map(task => 
      task.id === editingTask.id 
        ? { ...task, ...taskData }
        : task
    ));
    
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      // Обновляем количество задач в проекте
      setProjects(prev => prev.map(p => 
        p.id === selectedProject.id 
          ? { ...p, taskCount: Math.max(0, p.taskCount - 1) }
          : p
      ));
    }
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus }
        : task
    ));
  };

  const projectTasks = tasks.filter(task => task.projectId === selectedProject?.id);

  if (selectedProject) {
    return (
      <div className="project-detail">
        <div className="project-detail__header">
          <button 
            className="btn btn-secondary"
            onClick={handleBackToProjects}
          >
            ← Назад к проектам
          </button>
          <h1>{selectedProject.name}</h1>
          <button 
            className="btn btn-primary"
            onClick={handleCreateTask}
          >
            Создать задачу
          </button>
        </div>
        
        <div className="project-detail__description">
          <p>{selectedProject.description}</p>
        </div>

        {showTaskForm && (
          <div className="modal">
            <div className="modal__content">
              <TaskForm
                onSubmit={editingTask ? handleTaskEditSubmit : handleTaskSubmit}
                onCancel={() => {
                  setShowTaskForm(false);
                  setEditingTask(null);
                }}
                initialData={editingTask}
              />
            </div>
          </div>
        )}

        <KanbanBoard
          tasks={projectTasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </div>
    );
  }

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
