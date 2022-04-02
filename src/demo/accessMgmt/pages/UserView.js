import React from 'react'
import '../../../styles/UserView.css'
import UVHeader from '../userview content/UVHeader'
import UVContent from '../userview content/UVContent'
import { Typography } from 'antd'

const {Title} = Typography

function UserView(props){
    return(
        <div className='user_view'>
            <UVHeader currentUser={props.currentUser}/>
            <Title level={2} style={{textAlign: 'center', margin: '1rem', color:'#2375ab'}}>UserView</Title>
            <UVContent setSelectedUser={props.setSelectedUser} users={props.users}/>
        </div>
    )
}

export default UserView