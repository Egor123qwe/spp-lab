import React, { createContext, useContext, useReducer } from 'react';
import { generateId } from '../utils/idGenerator.js';
import { getCurrentDate } from '../utils/dateUtils.js';
import { TASK_STATUS } from '../utils/taskFilter.js';

const AppContext = createContext();

const initialState = {
  projects: [],
  tasks: [],
  currentUser: {
    name: 'Трухан Егор Валерьевич',
    email: 'egor@gmail.com',
    role: 'Директор директоров'
  }
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, {
          id: generateId(),
          ...action.payload,
          createdAt: getCurrentDate(),
          taskCount: 0
        }]
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id
            ? { ...project, ...action.payload }
            : project
        )
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        tasks: state.tasks.filter(task => task.projectId !== action.payload)
      };

    case 'ADD_TASK':
      const newTask = {
        id: generateId(),
        ...action.payload,
        createdAt: getCurrentDate()
      };
      
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, taskCount: project.taskCount + 1 }
            : project
        )
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload }
            : task
        )
      };

    case 'DELETE_TASK':
      const taskToDelete = state.tasks.find(task => task.id === action.payload);
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        projects: state.projects.map(project =>
          project.id === taskToDelete?.projectId
            ? { ...project, taskCount: Math.max(0, project.taskCount - 1) }
            : project
        )
      };

    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.status }
            : task
        )
      };

    case 'UPDATE_USER':
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload }
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addProject = (projectData) => {
    dispatch({ type: 'ADD_PROJECT', payload: projectData });
  };

  const updateProject = (projectData) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: projectData });
  };

  const deleteProject = (projectId) => {
    dispatch({ type: 'DELETE_PROJECT', payload: projectId });
  };

  const addTask = (taskData) => {
    dispatch({ type: 'ADD_TASK', payload: taskData });
  };

  const updateTask = (taskData) => {
    dispatch({ type: 'UPDATE_TASK', payload: taskData });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const updateTaskStatus = (taskId, status) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { taskId, status } });
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const getProjectById = (projectId) => {
    return state.projects.find(project => project.id === projectId);
  };

  const getTasksByProjectId = (projectId) => {
    return state.tasks.filter(task => task.projectId === projectId);
  };

  const getTaskById = (taskId) => {
    return state.tasks.find(task => task.id === taskId);
  };

  const value = {
    ...state,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateUser,
    getProjectById,
    getTasksByProjectId,
    getTaskById
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
