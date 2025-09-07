import React from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const ProjectModal = ({
  showProjectModal,
  setShowProjectModal,
  editingProject,
  setEditingProject,
  projectForm,
  setProjectForm,
  projects,
  setProjects,
  setSelectedProject,
  setData,
}) => {
  if (!showProjectModal) return null;

  const handleSubmit = () => {
    if (!projectForm.name.trim()) return;

    if (editingProject) {
      axios.post("http://localhost:8080/api/project/update", {
        ...editingProject,
        name: projectForm.name,
        description: projectForm.description,
        category: projectForm.category,
        deadline: projectForm.deadline,
      }).then((res) => {
        setData();
      })

    } else {
      // Create new project
      const newId = Math.max(0, ...projects.map((p) => p.id)) + 1;
      const newProject = {
        id: newId,
        name: projectForm.name,
        description: projectForm.description,
        category: projectForm.category || 'General',
        deadline: projectForm.deadline || new Date().toISOString().slice(0, 10),
        progress: 0,
      };
      axios.post("http://localhost:8080/api/project/add", newProject).then((res) => {
        setData();
      })
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectForm.name}
              onChange={(e) =>
                setProjectForm({ ...projectForm, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm({ ...projectForm, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter project description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={projectForm.category}
              onChange={(e) =>
                setProjectForm({ ...projectForm, category: e.target.value })
              }
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadline
            </label>
            <input
              type="date"
              value={projectForm.deadline}
              onChange={(e) =>
                setProjectForm({ ...projectForm, deadline: e.target.value })
              }
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
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {editingProject ? 'Update' : 'Create'} Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
