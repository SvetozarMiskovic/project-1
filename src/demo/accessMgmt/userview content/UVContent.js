import { Link, useParams } from 'react-router-dom';
import '../../../styles/UserView.css';

function UVContent(props) {
  const { userId = props.selectedUser?.id } = useParams();

  return (
    <div className="uv_content">
      {props.showUsers?.map((user) => {
        return (
          <Link
            to={'/user/' + userId}
            onClick={() => {
              props.setSelectedUser(user);
            }}
            key={user.id}
            className="user_box">
            {user.user} <span>ID:{user.id}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default UVContent;
