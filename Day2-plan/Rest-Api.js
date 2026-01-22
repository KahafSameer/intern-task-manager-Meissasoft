//  Create a Task model:
//  • { title, description, status, createdAt }.
// • Implement endpoints:
// • POST /tasks – create task
//  • GET /tasks – list tasks
// • Test using Postman / Thunder Client.
const cors = require('cors');
app.use(cors());
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/taskdb')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);


let tasks = [];
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTask = new Task({ title, description, status });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create task' });
    }


});
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }

});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch task' });
    }
    app.put('/tasks/:id', async (req, res) => {
        try {
            const { title, description, status } = req.body;
            const updatedTask = await Task.findByIdAndUpdate(
                req.params.id,
                { title, description, status },
                { new: true, runValidators: true }
            );
            if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
            res.json(updatedTask);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update task' });
        }
    });
});
app.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

app.listen(port, () => {
    console.log(`Task API is running on port ${port}`);
});

