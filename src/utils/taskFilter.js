// Статусы задач
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done'
};


export const filterTasksByStatus = (tasks, status) => {
  if (!status || status === 'all') {
    return tasks;
  }
  
  return tasks.filter(task => task.status === status);
};
