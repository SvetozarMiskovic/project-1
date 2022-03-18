import {Row, Col, List} from 'antd'
import {Typography} from 'antd'
import { useEffect, useState } from 'react';

const {Title} = Typography;

function DBContent(props){
   
    


  
    return(
        <div className="content">
            <Row className='content_row'>
                <Col className='box' span={4}>
                    <Title style={{color: '#fff', textAlign: 'center',borderBottom: '1px solid white',color: "#fff"}} level={3}>Super users</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.availableUsers.map((au)=>{
                            if(au.type === 'superuser'){
                                return <Title key={au.id} style={{margin: 0, padding: '0 0.6rem', color: '#fff'}} level={5}>-{au.type}, ID: {au.id}</Title> 
                            }
                        })}
                    </List>
                </Col>
                <Col className='box' span={4}>
                <Title style={{color: '#fff', textAlign: 'center',borderBottom: '1px solid white'}} level={3}>Admins</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.availableUsers.map((au)=>{
                            if(au.type === 'admin'){
                                return <Title key={au.id} style={{margin: 0, padding: '0 0.6rem', color: '#fff'}}level={5}>-{au.type}, ID: {au.id}</Title> 
                            } 
                        })}
                    </List>
                </Col>
                <Col className='box' span={4}>
                <Title style={{color: '#fff', textAlign: 'center',borderBottom: '1px solid white'}} level={3}>Owners</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.availableUsers.map((au)=>{
                            if(au.type === 'owner'){
                                return <Title key={au.id} style={{margin: 0, padding: '0 0.6rem', color: '#fff'}} level={5}>-{au.type}, ID: {au.id}</Title> 
                            } 
                        })}
                    </List>
                </Col>
                <Col className='box' span={4}>
                <Title style={{color: '#fff', textAlign: 'center', borderBottom: '1px solid white',}} level={3}>Members</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.availableUsers.map((au)=>{
                            if(au.type === 'member'){
                                return <Title key={au.id} style={{margin: 0, padding: '0 0.6rem', color: '#fff'}} level={5}>-{au.type}, ID: {au.id}</Title> 
                            } 
                        })}
                    </List>
                </Col>
                <Col className='box' span={4}>
                <Title style={{color: '#fff', textAlign: 'center',borderBottom: '1px solid white'}} level={3}>Guests</Title>
                    <List
                    className='single_list'
                    size='small'
                    >
                        {props.availableUsers.map((au)=>{
                            if(au.type === 'guest'){
                                return <Title key={au.id} style={{margin: 0, padding: '0 0.6rem', color: '#fff'}} level={5}>-{au.type}, ID: {au.id}</Title> 
                            }
                        })}
                    </List>
                </Col>
            </Row>
        </div>
    )
}

export default DBContent