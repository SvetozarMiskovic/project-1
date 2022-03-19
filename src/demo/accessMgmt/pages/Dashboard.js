import Header from '../dashboard comps/Header'
import { Typography } from 'antd'
import '../../../styles/Dashboard.css'
import DBContent from '../dashboard comps/DBContent'
import { useEffect } from 'react';

const {Title} = Typography;
function Dashboard(props){
   
    useEffect(()=>{
        const ls = JSON.parse(localStorage.getItem('currentUser'))              
      checkForUsers(ls?.type)   
    },[props.currentUser])

    useEffect(()=>{
    const ls = JSON.parse(localStorage.getItem('currentUser'))              
      checkForUsers(ls?.type)   
      localStorage.setItem('users', JSON.stringify(props.users))
      
  
     },[props.users])
    

    const getUsers = (result)=>{
        props.setShowUsers((prevState)=>[...result])
    }

    const createAdmin = ()=>{
        const id = new Date().getTime()
        
        const userID = id.toString()
        const userStr= userID.substring(8,11)
        const newAdmin = [{
            id: id,
            type: 'admin',
            user: `admin.user${userStr}`,
            password: 'adminpass'
        }]
        props.setUsers(prevState => [...prevState, ...newAdmin])
        
    }
   
    const createOwner = ()=>{
        const id = new Date().getTime()
        
        const userID = id.toString().substring(11,13)
        const newOwner = [{
            id: id,
            type: 'owner',
            user: `owner.user${userID}`,
            password: 'ownerpass'
        }]
        props.setUsers(prevState => [...prevState, ...newOwner])
    }

    const createMember = ()=>{
        const id = new Date().getTime()
        
        const userID = id.toString().substring(10,13)
        const newMember = [{
            id: id,
            type: 'member',
            user: `member.user${userID}`,
            password: 'memberpass'
        }]
        props.setUsers(prevState => [...prevState, ...newMember])
    }

    const createGuest = ()=>{
        const id = new Date().getTime()
        
        const userID = id.toString().substring(11,13)
        const newGuest = [{
            id: id,
            type: 'guest',
            user: `guest.user${userID}`,
            password: 'guestpass'
        }]
        props.setUsers(prevState => [...prevState, ...newGuest])
    }

    const checkForUsers = (info)=>{
        if(info === 'superuser'){
            getUsers(props.users)
           
            
        } else if(info === 'admin'){
            const result = props.users.filter((user)=> user?.type !== 'superuser')
           getUsers(result)
           
        } else if(info === 'owner'){
            const result = props.users.filter((user)=> user?.type !== 'superuser' && user?.type !== 'admin')
           getUsers(result)
           
        } else if (info === 'member'){
            const result = props.users.filter((user)=> user?.type !== 'superuser' && user?.type !== 'admin' && user?.type !== 'owner');
           getUsers(result)
           
        } else if(info === 'guest'){
            const result = props.users.filter((user)=> user?.type !== 'superuser' && user?.type !== 'admin' && user?.type !== 'owner' && user?.type !== 'member');
           getUsers(result)
           
        }

        return localStorage.setItem('showUsers', JSON.stringify(props.showUsers))
           
    }

    return(
        <div className="dashboard">
            <Header setShowUsers={props.setShowUsers} createGuest={createGuest} createMember={createMember} createOwner={createOwner} createAdmin={createAdmin} isLoggedIn={props.isLoggedIn} currentUser={props.currentUser} setIsLoggedIn={props.setIsLoggedIn} setCurrentUser={props.setCurrentUser}/>
            <Title className='content_title' style={{color:'#2375ab'}} level={3}>Dashboard</Title>
            <DBContent showUsers={props.showUsers}  currentUser={props.currentUser} users={props.users}/>
        </div>
    )
}

export default Dashboard