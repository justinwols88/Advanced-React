import React, { useState, FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Plus, AlertCircle, CheckCircle } from 'lucide-react';

interface AddTaskFormProps {
  onTaskAdded?: () => void;
  className?: string;
}

interface FormData {
  title: string;
  description: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  general?: string;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded, className = '' }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!user) {
      setErrors({ general: 'You must be logged in to create tasks' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const tasksCollection = collection(db, 'tasks');
      
      await addDoc(tasksCollection, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        userId: user.uid,
        status: 'pending',
        priority: 'medium',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        completedAt: null,
      });

      // Reset form
      setFormData({ title: '', description: '' });
      setSuccessMessage('Task created successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);

      // Callback to parent component
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setErrors({ 
        general: error instanceof Error ? error.message : 'Failed to create task. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Plus className="w-6 h-6 text-primary-600" />
        Add New Task
      </h2>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* General Error Message */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{errors.general}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label 
            htmlFor="title" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.title 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300'
            }`}
            placeholder="Enter task title..."
            disabled={isSubmitting}
            maxLength={100}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600">
              {errors.title}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.title.length}/100 characters
          </p>
        </div>

        {/* Description Field */}
        <div>
          <label 
            htmlFor="description" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${
              errors.description 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300'
            }`}
            placeholder="Enter task description (optional)..."
            disabled={isSubmitting}
            maxLength={500}
          />
          {errors.description && (
            <p id="description-error" className="mt-1 text-sm text-red-600">
              {errors.description}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.description.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          leftIcon={<Plus />}
          disabled={isSubmitting || !user}
        >
          {isSubmitting ? 'Creating Task...' : 'Create Task'}
        </Button>

        {!user && (
          <p className="text-sm text-center text-gray-500">
            Please log in to create tasks
          </p>
        )}
      </form>
    </div>
  );
};

export default AddTaskForm;
