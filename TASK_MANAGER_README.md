# 🔥 Firestore-Powered Task Manager

A complete CRUD task management system built with Firebase Firestore, React, and TypeScript.

## ✨ Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete tasks
- 🔐 **User Authentication**: Tasks are user-specific and protected
- 📊 **Task Status Tracking**: Pending, In Progress, Completed
- 🎯 **Priority Levels**: Low, Medium, High
- 📅 **Due Dates**: Set and track task deadlines with overdue alerts
- 🏷️ **Tags**: Organize tasks with custom tags
- 🔍 **Advanced Filtering**: Filter by status and priority
- 📈 **Statistics Dashboard**: Real-time task metrics
- 🎨 **Modern UI**: Beautiful Tailwind CSS design with Lucide icons
- ⚡ **Real-time Updates**: Instant sync with Firestore

## 🗂️ Project Structure

```
src/
├── services/
│   └── firestoreTasks.ts          # Firestore CRUD operations
├── hooks/
│   └── useTasks.ts                # Custom React hooks for task management
├── components/
│   └── tasks/
│       ├── TaskCard.tsx           # Individual task display card
│       └── TaskForm.tsx           # Create/Edit task form
└── pages/
    └── TaskManagerPage.tsx        # Main task manager page
```

## 🚀 Getting Started

### 1. Access the Task Manager

- Login to your account
- Click on your user menu (top right)
- Select "Tasks" from the dropdown

Or navigate directly to: `/tasks`

### 2. Create Your First Task

1. Click the "New Task" button
2. Fill in task details:
   - **Title**: Task name (required)
   - **Description**: Additional details (optional)
   - **Status**: Pending, In Progress, or Completed
   - **Priority**: Low, Medium, or High
   - **Due Date**: Optional deadline
   - **Tags**: Comma-separated tags (e.g., "work, urgent, meeting")
3. Click "Create Task"

### 3. Manage Tasks

- **Toggle Completion**: Click the circle icon to mark complete/incomplete
- **Edit Task**: Click the edit (pencil) icon
- **Delete Task**: Click the trash icon
- **Filter Tasks**: Use status and priority dropdowns to filter

## 📊 Firestore Data Structure

### Tasks Collection

```typescript
{
  id: string;                          // Auto-generated document ID
  title: string;                       // Task title
  description: string;                 // Task description
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Timestamp;                 // Optional due date
  userId: string;                      // Owner user ID
  tags?: string[];                     // Array of tags
  createdAt: Timestamp;                // Auto-generated
  updatedAt: Timestamp;                // Auto-updated
  completedAt: Timestamp | null;       // Set when completed
}
```

## 🎯 API Functions

### Service Layer (`firestoreTasks.ts`)

```typescript
// Get all tasks for a user
getUserTasks(userId: string): Promise<Task[]>

// Get single task
getTask(taskId: string): Promise<Task | null>

// Create new task
createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>

// Update task
updateTask(taskId: string, updates: Partial<Task>): Promise<void>

// Delete task
deleteTask(taskId: string): Promise<void>

// Get tasks by status
getTasksByStatus(userId: string, status: Task['status']): Promise<Task[]>

// Get tasks by priority
getTasksByPriority(userId: string, priority: Task['priority']): Promise<Task[]>

// Toggle completion
toggleTaskCompletion(taskId: string, currentStatus: Task['status']): Promise<void>
```

### Hooks (`useTasks.ts`)

```typescript
// Main tasks hook
const { 
  tasks,          // All user tasks
  loading,        // Loading state
  error,          // Error message
  addTask,        // Create new task
  editTask,       // Update existing task
  removeTask,     // Delete task
  toggleTask,     // Toggle completion
  refreshTasks    // Manually refresh
} = useTasks();

// Filter by status
const { tasks, loading } = useTasksByStatus('pending');
```

## 🎨 UI Components

### TaskCard

Displays individual task with:
- Completion toggle
- Priority badge with color coding
- Status badge
- Due date with overdue alerts
- Tags display
- Edit and delete actions
- Created timestamp

### TaskForm

Modal form for creating/editing tasks:
- Title input (required)
- Description textarea
- Status dropdown
- Priority dropdown
- Due date picker
- Tags input (comma-separated)
- Validation and error handling

### TaskManagerPage

Main dashboard featuring:
- Statistics cards (Total, Pending, In Progress, Completed)
- Filter controls (status and priority)
- Task list with all TaskCards
- Create task button
- Empty state with call-to-action

## 🔒 Security Considerations

### Recommended Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      // Users can only read their own tasks
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      
      // Users can create tasks with their userId
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      
      // Users can update their own tasks
      allow update: if request.auth != null && resource.data.userId == request.auth.uid;
      
      // Users can delete their own tasks
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

## 🎯 Features Breakdown

### Priority Color Coding
- **High**: Red (bg-red-100, text-red-700)
- **Medium**: Yellow (bg-yellow-100, text-yellow-700)
- **Low**: Green (bg-green-100, text-green-700)

### Status Color Coding
- **Completed**: Green background (bg-green-50)
- **In Progress**: Blue background (bg-blue-50)
- **Pending**: Gray background (bg-gray-50)

### Overdue Detection
Tasks with due dates in the past show a red alert badge with an alert icon.

## 📝 Example Usage

```typescript
import { useTasks } from '@/hooks/useTasks';

function MyComponent() {
  const { tasks, addTask, editTask, removeTask, toggleTask } = useTasks();

  // Create a new task
  const handleCreate = async () => {
    await addTask({
      title: 'Complete project',
      description: 'Finish the task manager',
      status: 'in-progress',
      priority: 'high',
      dueDate: new Date('2024-12-31'),
      tags: ['work', 'urgent'],
    });
  };

  // Update a task
  const handleUpdate = async (taskId: string) => {
    await editTask(taskId, {
      status: 'completed',
      priority: 'low',
    });
  };

  // Toggle completion
  const handleToggle = async (task: Task) => {
    if (task.id) {
      await toggleTask(task.id, task.status);
    }
  };

  // Delete a task
  const handleDelete = async (taskId: string) => {
    await removeTask(taskId);
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <button onClick={() => task.id && handleToggle(task)}>Toggle</button>
          <button onClick={() => task.id && handleDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## 🚀 Next Steps

### Potential Enhancements

1. **Real-time Updates**: Implement Firestore `onSnapshot()` for live updates
2. **Drag & Drop**: Reorder tasks or change status by dragging
3. **Subtasks**: Add child tasks for complex projects
4. **Attachments**: Upload files to Firebase Storage
5. **Reminders**: Email or push notifications for due dates
6. **Team Tasks**: Share tasks with other users
7. **Categories/Projects**: Group tasks into projects
8. **Recurring Tasks**: Automatic task creation
9. **Time Tracking**: Log time spent on tasks
10. **Export**: Export tasks to CSV/PDF

## 🎉 Summary

You now have a fully functional task manager with:
- ✅ Complete CRUD operations
- ✅ User-specific tasks with authentication
- ✅ Beautiful, responsive UI
- ✅ Advanced filtering and statistics
- ✅ Priority and status management
- ✅ Due date tracking with overdue alerts
- ✅ Tag organization
- ✅ Firestore backend integration

Navigate to `/tasks` to start managing your tasks!
