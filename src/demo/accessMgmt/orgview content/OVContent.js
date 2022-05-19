import { Link } from 'react-router-dom';

function OVContent(props) {
  return (
    <div className="ov_content">
      {props.orgs.map((org) => {
        return (
          <Link className="org_box" to={`/org/${org.id}`} key={org.id}>
            {org.organisation} <span>ID: {org.id}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default OVContent;
