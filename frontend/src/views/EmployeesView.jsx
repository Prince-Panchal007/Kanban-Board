import React, { useEffect, useState } from 'react';
import { Plus, Edit3 } from 'lucide-react';
import EmployeeModal from '../modals/EmployeeModal';
import axios from 'axios';

const EmployeesView = () => {
  const [employees, setEmployees] = useState([{ id: 4, name: 'John Smith', email: 'john@company.com', avatar: 'JS', role: 'Developer', online: true }]);
  const [tasks] = useState({});
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeForm, setEmployeeForm] = useState({ name: '', email: '', role: '' });

  const getData=()=>{
    axios.post('http://localhost:8080/api/emp/getEmp').then(res => setEmployees(res.data)).catch(() => {});
  }

  useEffect(() => {
    getData();
  }, []);

  return (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
      <button onClick={() => { setEditingEmployee(null); setShowEmployeeModal(true); }} className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        <Plus className="w-4 h-4" />
        <span>Add Employee</span>
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(employees) ? employees.map((employee) => (
        <div key={employee.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  {employee.avatar}
                </div>
                {employee.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.role}</p>
              </div>
            </div>
            <button onClick={() => { setEditingEmployee(employee); setEmployeeForm({ name: employee.name, email: employee.email, role: employee.role }); setShowEmployeeModal(true); }} className="p-2 hover:bg-gray-100 rounded-lg">
              <Edit3 className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600"><span>Email:</span><span className="ml-2">{employee.email}</span></div>
            <div className="flex items-center text-sm text-gray-600"><span>Tasks:</span><span className="ml-2">{Object.values(tasks).filter(task => task.assignee === employee.id).length}</span></div>
            <div className="flex items-center text-sm">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${employee.online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {employee.online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      )) : null}
    </div>
    <EmployeeModal
      showEmployeeModal={showEmployeeModal}
      setShowEmployeeModal={setShowEmployeeModal}
      editingEmployee={editingEmployee}
      setEditingEmployee={setEditingEmployee}
      employeeForm={employeeForm}
      setEmployeeForm={setEmployeeForm}
      employees={employees}
      setEmployees={setEmployees}
      setData={getData}
    />
  </div>
  );
};

export default EmployeesView;