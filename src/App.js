import './styles/App.css';
import Login from './demo/accessMgmt/pages/Login';
import Dashboard from './demo/accessMgmt/pages/Dashboard';
import 'antd/dist/antd.min.css';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Warning from './demo/accessMgmt/pages/Warning';
import { auth } from './Firebase';
import { Routes, Route } from 'react-router-dom';
import UserView from './demo/accessMgmt/pages/UserView';
import UserPage from './demo/accessMgmt/pages/UserPage';
import { usersData } from './demo/accessMgmt/data/UsersData';
import OrgView from './demo/accessMgmt/pages/OrgView';
import OrgPage from './demo/accessMgmt/pages/OrgPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState(() => {
    const ls = JSON.parse(localStorage.getItem('users'));
    return ls ? ls : usersData;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const lsUser = JSON.parse(localStorage.getItem('currentUser'));
    if (lsUser) {
      return lsUser;
    }
  });
  const [warning, setWarning] = useState(false);
  const [showUsers, setShowUsers] = useState(() => {
    const ls = JSON.parse(localStorage.getItem('showUsers'));
    return ls ? ls : [];
  });

  const [orgs, setOrgs] = useState(() => {
    const ls = JSON.parse(localStorage.getItem('organisations'));
    return ls ? ls : [];
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      return setIsLoggedIn(true);
    } else return setIsLoggedIn(false);
  });

  if (isLoggedIn) {
    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                showUsers={showUsers}
                setShowUsers={setShowUsers}
                setUsers={setUsers}
                isLoggedIn={isLoggedIn}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                users={users}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/user-view"
            element={<UserView showUsers={showUsers} users={users} currentUser={currentUser} />}
          />

          <Route
            path={'/user/:userId'}
            element={
              <UserPage
                setShowUsers={setShowUsers}
                showUsers={showUsers}
                users={users}
                setUsers={setUsers}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/org-view"
            element={
              <OrgView
                orgs={orgs}
                setOrgs={setOrgs}
                showUsers={showUsers}
                users={users}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/org/:orgId"
            element={<OrgPage orgs={orgs} setOrgs={setOrgs} currentUser={currentUser} />}
          />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setWarning={setWarning}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                users={users}
              />
            }
          />
        </Routes>
        {warning ? <Warning /> : null}
      </div>
    );
  }
}

export default App;
