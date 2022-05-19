import { Typography, Divider, Input, Button, Avatar, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;

function OPContent(props) {
  const [showMembers, setShowMembers] = useState(false);

  return (
    <div className="op_content">
      {props.orgs.map((org) => {
        if (org.id === Number(props.orgId)) {
          return (
            <div key={org.id} className="org_card">
              <Modal
                bodyStyle={{ display: 'flex', width: 'fit-content', flexWrap: 'wrap' }}
                footer={null}
                onCancel={() => setShowMembers(false)}
                title="All members"
                visible={showMembers}>
                {org.members.map((memb) => {
                  return (
                    <div key={memb.id} style={{ width: '250px' }} className="single_member">
                      <Avatar style={{ color: '#2375ab' }} size="large" icon={<UserOutlined />} />
                      <Title style={{ color: '#2375ab', wordBreak: 'break-all' }} level={5}>
                        {memb.name ? memb.name : memb.id}
                      </Title>
                    </div>
                  );
                })}
              </Modal>
              <Title
                className="org_header"
                level={3}
                style={{ color: '#fff', textAlign: 'center', margin: '1rem' }}>
                Organisation Details
              </Title>

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
                {org.owner.id === props.currentUser.id ? (
                  <Button
                    className="edit_button"
                    type="default"
                    style={{
                      textAlign: 'center',

                      width: '100%',
                      marginTop: '0.6rem',
                      border: 'none'
                    }}>
                    Edit
                  </Button>
                ) : null}
              </div>
              <div className="org_owner">
                <Title underline style={{ color: '#fff', margin: 0 }} level={4}>
                  Organisation owner:
                </Title>
                <Input
                  value={org.owner.name ? org.owner.name : org.owner.id + '-' + org.owner.type}
                  size="large"
                  style={{ color: '#2375ab' }}
                  type={'text'}
                  disabled></Input>
                {org.owner.id === props.currentUser.id ? (
                  <Button
                    className="edit_button"
                    type="default"
                    style={{
                      textAlign: 'center',

                      width: '100%',
                      marginTop: '0.6rem',
                      border: 'none'
                    }}>
                    Edit
                  </Button>
                ) : null}
              </div>
              <div className="org_members">
                <Title underline style={{ color: '#fff', margin: 0 }} level={4}>
                  Organisation members:
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
                            <Title style={{ color: '#2375ab', wordBreak: 'break-all' }} level={5}>
                              {memb.name ? memb.name : memb.id}
                            </Title>
                          </div>
                        );
                      })
                    : org.members.slice(0, 3).map((memb) => {
                        return (
                          <div key={memb.id} className="single_member">
                            <Avatar
                              style={{ color: '#2375ab' }}
                              size="large"
                              icon={<UserOutlined />}
                            />
                            <Title style={{ color: '#2375ab', wordBreak: 'break-all' }} level={5}>
                              {memb.name ? memb.name : memb.id}
                            </Title>
                          </div>
                        );
                      })}
                </div>
                {org.members.length < 4 ? null : (
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
