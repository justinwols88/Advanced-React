import React, { useState } from 'react';
import AddTaskForm from '@/components/tasks/AddTaskForm';
import TaskList from '@/components/tasks/TaskList';
import { ListTodo, RefreshCw } from 'lucide-react';
import { Button } from '@/components/common/Button';

/**
 * TasksSimplePage Component
 * 
 * A simplified task management page that demonstrates CRUD operations
 * using the AddTaskForm and TaskList components.
 * 
 * Features:
 * - Add new tasks with title and description
 * - Display all user tasks
 * - Edit task title and description inline
 * - Delete tasks with confirmation
 * - Real-time updates and validation
 * - TypeScript type safety throughout
 */
const TasksSimplePage: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  /**
   * Triggers a refresh of the task list
   * Called after tasks are added, updated, or deleted
   */
  const handleRefresh = (): void => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-primary-600" />
              Simple Task Manager
            </h1>
            <p className="text-gray-600">
              Create, edit, and manage your tasks with Firestore
            </p>
          </div>

          <Button
            variant="outline"
            leftIcon={<RefreshCw />}
            onClick={handleRefresh}
            className="hidden sm:flex"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Task Form - Left Column on Desktop */}
        <div className="lg:col-span-1">
          <AddTaskForm 
            onTaskAdded={handleRefresh}
            className="sticky top-4"
          />
        </div>

        {/* Task List - Right Column on Desktop */}
        <div className="lg:col-span-2">
          <TaskList 
            refreshTrigger={refreshTrigger}
            onTaskUpdate={handleRefresh}
          />
        </div>
      </div>

      {/* Mobile Refresh Button */}
      <div className="sm:hidden mt-6">
        <Button
          variant="outline"
          leftIcon={<RefreshCw />}
          onClick={handleRefresh}
          className="w-full"
        >
          Refresh Tasks
        </Button>
      </div>
    </div>
  );
};

export default TasksSimplePage;
