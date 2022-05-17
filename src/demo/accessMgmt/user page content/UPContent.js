import Input from 'antd/lib/input/Input';
import Title from 'antd/lib/typography/Title';

import '../../../styles/UserPage.css';
import { Button } from 'antd';

function UPContent(props) {
  return (
    <div className="up_content">
      {props.users.map((user) => {
        if (user.id === Number(props.userId)) {
          return (
            <div key={user.id} className="profile_card">
              <Title
                className="user_header"
                level={3}
                style={{ color: '#fff', textAlign: 'center', margin: '1rem' }}>
                User Details
              </Title>
              <div className="user_name">
                <Title style={{ color: '#fff', margin: 0 }} level={4}>
                  Name:
                </Title>
                <Input
                  placeholder="/no name"
                  value={user.name ? user.name : null}
                  size="large"
                  style={{ color: '#2375ab' }}
                  type={'text'}
                  disabled></Input>
                <Button
                  className="edit_button"
                  type="default"
                  onClick={() => {
                    props.setEditMode(true);
                    props.setOption('name');
                  }}
                  style={{
                    textAlign: 'center',

                    width: '100%',
                    marginTop: '0.6rem',
                    border: 'none'
                  }}>
                  Edit
                </Button>
              </div>
              <div className="user_organisation">
                <Title style={{ color: '#fff', margin: 0 }} level={4}>
                  Organisation:
                </Title>
                {user.org ? (
                  <Input
                    placeholder="/no org name"
                    value={user.org.name ? user.org.name : null}
                    size="large"
                    style={{ color: '#2375ab' }}
                    type={'text'}
                    disabled></Input>
                ) : (
                  <Input placeholder="NO ORG CREATED" size="large" type={'text'} disabled></Input>
                )}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '2rem'
                  }}>
                  {user.org ? (
                    <>
                      <Button
                        className="view_button"
                        type="default"
                        style={{
                          textAlign: 'center',
                          width: '100%',
                          marginTop: '0.6rem',
                          border: 'none'
                        }}
                        onClick={props.openOrg}>
                        View org
                      </Button>
                    </>
                  ) : (
                    <Title
                      style={{
                        textAlign: 'center',
                        width: '100%',
                        color: '#FF6B6B'
                      }}
                      level={4}>
                      User is not part of any organisation!
                    </Title>
                  )}
                </div>
              </div>
              <div className="user_email">
                <Title style={{ color: '#fff', margin: 0 }} level={4}>
                  Email:
                </Title>
                <Input
                  placeholder="/no email"
                  value={user.user}
                  size="large"
                  style={{ color: '#2375ab' }}
                  type={'text'}
                  disabled></Input>

                <Title style={{ color: '#FF6B6B', textAlign: 'center' }} italic={true} level={4}>
                  You cannot change the email!
                </Title>
              </div>
              <div className="user_password">
                <Title style={{ color: '#fff', margin: 0 }} level={4}>
                  Password:
                </Title>
                <Input
                  placeholder="/no password"
                  value={user.password ? user.password : null}
                  size="large"
                  style={{ color: '#2375ab' }}
                  type={'text'}
                  disabled></Input>

                <Title style={{ color: '#FF6B6B', textAlign: 'center' }} italic={true} level={4}>
                  Contact your superuser to reset the password for this account!
                </Title>
              </div>

              <div className="user_type">
                <Title style={{ color: '#fff', margin: 0 }} level={4}>
                  Type:
                </Title>
                <Input
                  placeholder="/no type"
                  value={user.type ? user.type : null}
                  size="large"
                  style={{ color: '#2375ab' }}
                  type={'text'}
                  disabled></Input>
                <Button
                  className="edit_button"
                  onClick={() => {
                    props.setEditMode(true);
                    props.setOption('type');
                  }}
                  type="default"
                  style={{
                    textAlign: 'center',

                    width: '100%',
                    marginTop: '0.6rem',
                    border: 'none'
                  }}>
                  Edit
                </Button>
              </div>
              <div className="user_id">
                <Title style={{ color: '#fff', margin: 0 }} level={4}>
                  ID:
                </Title>
                <Input
                  placeholder="/no id"
                  value={user.id ? user.id : null}
                  size="large"
                  style={{ color: '#2375ab' }}
                  type={'text'}
                  disabled></Input>

                <Title style={{ color: '#FF6B6B', textAlign: 'center' }} italic={true} level={4}>
                  IDs are given when the account is created and cannot be modified!
                </Title>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default UPContent;
