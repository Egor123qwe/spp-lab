import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { TASK_STATUS, filterTasksByStatus } from '../../utils/taskFilter.js';

const KanbanBoard = ({ tasks, onEditTask, onDeleteTask, onTaskStatusChange }) => {
  const todoTasks = filterTasksByStatus(tasks, TASK_STATUS.TODO);
  const inProgressTasks = filterTasksByStatus(tasks, TASK_STATUS.IN_PROGRESS);
  const doneTasks = filterTasksByStatus(tasks, TASK_STATUS.DONE);

  const handleTaskDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId && onTaskStatusChange) {
      onTaskStatusChange(taskId, newStatus);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const renderColumn = (title, tasks, status) => (
    <div 
      className="kanban-column"
      onDrop={(e) => handleTaskDrop(e, status)}
      onDragOver={handleDragOver}
    >
      <div className="kanban-column__header">
        <h3>{title}</h3>
        <span className="kanban-column__count">{tasks.length}</span>
      </div>
      <div className="kanban-column__content">
        {tasks.length === 0 ? (
          <div className="kanban-column__empty">
            <p>Нет задач</p>
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              className="kanban-column__task"
            >
              <TaskCard
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="kanban-board">
      <div className="kanban-board__header">
        <h2>Kanban-доска</h2>
      </div>
      <div className="kanban-board__columns">
        {renderColumn('К выполнению', todoTasks, TASK_STATUS.TODO)}
        {renderColumn('В работе', inProgressTasks, TASK_STATUS.IN_PROGRESS)}
        {renderColumn('Выполнено', doneTasks, TASK_STATUS.DONE)}
      </div>
    </div>
  );
};

export default KanbanBoard;
