import React from 'react';
import { useApp } from '../../context/AppContext';
import { TASK_STATUS } from '../../utils/taskFilter.js';

const HomePage = () => {
  const { projects, tasks } = useApp();
  
  const activeProjects = projects.length;
  const tasksInProgress = tasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS).length;
  const completedTasks = tasks.filter(task => task.status === TASK_STATUS.DONE).length;

  return (
    <div className="home-page">
      <div className="home-page__hero">
        <h1>Добро пожаловать в мою лабораторную по СПП</h1>
      </div>

      <div className="home-page__stats">
        <h2>Статистика</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{activeProjects}</h3>
            <p>Активных проектов</p>
          </div>
          <div className="stat-card">
            <h3>{tasksInProgress}</h3>
            <p>Задач в работе</p>
          </div>
          <div className="stat-card">
            <h3>{completedTasks}</h3>
            <p>Выполненных задач</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
