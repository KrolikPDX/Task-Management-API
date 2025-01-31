import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/task');
    const data = await response.json();
    setTasks(data);
  };

  // Add a new task
  const addTask = async () => {
    if (!newTaskText) return;
    const response = await fetch('http://localhost:3000/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTaskText }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  // Toggle task completion
  const toggleCompletion = async (id: number, completed: boolean) => {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:3000/task/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompletion(task.id, task.completed)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
