import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import TaskForm from '../../components/TaskForm/TaskForm';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getProjectById, 
    getTasksByProjectId, 
    addTask, 
    updateTask, 
    deleteTask, 
    updateTaskStatus 
  } = useApp();
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const project = getProjectById(id);
  const tasks = getTasksByProjectId(id);

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleTaskSubmit = (taskData) => {
    addTask({ ...taskData, projectId: id });
    setShowTaskForm(false);
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskEditSubmit = (taskData) => {
    updateTask({ ...taskData, id: editingTask.id });
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      deleteTask(taskId);
    }
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  if (!project) {
    return <div>Проект не найден</div>;
  }

  return (
    <div className="project-detail">
      <div className="project-detail__header">
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/projects')}
        >
          ← Назад к проектам
        </button>
        <h1>{project.name}</h1>
        <button 
          className="btn btn-primary"
          onClick={handleCreateTask}
        >
          Создать задачу
        </button>
      </div>
      
      <div className="project-detail__description">
        <p>{project.description}</p>
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
        tasks={tasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onTaskStatusChange={handleTaskStatusChange}
      />
    </div>
  );
};

export default ProjectDetailPage;
