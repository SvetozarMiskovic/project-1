import { Link } from 'react-router-dom';

function OVContent(props) {
  return (
    <div className="ov_content">
      {props.orgs.map((org) => {
        return (
          <Link to={`/org/${org.id}`} key={org.id}>
            {org.organisation}
          </Link>
        );
      })}
    </div>
  );
}

export default OVContent;
