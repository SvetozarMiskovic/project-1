import Header from '../dashboard comps/Header'
import { Typography } from 'antd'
import '../../../styles/Dashboard.css'
import DBContent from '../dashboard comps/DBContent'
import { useEffect, useState } from 'react';

const {Title} = Typography;
function Dashboard(props){
    const [availableUsers, setAvailableUsers] = useState([])

    useEffect(()=>{
        
            setTimeout(()=>{
                const ls = JSON.parse(localStorage.getItem('currentUser'))
                
                checkForUsers(ls.type)
            },1500)
        
    }, [])
    
    const checkForUsers = (info)=>{
        if(info === 'superuser'){
            setAvailableUsers(props.users)
            
        } else if(info === 'admin'){
            const result = props.users.filter((user)=> user?.type !== 'superuser')
            setAvailableUsers(result)
        } else if(info === 'owner'){
            const result = props.users.filter((user)=> user?.type !== 'superuser' && user?.type !== 'admin')
            setAvailableUsers(result)
        } else if (info === 'member'){
            const result = props.users.filter((user)=> user?.type !== 'superuser' && user?.type !== 'admin' && user?.type !== 'owner');
            setAvailableUsers(result)
        } else if(info === 'guest'){
            const result = props.users.filter((user)=> user?.type !== 'superuser' && user?.type !== 'admin' && user?.type !== 'owner' && user?.type !== 'member');
            setAvailableUsers(result)
        }
    }

    return(
        <div className="dashboard">
            <Header isLoggedIn={props.isLoggedIn} currentUser={props.currentUser} setIsLoggedIn={props.setIsLoggedIn} setCurrentUser={props.setCurrentUser}/>
            <Title style={{color: '#2375ab', alignSelf:'center', position:'absolute', margin: 0, left: '50%', top: '6rem', transform: 'translateX(-50%)'}} level={3}>Dashboard</Title>
            <DBContent setAvailableUsers={setAvailableUsers} availableUsers={availableUsers} currentUser={props.currentUser} users={props.users}/>
        </div>
    )
}

export default Dashboard