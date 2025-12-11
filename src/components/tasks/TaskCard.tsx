import React from 'react';
import { Task } from '@/services/firestoreTasks';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Edit, 
  Trash2, 
  Calendar,
  Tag,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'in-progress': return 'bg-blue-50 border-blue-200';
      case 'pending': return 'bg-gray-50 border-gray-200';
    }
  };

  const getDueDate = () => {
    if (!task.dueDate) return null;
    return task.dueDate instanceof Date ? task.dueDate : task.dueDate.toDate?.() || new Date(task.dueDate as any);
  };
  
  const dueDate = getDueDate();
  const isOverdue = dueDate && dueDate < new Date() && task.status !== 'completed';

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 p-4 hover:shadow-md transition-shadow ${getStatusColor(task.status)}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={onToggle}
            className="mt-1 text-gray-400 hover:text-primary-600 transition-colors"
          >
            {task.status === 'completed' ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold text-gray-900 mb-1 ${
              task.status === 'completed' ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 items-center">
              <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>

              <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 capitalize">
                {task.status.replace('-', ' ')}
              </span>

              {task.dueDate && (
                <span className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 ${
                  isOverdue 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {isOverdue && <AlertCircle className="w-3 h-3" />}
                  <Calendar className="w-3 h-3" />
                  {dueDate && format(dueDate, 'MMM dd, yyyy')}
                </span>
              )}

              {task.tags && task.tags.length > 0 && (
                <div className="flex gap-1 items-center">
                  <Tag className="w-3 h-3 text-gray-400" />
                  {task.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {task.createdAt && (
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Created {format(task.createdAt instanceof Date ? task.createdAt : task.createdAt.toDate(), 'MMM dd, yyyy h:mm a')}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-700 p-1"
            title="Edit task"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 p-1"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
