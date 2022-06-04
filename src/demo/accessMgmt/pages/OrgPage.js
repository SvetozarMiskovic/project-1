import { useParams } from 'react-router-dom';
import OPHeader from '../orgpage content/OPHeader';
import OPContent from '../orgpage content/OPContent';
import { Typography } from 'antd';
import '../../../styles/OrgPage.css';

const { Title } = Typography;
function OrgPage(props) {
  const { orgId } = useParams();
  return (
    <div className="org_page">
      <OPHeader currentUser={props.currentUser} />
      <Title level={2} style={{ textAlign: 'center', margin: '1rem', color: '#2375ab' }}>
        Organisation page
      </Title>
      <OPContent
        users={props.users}
        currentUser={props.currentUser}
        showUsers={props.showUsers}
        orgs={props.orgs}
        setOrgs={props.setOrgs}
        orgId={orgId}
      />
    </div>
  );
}

export default OrgPage;
