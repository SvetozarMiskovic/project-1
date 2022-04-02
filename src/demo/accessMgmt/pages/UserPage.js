import '../../../styles/UserPage.css'
import UPContent from '../user page content/UPContent'
import UPHeader from '../user page content/UPHeader'
import { Typography } from 'antd'

const {Title }= Typography

function UserPage(props){
    return (
        <div className="user_page">
            <UPHeader currentUser={props.currentUser} selectedUser={props.selectedUser}/>
            <Title level={2} style={{textAlign: 'center', margin: '1rem', color:'#2375ab'}}>User profile</Title>
            <UPContent selectedUser={props.selectedUser}/>
        </div>
    )
}

export default UserPage