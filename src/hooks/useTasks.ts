import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  getUserTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStatus,
  toggleTaskCompletion,
  Task
} from '@/services/firestoreTasks';

// Hook to fetch all user tasks
export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userTasks = await getUserTasks(user.uid);
      setTasks(userTasks);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) {
      console.error('Cannot add task: No user logged in');
      return;
    }

    try {
      console.log('Adding task for user:', user.uid);
      const taskId = await createTask({ ...task, userId: user.uid });
      console.log('Task added with ID:', taskId);
      console.log('Refreshing tasks...');
      await fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
      throw err;
    }
  };

  const editTask = async (taskId: string, updates: Partial<Task>) => {
    console.log('editTask called with taskId:', taskId, 'updates:', updates);
    try {
      await updateTask(taskId, updates);
      console.log('Task updated, fetching tasks...');
      await fetchTasks();
      console.log('Tasks refreshed successfully');
    } catch (err) {
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      throw err;
    }
  };

  const toggleTask = async (taskId: string, currentStatus: Task['status']) => {
    try {
      await toggleTaskCompletion(taskId, currentStatus);
      await fetchTasks();
    } catch (err) {
      console.error('Error toggling task:', err);
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    toggleTask,
    refreshTasks: fetchTasks,
  };
};

// Hook to fetch tasks by status
export const useTasksByStatus = (status: Task['status']) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const filteredTasks = await getTasksByStatus(user.uid, status);
        setTasks(filteredTasks);
      } catch (error) {
        console.error('Error fetching tasks by status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, status]);

  return { tasks, loading };
};
