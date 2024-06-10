'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import TaskList from './components/TaskList';


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [filter, setFilter] = useState('all');
  const [inputText, setInputText] = useState('');


  useEffect(() => {
    if (window !== undefined) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (window !== undefined) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);


  const handleAddTask = () => {
    if (inputText.trim()) {
      const newTask = {
        id: nextId,
        text: inputText,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputText('');
      setNextId(nextId + 1);
    }
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const ostalosTasks = tasks.filter(task => task.id !== id);
    setTasks(ostalosTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>

      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <TaskList tasks={filteredTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <span>{tasks.filter(task => !task.completed).length} items left</span>
        <div>
          <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
          <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
          <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
        </div>
        <button
          onClick={() => setTasks(tasks.filter(task => !task.completed))}
          className="text-gray-400 hover:text-white"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}
