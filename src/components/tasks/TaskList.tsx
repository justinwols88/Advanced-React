import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/common/Loader';
import { 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  ListTodo, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/common/Button';

// TypeScript Type Definitions
interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  completedAt: Timestamp | null;
}

interface TaskListProps {
  refreshTrigger?: number;
  onTaskUpdate?: () => void;
  className?: string;
}

interface EditingTask {
  id: string;
  title: string;
  description: string;
}

interface TaskErrors {
  [taskId: string]: {
    title?: string;
    description?: string;
  };
}

const TaskList: React.FC<TaskListProps> = ({ 
  refreshTrigger = 0, 
  onTaskUpdate,
  className = '' 
}) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null);
  const [taskErrors, setTaskErrors] = useState<TaskErrors>({});
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  // Fetch tasks from Firestore
  const fetchTasks = async (): Promise<void> => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const tasksCollection = collection(db, 'tasks');
      const tasksQuery = query(
        tasksCollection,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(tasksQuery);
      const fetchedTasks: Task[] = [];

      querySnapshot.forEach((doc) => {
        fetchedTasks.push({
          id: doc.id,
          ...doc.data()
        } as Task);
      });

      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on mount and when refreshTrigger changes
  useEffect(() => {
    fetchTasks();
  }, [user, refreshTrigger]);

  // Start editing a task
  const handleEditClick = (task: Task): void => {
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
    });
    // Clear any existing errors for this task
    setTaskErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[task.id];
      return newErrors;
    });
  };

  // Cancel editing
  const handleCancelEdit = (): void => {
    setEditingTask(null);
    setTaskErrors({});
  };

  // Validate task data
  const validateTask = (taskId: string, title: string, description: string): boolean => {
    const errors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      errors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }

    if (description.trim().length > 500) {
      errors.description = 'Description must not exceed 500 characters';
    }

    if (Object.keys(errors).length > 0) {
      setTaskErrors(prev => ({ ...prev, [taskId]: errors }));
      return false;
    }

    return true;
  };

  // Update task in Firestore
  const handleUpdateTask = async (): Promise<void> => {
    if (!editingTask) return;

    if (!validateTask(editingTask.id, editingTask.title, editingTask.description)) {
      return;
    }

    setUpdatingTaskId(editingTask.id);

    try {
      const taskRef = doc(db, 'tasks', editingTask.id);
      
      const updates: Partial<Task> = {
        title: editingTask.title.trim(),
        description: editingTask.description.trim(),
        updatedAt: Timestamp.now(),
      };

      await updateDoc(taskRef, updates);

      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTask.id
            ? { ...task, ...updates }
            : task
        )
      );

      setEditingTask(null);
      setTaskErrors({});

      if (onTaskUpdate) {
        onTaskUpdate();
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setTaskErrors(prev => ({
        ...prev,
        [editingTask.id]: {
          title: err instanceof Error ? err.message : 'Failed to update task'
        }
      }));
    } finally {
      setUpdatingTaskId(null);
    }
  };

  // Delete task from Firestore
  const handleDeleteTask = async (taskId: string): Promise<void> => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    
    if (!confirmed) return;

    setDeletingTaskId(taskId);

    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);

      // Update local state
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

      if (onTaskUpdate) {
        onTaskUpdate();
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setDeletingTaskId(null);
    }
  };

  // Handle input changes
  const handleInputChange = (
    field: 'title' | 'description',
    value: string
  ): void => {
    if (editingTask) {
      setEditingTask(prev => prev ? { ...prev, [field]: value } : null);
      
      // Clear error for this field
      if (taskErrors[editingTask.id]?.[field]) {
        setTaskErrors(prev => ({
          ...prev,
          [editingTask.id]: {
            ...prev[editingTask.id],
            [field]: undefined
          }
        }));
      }
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex items-center gap-3 text-red-600">
          <AlertCircle className="w-6 h-6" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-8 text-center ${className}`}>
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">Please log in to view your tasks</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-8 text-center ${className}`}>
        <ListTodo className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <ListTodo className="w-6 h-6 text-primary-600" />
        Your Tasks ({tasks.length})
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => {
          const isEditing = editingTask?.id === task.id;
          const isDeleting = deletingTaskId === task.id;
          const isUpdating = updatingTaskId === task.id;
          const errors = taskErrors[task.id];

          return (
            <div
              key={task.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {isEditing ? (
                // Edit Mode
                <div className="space-y-3">
                  <div>
                    <label htmlFor={`edit-title-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`edit-title-${task.id}`}
                      type="text"
                      value={editingTask.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors?.title ? 'border-red-300' : 'border-gray-300'
                      }`}
                      disabled={isUpdating}
                      maxLength={100}
                    />
                    {errors?.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`edit-description-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id={`edit-description-${task.id}`}
                      value={editingTask.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${
                        errors?.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      disabled={isUpdating}
                      maxLength={500}
                    />
                    {errors?.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Save />}
                      onClick={handleUpdateTask}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<X />}
                      onClick={handleCancelEdit}
                      disabled={isUpdating}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 break-words">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1 break-words">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit task"
                        disabled={isDeleting}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete task"
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <span className="px-2 py-1 bg-gray-100 rounded capitalize">
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize">
                      {task.priority}
                    </span>
                    {task.createdAt && (
                      <span>
                        Created: {task.createdAt.toDate().toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
