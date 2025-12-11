import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/services/firestoreTasks';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { 
  Plus, 
  ListTodo, 
  CheckCircle2, 
  Clock, 
  PlayCircle,
  Filter
} from 'lucide-react';

const TaskManagerPage: React.FC = () => {
  const { tasks, loading, addTask, editTask, removeTask, toggleTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | Task['status']>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | Task['priority']>('all');

  const handleAddTask = async (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    await addTask(task);
    setShowForm(false);
  };

  const handleEditTask = async (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask?.id) {
      await editTask(editingTask.id, task);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await removeTask(taskId);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    return true;
  });

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-primary-600" />
              Task Manager
            </h1>
            <p className="text-gray-600">Manage your tasks efficiently with Firestore</p>
          </div>

          <Button
            variant="primary"
            leftIcon={<Plus />}
            onClick={() => setShowForm(true)}
          >
            New Task
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingTasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4">
            <div className="flex items-center gap-3">
              <PlayCircle className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-green-200 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-label="Filter tasks by status"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-label="Filter tasks by priority"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            {(filterStatus !== 'all' || filterPriority !== 'all') && (
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setFilterPriority('all');
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      {(showForm || editingTask) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <TaskForm
              task={editingTask || undefined}
              onSubmit={editingTask ? handleEditTask : handleAddTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <ListTodo className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">
            {tasks.length === 0 ? 'No tasks yet' : 'No tasks match the selected filters'}
          </p>
          <Button variant="primary" leftIcon={<Plus />} onClick={() => setShowForm(true)}>
            Create Your First Task
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => task.id && toggleTask(task.id, task.status)}
              onEdit={() => setEditingTask(task)}
              onDelete={() => task.id && handleDeleteTask(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskManagerPage;
