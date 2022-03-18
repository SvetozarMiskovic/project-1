import Logout from './Logout.js'
import { Typography } from 'antd'

const {Title} = Typography
  
function Header(props){
    return(
        <div className="header">
            <Title style={{color:'#fff', margin: 0}} level={3}>Logged in as: {props.currentUser?.type}</Title>
            <Title style={{color:'#fff', margin: 0}} level={2}>Welcome</Title>
            <Logout setCurrentUser={props.setCurrentUser} isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn}/>
        </div>
    )
}

export default Header