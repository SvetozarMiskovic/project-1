import { Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/UserView.css'


const {Title} = Typography;

function UVHeader(props){
  
    return (
        <div className='uv_header'>
            <Link style={{textDecoration:'none', fontSize:'1rem',justifySelf:'left',color:'#fff',textAlign:'center',  padding: '0.4rem', borderRadius:'0.4rem', backgroundColor:'#568203'}} className='back_button' to='/project-1'>Back to Dashboard</Link>
            <Title style={{color:'#fff', margin: 0}} level={3}>Logged in as: <span style={{color:'red'}}>{props.currentUser?.type}</span>, ID:<span style={{color:'red'}}> {props.currentUser?.id}</span></Title>
        </div>
    )
}

export default UVHeader