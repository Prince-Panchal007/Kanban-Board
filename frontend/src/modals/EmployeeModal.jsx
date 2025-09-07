import axios from 'axios';
import React from 'react';

const EmployeeModal = ({
  showEmployeeModal,
  setShowEmployeeModal,
  editingEmployee,
  setEditingEmployee,
  employeeForm,
  setEmployeeForm,
  employees,
  setEmployees,
  setData
}) => {
  if (!showEmployeeModal) return null;

  const close = () => {
    setShowEmployeeModal(false);
    setEditingEmployee(null);
    setEmployeeForm({ name: '', email: '', role: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  const getAvatarFromName = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const second = parts[1]?.[0] || '';
    return (first + second).toUpperCase();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, role } = employeeForm;
    if (!name?.trim()) return;

    if (editingEmployee && editingEmployee.id != null) {
      // const updated = employees.map((emp) =>
      //   emp.id === editingEmployee.id ? { ...emp, name, email, role, avatar: getAvatarFromName(name) || emp.avatar } : emp
      // );
      axios.post('http://localhost:8080/api/emp/update', { id: editingEmployee.id, name, email, role, avatar: getAvatarFromName(name) || editingEmployee.avatar }).then(res => setData());

    } else {
      const nextId = employees.length ? Math.max(...employees.map(e => Number(e.id) || 0)) + 1 : 1;
      const newEmp = {
        id: nextId,
        name,
        email: email || '',
        role: role || '',
        avatar: getAvatarFromName(name),
        online: false
      };
      axios.post('http://localhost:8080/api/emp/add', newEmp).then(res => setData());
    }
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={close}></div>
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
          <button onClick={close} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={employeeForm.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={employeeForm.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={employeeForm.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select role</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="PM">PM</option>
              <option value="QA">QA</option>
              <option value="DevOps">DevOps</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button type="button" onClick={close} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;