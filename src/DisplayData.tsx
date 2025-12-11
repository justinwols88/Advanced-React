// DisplayData.tsx
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface User {
  id?: string;
  name: string;
  age: number;
}

const DisplayData: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  // updateUser Function
  const updateUser = async (userId: string, updatedData: Partial<User>) => {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(dataArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {users.map((user) => (
        <div
          key={user.id}
        >
          <div>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
          </div>
          <input
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            placeholder="Enter new name:"
          />
          <button onClick={() => user.id && updateUser(user.id, { name: newName })}>
            Update Name
          </button>
          <input
            onChange={(e) => setNewAge(e.target.value)}
            type="number"
            placeholder="Enter new age:"
          />
          <button onClick={() => user.id && updateUser(user.id, { age: parseInt(newAge) })}>
            Update Age
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayData;