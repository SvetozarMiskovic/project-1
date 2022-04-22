import '../../../styles/UserPage.css';
import UPContent from '../user page content/UPContent';
import UPHeader from '../user page content/UPHeader';
import { Modal, Typography } from 'antd'; // Input
import { useState } from 'react'; // useEffect
// import { Select } from 'antd';
import { Alert } from 'antd';
import { useParams } from 'react-router-dom';
const { Title } = Typography;
// const { Option } = Select;

function UserPage(props) {
  const { userId } = useParams();

  const [editMode, setEditMode] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  return (
    <div className="user_page">
      <UPHeader currentUser={props.currentUser} />
      <Title level={2} style={{ textAlign: 'center', margin: '1rem', color: '#2375ab' }}>
        User profile
      </Title>
      {isSuccess ? (
        <Alert
          style={{
            position: 'absolute',
            top: '4.6rem',
            right: '1rem'
          }}
          message={'Success!'}
          description={'Updated profile successfuly!'}
          showIcon
          type="success"
        />
      ) : null}
      {isCanceled ? (
        <Alert
          style={{
            position: 'absolute',
            top: '4.6rem',
            right: '1rem'
          }}
          message={'Canceled!'}
          description={'Canceled the edit!'}
          showIcon
          type="info"
        />
      ) : null}
      <Modal
        title="Edit user info"
        visible={editMode}
        onCancel={() => {
          setEditMode(false);
          setIsCanceled(true);
          setTimeout(() => {
            setIsCanceled(false);
          }, 1500);
        }}
        onOk={() => {
          setEditMode(false);
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 1500);
        }}
        okText="Save"></Modal>
      <UPContent
        users={props.users}
        userId={userId}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
}

export default UserPage;
