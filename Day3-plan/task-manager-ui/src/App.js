import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/tasks');
    setTasks(res.data);
  };
  const createTask = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put('http://localhost:3000/tasks', form);
      setEditId(null);
    } else {
      await axios.post('http://localhost:3000/tasks', form);
    }
    setForm({ title: '', description: '', status: '' });
    fetchTasks();
  };


  const startEdit = (task) => {
    setForm({ title: task.title, description: task.description, status: task.status });
    setEditId(task._id);
  };


  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>

      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        />
        <button type="submit">{editId ? 'Update Task' : 'Add Task'}</button>
      </form>

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}
            <button onClick={() => startEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


