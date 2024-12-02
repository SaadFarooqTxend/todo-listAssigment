import React, { useState } from 'react';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]); // To store the list of tasks
    const [newTask, setNewTask] = useState(''); // To store input value

    const addTask = () => {
        if (newTask.trim() === '') return; // Avoid empty tasks
        setTasks([...tasks, { id: Date.now(), text: newTask, isEditing: false }]);
        setNewTask(''); // Clear input field
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleEdit = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, isEditing: !task.isEditing } : task
        ));
    };

    const editTask = (id, newText) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, text: newText, isEditing: false } : task
        ));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={task.text}
                                    onChange={(e) => editTask(task.id, e.target.value)}
                                />
                                <button onClick={() => editTask(task.id, task.text)}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{task.text}</span>
                                <button onClick={() => toggleEdit(task.id)}>Edit</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
