import {Row, Col, List} from 'antd'
import {Typography} from 'antd'


const {Title} = Typography;

function DBContent(props){
   
  
    
    return(
        <div className="content">
            <Row className='content_row'>
                <Col className='box' span={4}>
                    <Title style={{color: '#fff', textAlign: 'center',borderBottom: '1px solid white'}} level={3}>Super users</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.showUsers?.map((user)=>{
                            if(user.type === 'superuser') return <Title style={{color:'#fff', marginLeft: '0.3rem'}} key={user.id} level={5}>- {user.type}, ID:{user.id}</Title>
                        })}
                    </List>
                </Col>
                <Col className='box' span={4}>
                <Title style={{color: '#fff', textAlign: 'center',borderBottom: '1px solid white'}} level={3}>Admins</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.showUsers?.map((user)=>{
                            if(user.type === 'admin') return <Title style={{color:'#fff', marginLeft: '0.3rem'}} key={user.id} level={5}>- {user.type}, ID:{user.id}</Title>
                        })}
                    </List>
                </Col>
                <Col className='box' span={4}>
                <Title style={{color: '#fff', textAlign: 'center',borderBottom: '1px solid white'}} level={3}>Owners</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.showUsers?.map((user)=>{
                            if(user.type === 'owner') return <Title style={{color:'#fff', marginLeft: '0.3rem'}} key={user.id} level={5}>- {user.type}, ID:{user.id}</Title>
                        })}
                    </List>
                </Col>
                <Col className='box' span={4}>
                <Title style={{color: '#fff', textAlign: 'center', borderBottom: '1px solid white',}} level={3}>Members</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.showUsers?.map((user)=>{
                            if(user.type === 'member') return <Title style={{color:'#fff', marginLeft: '0.3rem'}} key={user.id} level={5}>- {user.type}, ID:{user.id}</Title>
                        })}
                    </List>
                </Col>
                <Col className='box' span={4}>
                <Title style={{color: '#fff', textAlign: 'center',borderBottom: '1px solid white'}} level={3}>Guests</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.showUsers?.map((user)=>{
                            if(user.type === 'guest') return <Title style={{color:'#fff', marginLeft: '0.3rem'}} key={user.id} level={5}>- {user.type}, ID:{user.id}</Title>
                        })}
                    </List>
                </Col>
            </Row>
        </div>
    )
}

export default DBContent