import React from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import NoMatch from './pages/NoMatch';
import { Dashboard } from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import ProfileConnectedUser from './pages/ProfileConnectedUser';
import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
import styles from './App.module.css';
import { DashboardUser } from './pages/DashboardUser';


function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='/dashboard' element={<DashboardUser />}></Route>
          <Route path='/profile/:userId' element={<ProfileConnectedUser />}></Route>
          <Route path='/dashboard/:projectId' element={<Dashboard />}></Route>
          <Route path='*' element={<NoMatch />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
