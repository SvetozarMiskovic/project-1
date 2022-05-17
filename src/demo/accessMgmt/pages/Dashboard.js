import Header from '../dashboard content/Header';
import { Typography } from 'antd';
import '../../../styles/Dashboard.css';
import DBContent from '../dashboard content/DBContent';
import { useEffect } from 'react';
import { Alert } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

function Dashboard(props) {
  const [created, setCreated] = useState(false);
  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('currentUser'));
    checkForUsers(ls?.type);
  }, [props.currentUser]);

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('currentUser'));
    checkForUsers(ls?.type);

    localStorage.setItem('users', JSON.stringify(props.users));
    localStorage.setItem('showUsers', JSON.stringify(props.showUsers));
  }, [props.users]);

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('currentUser'));
    checkForUsers(ls?.type);
    localStorage.setItem('showUsers', JSON.stringify(props.showUsers));
  }, []);
  const getUsers = (result) => {
    props.setShowUsers(() => [...result]);
  };

  const checkForUsers = (info) => {
    if (info === 'superuser') {
      getUsers(props.users);
    } else if (info === 'admin') {
      const result = props.users.filter((user) => user?.type !== 'superuser');
      getUsers(result);
    } else if (info === 'owner') {
      const result = props.users.filter(
        (user) => user?.type !== 'superuser' && user?.type !== 'admin'
      );
      getUsers(result);
    } else if (info === 'member') {
      const result = props.users.filter(
        (user) => user?.type !== 'superuser' && user?.type !== 'admin' && user?.type !== 'owner'
      );
      getUsers(result);
    } else if (info === 'guest') {
      const result = props.users.filter(
        (user) =>
          user?.type !== 'superuser' &&
          user?.type !== 'admin' &&
          user?.type !== 'owner' &&
          user?.type !== 'member'
      );
      getUsers(result);
    }
  };

  return (
    <div className="dashboard">
      <Header
        setCreated={setCreated}
        setUsers={props.setUsers}
        setShowUsers={props.setShowUsers}
        isLoggedIn={props.isLoggedIn}
        currentUser={props.currentUser}
        setIsLoggedIn={props.setIsLoggedIn}
        setCurrentUser={props.setCurrentUser}
      />
      {created ? (
        <Alert
          style={{
            width: '250px',
            textAlign: 'center',
            position: 'absolute',
            right: 10,
            top: 100,
            height: '70px',
            alignSelf: 'right'
          }}
          type="success"
          message="User created successfully!"></Alert>
      ) : null}
      <Title className="content_title" style={{ color: '#2375ab' }} level={3}>
        Dashboard
      </Title>
      <DBContent showUsers={props.showUsers} currentUser={props.currentUser} users={props.users} />
    </div>
  );
}

export default Dashboard;
