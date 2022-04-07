import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import '../../../styles/UserPage.css';

const { Title } = Typography;

function UPHeader(props) {
  return (
    <div className="up_header">
      <Link
        style={{
          textDecoration: 'none',
          fontSize: '1rem',
          justifySelf: 'left',
          color: '#fff',
          textAlign: 'center',
          padding: '0.4rem',
          borderRadius: '0.4rem',
          backgroundColor: '#568203',
        }}
        to={'/user-view'}
      >
        Back to UserView
      </Link>
      <Title style={{ color: '#fff', margin: 0 }} level={3}>
        Logged in as:{' '}
        <span style={{ color: 'red' }}>{props.currentUser?.type}</span>, ID:
        <span style={{ color: 'red' }}> {props.currentUser?.id}</span>
      </Title>
    </div>
  );
}

export default UPHeader;
