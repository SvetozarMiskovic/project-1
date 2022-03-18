import Input from "antd/lib/input/Input"
import Form from "antd/lib/form/Form"
import { Button } from "antd"
import { useEffect, useRef } from "react"
import { Typography } from "antd"
import '../../../styles/Login.css'

const {Title, Text} = Typography;


function Login(props){
    const usernameRef = useRef()
    const passwordRef = useRef()


    const loginHandler = (username, password)=>{
        
       const result = props.users.map((user)=>{
            if(username === user.user && password === user.password){
                props.setIsLoggedIn(true)
                props.setCurrentUser(user)
                return localStorage.setItem('currentUser',JSON.stringify(user))
            } else {
                props.setWarning(true)
                setTimeout(()=>{
                    props.setWarning(false)
                }, 2000)
            }  
        })
      
      
    }


    return(
        <div className="container">
            <Title style={{color:'#fff', margin:0}} className="login_title" level={2}>Please Log in!</Title>
            <Text style={{color:'#fff'}}className='login_text'type="secondary">This is <span style={{color:'red'}}>NOT</span> an open source website! You need to have the credentials provided in order to access the website!</Text>
            <Form
                className="login_form"
                onFinish={()=>{
                    const username = usernameRef.current.input.value;
                    const password = passwordRef.current.input.value;
                    
                    loginHandler(username, password)
                }}
                name="basic"
                
                
                autoComplete="off"
                >
                <Title style={{color: '#fff', margin: 0}} level={3}>Username</Title>
                <Input ref={usernameRef} required type={'text'} placeholder="Enter username"></Input>
                <Title style={{color: '#fff', margin: 0}} level={3}>Password</Title>
                <Input ref={passwordRef} required type={'password'} placeholder="Enter password"></Input>
                <Button className='login_button' htmlType={'submit'} type="secondary">Log in</Button>     
            </Form>
        </div>  
    )
}

export default Login