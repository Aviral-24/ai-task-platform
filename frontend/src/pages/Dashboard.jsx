import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [inputText, setInputText] = useState('');
    const [operationType, setOperationType] = useState('Uppercase');
    const navigate = useNavigate();

    // Tasks fetch karne ka function
    const fetchTasks = async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
        } catch (error) {
            if(error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    // Auto-refresh (Polling) setup har 3 second mein live status ke liye
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
        
        fetchTasks();
        const interval = setInterval(fetchTasks, 8000); 
        return () => clearInterval(interval);
    }, [navigate]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await API.post('/tasks', { title, inputText, operationType });
            setTitle(''); setInputText(''); // Form reset
            fetchTasks(); // Turant update
        } catch (error) {
            console.error("Error creating task", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Success': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Running': return 'bg-blue-100 text-blue-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">AI Task Platform</h1>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
                </div>

                {/* Form Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
                    <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
                    <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input type="text" placeholder="Task Title" required className="border p-2 rounded focus:ring-2 focus:ring-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" placeholder="Input Text" required className="border p-2 rounded focus:ring-2 focus:ring-blue-500" value={inputText} onChange={(e) => setInputText(e.target.value)} />
                        <select className="border p-2 rounded focus:ring-2 focus:ring-blue-500" value={operationType} onChange={(e) => setOperationType(e.target.value)}>
                            <option value="Uppercase">Uppercase</option>
                            <option value="Lowercase">Lowercase</option>
                            <option value="Reverse String">Reverse String</option>
                            <option value="Word Count">Word Count</option>
                        </select>
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Run Task</button>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                <th className="p-4 border-b">Title</th>
                                <th className="p-4 border-b">Operation</th>
                                <th className="p-4 border-b">Status</th>
                                <th className="p-4 border-b">Result</th>
                                <th className="p-4 border-b">Logs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task._id} className="hover:bg-gray-50 border-b">
                                    <td className="p-4 font-medium text-gray-800">{task.title}</td>
                                    <td className="p-4 text-gray-600">{task.operationType}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-800 font-mono">{task.result || '-'}</td>
                                    <td className="p-4 text-sm text-gray-500">{task.logs}</td>
                                </tr>
                            ))}
                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">No tasks found. Create one above!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;