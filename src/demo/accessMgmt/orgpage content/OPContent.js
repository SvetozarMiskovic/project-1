import { Typography, Divider, Input, Button, Avatar, Drawer, Modal, Select, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;
function OPContent(props) {
  const [showMembers, setShowMembers] = useState(false);
  const [editOrg, setEditOrg] = useState(false);
  const newOrgName = useRef();
  const [newOrgOwner, setNewOrgOwner] = useState();
  const [moreOrgMembers, setMoreOrgMembers] = useState();
  const [succAlert, setSuccAlert] = useState(false);

  const getLatestInfo = () => {
    props.orgs.map((org) => {
      const oldList = org.members;
      const newestList = props.users.filter((user) => oldList.some((ol) => user.id === ol.id));

      const oldOwner = org.owner;
      const [newOwner] = props.users.filter((user) => user.id === oldOwner.id);

      org.owner = newOwner;
      org.members = newestList;
    });
  };

  useEffect(() => {
    getLatestInfo();
  }, []);
  const sucTimer = () => {
    setSuccAlert(true);
    const timer = setTimeout(() => {
      setSuccAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  };

  const makeMemberList = (org) => {
    const newMemberList = props.showUsers.filter(
      (user) => !org.members.some((memb) => user.id === memb.id)
    );

    return newMemberList.map((nm) => {
      if (nm.id !== props.currentUser.id) return <Option key={nm.id} value={nm.id}></Option>;
    });
  };

  const editOrgName = (name) => {
    const [targetOrg] = props.orgs.filter((org) => org.id === Number(props.orgId));
    const rest = props.orgs.filter((org) => org.id !== Number(props.orgId));

    targetOrg.organisation = name;

    const NOL = [...rest, targetOrg];

    props.setOrgs(NOL);

    setEditOrg(false);
    sucTimer();

    localStorage.setItem('organisations', JSON.stringify(props.orgs));
  };

  const editOrgOwner = (owner) => {
    const [newOwner] = props.users.filter((user) => user.id === owner);
    const [targetOrg] = props.orgs.filter((org) => org.id === Number(props.orgId));
    const rest = props.orgs.filter((org) => org.id !== Number(props.orgId));

    targetOrg.owner = newOwner;

    const NOL = [...rest, targetOrg];

    props.setOrgs(NOL);

    setEditOrg(false);
    sucTimer();

    localStorage.setItem('organisations', JSON.stringify(props.orgs));
  };

  const editOrgmembers = () => {
    const [targetOrg] = props.orgs.filter((org) => org.id === Number(props.orgId));
    const rest = props.orgs.filter((org) => org.id !== Number(props.orgId));

    const oldList = targetOrg.members;
    const NML = props.users.filter((user) => moreOrgMembers.includes(user.id));
    const membersToAdd = [...oldList, ...NML];

    targetOrg.members = membersToAdd;

    const NOL = [...rest, targetOrg];

    props.setOrgs(NOL);

    setEditOrg(false);
    sucTimer();

    localStorage.setItem('organisations', JSON.stringify(props.orgs));
  };
  const editOrganisation = () => {
    if (newOrgName.current.input.value.length !== 0) editOrgName(newOrgName.current.input.value);
    if (newOrgOwner) editOrgOwner(newOrgOwner);
    if (moreOrgMembers) editOrgmembers();
  };
  return (
    <div className="op_content">
      {props.orgs.map((org) => {
        if (org.id === Number(props.orgId)) {
          return (
            <div key={org.id} className="org_card">
              {succAlert ? (
                <Alert
                  style={{
                    position: 'absolute',
                    top: '4.6rem',
                    right: '1rem'
                  }}
                  message={'Success!'}
                  description={'Updated organisation successfuly!'}
                  showIcon
                  type="success"
                />
              ) : null}
              <Drawer
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
                onClose={() => setShowMembers(false)}
                title="All members"
                placement="right"
                visible={showMembers}>
                {org.members.map((memb) => {
                  return (
                    <div key={memb.id} style={{ width: '250px' }} className="single_member">
                      <Avatar style={{ color: '#2375ab' }} size="large" icon={<UserOutlined />} />
                      <Title
                        style={{ color: '#2375ab', wordBreak: 'break-all', margin: 0, padding: 0 }}
                        level={5}>
                        {memb.name ? memb.name : '/no name'}
                      </Title>
                      <Title
                        style={{ color: '#2375ab', wordBreak: 'break-all', margin: 0, padding: 0 }}
                        level={5}>
                        {memb.id}
                      </Title>
                    </div>
                  );
                })}
              </Drawer>
              <Modal
                destroyOnClose
                title="Edit Organisation"
                visible={editOrg}
                onCancel={() => setEditOrg(false)}
                onOk={() => {
                  editOrganisation();
                }}
                className="org_edit_card">
                <Title level={4}>Current name</Title>
                <Input type={'text'} disabled value={org.organisation}></Input>
                <Title level={4}>New name</Title>
                <Input ref={newOrgName} type={'text'}></Input>
                <Title level={4}>Current owner</Title>
                <Input
                  type={'text'}
                  disabled
                  value={
                    org.owner.name
                      ? org.owner.name + '-' + org.owner.id
                      : org.owner.id + '-' + org.owner.type
                  }></Input>
                <Title level={4}>Pick new owner</Title>
                <Select
                  placeholder="Please select"
                  onChange={(key) => {
                    setNewOrgOwner(key);
                  }}
                  defaultValue={
                    org.owner.name
                      ? org.owner.name + '-' + org.owner.id
                      : org.owner.type + '-' + org.owner.id
                  }
                  style={{ width: '100%' }}>
                  {props.users.map((user) => {
                    if (
                      (user.type === 'superuser' && user.id !== props.currentUser.id) ||
                      (user.type === 'admin' && user.id !== props.currentUser.id) ||
                      (user.type === 'owner' && user.id !== props.currentUser.id)
                    ) {
                      return <Option value={user.id} key={user.id}></Option>;
                    }
                  })}
                </Select>
                <Title level={4}>Add users</Title>
                <Select
                  onChange={(val) => {
                    setMoreOrgMembers([...val]);
                  }}
                  placeholder="Please select"
                  style={{ width: '100%' }}
                  mode="multiple">
                  {makeMemberList(org)}
                </Select>
              </Modal>
              <Title
                className="org_header"
                level={3}
                style={{ color: '#fff', textAlign: 'center', margin: '1rem' }}>
                Organisation Details
              </Title>
              <div className="org_edit">
                {org.owner.id === props.currentUser.id ? (
                  <Button
                    className="edit_button"
                    type="default"
                    onClick={() => setEditOrg(true)}
                    style={{
                      textAlign: 'center',
                      width: '100%',
                      border: 'none'
                    }}>
                    Edit Organisation
                  </Button>
                ) : null}
              </div>

              <Divider style={{ backgroundColor: 'white' }} />
              {org.owner.id !== props.currentUser.id ? (
                <Text style={{ fontSize: '16' }} type="danger">
                  You are not the owner of the organisation, hence you cannot edit any options!
                </Text>
              ) : null}
              <div className="org_name">
                <Title underline style={{ color: '#fff', margin: 0 }} level={4}>
                  Organisation name:
                </Title>
                <Input
                  placeholder="/no name"
                  value={org.organisation ? org.organisation : null}
                  size="large"
                  style={{ color: '#2375ab' }}
                  type={'text'}
                  disabled></Input>
              </div>
              <div className="org_owner">
                <Title underline style={{ color: '#fff', margin: 0 }} level={4}>
                  Organisation owner:
                  {org.owner.name
                    ? ' ' + org.owner.name
                    : ' no name' + ' / ' + 'type: ' + `${org.owner.type}`}
                </Title>
                <Input
                  value={org.owner.id}
                  size="large"
                  style={{ color: '#2375ab' }}
                  type={'text'}
                  disabled></Input>
              </div>
              <div className="org_members">
                <Title underline style={{ color: '#fff', margin: 0 }} level={4}>
                  Organisation members: {org.members.length}
                </Title>
                <div className="org_members_box">
                  {org.members.length < 4
                    ? org.members.map((memb) => {
                        return (
                          <div key={memb.id} className="single_member">
                            <Avatar
                              style={{ color: '#2375ab' }}
                              size="large"
                              icon={<UserOutlined />}
                            />
                            <Title
                              style={{
                                color: '#2375ab',
                                wordBreak: 'break-all',
                                margin: 0,
                                padding: 0
                              }}
                              level={5}>
                              {memb.name ? memb.name : '/no name'}
                            </Title>
                            <Title
                              style={{
                                color: '#2375ab',
                                wordBreak: 'break-all',
                                margin: 0,
                                padding: 0
                              }}
                              level={5}>
                              {memb.id}
                            </Title>
                          </div>
                        );
                      })
                    : org.members.slice(0, 4).map((memb) => {
                        return (
                          <div key={memb.id} className="single_member">
                            <Avatar
                              style={{ color: '#2375ab' }}
                              size="large"
                              icon={<UserOutlined />}
                            />
                            <Title
                              style={{
                                color: '#2375ab',
                                wordBreak: 'break-all',
                                margin: 0,
                                padding: 0
                              }}
                              level={5}>
                              {memb.name ? memb.name : '/no name'}
                            </Title>
                            <Title
                              style={{
                                color: '#2375ab',
                                wordBreak: 'break-all',
                                margin: 0,
                                padding: 0
                              }}
                              level={5}>
                              {memb.id}
                            </Title>
                          </div>
                        );
                      })}
                </div>
                {org.members.length < 5 ? null : (
                  <Button
                    style={{
                      textAlign: 'center',

                      width: '100%',
                      marginTop: '0.6rem',
                      border: 'none'
                    }}
                    onClick={() => setShowMembers(true)}
                    className="edit_button">
                    View more
                  </Button>
                )}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default OPContent;
