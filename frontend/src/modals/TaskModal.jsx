import React from 'react';
import { X, Send } from 'lucide-react';
import axios from 'axios';

const TaskModal = ({ showTaskModal, setShowTaskModal, selectedTask, setSelectedTask, tasks, setTasks, taskForm, setTaskForm, employees, getEmployeeById, newComment, setNewComment, addComment, columns, setColumns, selectedProject, getSelectedProjectId, setData }) => {
  if (!showTaskModal) return null;
  const task = selectedTask ? tasks[selectedTask] : null;

  const handleSubmit = () => {
    if (!taskForm.title.trim()) return;
    if (task) {
      const updatedTask = { ...task, title: taskForm.title, description: taskForm.description, assignee: taskForm.assignee ? parseInt(taskForm.assignee) : null, priority: taskForm.priority, dueDate: taskForm.dueDate || null, type: taskForm.type || "todo" };
      // setTasks({ ...tasks, [task.id]: updatedTask });
      axios.post("http://localhost:8080/api/task/update", updatedTask).then(res => setData());
    } else {
      const newTaskId = Math.floor(1000 + Math.random() * 9000);
      const resolvedProjectId = typeof getSelectedProjectId === 'function' ? getSelectedProjectId() : (selectedProject || null);
      const newTask = { id: newTaskId, projectId: resolvedProjectId, title: taskForm.title, description: taskForm.description, assignee: taskForm.assignee ? parseInt(taskForm.assignee) : null, priority: taskForm.priority, dueDate: taskForm.dueDate || null, type: taskForm.type || "todo", labels: [], comments: [] };
      console.log(newTask);
      axios.post("http://localhost:8080/api/task/add", newTask).then(res => setData());
    }
    setShowTaskModal(false);
    setSelectedTask(null);
    setTaskForm({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '', type: 'todo' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{task ? 'Edit Task' : 'Create Task'}</h2>
            <button onClick={() => { setShowTaskModal(false); setSelectedTask(null); }} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea rows={4} value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Add task description..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
              <select value={taskForm.assignee} onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select assignee</option>
                {employees.map((emp) => (<option key={emp.id} value={emp.id}>{emp.name}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select value={taskForm.type || "todo"} onChange={(e) => setTaskForm({ ...taskForm, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="todo">To do</option>
              <option value="inprogress">In Progress</option>
              <option value="review">Review</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input type="date" value={taskForm.dueDate} onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          {task && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1"><span className="font-medium text-sm text-gray-900">{comment.author}</span><span className="text-xs text-gray-500">{comment.timestamp}</span></div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input type="text" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addComment()} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <button onClick={addComment} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button onClick={() => { setShowTaskModal(false); setSelectedTask(null); }} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">{task ? 'Update' : 'Create'} Task</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
