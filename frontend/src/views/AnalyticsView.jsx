import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, CartesianGrid, LineChart, Line, XAxis, YAxis, BarChart, Bar } from 'recharts';
import { getSelectedProjectId, subscribeSelectedProject, setSelectedProjectId } from '../state/selectedProject';
import axios from 'axios';

const AnalyticsView = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign' },
    { id: 2, name: 'Mobile App Development' }
  ]);
  const [selectedProject, setSelectedProject] = useState(getSelectedProjectId() || null);
  useEffect(() => {
    const unsub = subscribeSelectedProject((id) => setSelectedProject(id || null));
    return () => unsub && unsub();
  }, []);
  const [columns, setColumns] = useState({
    todo: { id: 'todo', taskIds: [1, 2, 3] },
    inprogress: { id: 'inprogress', taskIds: [4, 5] },
    review: { id: 'review', taskIds: [6] },
    done: { id: 'done', taskIds: [7, 8] }
  });
  const [tasks, setTasks] = useState({
  });
  const [employees, setEmployees] = useState([
    // { id: 1, name: 'Sarah Johnson' },
    // { id: 2, name: 'Mike Chen' },
    // { id: 3, name: 'Emma Davis' },
    { id: 4, name: 'John Smith' }
  ]);
  const getData = async () => {
    await axios.post("http://localhost:8080/api/task/getTask").then(res => {
      console.log(res.data)
      var newcols = { ...columns };
      res.data.forEach(e => {
        const type = e.type || "todo"
        tasks[e.id] = e
        if (newcols[type].taskIds.indexOf(e.id) === -1) {
          newcols[type].taskIds.push(e.id)
        }
      });
      setColumns(newcols);
    });
    axios.post("http://localhost:8080/api/emp/getEmp").then(res => {
      setEmployees(res.data);
    });
    axios.post("http://localhost:8080/api/project/getProject").then(res => {
      setProjects(res.data);
    });
  }

  useEffect(() => {
    getData();
  },[])
  
  const filteredTaskIdsByColumn = {
    todo: columns.todo.taskIds.filter(id => !selectedProject || tasks[id]?.projectId === selectedProject),
    inprogress: columns.inprogress.taskIds.filter(id => !selectedProject || tasks[id]?.projectId === selectedProject),
    review: columns.review.taskIds.filter(id => !selectedProject || tasks[id]?.projectId === selectedProject),
    done: columns.done.taskIds.filter(id => !selectedProject || tasks[id]?.projectId === selectedProject)
  };
  const totalTasksForProject = Object.values(tasks).filter(t => !selectedProject || t.projectId === selectedProject);
  const employeeWorkload = employees.map(emp => ({ name: emp.name, tasks: totalTasksForProject.filter(t => t.assignee === emp.id).length }));
  const taskDistribution = [
    { name: 'To Do', value: filteredTaskIdsByColumn.todo.length, color: '#6366f1' },
    { name: 'In Progress', value: filteredTaskIdsByColumn.inprogress.length, color: '#f59e0b' },
    { name: 'Review', value: filteredTaskIdsByColumn.review.length, color: '#8b5cf6' },
    { name: 'Done', value: filteredTaskIdsByColumn.done.length, color: '#10b981' }
  ];
  const analyticsData = {
    taskProgress: [
      { name: 'Week 1', completed: 4, pending: 8 },
      { name: 'Week 2', completed: 7, pending: 5 },
      { name: 'Week 3', completed: 12, pending: 3 },
      { name: 'Week 4', completed: 15, pending: 2 }
    ]
  };
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700">Project:</label>
          <select value={selectedProject || ''} onChange={(e) => { const id = parseInt(e.target.value); setSelectedProject(id); setSelectedProjectId(id); }} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="" disabled>Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
      </div>
      {selectedProject && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{totalTasksForProject.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{filteredTaskIdsByColumn.done.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{filteredTaskIdsByColumn.inprogress.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>
      )}
      {selectedProject && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.taskProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={taskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={120} dataKey="value">
                {taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}
      {selectedProject && (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Workload</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={employeeWorkload}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      )}
    </div>
  );
};

export default AnalyticsView;


