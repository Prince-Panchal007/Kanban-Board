import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Plus, Filter, Trash2, Calendar, MessageSquare } from 'lucide-react';
import { Droppable, Draggable, DragDropContext } from '@hello-pangea/dnd';
import TaskModal from '../modals/TaskModal';
import { getSelectedProjectId, subscribeSelectedProject, setSelectedProjectId } from '../state/selectedProject';
import axios from 'axios';

const TaskCard = ({ task, index, getPriorityColor, getEmployeeById, setSelectedTask, setShowTaskModal }) => {
  const assignee = getEmployeeById(task.assignee);
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => { setSelectedTask(task.id); setShowTaskModal(true); }}
          className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer transition-all hover:shadow-md ${snapshot.isDragging ? 'rotate-3 shadow-lg' : ''}`}
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
              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">{label}</span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>{task.priority}</span>
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
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium" title={assignee.name}>
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

const Column = ({ column, tasks, taskMatchesFilters, getPriorityColor, getEmployeeById, newTaskTitle, setNewTaskTitle, addNewTask, setSelectedTask, setShowTaskModal }) => (
  <div className="bg-gray-50 rounded-xl p-4 w-80 flex-shrink-0">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }}></div>
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
        <div ref={provided.innerRef} {...provided.droppableProps} className={`space-y-3 min-h-[200px] p-2 rounded-lg transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}>
          {column.taskIds.filter((taskId) => taskMatchesFilters(tasks[taskId])).map((taskId, index) => (
            <TaskCard key={taskId} task={tasks[taskId]} index={index} getPriorityColor={getPriorityColor} getEmployeeById={getEmployeeById} setSelectedTask={setSelectedTask} setShowTaskModal={setShowTaskModal} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    <div className="mt-4">
      <div className="flex space-x-2">
        <input type="text" placeholder="Add a task..." value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addNewTask(column.id)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <button onClick={() => addNewTask(column.id)} className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

const BoardView = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', category: 'Design', description: 'Complete overhaul of company website', deadline: '2024-12-31', progress: 65 },
    { id: 2, name: 'Mobile App Development', category: 'Development', description: 'iOS and Android app for customers', deadline: '2024-11-15', progress: 40 }
  ]);

  const [employees, setEmployees] = useState([
    // { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'SJ', role: 'Designer', online: true },
    // { id: 2, name: 'Mike Chen', email: 'mike@company.com', avatar: 'MC', role: 'Developer', online: true },
    // { id: 3, name: 'Emma Davis', email: 'emma@company.com', avatar: 'ED', role: 'PM', online: false },
    { id: 4, name: 'John Smith', email: 'john@company.com', avatar: 'JS', role: 'Developer', online: true }
  ]);

  const [columns, setColumns] = useState({
    'todo': { id: 'todo', title: 'To Do', taskIds: [1, 2, 3], color: '#6366f1' },
    'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: [4, 5], color: '#f59e0b' },
    'review': { id: 'review', title: 'Review', taskIds: [6], color: '#8b5cf6' },
    'done': { id: 'done', title: 'Done', taskIds: [7, 8], color: '#10b981' }
  });

  const [tasks, setTasks] = useState({
    // 1: { id: 1, projectId: 2, title: 'Design homepage mockup', description: 'Create initial mockup for the new homepage design', assignee: 1, dueDate: '2024-10-15', priority: 'high', labels: ['design', 'urgent'], comments: [{ id: 1, author: 'Sarah Johnson', text: 'Started working on this', timestamp: '2024-10-10 10:30' }] },
    // 2: { id: 2, projectId: 2, title: 'Set up project repository', description: 'Initialize Git repository and set up basic project structure', assignee: 2, dueDate: '2024-10-12', priority: 'medium', labels: ['development'], comments: [] },
    // 3: { id: 3, projectId: 2, title: 'Research competitor websites', description: 'Analyze competitor websites for inspiration and best practices', assignee: 3, dueDate: '2024-10-20', priority: 'low', labels: ['research'], comments: [] },
    // 4: { id: 4, projectId: 2, title: 'Implement user authentication', description: 'Set up login and registration functionality', assignee: 2, dueDate: '2024-10-18', priority: 'high', labels: ['development', 'backend'], comments: [{ id: 1, author: 'Mike Chen', text: 'Making good progress on this', timestamp: '2024-10-11 14:20' }] },
    // 5: { id: 5, projectId: 2, title: 'Create responsive navigation', description: 'Build responsive navigation component', assignee: 4, dueDate: '2024-10-16', priority: 'medium', labels: ['frontend'], comments: [] },
    // 6: { id: 6, projectId: 2, title: 'Review design system', description: 'Review and approve the new design system components', assignee: 3, dueDate: '2024-10-14', priority: 'medium', labels: ['design', 'review'], comments: [] },
    // 7: { id: 7, projectId: 2, title: 'Set up CI/CD pipeline', description: 'Configure continuous integration and deployment', assignee: 2, dueDate: '2024-10-10', priority: 'low', labels: ['devops'], comments: [] },
    // 8: { id: 8, projectId: 2, title: 'Initial user research', description: 'Conduct user interviews and surveys', assignee: 1, dueDate: '2024-10-08', priority: 'medium', labels: ['research'], comments: [] }
  });
  const getData = () => {
    axios.post("http://localhost:8080/api/task/getTask").then(res => {
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
    })
  }

  useEffect(() => {
    getData();
  }, []);

  const [selectedProject, setSelectedProject] = useState(getSelectedProjectId() || null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showTrash, setShowTrash] = useState(false);
  const [deletedTasks, setDeletedTasks] = useState({});
  const [filters, setFilters] = useState({ priority: 'all', assignee: 'all' });
  const [showFilter, setShowFilter] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '' });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const unsub = subscribeSelectedProject((id) => setSelectedProject(id || null));
    return () => unsub && unsub();
  }, []);

  useEffect(() => {
    if (showTaskModal && selectedTask && tasks[selectedTask]) {
      const t = tasks[selectedTask];
      setTaskForm({ title: t.title || '', description: t.description || '', assignee: t.assignee ? String(t.assignee) : '', priority: t.priority || 'medium', dueDate: t.dueDate || '' });
    } else if (showTaskModal && !selectedTask) {
      setTaskForm({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '' });
    }
  }, [showTaskModal, selectedTask]);

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
    const updatedTask = { ...tasks[movedTaskId], type: destination.droppableId };
    axios.post("http://localhost:8080/api/task/update", updatedTask);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            {selectedProject ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900">{projects.find(p => p.id === selectedProject)?.name}</h2>
                <p className="text-gray-600 mt-1">{projects.find(p => p.id === selectedProject)?.description}</p>
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
                      <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })} className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Assignee</label>
                      <select value={filters.assignee} onChange={(e) => setFilters({ ...filters, assignee: e.target.value })} className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="all">All</option>
                        <option value="unassigned">Unassigned</option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button onClick={() => setFilters({ priority: 'all', assignee: 'all' })} className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Clear</button>
                      <button onClick={() => setShowFilter(false)} className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">Done</button>
                    </div>
                  </div>
                </div>
              )}
            </button>
            <button onClick={() => { setSelectedTask(null); setShowTaskModal(true); }} className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
            <button onClick={() => setShowTrash(!showTrash)} className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${showTrash ? 'bg-red-50 text-red-700 border-red-200' : 'border-gray-300 hover:bg-gray-50'}`} title="Show Trash">
              <Trash2 className="w-4 h-4" />
              <span>Trash ({Object.keys(deletedTasks).length})</span>
            </button>
          </div>
        </div>
      </div>
      {selectedProject && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-6 p-6 overflow-x-auto">
            {Object.values(columns).map(column => (
              <Column key={column.id} column={column} tasks={tasks} taskMatchesFilters={taskMatchesFilters} getPriorityColor={getPriorityColor} getEmployeeById={getEmployeeById} newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle} addNewTask={addNewTask} setSelectedTask={setSelectedTask} setShowTaskModal={setShowTaskModal} />
            ))}
          </div>
          <Droppable droppableId="trash">
            {(provided, snapshot) => (
              <div className="px-6 pb-6">
                <div ref={provided.innerRef} {...provided.droppableProps} className={`mt-2 rounded-xl border-2 ${snapshot.isDraggingOver ? 'border-red-400 bg-red-50' : 'border-dashed border-gray-300'} flex items-center justify-center h-16 transition-colors`}>
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
      )}
      {showTrash && (
        <div className="p-6 pt-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trash2 className="w-4 h-4 text-red-600" />
                <h3 className="font-semibold text-gray-900">Trash</h3>
                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{Object.keys(deletedTasks).length}</span>
              </div>
              <button onClick={() => setShowTrash(false)} className="text-sm text-gray-600 hover:text-gray-900">Close</button>
            </div>
            <div className="p-4 space-y-3">
              {Object.keys(deletedTasks).length === 0 && (<p className="text-sm text-gray-600">Trash is empty.</p>)}
              {Object.values(deletedTasks).map(({ task, fromColumnId, index }) => (
                <div key={task.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-600">From: {fromColumnId}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => {
                      const col = columns[fromColumnId];
                      if (!col) return;
                      const restoredTaskIds = Array.from(col.taskIds);
                      const insertAt = Math.min(index, restoredTaskIds.length);
                      restoredTaskIds.splice(insertAt, 0, task.id);
                      setColumns({ ...columns, [fromColumnId]: { ...col, taskIds: restoredTaskIds } });
                      const nextDeleted = { ...deletedTasks };
                      delete nextDeleted[task.id];
                      setDeletedTasks(nextDeleted);
                    }} className="px-3 py-1 text-sm rounded-md bg-green-100 text-green-800 hover:bg-green-200">Restore</button>
                    <button onClick={() => { const next = { ...deletedTasks }; delete next[task.id]; setDeletedTasks(next); }} className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-800 hover:bg-red-200">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedProject && (
        <TaskModal
          showTaskModal={showTaskModal}
          setShowTaskModal={setShowTaskModal}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          tasks={tasks}
          setTasks={setTasks}
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          employees={employees}
          getEmployeeById={getEmployeeById}
          newComment={newComment}
          setNewComment={setNewComment}
          addComment={addComment}
          columns={columns}
          setColumns={setColumns}
          selectedProject={selectedProject}
          getSelectedProjectId={getSelectedProjectId}
          setData={getData}
        />
      )}
    </div>
  );
};


export default BoardView;