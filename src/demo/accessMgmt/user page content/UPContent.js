import Input from 'antd/lib/input/Input';
import Title from 'antd/lib/typography/Title';

import '../../../styles/UserPage.css';
import { Button } from 'antd';

function UPContent(props) {
  return (
    <div className="up_content">
      <div className="profile_card">
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
            value={props.selectedUser?.name ? props.selectedUser?.name : null}
            size="large"
            style={{ color: '#2375ab' }}
            type={'text'}
            disabled></Input>
          <Button
            id="#name"
            className="edit_button"
            type="default"
            onClick={() => {
              props.setEditMode(true);
              props.setProperty('name');
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
          <Input
            placeholder="/no org"
            value={props.selectedUser?.org ? props.selectedUser?.org : null}
            size="large"
            style={{ color: '#2375ab' }}
            type={'text'}
            disabled></Input>
          <Button
            id="#org"
            className="edit_button"
            onClick={() => {
              props.setEditMode(true);
              props.setProperty('org');
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
        <div className="user_email">
          <Title style={{ color: '#fff', margin: 0 }} level={4}>
            Email:
          </Title>
          <Input
            placeholder="/no email"
            value={props.selectedUser?.user ? props.selectedUser?.user : null}
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
            value={props.selectedUser?.password ? props.selectedUser?.password : null}
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
            value={props.selectedUser?.type ? props.selectedUser?.type : null}
            size="large"
            style={{ color: '#2375ab' }}
            type={'text'}
            disabled></Input>
          <Button
            id="#type"
            className="edit_button"
            onClick={() => {
              props.setEditMode(true);
              props.setProperty('type');
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
            value={props.selectedUser?.id ? props.selectedUser?.id : null}
            size="large"
            style={{ color: '#2375ab' }}
            type={'text'}
            disabled></Input>

          <Title style={{ color: '#FF6B6B', textAlign: 'center' }} italic={true} level={4}>
            IDs are given when the account is created and cannot be modified!
          </Title>
        </div>
      </div>
    </div>
  );
}

export default UPContent;
