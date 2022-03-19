import Logout from './Logout.js'
import { Button, Typography } from 'antd'
import { Menu, Dropdown } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';


const {Title} = Typography

function Header(props){



    const makeMenu = ()=>{
        if(props.currentUser.type === 'superuser'){
            return (
                <Menu>
                    <Menu.Item onClick={()=>{
                        props.createAdmin()
                    }} key={'admin'}>
                        Create admin <PlusCircleOutlined />
                    </Menu.Item>
                    <Menu.Item onClick={()=>{
                        props.createOwner()
                    }} key={'owner'}>
                        Create owner <PlusCircleOutlined />
                    </Menu.Item>
                    <Menu.Item onClick={()=>{
                        props.createMember()
                    }} key={'member'}>
                        Create member <PlusCircleOutlined />
                    </Menu.Item>
                    <Menu.Item onClick={()=>{
                        props.createGuest()
                    }} key={'guest'}>
                        Create guest <PlusCircleOutlined />
                    </Menu.Item>
                </Menu>
            )
        } else if(props.currentUser.type === 'admin'){
            return (
                <Menu>
                    <Menu.Item onClick={()=>{
                        props.createOwner()
                    }} key={'owner'}>
                        Create owner <PlusCircleOutlined />
                    </Menu.Item>
                    <Menu.Item onClick={()=>{
                        props.createMember()
                    }} key={'member'}>
                        Create member <PlusCircleOutlined />
                    </Menu.Item>
                    <Menu.Item onClick={()=>{
                        props.createGuest()
                    }} key={'guest'}>
                        Create guest <PlusCircleOutlined />
                    </Menu.Item>
                </Menu>
            )
        } else if (props.currentUser.type === 'owner'){
            return (
                <Menu>
                    <Menu.Item onClick={()=>{
                        props.createMember()
                    }} key={'member'}>
                        Create member <PlusCircleOutlined />
                    </Menu.Item>
                    <Menu.Item onClick={()=>{
                        props.createGuest()
                    }} key={'guest'}>
                        Create guest <PlusCircleOutlined />
                    </Menu.Item>
                </Menu>
            )
        } else if(props.currentUser.type === 'member'){
            return (
                <Menu>
                    <Menu.Item onClick={()=>{
                        props.createGuest()
                    }} key={'guest'}>
                        Create guest <PlusCircleOutlined />
                    </Menu.Item>
                </Menu>
            )
        } else if(props.currentUser.type === 'guest'){
            return(
                <Menu>
                    <Menu.Item key={'guest'}>
                        <h3 style={{color: '#2375ab'}}>No options</h3>
                    </Menu.Item>
                </Menu>
            )
        }
    }

    return(
        <div className="header">
            <Dropdown trigger={'click'} overlay={makeMenu}>
            
                <Button style={{color:'#D56062', fontSize:'1rem',textAlign:'center' }}>
                  Create a user  <DownOutlined style={{fontSize:'0.7rem'}}/>
                </Button>
                
            </Dropdown>
            <Title style={{color:'#fff', margin: 0}} level={3}>Logged in as: {props.currentUser?.type}, ID: {props.currentUser?.id}</Title>
            <Logout setShowUsers={props.setShowUsers} setCurrentUser={props.setCurrentUser} isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn}/>
        </div>
    )
}

export default Header