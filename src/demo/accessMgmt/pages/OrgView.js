import OVContent from '../orgview content/OVContent';
import OVHeader from '../orgview content/OVHeader';
import { Input, Select, Typography } from 'antd';
import '../../../styles/OrgView.css';
import Modal from 'antd/lib/modal/Modal';
import { useEffect, useRef, useState } from 'react';

const { Title } = Typography;
const { Option } = Select;

function OrgView(props) {
  const [createOrg, setCreateOrg] = useState(false);
  const orgName = useRef();
  const [orgOwner, setOrgOwner] = useState();
  const [orgMembers, setOrgMembers] = useState([]);

  const handleChange = (val) => {
    setOrgMembers([...val]);
  };

  const handleNewOrg = (orgObj) => {
    props.setOrgs((prevState) => [...prevState, orgObj]);
  };
  useEffect(() => {
    localStorage.setItem('organisations', JSON.stringify(props.orgs));
  }, [props.orgs]);

  const createOrganisation = () => {
    const [ownerObj] = props.users.filter((user) => user.id === orgOwner);
    const membersArr = props.users.filter((user) => orgMembers.includes(user.id));
    const ID = new Date().getTime();

    const newOrg = {
      organisation: orgName.current?.input.value ? orgName.current?.input.value : 'Unnamed',
      owner: ownerObj,
      members: membersArr,
      id: ID
    };

    handleNewOrg(newOrg);

    setCreateOrg(false);
  };
  return (
    <div className="org_view">
      <OVHeader setCreateOrg={setCreateOrg} currentUser={props.currentUser} />
      <Title style={{ textAlign: 'center', margin: '1rem', color: '#2375ab' }} level={2}>
        Organisation view
      </Title>
      <OVContent setSelectedOrg={props.setSelectedOrg} orgs={props.orgs} />
      <Modal
        destroyOnClose
        title="Create an Organisation"
        onOk={() => {
          if (orgOwner) createOrganisation();
        }}
        onCancel={() => setCreateOrg(false)}
        visible={createOrg}>
        <Title level={5} italic>
          Name the org
        </Title>
        <Input ref={orgName} type={'text'}></Input>
        <Title level={5} italic>
          Choose an owner
        </Title>
        <Select
          placeholder="Please select"
          onChange={(key) => {
            setOrgOwner(key);
          }}
          style={{ width: '100%' }}>
          {props.users.map((user) => {
            if (user.type === 'superuser' || user.type === 'admin' || user.type === 'owner') {
              return <Option value={user.id} key={user.id}></Option>;
            }
          })}
        </Select>
        <Title level={5} italic>
          Add users to organisation
        </Title>
        <Select
          placeholder="Please select"
          onChange={handleChange}
          style={{ width: '100%' }}
          mode="multiple">
          {props.showUsers.map((user) => {
            if (user.id !== props.currentUser.id)
              return <Option value={user.id} key={user.id}></Option>;
          })}
        </Select>
      </Modal>
    </div>
  );
}

export default OrgView;
