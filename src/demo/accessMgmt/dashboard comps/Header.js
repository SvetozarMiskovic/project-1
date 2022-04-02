import Logout from './Logout.js'
import { Button, Typography, Select, Alert } from 'antd'
import { useRef, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import Input from "antd/lib/input/Input"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase.js';
import { Link } from 'react-router-dom';


const {Title} = Typography
const {Option} = Select

function Header(props){
    const [createMode, setCreateMode] = useState(false)
    const [selectedType, setSelectedType] = useState()
    const [missingInfo, setMissingInfo] = useState(false)
    const userRef = useRef()
    const passRef = useRef()

    const onCancel = ()=>{
        setCreateMode(false)
    }

    const onConfirm = async ()=>{
        const id = new Date().getTime()

       const newUser = [{
            id,
            user: userRef.current.input.value,
            password: passRef.current.input.value,
            type: selectedType
        }]
        if(userRef.current.input.value && passRef.current.input.value) {props.setUsers(prevState => [...prevState, ...newUser])
        } else {
            setMissingInfo(true)
            setTimeout(()=>{
                setMissingInfo(false)
            }, 2000)
        }
        
        await createUserWithEmailAndPassword(auth, userRef.current.input.value, passRef.current.input.value)
        setCreateMode(false)
  
        props.setCreated(true)
        setTimeout(()=>{
            props.setCreated(false)
        }, 2000)
    }

    const onChange = (value)=>{
        setSelectedType(value)
    }

    const makeOptions = ()=>{
        if(props.currentUser?.type === 'superuser'){
                    return (
                        <Select onChange={onChange} style={{width:'100%'}}>
                            <Option key={'admin'}>
                                admin
                            </Option>
                            <Option  key={'owner'}>
                                owner
                            </Option>
                            <Option  key={'member'}>
                                member
                            </Option>
                            <Option key={'guest'}>
                                guest
                            </Option>
                        </Select>
                    )
                } else if(props.currentUser?.type === 'admin'){
                    return (
                        <Select onChange={onChange} style={{width:'100%'}}>
                            <Option key={'owner'}>
                                owner
                            </Option>
                            <Option key={'member'}>
                                member
                            </Option>
                            <Option key={'guest'}>
                                guest
                            </Option>
                        </Select>
                    )
                } else if (props.currentUser?.type === 'owner'){
                    return (
                        <Select onChange={onChange} style={{width:'100%'}}>
                            <Option key={'member'}>
                                member
                            </Option>
                            <Option key={'guest'}>
                                guest
                            </Option>
                        </Select>
                    )
                } else if(props.currentUser?.type === 'member'){
                    return (
                        <Select onChange={onChange} style={{width:'100%'}}>
                            <Option key={'guest'}>
                                guest
                            </Option>
                        </Select>
                    )
                } else if(props.currentUser?.type === 'guest'){
                    return(
                        <Select onChange={onChange} style={{width:'100%'}}>
                            <Option key={'guest'}>
                                <h3 style={{color: '#2375ab'}}>No options</h3>
                            </Option>
                        </Select>
                    )
                }
            }
    

    return(
        <div className="header">
          
           
            <Button style={{color:'#D56062', fontSize:'1rem',textAlign:'center' }} onClick={()=> setCreateMode(true)}>
                Create a user 
            </Button>
            <Modal title='Create user' visible={createMode} onCancel={onCancel} onOk={()=>{
                onConfirm()
            }} okText='Finish' okButtonProps={props.currentUser?.type === 'guest' ? {style: {display:'none'}} : {style: {display:'inline'}}}>
                {missingInfo ? <Alert style={{marginBottom: '1rem'}} type='error' message='Please fill in the required information!'></Alert> : null}
                {props.currentUser?.type !== 'guest' ? <Form>
                    <Title level={5}>Enter username</Title>
                    <Input type='text' ref={userRef} placeholder='i.e. name@name.com' required></Input>
                    <Title level={5}>Enter password</Title>
                    <Input type='text' ref={passRef} placeholder='password' required></Input>
                    <Title level={5}>Choose user type</Title>
                    
                    {makeOptions()}
                </Form> : 'You cannot create users as a guest!'}
            </Modal> 
           
            <Title style={{color:'#fff', margin: 0}} level={3}>Logged in as: <span style={{color:'red'}}>{props.currentUser?.type}</span>, ID:<span style={{color:'red'}}> {props.currentUser?.id}</span></Title>
            <div style={{display:'flex', flexDirection:'column', gap: '1rem'}}>
            <Logout setShowUsers={props.setShowUsers} setCurrentUser={props.setCurrentUser} isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn}/>
            <Link style={{textDecoration:'none', color:'#fff',textAlign:'center',  padding: '0.4rem', borderRadius:'0.4rem', backgroundColor:'#568203'}} to='/user-view'>UserView</Link>
            </div>
          
        </div>
    )
}

export default Header