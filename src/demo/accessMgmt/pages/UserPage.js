import '../../../styles/UserPage.css';
import UPContent from '../user page content/UPContent';
import UPHeader from '../user page content/UPHeader';
import { Modal, Typography } from 'antd';
import { useState, useRef } from 'react';
import { Input } from 'antd';
import { Select } from 'antd';
import { Alert } from 'antd';
import { Drawer } from 'antd';
import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';

const { Title } = Typography;
const { Option } = Select;

function UserPage(props) {
  const { userId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [viewOrg, setViewOrg] = useState(false);
  const [selectedType, setSelectedType] = useState();
  const [option, setOption] = useState();
  const newName = useRef();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const succTimer = () => {
    setIsSuccess(true);
    const SUT = setTimeout(() => {
      setIsSuccess(false);
    }, 1500);

    return () => clearTimeout(SUT);
  };

  const canceledTimer = () => {
    setIsCanceled(true);
    const CAT = setTimeout(() => {
      setIsCanceled(false);
    }, 1500);
    return () => clearTimeout(CAT);
  };
  const closeOrg = () => {
    setViewOrg(false);
  };
  const openOrg = () => {
    setViewOrg(true);
  };
  const editName = () => {
    const [userInfo] = props.users.filter((user) => user.id === Number(userId));

    userInfo.name = newName.current.input?.value;

    const filtered = props.users.filter((user) => user.id !== Number(userId));
    props.setUsers([...filtered, userInfo]);
    succTimer();
  };

  const editType = () => {
    const [userInfo] = props.users.filter((user) => user.id === Number(userId));

    userInfo.type = selectedType;
    const filtered = props.users.filter((user) => user.id !== Number(userId));
    props.setUsers([...filtered, userInfo]);
    succTimer();
  };

  const makeOptions = () => {
    if (props.currentUser?.type === 'superuser') {
      return (
        <Select
          defaultValue={() => {
            const [userInfo] = props.users.filter((user) => user.id === Number(userId));

            return userInfo.type;
          }}
          onChange={(val) => {
            setSelectedType(val);
          }}
          style={{ width: '100%' }}>
          <Option key={'admin'}>admin</Option>
          <Option key={'owner'}>owner</Option>
          <Option key={'member'}>member</Option>
          <Option key={'guest'}>guest</Option>
        </Select>
      );
    } else if (props.currentUser?.type === 'admin') {
      return (
        <Select
          defaultValue={() => {
            const [userInfo] = props.users.filter((user) => user.id === Number(userId));

            return userInfo.type;
          }}
          style={{ width: '100%' }}>
          <Option key={'owner'}>owner</Option>
          <Option key={'member'}>member</Option>
          <Option key={'guest'}>guest</Option>
        </Select>
      );
    } else if (props.currentUser?.type === 'owner') {
      return (
        <Select
          defaultValue={() => {
            const [userInfo] = props.users.filter((user) => user.id === Number(userId));

            return userInfo.type;
          }}
          style={{ width: '100%' }}>
          <Option key={'member'}>member</Option>
          <Option key={'guest'}>guest</Option>
        </Select>
      );
    } else if (props.currentUser?.type === 'member') {
      return (
        <Select
          defaultValue={() => {
            const [userInfo] = props.users.filter((user) => user.id === Number(userId));

            return userInfo.type;
          }}
          style={{ width: '100%' }}>
          <Option key={'guest'}>guest</Option>
        </Select>
      );
    } else if (props.currentUser?.type === 'guest') {
      return (
        <Select
          defaultValue={() => {
            const [userInfo] = props.users.filter((user) => user.id === Number(userId));

            return userInfo.type;
          }}
          style={{ width: '100%' }}>
          <Option key={'guest'}>
            <h3 style={{ color: '#2375ab' }}>No options</h3>
          </Option>
        </Select>
      );
    }
  };

  const makeEditContent = () => {
    const [userInfo] = props.users.filter((user) => user.id === Number(userId));
    if (option === 'name') {
      return (
        <>
          <Title italic level={5}>
            Current value
          </Title>
          <Input
            style={{ color: '#2375ab', marginBottom: '0.7rem' }}
            type={'text'}
            value={userInfo?.name}
            disabled></Input>
          <Title italic level={5}>
            New value
          </Title>
          <Input type={'text'} defaultValue={newName.current?.input.value} ref={newName}></Input>
        </>
      );
    } else if (option === 'type') {
      return (
        <>
          <Title level={5} italic>
            Change the type of a user
          </Title>
          {makeOptions()}
        </>
      );
    }
  };
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
        destroyOnClose
        title="Edit user info"
        visible={editMode}
        onCancel={() => {
          setEditMode(false);
          canceledTimer();
        }}
        onOk={() => {
          if (newName.current?.input.value) editName();
          if (option === 'type' && selectedType) editType();
          setEditMode(false);
        }}
        okText="Save">
        {makeEditContent()}
      </Modal>
      <Drawer onClose={closeOrg} placement="right" visible={viewOrg}></Drawer>
      <UPContent
        setOption={setOption}
        users={props.users}
        userId={userId}
        editMode={editMode}
        setEditMode={setEditMode}
        openOrg={openOrg}
      />
    </div>
  );
}

export default UserPage;
