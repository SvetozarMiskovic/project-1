import './styles/App.css';
import Login from './demo/accessMgmt/pages/Login';
import Dashboard from './demo/accessMgmt/pages/Dashboard';
import 'antd/dist/antd.min.css'
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Warning from './demo/accessMgmt/pages/Warning';
import {auth} from './Firebase'
import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import UserView from './demo/accessMgmt/pages/UserView';
import UserPage from './demo/accessMgmt/pages/UserPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [users, setUsers] = useState(()=>{
    const ls = JSON.parse(localStorage.getItem('users'))
    return ls ? ls : [{type: 'superuser', user: 'super.user@user.com', password:'superpass', id: 1},{type: 'admin', user: 'admin.user@user.com', password:'adminpass',id: 2},{type: 'owner', user: 'owner.user@user.com', password:'ownerpass',id: 3},{type: 'member', user: 'member.user@user.com', password:'memberpass',id: 4},{type: 'guest', user: 'guest.user@user.com', password:'guestpass',id: 5}]
  })
  const [currentUser, setCurrentUser] = useState(()=>{
    const lsUser = JSON.parse(localStorage.getItem('currentUser'))
    if(lsUser){
      
      return lsUser
    } 
  })
  const [warning, setWarning] = useState(false)
  const [showUsers, setShowUsers] = useState(()=>{
    const ls = JSON.parse(localStorage.getItem('showUsers'))
    return ls ? ls : []
  })
  const [selectedUser, setSelectedUser] = useState()


  onAuthStateChanged(auth, (user)=>{
    if(user){
      return setIsLoggedIn(true)
    } else return setIsLoggedIn(false)
  })

  if(isLoggedIn) {return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/project-1' element={<Dashboard showUsers={showUsers} setShowUsers={setShowUsers} setUsers={setUsers} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} users={users} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/user-view' element={<UserView selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={users} currentUser={currentUser}/>}/>
             {selectedUser ? <Route path={`/user/:${selectedUser?.id}`} element={<UserPage currentUser={currentUser} selectedUser={selectedUser}/>}/> : null}
           
            
          </Routes>
        </BrowserRouter>
      </div>)
    }
  else 
    {return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/project-1' element={<Login setWarning={setWarning} setCurrentUser={setCurrentUser} currentUser={currentUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} users={users}/>}/>
        
          </Routes>
          {warning ? <Warning/> : null}
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
