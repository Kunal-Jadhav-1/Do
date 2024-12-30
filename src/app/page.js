'use client';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import logo from "../app/images/logo.png"

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title && date && time) {
      const deadline = `${date}T${time}`;
      if (isEditing) {
        // Update task
        const updatedTasks = [...tasks];
        updatedTasks[currentTaskIndex] = { title, deadline, date, time };
        // Sort tasks by deadline
        updatedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
      } else {
        // Add new task
        const newTasks = [...tasks, { title, deadline, date, time }];
        // Sort tasks by deadline
        newTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setTasks(newTasks);
      }
      setTitle('');
      setDate('');
      setTime('');
    }
  };

  const handleEditTask = (index) => {
    const task = tasks[index];
    setTitle(task.title);
    setDate(task.date);
    setTime(task.time);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Automatically delete tasks when their deadline arrives
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => new Date(task.deadline).getTime() > now.getTime()
        )
      );
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex min-h-screen p-4 bg-secondary text-secondary font-sacramento">
      <div className="w-1/2 bg-primary shadow-md rounded-lg p-4">
        <h2 className="text-4xl font-bold mb-4">Task List</h2>
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="p-4 border border-secondary rounded shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-extrabold text-2xl mb-2">{task.title}</p>
                  <p className=" text-lg"><span className='font-semibold'>Date : </span> {task.date}</p>
                  <p className=" text-lg"><span className='font-semibold'> Time : </span>{task.time}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTask(index)}
                    className="px-4 py-3 bg-accent text-tertiary rounded"
                  >
                    <FaEdit/>
                  </button>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="px-4 py-3 bg-accent text-tertiary rounded"
                  >
                    <FaTrash/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-2xl underline mx-10">No tasks</p>
        )}
      </div>

      <div className="w-1/2 bg-primary shadow-md rounded-lg p-4 ml-4">
        <h2 className="text-4xl font-bold mb-4">{isEditing ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-2xl">Task</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-2 py-1 bg-secondary text-primary text-lg font-semibold"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-2xl">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-2 py-1 bg-secondary text-primary text-lg font-semibold"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-2xl">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded px-2 py-1 bg-secondary text-primary text-lg font-semibold"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-tertiary rounded text-2xl w-full bg-accent font-bold"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
