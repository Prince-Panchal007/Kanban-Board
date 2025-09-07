import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Plus, 
  Search, 
  Bell, 
  User, 
  Settings, 
  MoreHorizontal, 
  Calendar, 
  Flag, 
  MessageSquare,
  Paperclip,
  Filter,
  Users,
  BarChart3,
  Trash2,
  Edit3,
  X,
  ChevronDown,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Activity,
  Zap,
  Send
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const KanbanApp = () => {
  // Initial data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      category: 'Design',
      description: 'Complete overhaul of company website',
      deadline: '2024-12-31',
      progress: 65
    },
    {
      id: 2,
      name: 'Mobile App Development',
      category: 'Development',
      description: 'iOS and Android app for customers',
      deadline: '2024-11-15',
      progress: 40
    }
  ]);

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'SJ', role: 'Designer', isOnline: true },
    { id: 2, name: 'Mike Chen', email: 'mike@company.com', avatar: 'MC', role: 'Developer', isOnline: true },
    { id: 3, name: 'Emma Davis', email: 'emma@company.com', avatar: 'ED', role: 'Product Manager', isOnline: false },
    { id: 4, name: 'John Smith', email: 'john@company.com', avatar: 'JS', role: 'Developer', isOnline: true }
  ]);

  const [columns, setColumns] = useState({
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: [1, 2, 3],
      color: '#6366f1'
    },
    'inprogress': {
      id: 'inprogress',
      title: 'In Progress',
      taskIds: [4, 5],
      color: '#f59e0b'
    },
    'review': {
      id: 'review',
      title: 'Review',
      taskIds: [6],
      color: '#8b5cf6'
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: [7, 8],
      color: '#10b981'
    }
  });

  const [tasks, setTasks] = useState({
    1: {
      id: 1,
      projectId: 2,
      title: 'Design homepage mockup',
      description: 'Create initial mockup for the new homepage design',
      assignee: 1,
      dueDate: '2024-10-15',
      priority: 'high',
      labels: ['design', 'urgent'],
      comments: [
        { id: 1, author: 'Sarah Johnson', text: 'Started working on this', timestamp: '2024-10-10 10:30' }
      ]
    },
    2: {
      id: 2,
      projectId: 2,
      title: 'Set up project repository',
      description: 'Initialize Git repository and set up basic project structure',
      assignee: 2,
      dueDate: '2024-10-12',
      priority: 'medium',
      labels: ['development'],
      comments: []
    },
    3: {
      id: 3,
      projectId: 2,
      title: 'Research competitor websites',
      description: 'Analyze competitor websites for inspiration and best practices',
      assignee: 3,
      dueDate: '2024-10-20',
      priority: 'low',
      labels: ['research'],
      comments: []
    },
    4: {
      id: 4,
      projectId: 2,
      title: 'Implement user authentication',
      description: 'Set up login and registration functionality',
      assignee: 2,
      dueDate: '2024-10-18',
      priority: 'high',
      labels: ['development', 'backend'],
      comments: [
        { id: 1, author: 'Mike Chen', text: 'Making good progress on this', timestamp: '2024-10-11 14:20' }
      ]
    },
    5: {
      id: 5,
      projectId: 2,
      title: 'Create responsive navigation',
      description: 'Build responsive navigation component',
      assignee: 4,
      dueDate: '2024-10-16',
      priority: 'medium',
      labels: ['frontend'],
      comments: []
    },
    6: {
      id: 6,
      projectId: 2,
      title: 'Review design system',
      description: 'Review and approve the new design system components',
      assignee: 3,
      dueDate: '2024-10-14',
      priority: 'medium',
      labels: ['design', 'review'],
      comments: []
    },
    7: {
      id: 7,
      projectId: 2,
      title: 'Set up CI/CD pipeline',
      description: 'Configure continuous integration and deployment',
      assignee: 2,
      dueDate: '2024-10-10',
      priority: 'low',
      labels: ['devops'],
      comments: []
    },
    8: {
      id: 8,
      projectId: 2,
      title: 'Initial user research',
      description: 'Conduct user interviews and surveys',
      assignee: 1,
      dueDate: '2024-10-08',
      priority: 'medium',
      labels: ['research'],
      comments: []
    }
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Sarah completed "Initial user research"', timestamp: '2 hours ago', read: false },
    { id: 2, text: 'Mike updated "Implement user authentication"', timestamp: '4 hours ago', read: false },
    { id: 3, text: 'New task assigned to you', timestamp: '1 day ago', read: true }
  ]);

  const getAllData = () => {
    // Disabled API calls for dummy data mode
    // axios.post('http://localhost:8080/api/emp/getEmp').then(res => setEmployees(res.data));
    // axios.post('http://localhost:8080/api/project/getProject').then(res => setProjects(res.data));
    // axios.post('http://localhost:8080/api/task/getTask').then(res => setTasks(res.data));
  }
  // Disabled initial fetch to keep dummy data stable during typing
  // useEffect(() => {
  //   getAllData();
  // },[]);

  // UI State
  const [currentView, setCurrentView] = useState('board');
  const [selectedProject, setSelectedProject] = useState(null);
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

  // Modal form state
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '' });
  const [projectForm, setProjectForm] = useState({ name: '', description: '', category: '', deadline: '' });
  const [employeeForm, setEmployeeForm] = useState({ name: '', email: '', role: '' });

  // Sync forms when editing existing items
  useEffect(() => {
    if (showTaskModal && selectedTask && tasks[selectedTask]) {
      const t = tasks[selectedTask];
      setTaskForm({
        title: t.title || '',
        description: t.description || '',
        assignee: t.assignee ? String(t.assignee) : '',
        priority: t.priority || 'medium',
        dueDate: t.dueDate || ''
      });
    } else if (showTaskModal && !selectedTask) {
      setTaskForm({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '' });
    }
  }, [showTaskModal, selectedTask]);

  useEffect(() => {
    if (showProjectModal && editingProject) {
      setProjectForm({
        name: editingProject.name || '',
        description: editingProject.description || '',
        category: editingProject.category || '',
        deadline: editingProject.deadline || ''
      });
    } else if (showProjectModal && !editingProject) {
      setProjectForm({ name: '', description: '', category: '', deadline: '' });
    }
  }, [showProjectModal, editingProject]);

  useEffect(() => {
    if (showEmployeeModal && editingEmployee) {
      setEmployeeForm({
        name: editingEmployee.name || '',
        email: editingEmployee.email || '',
        role: editingEmployee.role || ''
      });
    } else if (showEmployeeModal && !editingEmployee) {
      setEmployeeForm({ name: '', email: '', role: '' });
    }
  }, [showEmployeeModal, editingEmployee]);

  // Ensure a project is selected after loading from API or initial state
  useEffect(() => {
    if (!selectedProject && projects && projects.length > 0) {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  // Analytics data
  const analyticsData = {
    taskProgress: [
      { name: 'Week 1', completed: 4, pending: 8 },
      { name: 'Week 2', completed: 7, pending: 5 },
      { name: 'Week 3', completed: 12, pending: 3 },
      { name: 'Week 4', completed: 15, pending: 2 }
    ],
    taskDistribution: [
      { name: 'To Do', value: 3, color: '#6366f1' },
      { name: 'In Progress', value: 2, color: '#f59e0b' },
      { name: 'Review', value: 1, color: '#8b5cf6' },
      { name: 'Done', value: 2, color: '#10b981' }
    ],
    employeeWorkload: [
      { name: 'Sarah', tasks: 3 },
      { name: 'Mike', tasks: 4 },
      { name: 'Emma', tasks: 2 },
      { name: 'John', tasks: 1 }
    ]
  };

  // Drag and drop handler
  const getVisibleTaskIdsForColumn = (colId) => {
    const column = columns[colId];
    if (!column) return [];
    return column.taskIds.filter((id) => taskMatchesFilters(tasks[id]));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Drop to trash
    if (destination.droppableId === 'trash') {
      const fromColumn = columns[source.droppableId];
      if (!fromColumn) return;
      const taskIdNum = parseInt(draggableId);
      const fromIndex = source.index;
      const updatedTaskIds = Array.from(fromColumn.taskIds);
      updatedTaskIds.splice(fromIndex, 1);
      setColumns({ ...columns, [fromColumn.id]: { ...fromColumn, taskIds: updatedTaskIds } });
      setDeletedTasks({
        ...deletedTasks,
        [taskIdNum]: { task: tasks[taskIdNum], fromColumnId: fromColumn.id, index: fromIndex }
      });
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // Map from visible index (filtered list) to real index in full column list
    const startVisible = getVisibleTaskIdsForColumn(start.id);
    const movedTaskId = parseInt(draggableId);
    const sourceTaskIdAtVisibleIndex = startVisible[source.index];
    const realSourceIndex = start.taskIds.indexOf(sourceTaskIdAtVisibleIndex);

    if (start === finish) {
      const destVisible = startVisible; // same column
      const newTaskIds = Array.from(start.taskIds);
      // Remove at real index
      newTaskIds.splice(realSourceIndex, 1);
      // Compute real destination index
      const destTaskIdAtVisibleIndex = destVisible[destination.index];
      const realDestIndex = destTaskIdAtVisibleIndex === undefined
        ? newTaskIds.length
        : newTaskIds.indexOf(destTaskIdAtVisibleIndex);
      newTaskIds.splice(realDestIndex, 0, movedTaskId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(realSourceIndex, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    const finishVisible = getVisibleTaskIdsForColumn(finish.id);
    const destTaskIdAtVisibleIndex = finishVisible[destination.index];
    const realFinishIndex = destTaskIdAtVisibleIndex === undefined
      ? finishTaskIds.length
      : finishTaskIds.indexOf(destTaskIdAtVisibleIndex);
    finishTaskIds.splice(realFinishIndex, 0, movedTaskId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    });
  };

  // Helper functions
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
    const newTask = {
      id: newTaskId,
      projectId: selectedProject || (projects[0] && projects[0].id) || null,
      title: newTaskTitle,
      description: '',
      assignee: null,
      dueDate: null,
      priority: 'medium',
      labels: [],
      comments: []
    };

    setTasks({ ...tasks, [newTaskId]: newTask });
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        taskIds: [...columns[columnId].taskIds, newTaskId]
      }
    });
    setNewTaskTitle('');
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedTask) return;

    const updatedTask = {
      ...tasks[selectedTask],
      comments: [
        ...tasks[selectedTask].comments,
        {
          id: tasks[selectedTask].comments.length + 1,
          author: 'Current User',
          text: newComment,
          timestamp: new Date().toLocaleString()
        }
      ]
    };

    setTasks({ ...tasks, [selectedTask]: updatedTask });
    setNewComment('');
  };

  // Derived helpers for project-specific data and filters
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

  // Components
  const Navbar = () => (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">TaskFlow Pro</h1>
        </div>
        <div className="hidden md:flex items-center space-x-1">
          {['board', 'analytics', 'employees', 'projects'].map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === view
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="text-sm text-gray-900">{notification.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center -space-x-2">
          {employees.filter(emp => emp.isOnline).slice(0, 4).map((employee) => (
            <div
              key={employee.id}
              className="relative w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white"
              title={employee.name}
            >
              {employee.avatar}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
          ))}
        </div>

        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );

  const TaskCard = ({ task, index }) => {
    const assignee = getEmployeeById(task.assignee);
    
    return (
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => {
              setSelectedTask(task.id);
              setShowTaskModal(true);
            }}
            className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer transition-all hover:shadow-md ${
              snapshot.isDragging ? 'rotate-3 shadow-lg' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{task.title}</h4>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {task.description && (
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
            )}

            <div className="flex flex-wrap gap-1 mb-3">
              {task.labels.map((label, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                
                {task.dueDate && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {task.comments.length > 0 && (
                  <div className="flex items-center text-xs text-gray-500">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {task.comments.length}
                  </div>
                )}

                {assignee && (
                  <div
                    className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    title={assignee.name}
                  >
                    {assignee.avatar}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  const Column = ({ column }) => (
    <div className="bg-gray-50 rounded-xl p-4 w-80 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: column.color }}
          ></div>
          <h3 className="font-semibold text-gray-900">{column.title}</h3>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            {column.taskIds.filter((id) => taskMatchesFilters(tasks[id])).length}
          </span>
        </div>
        <button className="p-1 hover:bg-gray-200 rounded">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[200px] p-2 rounded-lg transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {column.taskIds
              .filter((taskId) => taskMatchesFilters(tasks[taskId]))
              .map((taskId, index) => (
                <TaskCard key={taskId} task={tasks[taskId]} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add a task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNewTask(column.id)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => addNewTask(column.id)}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const BoardView = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            {selectedProject ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900">
                  {projects.find(p => p.id === selectedProject)?.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {projects.find(p => p.id === selectedProject)?.description}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">Select a project</h2>
                <p className="text-gray-600 mt-1">Choose a project to see its board.</p>
              </>
            )}
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setShowFilter(!showFilter)} className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 relative">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              {showFilter && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-10">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Priority</label>
                      <select
                        value={filters.priority}
                        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Assignee</label>
                      <select
                        value={filters.assignee}
                        onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All</option>
                        <option value="unassigned">Unassigned</option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setFilters({ priority: 'all', assignee: 'all' })}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setShowFilter(false)}
                        className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </button>
            <button
              onClick={() => { setSelectedTask(null); setShowTaskModal(true); }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
            <button
              onClick={() => setShowTrash(!showTrash)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${showTrash ? 'bg-red-50 text-red-700 border-red-200' : 'border-gray-300 hover:bg-gray-50'}`}
              title="Show Trash"
            >
              <Trash2 className="w-4 h-4" />
              <span>Trash ({Object.keys(deletedTasks).length})</span>
            </button>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 p-6 overflow-x-auto">
          {Object.values(columns).map(column => (
            <Column key={column.id} column={column} />
          ))}
        </div>

        <Droppable droppableId="trash">
          {(provided, snapshot) => (
            <div className="px-6 pb-6">
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`mt-2 rounded-xl border-2 ${snapshot.isDraggingOver ? 'border-red-400 bg-red-50' : 'border-dashed border-gray-300'} flex items-center justify-center h-16 transition-colors`}
              >
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Trash2 className="w-4 h-4" />
                  <span>Drag here to delete</span>
                </div>
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showTrash && (
        <div className="p-6 pt-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trash2 className="w-4 h-4 text-red-600" />
                <h3 className="font-semibold text-gray-900">Trash</h3>
                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{Object.keys(deletedTasks).length}</span>
              </div>
              <button
                onClick={() => setShowTrash(false)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >Close</button>
            </div>
            <div className="p-4 space-y-3">
              {Object.keys(deletedTasks).length === 0 && (
                <p className="text-sm text-gray-600">Trash is empty.</p>
              )}
              {Object.values(deletedTasks).map(({ task, fromColumnId, index }) => (
                <div key={task.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-600">From: {columns[fromColumnId]?.title || fromColumnId}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        const col = columns[fromColumnId];
                        if (!col) return;
                        const restoredTaskIds = Array.from(col.taskIds);
                        const insertAt = Math.min(index, restoredTaskIds.length);
                        restoredTaskIds.splice(insertAt, 0, task.id);
                        setColumns({ ...columns, [fromColumnId]: { ...col, taskIds: restoredTaskIds } });
                        const nextDeleted = { ...deletedTasks };
                        delete nextDeleted[task.id];
                        setDeletedTasks(nextDeleted);
                      }}
                      className="px-3 py-1 text-sm rounded-md bg-green-100 text-green-800 hover:bg-green-200"
                    >Restore</button>
                    <button
                      onClick={() => {
                        const next = { ...deletedTasks };
                        delete next[task.id];
                        setDeletedTasks(next);
                      }}
                      className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-800 hover:bg-red-200"
                    >Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AnalyticsView = () => {
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
    return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700">Project:</label>
          <select
            value={selectedProject || ''}
            onChange={(e) => setSelectedProject(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="" disabled>Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
      </div>

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
              <Pie
                data={taskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
              >
                {taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

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
    </div>
  );
  };

  const TaskModal = () => {
    if (!showTaskModal) return null;

    const task = selectedTask ? tasks[selectedTask] : null;
    const assignee = task ? getEmployeeById(task.assignee) : null;

    const handleSubmit = () => {
      if (!taskForm.title.trim()) return;
      if (task) {
        const updatedTask = {
          ...task,
          title: taskForm.title,
          description: taskForm.description,
          assignee: taskForm.assignee ? parseInt(taskForm.assignee) : null,
          priority: taskForm.priority,
          dueDate: taskForm.dueDate || null
        };
        setTasks({ ...tasks, [task.id]: updatedTask });
      } else {
        const newTaskId = Math.max(0, ...Object.keys(tasks).map(Number)) + 1;
        const newTask = {
          id: newTaskId,
          projectId: selectedProject || (projects[0] && projects[0].id) || null,
          title: taskForm.title,
          description: taskForm.description,
          assignee: taskForm.assignee ? parseInt(taskForm.assignee) : null,
          priority: taskForm.priority,
          dueDate: taskForm.dueDate || null,
          labels: [],
          comments: []
        };
        setTasks({ ...tasks, [newTaskId]: newTask });
        setColumns({
          ...columns,
          ['todo']: { ...columns['todo'], taskIds: [...columns['todo'].taskIds, newTaskId] }
        });
      }
      setShowTaskModal(false);
      setSelectedTask(null);
      setTaskForm({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '' });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {task ? 'Edit Task' : 'Create Task'}
              </h2>
              <button
                onClick={() => {
                  setShowTaskModal(false);
                  setSelectedTask(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add task description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                <select
                  value={taskForm.assignee}
                  onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select assignee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={taskForm.priority}
                  onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={taskForm.dueDate}
                onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {task && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addComment()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addComment}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowTaskModal(false);
                setSelectedTask(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              {task ? 'Update' : 'Create'} Task
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EmployeesView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        <button
          onClick={() => { setEditingEmployee(null); setShowEmployeeModal(true); }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                    {employee.avatar}
                  </div>
                  {employee.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingEmployee(employee);
                  setShowEmployeeModal(true);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Edit3 className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span>Email:</span>
                <span className="ml-2">{employee.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span>Tasks:</span>
                <span className="ml-2">{Object.values(tasks).filter(task => task.assignee === employee.id).length}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  employee.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {employee.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProjectsView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={() => { setEditingProject(null); setShowProjectModal(true); }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`bg-white rounded-xl p-6 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedProject === project.id ? 'border-blue-500' : 'border-gray-200'
            }`}
            onClick={() => setSelectedProject(project.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingProject(project);
                  setShowProjectModal(true);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Edit3 className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">{project.description}</p>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Category</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                  {project.category}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Deadline</span>
                <span className="text-gray-900">{new Date(project.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProjectModal = () => {
    if (!showProjectModal) return null;

    const handleSubmit = () => {
      if (!projectForm.name.trim()) return;
      if (editingProject) {
        // axios.post("http://localhost:8080/api/project/update",{ ... })
        const updated = projects.map(p => p.id === editingProject.id ? {
          ...editingProject,
          name: projectForm.name,
          description: projectForm.description,
          category: projectForm.category,
          deadline: projectForm.deadline
        } : p);
        setProjects(updated);
      } else {
        const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
        const newProject = {
          id: newId,
          name: projectForm.name,
          description: projectForm.description,
          category: projectForm.category || 'General',
          deadline: projectForm.deadline || new Date().toISOString().slice(0,10),
          progress: 0
        };
        setProjects([...projects, newProject]);
        setSelectedProject(newId);
      }
      setShowProjectModal(false);
      setEditingProject(null);
      setProjectForm({ name: '', description: '', category: '', deadline: '' });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProject ? 'Edit Project' : 'New Project'}
              </h2>
              <button
                onClick={() => {
                  setShowProjectModal(false);
                  setEditingProject(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
              <input
                type="text"
                value={projectForm.name}
                onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={3}
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={projectForm.category}
                onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Research">Research</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <input
                type="date"
                value={projectForm.deadline}
                onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowProjectModal(false);
                setEditingProject(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              {editingProject ? 'Update' : 'Create'} Project
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EmployeeModal = () => {
    if (!showEmployeeModal) return null;

    const handleSubmit = () => {
      if (!employeeForm.name.trim() || !employeeForm.email.trim()) return;
      if (editingEmployee) {
        // axios.post('http://localhost:8080/api/emp/update', { ... })
        const updated = employees.map(e => e.id === editingEmployee.id ? {
          ...editingEmployee,
          name: employeeForm.name,
          email: employeeForm.email,
          role: employeeForm.role
        } : e);
        setEmployees(updated);
      } else {
        // const newId = Math.max(0, ...employees.map(e => e.id)) + 1;
        const initials = employeeForm.name.split(' ').map(s => s[0]).join('').toUpperCase().slice(0,2) || 'NA';
        const newEmp = { id: Math.max(0, ...employees.map(e => e.id)) + 1, name: employeeForm.name, email: employeeForm.email, avatar: initials, role: employeeForm.role || 'Member', isOnline: true };
        setEmployees([...employees, newEmp]);
      }
      setShowEmployeeModal(false);
      setEditingEmployee(null);
      setEmployeeForm({ name: '', email: '', role: '' });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingEmployee ? 'Edit Employee' : 'Add Employee'}
              </h2>
              <button
                onClick={() => {
                  setShowEmployeeModal(false);
                  setEditingEmployee(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={employeeForm.name}
                onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={employeeForm.email}
                onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={employeeForm.role}
                onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select role</option>
                <option value="Designer">Designer</option>
                <option value="Developer">Developer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowEmployeeModal(false);
                setEditingEmployee(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              {editingEmployee ? 'Update' : 'Add'} Employee
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'board':
        return <BoardView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'employees':
        return <EmployeesView />;
      case 'projects':
        return <ProjectsView />;
      default:
        return <BoardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-white border-r border-gray-200 transition-all ${sidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
          <div className="p-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg mb-4"
            >
              <ChevronDown className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-90' : ''}`} />
            </button>

            {!sidebarCollapsed && (
              <div className="space-y-2">
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Projects</p>
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => setSelectedProject(project.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedProject === project.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Star className={`w-4 h-4 ${selectedProject === project.id ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className="font-medium text-sm">{project.name}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Actions</p>
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add Task</span>
                  </button>
                  <button
                    onClick={() => setShowProjectModal(true)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center space-x-2"
                  >
                    <Target className="w-4 h-4" />
                    <span className="text-sm">New Project</span>
                  </button>
                  <button
                    onClick={() => setShowEmployeeModal(true)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center space-x-2"
                  >
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Add Member</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {renderCurrentView()}
        </div>
      </div>

      {/* Modals */}
      <TaskModal />
      <ProjectModal />
      <EmployeeModal />
    </div>
  );
};

export default KanbanApp;