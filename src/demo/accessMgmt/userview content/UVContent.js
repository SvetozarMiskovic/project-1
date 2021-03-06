import { Link } from 'react-router-dom';
import '../../../styles/UserView.css';

function UVContent(props) {
  return (
    <div className="uv_content">
      {props.showUsers?.map((user) => {
        return (
          <Link to={`/user/${user.id}`} key={user.id} className="user_box">
            {user.user} <span>ID:{user.id}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default UVContent;
