import React, { useContext, useEffect, useState } from 'react';
import Login from './Components/Auth/Login';
import EmployeDashboard from './Components/Dashboard/EmployeDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import { AuthContext } from './Context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const authData = useContext(AuthContext);

  // Load user data from localStorage on initial render
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data || null);
    }
  }, []);

  // Handle user login
  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      // Admin login
      const adminData = { role: 'admin' };
      setUser('admin');
      setLoggedInUserData(adminData);
      localStorage.setItem('loggedInUser', JSON.stringify(adminData));
    } else if (authData?.employees) {
      // Employee login
      const employee = authData.employees.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        const employeeData = { role: 'employee', data: employee };
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify(employeeData));
      } else {
        alert('Invalid credentials!');
      }
    } else {
      alert('Invalid credentials or data is unavailable!');
    }
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === 'admin' && <AdminDashboard changeUser={setUser} data={loggedInUserData} />}
      {user === 'employee' && <EmployeDashboard changeUser={setUser} data={loggedInUserData} />}
    </>
  );
};

export default App;
