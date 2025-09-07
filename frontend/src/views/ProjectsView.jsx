import React, { useEffect, useState } from 'react';
import { Plus, Edit3 } from 'lucide-react';
import ProjectModal from '../modals/ProjectModal';
import axios from 'axios';
import { getSelectedProjectId, setSelectedProjectId } from '../state/selectedProject';

const ProjectsView = () => {
  const [projects, setProjects] = useState([
    { id: 2, name: 'Mobile App Development', category: 'Development', description: 'iOS and Android app for customers', deadline: '2024-11-15', progress: 40 }
  ]);

  const getData = () => {
    axios.post("http://localhost:8080/api/project/getProject")
      .then(res => { setProjects(res.data); });
  };

  useEffect(() => {
    getData();
  }, []);

  const [selectedProject, setSelectedProject] = useState(getSelectedProjectId() || null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({ name: '', description: '', category: '', deadline: '' });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={() => {
            setEditingProject(null);
            setProjectForm({ name: '', description: '', category: '', deadline: '' });
            setShowProjectModal(true);
          }}
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
            onClick={() => { setSelectedProject(project.id); setSelectedProjectId(project.id); }}
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
                  setProjectForm({
                    name: project.name,
                    description: project.description,
                    category: project.category,
                    deadline: project.deadline.slice(0, 10), // format for input[type="date"]
                  });
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
                <span className="text-gray-900">
                  {new Date(project.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        showProjectModal={showProjectModal}
        setShowProjectModal={setShowProjectModal}
        editingProject={editingProject}
        setEditingProject={setEditingProject}
        projectForm={projectForm}
        setProjectForm={setProjectForm}
        projects={projects}
        setProjects={setProjects}
        setSelectedProject={(id) => { setSelectedProject(id); setSelectedProjectId(id); }}
        setData={getData}
      />
    </div>
  );
};

export default ProjectsView;
