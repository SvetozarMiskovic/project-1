import '../../../styles/UserView.css';
import UVHeader from '../userview content/UVHeader';
import UVContent from '../userview content/UVContent';
import { Typography } from 'antd';
import { useEffect } from 'react';
const { Title } = Typography;

function UserView(props) {
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(props.users));
  }, []);
  return (
    <div className="user_view">
      <UVHeader currentUser={props.currentUser} />;
      <Title level={2} style={{ textAlign: 'center', margin: '1rem', color: '#2375ab' }}>
        UserView
      </Title>
      ;
      <UVContent
        selectedUser={props.selectedUser}
        setSelectedUser={props.setSelectedUser}
        showUsers={props.showUsers}
        updateUser={props.updateUser}
        users={props.users}
      />
      ;
    </div>
  );
}

export default UserView;
