import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';

// Task collection reference
const TASKS_COLLECTION = 'tasks';

// Task interface
export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date | Timestamp;
  userId: string;
  tags?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  completedAt?: Timestamp | null;
}

// Get all tasks for a user
export const getUserTasks = async (userId: string): Promise<Task[]> => {
  try {
    console.log('Fetching tasks for user:', userId);
    const tasksRef = collection(db, TASKS_COLLECTION);
    const q = query(
      tasksRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
        dueDate: doc.data().dueDate?.toDate(),
      } as Task);
    });

    console.log('Fetched tasks:', tasks.length, tasks);
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    console.error('Error details:', error);
    // If the error is about missing index, try fetching without ordering
    if (error && typeof error === 'object' && 'code' in error && error.code === 'failed-precondition') {
      console.log('Index error detected, fetching without ordering...');
      try {
        const tasksRef = collection(db, TASKS_COLLECTION);
        const q = query(tasksRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const tasks: Task[] = [];
        
        querySnapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
            dueDate: doc.data().dueDate?.toDate(),
          } as Task);
        });
        
        // Sort manually
        tasks.sort((a, b) => {
          const aTime = a.createdAt ? (a.createdAt as Timestamp).toMillis() : 0;
          const bTime = b.createdAt ? (b.createdAt as Timestamp).toMillis() : 0;
          return bTime - aTime;
        });
        
        console.log('Fetched tasks without ordering:', tasks.length, tasks);
        return tasks;
      } catch (fallbackError) {
        console.error('Fallback fetch also failed:', fallbackError);
        return [];
      }
    }
    return [];
  }
};

// Get single task by ID
export const getTask = async (taskId: string): Promise<Task | null> => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
      return {
        id: taskSnap.id,
        ...taskSnap.data(),
        dueDate: taskSnap.data().dueDate?.toDate(),
      } as Task;
    }
    return null;
  } catch (error) {
    console.error('Error fetching task:', error);
    return null;
  }
};

// Create a new task
export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    console.log('Creating task with data:', task);
    const tasksRef = collection(db, TASKS_COLLECTION);
    const taskData = {
      ...task,
      dueDate: task.dueDate ? Timestamp.fromDate(task.dueDate as Date) : null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      completedAt: null,
    };
    console.log('Task data to be saved:', taskData);
    const docRef = await addDoc(tasksRef, taskData);
    console.log('Task created successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (
  taskId: string,
  updates: Partial<Task>
): Promise<void> => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    
    const updateData: any = {
      ...updates,
      updatedAt: serverTimestamp(),
    };

    if (updates.dueDate) {
      updateData.dueDate = Timestamp.fromDate(updates.dueDate as Date);
    }

    if (updates.status === 'completed' && !updates.completedAt) {
      updateData.completedAt = serverTimestamp();
    } else if (updates.status !== 'completed') {
      updateData.completedAt = null;
    }

    await updateDoc(taskRef, updateData);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Get tasks by status
export const getTasksByStatus = async (
  userId: string,
  status: Task['status']
): Promise<Task[]> => {
  try {
    const tasksRef = collection(db, TASKS_COLLECTION);
    const q = query(
      tasksRef,
      where('userId', '==', userId),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
        dueDate: doc.data().dueDate?.toDate(),
      } as Task);
    });

    return tasks;
  } catch (error) {
    console.error('Error fetching tasks by status:', error);
    return [];
  }
};

// Get tasks by priority
export const getTasksByPriority = async (
  userId: string,
  priority: Task['priority']
): Promise<Task[]> => {
  try {
    const tasksRef = collection(db, TASKS_COLLECTION);
    const q = query(
      tasksRef,
      where('userId', '==', userId),
      where('priority', '==', priority),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
        dueDate: doc.data().dueDate?.toDate(),
      } as Task);
    });

    return tasks;
  } catch (error) {
    console.error('Error fetching tasks by priority:', error);
    return [];
  }
};

// Toggle task completion
export const toggleTaskCompletion = async (taskId: string, currentStatus: Task['status']): Promise<void> => {
  try {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    await updateTask(taskId, { status: newStatus });
  } catch (error) {
    console.error('Error toggling task completion:', error);
    throw error;
  }
};
