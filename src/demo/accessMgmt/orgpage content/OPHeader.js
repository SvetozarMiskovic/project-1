import { Link } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;
function OPHeader(props) {
  return (
    <div className="op_header">
      <Link
        className="up_backBtn"
        style={{
          textDecoration: 'none',
          fontSize: '1rem',
          justifySelf: 'left',
          color: '#fff',
          textAlign: 'center',
          padding: '0.4rem',
          borderRadius: '0.4rem',
          backgroundColor: '#568203'
        }}
        to={'/org-view'}>
        Back to OrgView
      </Link>
      <Title style={{ color: '#fff', margin: 0 }} level={3}>
        Logged in as: <span style={{ color: 'red' }}>{props.currentUser?.type}</span>, ID:
        <span style={{ color: 'red' }}> {props.currentUser?.id}</span>
      </Title>
    </div>
  );
}

export default OPHeader;
