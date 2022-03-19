import './styles/App.css';
import Login from './demo/accessMgmt/pages/Login';
import Dashboard from './demo/accessMgmt/pages/Dashboard';
import 'antd/dist/antd.min.css'
import { useState } from 'react';
import Warning from './demo/accessMgmt/pages/Warning';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [users, setUsers] = useState(()=>{
    const ls = JSON.parse(localStorage.getItem('users'))
    return ls ? ls : [{type: 'superuser', user: 'super.user', password:'superpass', id: 1},{type: 'admin', user: 'admin.user', password:'adminpass',id: 2},{type: 'owner', user: 'owner.user', password:'ownerpass',id: 3},{type: 'member', user: 'member.user', password:'memberpass',id: 4},{type: 'guest', user: 'guest.user', password:'guestpass',id: 5}]
  })
  const [currentUser, setCurrentUser] = useState(()=>{
    const lsUser = JSON.parse(localStorage.getItem('currentUser'))
    if(lsUser){
      setIsLoggedIn(true)
      return lsUser
    } 
  })
  const [warning, setWarning] = useState(false)
  const [showUsers, setShowUsers] = useState(()=>{
    const ls = JSON.parse(localStorage.getItem('showUsers'))
    return ls ? ls : []
  })


  if(isLoggedIn) {return (
      <div className='App'>
        <Dashboard showUsers={showUsers} setShowUsers={setShowUsers} setUsers={setUsers} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} users={users} setIsLoggedIn={setIsLoggedIn}/>
      </div>)
    }
  else 
    {return (
      <div className="App">
        {warning ? <Warning/> : null}
        <Login setWarning={setWarning} setCurrentUser={setCurrentUser} currentUser={currentUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} users={users}/>
      </div>
    )
  }
}

export default App;
