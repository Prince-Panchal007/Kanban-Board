import React from 'react';
import { Search, Bell, Settings, Target } from 'lucide-react';

const Navbar = ({ currentView, setCurrentView, searchTerm, setSearchTerm, notifications, showNotifications, setShowNotifications, employees }) => (
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

export default Navbar;



