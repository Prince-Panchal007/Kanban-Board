import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { ChevronDown, Star, Plus, Target, Users, Trash2 } from 'lucide-react';
import axios from 'axios';

import Navbar from './components/Navbar';
import BoardView from './views/BoardView';
import AnalyticsView from './views/AnalyticsView';
import EmployeesView from './views/EmployeesView';
import ProjectsView from './views/ProjectsView';
// Modals are now owned by their respective views
import { getSelectedProjectId, setSelectedProjectId, subscribeSelectedProject } from './state/selectedProject';

const AppShell = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', category: 'Design', description: 'Complete overhaul of company website', deadline: '2024-12-31', progress: 65 },
    { id: 2, name: 'Mobile App Development', category: 'Development', description: 'iOS and Android app for customers', deadline: '2024-11-15', progress: 40 }
  ]);

  const [employees, setEmployees] = useState([
    // { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'SJ', role: 'Designer', isOnline: true },
    // { id: 2, name: 'Mike Chen', email: 'mike@company.com', avatar: 'MC', role: 'Developer', isOnline: true },
    // { id: 3, name: 'Emma Davis', email: 'emma@company.com', avatar: 'ED', role: 'Product Manager', isOnline: false },
    { id: 4, name: 'John Smith', email: 'john@company.com', avatar: 'JS', role: 'Developer', isOnline: true }
  ]);

  const [columns, setColumns] = useState({
    'todo': { id: 'todo', title: 'To Do', taskIds: [1, 2, 3], color: '#6366f1' },
    'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: [4, 5], color: '#f59e0b' },
    'review': { id: 'review', title: 'Review', taskIds: [6], color: '#8b5cf6' },
    'done': { id: 'done', title: 'Done', taskIds: [7, 8], color: '#10b981' }
  });

  const [tasks, setTasks] = useState({
    1: { id: 1, projectId: 2, title: 'Design homepage mockup', description: 'Create initial mockup for the new homepage design', assignee: 1, dueDate: '2024-10-15', priority: 'high', labels: ['design', 'urgent'], comments: [{ id: 1, author: 'Sarah Johnson', text: 'Started working on this', timestamp: '2024-10-10 10:30' }] },
    2: { id: 2, projectId: 2, title: 'Set up project repository', description: 'Initialize Git repository and set up basic project structure', assignee: 2, dueDate: '2024-10-12', priority: 'medium', labels: ['development'], comments: [] },
    3: { id: 3, projectId: 2, title: 'Research competitor websites', description: 'Analyze competitor websites for inspiration and best practices', assignee: 3, dueDate: '2024-10-20', priority: 'low', labels: ['research'], comments: [] },
    4: { id: 4, projectId: 2, title: 'Implement user authentication', description: 'Set up login and registration functionality', assignee: 2, dueDate: '2024-10-18', priority: 'high', labels: ['development', 'backend'], comments: [{ id: 1, author: 'Mike Chen', text: 'Making good progress on this', timestamp: '2024-10-11 14:20' }] },
    5: { id: 5, projectId: 2, title: 'Create responsive navigation', description: 'Build responsive navigation component', assignee: 4, dueDate: '2024-10-16', priority: 'medium', labels: ['frontend'], comments: [] },
    6: { id: 6, projectId: 2, title: 'Review design system', description: 'Review and approve the new design system components', assignee: 3, dueDate: '2024-10-14', priority: 'medium', labels: ['design', 'review'], comments: [] },
    7: { id: 7, projectId: 2, title: 'Set up CI/CD pipeline', description: 'Configure continuous integration and deployment', assignee: 2, dueDate: '2024-10-10', priority: 'low', labels: ['devops'], comments: [] },
    8: { id: 8, projectId: 2, title: 'Initial user research', description: 'Conduct user interviews and surveys', assignee: 1, dueDate: '2024-10-08', priority: 'medium', labels: ['research'], comments: [] }
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Sarah completed "Initial user research"', timestamp: '2 hours ago', read: false },
    { id: 2, text: 'Mike updated "Implement user authentication"', timestamp: '4 hours ago', read: false },
    { id: 3, text: 'New task assigned to you', timestamp: '1 day ago', read: true }
  ]);

  const fetchData = async () => {
    await axios.post('http://localhost:8080/api/emp/getEmp').then(res => {setEmployees(res.data); console.log(res.data)});
    await axios.post('http://localhost:8080/api/project/getProject').then(res => {setProjects(res.data); console.log(res.data)});
    // await axios.post('http://localhost:8080/api/task/getTask').then(res => {setTasks(res.data); console.log(res.data)});
  }

  useEffect(() => {
    fetchData();
  },[])

  // derive current view from route
  const [selectedProject, setSelectedProject] = useState(getSelectedProjectId() || null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ priority: 'all', assignee: 'all' });
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletedTasks, setDeletedTasks] = useState({});
  const [showTrash, setShowTrash] = useState(false);

  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '' });
  const [projectForm, setProjectForm] = useState({ name: '', description: '', category: '', deadline: '' });
  const [employeeForm, setEmployeeForm] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    if (showTaskModal && selectedTask && tasks[selectedTask]) {
      const t = tasks[selectedTask];
      setTaskForm({ title: t.title || '', description: t.description || '', assignee: t.assignee ? String(t.assignee) : '', priority: t.priority || 'medium', dueDate: t.dueDate || '' });
    } else if (showTaskModal && !selectedTask) {
      setTaskForm({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '' });
    }
  }, [showTaskModal, selectedTask]);

  useEffect(() => {
    if (showProjectModal && editingProject) {
      setProjectForm({ name: editingProject.name || '', description: editingProject.description || '', category: editingProject.category || '', deadline: editingProject.deadline || '' });
    } else if (showProjectModal && !editingProject) {
      setProjectForm({ name: '', description: '', category: '', deadline: '' });
    }
  }, [showProjectModal, editingProject]);

  useEffect(() => {
    if (showEmployeeModal && editingEmployee) {
      setEmployeeForm({ name: editingEmployee.name || '', email: editingEmployee.email || '', role: editingEmployee.role || '' });
    } else if (showEmployeeModal && !editingEmployee) {
      setEmployeeForm({ name: '', email: '', role: '' });
    }
  }, [showEmployeeModal, editingEmployee]);

  useEffect(() => {
    const unsub = subscribeSelectedProject((id) => {
      setSelectedProject(id || null);
    });
    return () => unsub && unsub();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEmployeeById = (id) => employees.find(emp => emp.id === id);

  const addNewTask = (columnId) => {
    if (!newTaskTitle.trim()) return;
    const newTaskId = Math.max(...Object.keys(tasks).map(Number)) + 1;
    const newTask = { id: newTaskId, projectId: selectedProject || (projects[0] && projects[0].id) || null, title: newTaskTitle, description: '', assignee: null, dueDate: null, priority: 'medium', labels: [], comments: [] };
    setTasks({ ...tasks, [newTaskId]: newTask });
    setColumns({ ...columns, [columnId]: { ...columns[columnId], taskIds: [...columns[columnId].taskIds, newTaskId] } });
    setNewTaskTitle('');
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedTask) return;
    const updatedTask = { ...tasks[selectedTask], comments: [...tasks[selectedTask].comments, { id: tasks[selectedTask].comments.length + 1, author: 'Current User', text: newComment, timestamp: new Date().toLocaleString() }] };
    setTasks({ ...tasks, [selectedTask]: updatedTask });
    setNewComment('');
  };

  const taskMatchesFilters = (task) => {
    if (!task) return false;
    if (selectedProject && task.projectId !== selectedProject) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.assignee !== 'all') {
      if (filters.assignee === 'unassigned' && task.assignee) return false;
      if (filters.assignee !== 'unassigned' && String(task.assignee) !== String(filters.assignee)) return false;
    }
    if (searchTerm && searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      if (!(task.title?.toLowerCase().includes(q) || task.description?.toLowerCase().includes(q))) return false;
    }
    return true;
  };

  const getVisibleTaskIdsForColumn = (colId) => {
    const column = columns[colId];
    if (!column) return [];
    return column.taskIds.filter((id) => taskMatchesFilters(tasks[id]));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    if (destination.droppableId === 'trash') {
      const fromColumn = columns[source.droppableId];
      if (!fromColumn) return;
      const startVisible = getVisibleTaskIdsForColumn(fromColumn.id);
      const sourceTaskIdAtVisibleIndex = startVisible[source.index];
      const realSourceIndex = fromColumn.taskIds.indexOf(sourceTaskIdAtVisibleIndex);
      const taskIdNum = parseInt(draggableId);
      const updatedTaskIds = Array.from(fromColumn.taskIds);
      updatedTaskIds.splice(realSourceIndex, 1);
      setColumns({ ...columns, [fromColumn.id]: { ...fromColumn, taskIds: updatedTaskIds } });
      setDeletedTasks({ ...deletedTasks, [taskIdNum]: { task: tasks[taskIdNum], fromColumnId: fromColumn.id, index: realSourceIndex } });
      return;
    }
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    const startVisible = getVisibleTaskIdsForColumn(start.id);
    const movedTaskId = parseInt(draggableId);
    const sourceTaskIdAtVisibleIndex = startVisible[source.index];
    const realSourceIndex = start.taskIds.indexOf(sourceTaskIdAtVisibleIndex);
    if (start === finish) {
      const destVisible = startVisible;
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(realSourceIndex, 1);
      const destTaskIdAtVisibleIndex = destVisible[destination.index];
      const realDestIndex = destTaskIdAtVisibleIndex === undefined ? newTaskIds.length : newTaskIds.indexOf(destTaskIdAtVisibleIndex);
      newTaskIds.splice(realDestIndex, 0, movedTaskId);
      const newColumn = { ...start, taskIds: newTaskIds };
      setColumns({ ...columns, [newColumn.id]: newColumn });
      return;
    }
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(realSourceIndex, 1);
    const newStart = { ...start, taskIds: startTaskIds };
    const finishTaskIds = Array.from(finish.taskIds);
    const finishVisible = getVisibleTaskIdsForColumn(finish.id);
    const destTaskIdAtVisibleIndex = finishVisible[destination.index];
    const realFinishIndex = destTaskIdAtVisibleIndex === undefined ? finishTaskIds.length : finishTaskIds.indexOf(destTaskIdAtVisibleIndex);
    finishTaskIds.splice(realFinishIndex, 0, movedTaskId);
    const newFinish = { ...finish, taskIds: finishTaskIds };
    setColumns({ ...columns, [newStart.id]: newStart, [newFinish.id]: newFinish });
  };

  const renderRoutes = () => (
    <Routes>
      <Route path="/board" element={<BoardView />} />
      <Route path="/analytics" element={<AnalyticsView />} />
      <Route path="/employees" element={<EmployeesView />} />
      <Route path="/projects" element={<ProjectsView />} />
      <Route path="*" element={<Navigate to="/board" replace />} />
    </Routes>
  );

  const location = useLocation();
  const navigate = useNavigate();
  const currentView = (location.pathname.replace('/', '') || 'board');
  const setCurrentView = (view) => navigate(`/${view}`);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        notifications={notifications}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        employees={employees}
      />
      <div className="flex-1 flex overflow-hidden">
        <div className={`bg-white border-r border-gray-200 transition-all ${sidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
          <div className="p-4">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg mb-4">
              <ChevronDown className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-90' : ''}`} />
            </button>
            {!sidebarCollapsed && (
              <div className="space-y-2">
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Projects</p>
                  {projects.map((project) => (
                    <button key={project.id} onClick={() => { setSelectedProject(project.id); setSelectedProjectId(project.id); }} className={`w-full text-left p-3 rounded-lg transition-colors ${selectedProject === project.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}>
                      <div className="flex items-center space-x-2">
                        <Star className={`w-4 h-4 ${selectedProject === project.id ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className="font-medium text-sm">{project.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Actions</p>
                  <button onClick={() => setShowTaskModal(true)} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add Task</span>
                  </button>
                  <button onClick={() => setShowProjectModal(true)} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">New Project</span>
                  </button>
                  <button onClick={() => setShowEmployeeModal(true)} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Add Member</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {renderRoutes()}
        </div>
      </div>
      {/* View-owned modals rendered within each view */}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;


