import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';

const { Title } = Typography;

function OVHeader(props) {
  return (
    <div className="ov_header">
      <Link
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
        className="back_button"
        to="/">
        Back to Dashboard
      </Link>
      <Title style={{ color: '#fff', margin: 0 }} level={3}>
        Logged in as: <span style={{ color: 'red' }}>{props.currentUser?.type}</span>, ID:
        <span style={{ color: 'red' }}> {props.currentUser?.id}</span>
      </Title>
      <Button
        onClick={() => props.setCreateOrg(true)}
        style={{ color: 'red', border: 'none' }}
        type="secondary">
        Create an Organisation
      </Button>
    </div>
  );
}
export default OVHeader;
