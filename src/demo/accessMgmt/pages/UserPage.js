import '../../../styles/UserPage.css';
import UPContent from '../user page content/UPContent';
import UPHeader from '../user page content/UPHeader';
import { Modal, Typography, Input } from 'antd';
import { useEffect, useState } from 'react';
import { Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

function UserPage(props) {
  const [editMode, setEditMode] = useState(false);
  const [property, setProperty] = useState();

  const [newName, setNewName] = useState();
  const [newOrg, setNewOrg] = useState();
  const [newType, setNewType] = useState();

  useEffect(() => {
    addToUsersList();
    const ls = JSON.parse(localStorage.getItem('currentUser'));
    checkForUsers(ls?.type);

    return localStorage.setItem('users', JSON.stringify(props.users));
  }, [props.selectedUser]);

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('currentUser'));
    checkForUsers(ls?.type);

    return localStorage.setItem('users', JSON.stringify(props.users));
  }, [props.users]);

  const editPropery = (changing, value) => {
    if (changing === 'name' && value) {
      props.setSelectedUser((prevState) => {
        return { ...prevState, name: value };
      });
    } else if (changing === 'org' && value) {
      props.setSelectedUser((prevState) => {
        return { ...prevState, org: value };
      });
    } else if (changing === 'type') {
      props.setSelectedUser((prevState) => {
        return { ...prevState, type: value };
      });
    }
  };

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
        (user) =>
          user?.type !== 'superuser' &&
          user?.type !== 'admin' &&
          user?.type !== 'owner'
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
    localStorage.setItem('showUsers', JSON.stringify(props.showUsers));
  };

  const addToUsersList = () => {
    const newList = props.users.filter(
      (user) => user.id !== props.selectedUser.id
    );

    props.setUsers(() => {
      return [...newList, props.selectedUser];
    });
  };

  const onChange = (value) => {
    setNewType(value);
  };

  const makeModalContent = () => {
    switch (property) {
      case 'name':
        return (
          <>
            <Title style={{ color: '#2375ab' }} level={4}>
              Enter new name:
            </Title>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
            ></Input>
          </>
        );
      case 'org':
        return (
          <>
            <Title style={{ color: '#2375ab' }} level={4}>
              Enter new organisation:
            </Title>
            <Input
              value={newOrg}
              onChange={(e) => setNewOrg(e.target.value)}
              type="text"
            ></Input>
          </>
        );

      case 'type':
        return (
          <>
            <Title style={{ color: '#2375ab' }} level={4}>
              Pick a new type for the user:
            </Title>
            {makeOptions()}
          </>
        );
    }
  };

  const makeOptions = () => {
    if (props.currentUser?.type === 'superuser') {
      return (
        <Select onChange={onChange} style={{ width: '100%' }}>
          <Option key={'admin'}>admin</Option>
          <Option key={'owner'}>owner</Option>
          <Option key={'member'}>member</Option>
          <Option key={'guest'}>guest</Option>
        </Select>
      );
    } else if (props.currentUser?.type === 'admin') {
      return (
        <Select onChange={onChange} style={{ width: '100%' }}>
          <Option key={'owner'}>owner</Option>
          <Option key={'member'}>member</Option>
          <Option key={'guest'}>guest</Option>
        </Select>
      );
    } else if (props.currentUser?.type === 'owner') {
      return (
        <Select onChange={onChange} style={{ width: '100%' }}>
          <Option key={'member'}>member</Option>
          <Option key={'guest'}>guest</Option>
        </Select>
      );
    } else if (props.currentUser?.type === 'member') {
      return (
        <Select onChange={onChange} style={{ width: '100%' }}>
          <Option key={'guest'}>guest</Option>
        </Select>
      );
    } else if (props.currentUser?.type === 'guest') {
      return (
        <Select onChange={onChange} style={{ width: '100%' }}>
          <Option key={'guest'}>
            <h3 style={{ color: '#2375ab' }}>No options</h3>
          </Option>
        </Select>
      );
    }
  };
  return (
    <div className="user_page">
      <UPHeader
        currentUser={props.currentUser}
        selectedUser={props.selectedUser}
      />
      <Title
        level={2}
        style={{ textAlign: 'center', margin: '1rem', color: '#2375ab' }}
      >
        User profile
      </Title>
      <Modal
        title="Edit user info"
        visible={editMode}
        onCancel={() => {
          setEditMode(false);
        }}
        onOk={() => {
          switch (property) {
            case 'name':
              editPropery(property, newName);
              setNewName('');

              break;
            case 'org':
              editPropery(property, newOrg);
              setNewOrg('');

              break;
            case 'type':
              editPropery(property, newType);
          }
          addToUsersList();
          setEditMode(false);
        }}
        okText="Save"
      >
        {makeModalContent()}
      </Modal>
      <UPContent
        setProperty={setProperty}
        editMode={editMode}
        setEditMode={setEditMode}
        selectedUser={props.selectedUser}
      />
    </div>
  );
}

export default UserPage;
